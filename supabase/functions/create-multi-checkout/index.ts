
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CartItem {
  productId: string;
  selectedSize?: string;
  quantity: number;
  sourceTable: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { items, customerEmail }: { items: CartItem[], customerEmail: string } = await req.json();

    if (!items || items.length === 0 || !customerEmail) {
      throw new Error("Missing required fields: items and customerEmail");
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase configuration");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch all products for the cart items
    const lineItems = [];
    let totalAmount = 0;

    for (const item of items) {
      // Try to find the product in the specified source table
      const { data: product, error } = await supabase
        .from(item.sourceTable)
        .select('*')
        .eq('id', item.productId)
        .single();

      if (error || !product) {
        throw new Error(`Product not found: ${item.productId} in ${item.sourceTable}`);
      }

      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            description: product.description || "",
            images: [product.image_url],
          },
          unit_amount: product.price,
        },
        quantity: item.quantity,
      });

      totalAmount += product.price * item.quantity;
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
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/`,
      metadata: {
        customer_email: customerEmail,
        item_count: items.length.toString(),
      },
    });

    // Create order record for each item
    for (const item of items) {
      const { data: product } = await supabase
        .from(item.sourceTable)
        .select('*')
        .eq('id', item.productId)
        .single();

      if (product) {
        const { error: orderError } = await supabase
          .from('orders')
          .insert({
            stripe_session_id: session.id,
            product_id: item.productId,
            selected_size: item.selectedSize,
            amount: product.price * item.quantity,
            currency: 'usd',
            status: 'pending',
            guest_email: customerEmail,
            product_table_type: item.sourceTable,
          });

        if (orderError) {
          console.error("Error creating order:", orderError);
        }
      }
    }

    return new Response(
      JSON.stringify({ url: session.url }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error creating multi-checkout session:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
