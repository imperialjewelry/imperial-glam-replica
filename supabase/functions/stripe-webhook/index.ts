
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
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const signature = req.headers.get("stripe-signature");
    const body = await req.text();

    let event;
    try {
      event = await stripe.webhooks.constructEventAsync(
        body,
        signature!,
        Deno.env.get("STRIPE_WEBHOOK_SECRET") ?? ""
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    console.log(`Processing webhook event: ${event.type}`);

    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        
        console.log("Processing successful checkout session:", session.id);
        console.log("Session metadata:", JSON.stringify(session.metadata, null, 2));

        // Handle case where metadata might not exist or cart_items might be missing
        let cartItems = [];
        try {
          if (session.metadata?.cart_items) {
            cartItems = JSON.parse(session.metadata.cart_items);
            console.log("Parsed cart items:", cartItems);
          } else {
            console.log("No cart_items found in metadata, checking for existing orders...");
            
            // Fallback: Check if orders were already created during checkout (legacy behavior)
            const { data: existingOrders, error: fetchError } = await supabaseClient
              .from("orders")
              .select("*")
              .eq("stripe_session_id", session.id);

            if (!fetchError && existingOrders && existingOrders.length > 0) {
              console.log(`Found ${existingOrders.length} existing orders, updating to paid status`);
              
              // Update existing orders to paid status
              const { error: updateError } = await supabaseClient
                .from("orders")
                .update({
                  status: "paid",
                  stripe_payment_intent_id: session.payment_intent,
                  customer_details: session.customer_details,
                  shipping_details: session.shipping_details,
                  updated_at: new Date().toISOString()
                })
                .eq("stripe_session_id", session.id);

              if (updateError) {
                console.error("Error updating existing orders:", updateError);
                return new Response("Error updating orders", { status: 500 });
              }

              console.log(`Successfully updated ${existingOrders.length} orders to paid status`);
              return new Response(JSON.stringify({ received: true, updated: existingOrders.length }), {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 200,
              });
            } else {
              console.error("No cart items in metadata and no existing orders found");
              return new Response(JSON.stringify({ received: true, message: "No cart items or orders found" }), {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 200,
              });
            }
          }
        } catch (parseError) {
          console.error("Error parsing cart items from metadata:", parseError);
          return new Response("Invalid cart items data", { status: 400 });
        }

        if (!cartItems || cartItems.length === 0) {
          console.log("Cart items array is empty, skipping order creation");
          return new Response(JSON.stringify({ received: true, message: "Empty cart" }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          });
        }

        const promoCode = session.metadata?.promo_code || null;
        const discountPercentage = parseInt(session.metadata?.discount_percentage || '0');

        console.log(`Creating orders for ${cartItems.length} cart items`);

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

        // Create orders for each cart item
        for (const cartItem of cartItems) {
          console.log('Processing cart item for order creation:', cartItem);
          
          let productDetails = null;
          let sourceTable = null;

          // Try to find the product in each table
          for (const table of productTables) {
            try {
              const { data: product, error } = await supabaseClient
                .from(table)
                .select("*")
                .eq("id", cartItem.id)
                .maybeSingle();

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
            // Create order with basic product info from cart
            productDetails = {
              name: cartItem.name,
              price: cartItem.price,
              image_url: cartItem.image_url
            };
            sourceTable = 'unknown';
          }

          // Create a unique identifier for this specific product configuration
          const productDetailsWithConfig = {
            cart_item_id: cartItem.id,
            ...productDetails,
            source_table: sourceTable,
            selected_size: cartItem.selectedSize || null,
            selected_length: cartItem.selectedLength || null,
            quantity: cartItem.quantity || 1
          };

          // Create order record
          const orderData = {
            stripe_session_id: session.id,
            stripe_customer_id: session.customer,
            stripe_payment_intent_id: session.payment_intent,
            amount: Math.round((cartItem.price * (cartItem.quantity || 1)) - (discountAmount / cartItems.length)),
            guest_email: session.customer_details?.email || session.customer_email,
            promo_code: promoCode,
            discount_percentage: discountPercentage,
            status: "paid",
            selected_size: cartItem.selectedSize || null,
            selected_length: cartItem.selectedLength || null,
            product_details: productDetailsWithConfig,
            customer_details: session.customer_details,
            shipping_details: session.shipping_details,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };

          console.log('Creating order with data:', {
            session_id: session.id,
            customer_id: session.customer,
            amount: orderData.amount,
            product: productDetails.name
          });

          const { error: insertError } = await supabaseClient
            .from("orders")
            .insert(orderData);

          if (insertError) {
            console.error('Error creating order:', insertError);
            return new Response("Error creating order", { status: 500 });
          }
        }

        console.log(`Successfully created ${cartItems.length} orders for session:`, session.id);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
