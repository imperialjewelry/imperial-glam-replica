import { RotateCcw, Shield, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PromoBar from '@/components/PromoBar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
const Returns = () => {
  const returnSteps = [{
    step: 1,
    title: "Contact Us",
    description: "Email us at imperialjewelrshop@gmail.com within 30 days of delivery",
    icon: <CheckCircle className="w-8 h-8 text-blue-600" />
  }, {
    step: 2,
    title: "Return Authorization",
    description: "We'll provide a return authorization number and prepaid shipping label",
    icon: <Shield className="w-8 h-8 text-green-600" />
  }, {
    step: 3,
    title: "Package & Ship",
    description: "Carefully package the item in original packaging and ship it back",
    icon: <RotateCcw className="w-8 h-8 text-purple-600" />
  }, {
    step: 4,
    title: "Inspection & Refund",
    description: "We inspect the item and process your refund within 5-7 business days",
    icon: <Clock className="w-8 h-8 text-orange-600" />
  }];
  const returnConditions = ["Item must be in original condition", "All original packaging and certificates must be included", "Item must be returned within 30 days of delivery", "Custom or personalized items are not eligible for return", "Earrings are not eligible for return due to hygiene reasons"];
  const refundMethods = [{
    method: "Original Payment Method",
    timeframe: "5-7 business days",
    description: "Refund will be processed to your original form of payment"
  }, {
    method: "Store Credit",
    timeframe: "Immediate",
    description: "Receive store credit for future purchases with no expiration"
  }, {
    method: "Exchange",
    timeframe: "3-5 business days",
    description: "Exchange for a different size, style, or item of equal value"
  }];
  return <div className="min-h-screen bg-white">
      <PromoBar />
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            RETURNS & REFUNDS
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your satisfaction is our priority. We offer a hassle-free 30-day return policy 
            to ensure you're completely happy with your Imperial Jewelry purchase.
          </p>
        </div>

        {/* 30-Day Guarantee */}
        <div className="bg-blue-50 rounded-lg p-8 mb-16 text-center">
          <Shield className="w-16 h-16 text-blue-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">30-Day Money-Back Guarantee</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            If you're not completely satisfied with your purchase, return it within 30 days 
            for a full refund, exchange, or store credit. No questions asked.
          </p>
        </div>

        {/* Return Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Simple Return Process
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {returnSteps.map((step, index) => <Card key={index} className="text-center">
                <CardContent className="p-8">
                  <div className="mb-6">
                    {step.icon}
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-4">
                    Step {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {step.description}
                  </p>
                </CardContent>
              </Card>)}
          </div>
        </div>

        {/* Return Conditions */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Return Requirements</h3>
              <ul className="space-y-4">
                {returnConditions.map((condition, index) => <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{condition}</span>
                  </li>)}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Non-Returnable Items</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">Custom Jewelry</div>
                    <div className="text-gray-600 text-sm">Personalized or custom-made pieces</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">Earrings</div>
                    <div className="text-gray-600 text-sm">Due to hygiene and health regulations</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">Engraved Items</div>
                    <div className="text-gray-600 text-sm">Items with custom engraving or personalization</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Refund Methods */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Refund Options
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {refundMethods.map((method, index) => <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {method.method}
                  </h3>
                  <div className="text-2xl font-bold text-blue-600 mb-4">
                    {method.timeframe}
                  </div>
                  <p className="text-gray-600">
                    {method.description}
                  </p>
                </CardContent>
              </Card>)}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-900 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Help with Your Return?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Our customer service team is here to help make your return process as smooth as possible. 
            Contact us with any questions or concerns.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-gray-300">imperialjewelryshop@gmail.com</p>
              <p className="text-sm text-gray-400">Response within 24 hours</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Phone Number</h3>
              <p className="text-gray-300">(832) 408-1472</p>
              <p className="text-sm text-gray-400"> Monday - Friday, 11AM - 6:30PM EST</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Return Address</h3>
              <p className="text-gray-300">5085 Westheimer Rd</p>
              <p className="text-sm text-gray-400">Houston, TX</p>
            </div>
          </div>
          <div className="mt-8">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              Start Return Process
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>;
};
export default Returns;