
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
    const { productId, selectedSize, customerEmail } = await req.json();

    if (!productId || !customerEmail) {
      throw new Error("Missing required fields: productId and customerEmail");
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase configuration");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Try to find the product in chain_products first
    let product = null;
    let productTableType = 'chain_products';
    
    const { data: chainProduct } = await supabase
      .from('chain_products')
      .select('*')
      .eq('id', productId)
      .single();

    if (chainProduct) {
      product = chainProduct;
    } else {
      // If not found in chain_products, check bracelet_products
      const { data: braceletProduct, error: braceletError } = await supabase
        .from('bracelet_products')
        .select('*')
        .eq('id', productId)
        .single();

      if (braceletProduct) {
        product = braceletProduct;
        productTableType = 'bracelet_products';
      } else {
        throw new Error("Product not found");
      }
    }

    if (!product) {
      throw new Error("Product not found");
    }

    // Initialize Stripe
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("Missing Stripe configuration");
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });

    // Check if customer exists in Stripe
    const customers = await stripe.customers.list({
      email: customerEmail,
      limit: 1,
    });

    let customerId = null;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : customerEmail,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              description: product.description || "",
              images: [product.image_url],
            },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/chains`,
      metadata: {
        product_id: productId,
        selected_size: selectedSize || "",
        product_table_type: productTableType,
      },
    });

    // Create order record
    const { error: orderError } = await supabase
      .from('orders')
      .insert({
        stripe_session_id: session.id,
        product_id: productId,
        selected_size: selectedSize,
        amount: product.price,
        currency: 'usd',
        status: 'pending',
        guest_email: customerEmail,
        product_table_type: productTableType,
      });

    if (orderError) {
      console.error("Error creating order:", orderError);
      // Don't throw here, as the Stripe session was created successfully
    }

    return new Response(
      JSON.stringify({ url: session.url }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
