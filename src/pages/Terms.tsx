
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                By accessing and using Imperial Jewelry's website and services, you accept and agree to be bound by the terms and provision of this agreement. These terms apply to all visitors, users, and others who access or use the service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product Information and Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>All jewelry products are authentic and come with certificates of authenticity</li>
                <li>Prices are subject to change without notice</li>
                <li>We strive for accuracy in product descriptions and images</li>
                <li>Actual colors may vary slightly due to monitor settings</li>
                <li>Carat weights and measurements are approximate</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Orders and Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>All orders are subject to acceptance and availability</li>
                <li>We reserve the right to refuse or cancel orders</li>
                <li>Payment must be received before order processing</li>
                <li>We accept major credit cards and secure payment methods</li>
                <li>Billing address must match the payment method</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping and Delivery</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Shipping costs and timeframes vary by location and method</li>
                <li>Risk of loss transfers to you upon delivery to carrier</li>
                <li>Signature confirmation required for high-value items</li>
                <li>Insurance is included on all shipments</li>
                <li>International orders may be subject to customs fees</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Returns and Exchanges</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>30-day return policy on most items</li>
                <li>Items must be in original condition with certificates</li>
                <li>Custom and personalized items are non-returnable</li>
                <li>Return shipping costs are customer's responsibility</li>
                <li>Refunds processed within 5-10 business days</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Warranty and Repairs</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Lifetime warranty on manufacturing defects</li>
                <li>Free cleaning and inspection services</li>
                <li>Repair services available for reasonable fees</li>
                <li>Warranty does not cover normal wear or damage</li>
                <li>Original purchase receipt required for warranty claims</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                All content on this website, including images, text, logos, and designs, is the property of Imperial Jewelry and is protected by copyright and trademark laws. Unauthorized use is prohibited.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Imperial Jewelry shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our products or services. Our liability is limited to the purchase price of the product.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Governing Law</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                These terms shall be governed by and construed in accordance with the laws of New York State, without regard to its conflict of law provisions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the service constitutes acceptance of the modified terms.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Questions about these Terms of Service should be sent to us at:
              </p>
              <div className="mt-4 text-gray-600">
                <p>Email: legal@imperialjewelry.com</p>
                <p>Phone: 1-800-IMPERIAL</p>
                <p>Address: 123 Jewelry Lane, Diamond District, NY 10001</p>
              </div>
            </CardContent>
          </Card>

          <div className="text-sm text-gray-500 mt-8">
            <p>Last updated: January 1, 2024</p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Terms;
