import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderItem {
  id: string;
  product_details: {
    name: string;
    image_url?: string;
  };
  selected_size?: string;
  selected_length?: string;
  amount: number;
}

interface OrderConfirmationRequest {
  email: string;
  orderNumber: string;
  orders: OrderItem[];
  totalAmount: number;
  promoCode?: string;
  discountPercentage?: number;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      email,
      orderNumber,
      orders,
      totalAmount,
      promoCode,
      discountPercentage,
    }: OrderConfirmationRequest = await req.json();

    console.log("Sending order confirmation email to:", email, "for order:", orderNumber);

    // Generate order items HTML
    const orderItemsHtml = orders
      .map(
        (order) => `
      <div style="display: flex; align-items: center; padding: 16px; background-color: #f9fafb; border-radius: 8px; margin-bottom: 12px;">
        ${
          order.product_details.image_url
            ? `
          <img src="${order.product_details.image_url}" alt="${order.product_details.name}" style="width: 64px; height: 64px; border-radius: 8px; object-fit: cover; margin-right: 16px;">
        `
            : ""
        }
        <div style="flex: 1;">
          <h4 style="margin: 0 0 4px 0; font-weight: 600; color: #111827;">${order.product_details.name}</h4>
          ${order.selected_size ? `<p style="margin: 2px 0; font-size: 14px; color: #6b7280;">Size: ${order.selected_size}</p>` : ""}
          ${order.selected_length ? `<p style="margin: 2px 0; font-size: 14px; color: #6b7280;">Length: ${order.selected_length}</p>` : ""}
          <p style="margin: 4px 0 0 0; font-size: 18px; font-weight: 700; color: #2563eb;">$${(order.amount / 100).toFixed(2)}</p>
        </div>
      </div>
    `,
      )
      .join("");

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Confirmation - Imperial Jewelry</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f8fafc; margin: 0; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 32px 24px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Imperial Jewelry</h1>
              <p style="margin: 8px 0 0 0; font-size: 16px; opacity: 0.9;">Order Confirmation</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 32px 24px;">
              <!-- Success Message -->
              <div style="text-align: center; margin-bottom: 32px;">
                <div style="width: 64px; height: 64px; background-color: #10b981; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                  <span style="color: white; font-size: 24px;">✓</span>
                </div>
                <h2 style="margin: 0 0 8px 0; color: #111827; font-size: 24px;">Thank You for Your Order!</h2>
                <p style="margin: 0; color: #6b7280; font-size: 16px;">Your payment has been processed successfully.</p>
              </div>

              <!-- Order Details -->
              <div style="background-color: #f8fafc; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
                <h3 style="margin: 0 0 16px 0; color: #111827; font-size: 18px; font-weight: 600;">Order Details</h3>
                <div style="margin-bottom: 12px;">
                  <span style="color: #6b7280;">Order Number:</span>
                  <span style="font-family: monospace; font-weight: 600; margin-left: 8px;">${orderNumber}</span>
                </div>
                <div style="margin-bottom: 12px;">
                  <span style="color: #6b7280;">Email:</span>
                  <span style="font-weight: 600; margin-left: 8px;">${email}</span>
                </div>
                <div>
                  <span style="color: #6b7280;">Status:</span>
                  <span style="color: #10b981; font-weight: 600; margin-left: 8px;">Confirmed</span>
                </div>
              </div>

              <!-- Order Items -->
              <div style="margin-bottom: 24px;">
                <h3 style="margin: 0 0 16px 0; color: #111827; font-size: 18px; font-weight: 600;">Items Ordered</h3>
                ${orderItemsHtml}
              </div>

              ${
                promoCode
                  ? `
                <!-- Promo Code -->
                <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #166534;">Promo Code Applied:</span>
                    <span style="color: #15803d; font-weight: 600;">${promoCode} (${discountPercentage}% off)</span>
                  </div>
                </div>
              `
                  : ""
              }

              <!-- Total -->
              <div style="border-top: 2px solid #e5e7eb; padding-top: 16px; margin-bottom: 32px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 20px; font-weight: bold; color: #111827;">Total Paid:</span>
                  <span style="font-size: 20px; font-weight: bold; color: #2563eb;">$${(totalAmount / 100).toFixed(2)}</span>
                </div>
              </div>

              <!-- What's Next -->
              <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
                <h3 style="margin: 0 0 12px 0; color: #1e40af; font-size: 16px; font-weight: 600;">What's Next?</h3>
                <ul style="margin: 0; padding-left: 20px; color: #1e40af;">
                  <li>Your order will be processed within 1-2 business days</li>
                  <li>You'll receive tracking information via email</li>
                  <li>Expected delivery: 3-7 business days</li>
                  <li>Contact us if you have any questions</li>
                </ul>
              </div>

              <!-- Footer -->
              <div style="text-align: center; color: #6b7280; font-size: 14px;">
                <p style="margin: 0 0 8px 0;">Thank you for choosing Imperial Jewelry!</p>
                <p style="margin: 0;">If you have any questions, please contact our support team.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailResponse = await resend.emails.send({
      from: "Imperial Jewelry <orders@shopimperialjewelry.com>",
      to: [email],
      bcc: ["imperialjewelryshop@gmail.com"], // silent copy
      subject: `Order Confirmation - ${orderNumber}`,
      html: emailHtml,
    });

    console.log("Order confirmation email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, emailId: emailResponse.data?.id }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      },
    );
  } catch (error: any) {
    console.error("Error in send-order-confirmation function:", error);

    return new Response(
      JSON.stringify({
        error: error.message,
        success: false,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      },
    );
  }
};

serve(handler);