
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
    const stripe = new Stripe(Deno.env.get("stripetestsecret") || "", {
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
      event = stripe.webhooks.constructEvent(
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
        console.log("Session details:", JSON.stringify(session, null, 2));

        // Get all orders for this session
        const { data: orders, error: fetchError } = await supabaseClient
          .from("orders")
          .select("*")
          .eq("stripe_session_id", session.id);

        if (fetchError) {
          console.error("Error fetching orders:", fetchError);
          return new Response("Error fetching orders", { status: 500 });
        }

        if (!orders || orders.length === 0) {
          console.error("No orders found for session:", session.id);
          return new Response("No orders found", { status: 404 });
        }

        console.log(`Found ${orders.length} orders for session ${session.id}`);

        // Update all orders for this session to paid status
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
          console.error("Error updating orders:", updateError);
          return new Response("Error updating orders", { status: 500 });
        }

        console.log(`Successfully updated ${orders.length} orders to paid status for session:`, session.id);
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
