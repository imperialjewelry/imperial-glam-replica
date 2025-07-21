
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
    const { line_items, customerEmail } = await req.json();

    if (!line_items || !Array.isArray(line_items) || line_items.length === 0) {
      throw new Error("line_items is required and must be a non-empty array");
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Create checkout session with multiple line items
    const session = await stripe.checkout.sessions.create({
      customer_email: customerEmail,
      line_items: line_items,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/payment-success`,
      cancel_url: `${req.headers.get("origin")}/`,
    });

    // Optionally store order information in Supabase
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const totalAmount = line_items.reduce((total: number, item: any) => {
      return total + (item.quantity || 1);
    }, 0);

    await supabaseClient.from("orders").insert({
      stripe_session_id: session.id,
      amount: totalAmount * 100, // Convert to cents
      guest_email: customerEmail,
      status: "pending",
      created_at: new Date().toISOString()
    });

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
