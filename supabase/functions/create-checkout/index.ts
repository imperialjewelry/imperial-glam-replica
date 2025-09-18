
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { line_items, customerEmail, shippingAddress, promoCode, discountPercentage, cartItems } = await req.json();

    console.log('Received checkout request:', { line_items, customerEmail, shippingAddress, promoCode, discountPercentage, cartItems });

    if (!line_items || !Array.isArray(line_items) || line_items.length === 0) {
      throw new Error("line_items is required and must be a non-empty array");
    }

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      throw new Error("cartItems is required for order tracking");
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Validate that all price IDs exist in Stripe
    console.log('Validating price IDs...');
    for (const item of line_items) {
      if (!item.price) {
        throw new Error(`Missing price ID for item: ${JSON.stringify(item)}`);
      }
      
      try {
        await stripe.prices.retrieve(item.price);
        console.log(`Price ID ${item.price} is valid`);
      } catch (error) {
        console.error(`Invalid price ID ${item.price}:`, error);
        throw new Error(`Invalid price ID: ${item.price}`);
      }
    }

    // Check if customer exists or create a new one
    let customerId;
    const existingCustomers = await stripe.customers.list({
      email: customerEmail,
      limit: 1
    });

    if (existingCustomers.data.length > 0) {
      customerId = existingCustomers.data[0].id;
      console.log('Found existing customer:', customerId);
    } else {
      // Create new customer
      const newCustomer = await stripe.customers.create({
        email: customerEmail,
        metadata: {
          source: 'imperial_jewelry_website'
        }
      });
      customerId = newCustomer.id;
      console.log('Created new customer:', customerId);
    }

    // Create checkout session configuration
    const sessionConfig: any = {
      customer: customerId,
      line_items: line_items,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/`,
    };

    // Add discount if promo code is applied
    if (promoCode && discountPercentage > 0) {
      console.log(`Applying ${discountPercentage}% discount with promo code: ${promoCode}`);
      
      // Create a coupon for this discount
      const coupon = await stripe.coupons.create({
        percent_off: discountPercentage,
        duration: 'once',
        name: `Promo code: ${promoCode}`,
      });

      sessionConfig.discounts = [{
        coupon: coupon.id,
      }];

      // Update promo code usage count
      const { data: promoData, error: fetchError } = await supabaseClient
        .from("promo_codes")
        .select("usage_count")
        .eq("code", promoCode.toUpperCase())
        .single();

      if (!fetchError && promoData) {
        const { error: updateError } = await supabaseClient
          .from("promo_codes")
          .update({ 
            usage_count: promoData.usage_count + 1,
            updated_at: new Date().toISOString()
          })
          .eq("code", promoCode.toUpperCase());

        if (updateError) {
          console.error('Error updating promo code usage:', updateError);
        }
      }
    }

    // Store cart data in Supabase with session ID for webhook processing
    // Only store essential metadata due to Stripe's 500-character limit
    const compactCartItems = cartItems.map(item => ({
      id: item.id,
      quantity: item.quantity,
      price: item.price,
      stripe_price_id: item.stripe_price_id
    }));

    const sessionConfigWithMetadata = {
      ...sessionConfig,
      metadata: {
        cart_items_count: cartItems.length.toString(),
        customer_email: customerEmail,
        promo_code: promoCode || '',
        discount_percentage: discountPercentage?.toString() || '0'
      }
    };

    const session = await stripe.checkout.sessions.create(sessionConfigWithMetadata);
    console.log('Created checkout session:', session.id);

    // Store full cart data in Supabase for webhook processing
    const { error: cartError } = await supabaseClient
      .from("checkout_sessions")
      .upsert({
        session_id: session.id,
        cart_items: cartItems,
        customer_email: customerEmail,
        shipping_address: shippingAddress,
        created_at: new Date().toISOString()
      });

    if (cartError) {
      console.error('Error storing cart data:', cartError);
      // Continue anyway as the essential data is in metadata
    }
    
    // Orders will be created by the webhook after successful payment

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
