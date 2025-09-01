
import { Truck, Clock, Globe, Package, CheckCircle, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PromoBar from '@/components/PromoBar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Shipping = () => {
  const shippingOptions = [
    {
      name: "Standard Shipping",
      price: "FREE",
      duration: "5-7 Business Days",
      icon: <Truck className="w-8 h-8 text-blue-600" />,
      description: "Free standard shipping on all orders over $50",
      features: ["Tracking included", "Signature required", "Insurance included"]
    },
    {
      name: "Express Shipping",
      price: "$15.99",
      duration: "2-3 Business Days",
      icon: <Clock className="w-8 h-8 text-orange-600" />,
      description: "Fast delivery for when you need it sooner",
      features: ["Priority handling", "Tracking included", "Signature required"]
    },
    {
      name: "Overnight Shipping",
      price: "$29.99",
      duration: "1 Business Day",
      icon: <Package className="w-8 h-8 text-red-600" />,
      description: "Next-day delivery for urgent orders",
      features: ["Rush processing", "Premium tracking", "Guaranteed delivery"]
    }
  ];

  const internationalShipping = [
    { country: "Canada", price: "$19.99", duration: "7-10 days" },
    { country: "United Kingdom", price: "$24.99", duration: "7-12 days" },
    { country: "Australia", price: "$29.99", duration: "10-14 days" },
    { country: "European Union", price: "$24.99", duration: "8-12 days" },
    { country: "Other Countries", price: "Calculated at checkout", duration: "10-21 days" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <PromoBar />
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            SHIPPING & DELIVERY
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer multiple shipping options to get your Imperial Jewelry pieces to you 
            safely and efficiently, anywhere in the world.
          </p>
        </div>

        {/* Domestic Shipping Options */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Domestic Shipping (US)
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {shippingOptions.map((option, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="mb-6">
                    {option.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {option.name}
                  </h3>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {option.price}
                  </div>
                  <div className="text-lg text-gray-600 mb-4">
                    {option.duration}
                  </div>
                  <p className="text-gray-600 mb-6">
                    {option.description}
                  </p>
                  <ul className="space-y-2">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center justify-center text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* International Shipping */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            International Shipping
          </h2>
          <Card>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center mb-6">
                    <Globe className="w-8 h-8 text-blue-600 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-900">Worldwide Delivery</h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    We ship to over 100+ countries worldwide. All international shipments include 
                    tracking and insurance for your peace of mind.
                  </p>
                  <div className="space-y-4">
                    {internationalShipping.map((shipping, index) => (
                      <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200">
                        <span className="font-medium">{shipping.country}</span>
                        <div className="text-right">
                          <div className="font-semibold text-blue-600">{shipping.price}</div>
                          <div className="text-sm text-gray-500">{shipping.duration}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Important Notes</h4>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start">
                      <AlertCircle className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                      Customs duties and taxes may apply and are the responsibility of the recipient
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                      Delivery times may vary due to customs processing
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                      Some countries may have restrictions on jewelry imports
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      All packages are fully insured and tracked
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Processing Time */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Processing & Handling
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Standard Items</h3>
                <p className="text-gray-600 mb-4">
                  Most in-stock items are processed within 1-2 business days.
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Quality inspection before shipping</li>
                  <li>• Professional packaging and protection</li>
                  <li>• Certificate of authenticity included</li>
                  <li>• Tracking information provided</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Custom Orders</h3>
                <p className="text-gray-600 mb-4">
                  Custom jewelry pieces require 2-4 weeks for creation and processing.
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Design consultation and approval</li>
                  <li>• Handcrafted by master jewelers</li>
                  <li>• Multiple quality checkpoints</li>
                  <li>• Progress updates provided</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Shipping Protection */}
        <div className="bg-gray-900 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Shipping Protection Included</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <Package className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Secure Packaging</h3>
              <p className="text-gray-300">Premium protective packaging designed specifically for jewelry</p>
            </div>
            <div>
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Full Insurance</h3>
              <p className="text-gray-300">Every shipment is fully insured for the complete value</p>
            </div>
            <div>
              <Truck className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Signature Required</h3>
              <p className="text-gray-300">Adult signature required for delivery security</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Shipping;
