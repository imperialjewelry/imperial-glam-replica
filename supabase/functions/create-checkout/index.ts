
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
    const { line_items, customerEmail, promoCode, discountPercentage, cartItems } = await req.json();

    console.log('Received checkout request:', { line_items, customerEmail, promoCode, discountPercentage, cartItems });

    if (!line_items || !Array.isArray(line_items) || line_items.length === 0) {
      throw new Error("line_items is required and must be a non-empty array");
    }

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      throw new Error("cartItems is required for order tracking");
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

    // Create checkout session
    const session = await stripe.checkout.sessions.create(sessionConfig);
    console.log('Created checkout session:', session.id);

    // Calculate total amount after discount
    const subtotalAmount = cartItems.reduce((total: number, item: any) => {
      return total + (item.price * (item.quantity || 1));
    }, 0);

    const discountAmount = discountPercentage > 0 ? Math.round((subtotalAmount * discountPercentage) / 100) : 0;

    // Define the possible product tables to search
    const productTables = [
      'grillz_products',
      'chain_products', 
      'watch_products',
      'earring_products',
      'pendant_products',
      'bracelet_products',
      'glasses_products',
      'diamond_products',
      'engagement_ring_products',
      'hip_hop_ring_products',
      'vvs_simulant_products',
      'custom_products'
    ];

    // Store detailed order information for each cart item
    for (const cartItem of cartItems) {
      console.log('Processing cart item:', cartItem);
      
      let productDetails = null;
      let sourceTable = null;

      // Try to find the product in each table
      for (const table of productTables) {
        try {
          const { data: product, error } = await supabaseClient
            .from(table)
            .select("*")
            .eq("id", cartItem.id)
            .single();

          if (!error && product) {
            productDetails = product;
            sourceTable = table;
            console.log(`Found product in ${table}:`, product.name);
            break;
          }
        } catch (err) {
          // Continue searching in other tables
          continue;
        }
      }

      if (!productDetails) {
        console.error('Product not found in any table for cart item:', cartItem.id);
        throw new Error(`Product not found for cart item ID: ${cartItem.id}`);
      }

      // Create order record with the cart item ID as product_id
      const orderData = {
        stripe_session_id: session.id,
        product_id: cartItem.id, // Use the original cart item ID
        amount: Math.round((cartItem.price * (cartItem.quantity || 1)) - (discountAmount / cartItems.length)),
        guest_email: customerEmail,
        promo_code: promoCode || null,
        discount_percentage: discountPercentage || 0,
        status: "pending",
        product_details: {
          ...productDetails,
          source_table: sourceTable
        },
        selected_size: cartItem.selectedSize || null,
        selected_length: cartItem.selectedLength || null,
        created_at: new Date().toISOString()
      };

      console.log('Inserting order with product from', sourceTable, ':', orderData.product_id);

      const { error: insertError } = await supabaseClient
        .from("orders")
        .insert(orderData);

      if (insertError) {
        console.error('Error inserting order:', insertError);
        throw new Error(`Failed to create order: ${insertError.message}`);
      }
    }

    console.log('Order records created in database');

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
