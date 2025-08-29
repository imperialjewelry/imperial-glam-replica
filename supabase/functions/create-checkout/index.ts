
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
    const { line_items, customerEmail, promoCode, discountPercentage } = await req.json();

    console.log('Received checkout request:', { line_items, customerEmail, promoCode, discountPercentage });

    if (!line_items || !Array.isArray(line_items) || line_items.length === 0) {
      throw new Error("line_items is required and must be a non-empty array");
    }

    const stripe = new Stripe(Deno.env.get("stripetestsecret") || "", {
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

    // Create checkout session configuration
    const sessionConfig: any = {
      customer_email: customerEmail,
      line_items: line_items,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/payment-success`,
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

      // First get the current promo code to increment its usage count
      const { data: promoData, error: fetchError } = await supabaseClient
        .from("promo_codes")
        .select("usage_count")
        .eq("code", promoCode.toUpperCase())
        .single();

      if (!fetchError && promoData) {
        // Update promo code usage count
        const { error: updateError } = await supabaseClient
          .from("promo_codes")
          .update({ 
            usage_count: promoData.usage_count + 1,
            updated_at: new Date().toISOString()
          })
          .eq("code", promoCode.toUpperCase());

        if (updateError) {
          console.error('Error updating promo code usage:', updateError);
          // Don't fail the checkout for this, just log the error
        }
      }
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create(sessionConfig);

    console.log('Created checkout session:', session.id);

    // Calculate total amount after discount
    const subtotalAmount = line_items.reduce((total: number, item: any) => {
      return total + (item.quantity || 1);
    }, 0);

    const discountAmount = discountPercentage > 0 ? Math.round((subtotalAmount * discountPercentage) / 100) : 0;
    const finalAmount = subtotalAmount - discountAmount;

    // Store order information in Supabase
    await supabaseClient.from("orders").insert({
      stripe_session_id: session.id,
      amount: finalAmount * 100, // Convert to cents
      guest_email: customerEmail,
      promo_code: promoCode || null,
      discount_percentage: discountPercentage || 0,
      status: "pending",
      created_at: new Date().toISOString()
    });

    console.log('Order record created in database');

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
