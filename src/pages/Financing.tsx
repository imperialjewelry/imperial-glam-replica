
import { Check, CreditCard, Calendar, Shield } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PromoBar from '@/components/PromoBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Financing = () => {
  const financingOptions = [
    {
      name: "Buy Now, Pay Later",
      description: "Split your purchase into 4 interest-free installments",
      provider: "Klarna, Afterpay, or Affirm",
      features: ["Pay in 4 installments", "No interest when paid on time", "Instant approval"]
    },
    {
      name: "Stripe Installments",
      description: "Spread payments over 6-12 months through Stripe",
      provider: "Available for eligible purchases",
      features: ["Monthly payments", "Transparent terms", "Secure processing"]
    },
    {
      name: "Credit/Debit Cards",
      description: "Pay with any major credit or debit card",
      provider: "Powered by Stripe",
      features: ["Instant processing", "Secure encryption", "Global acceptance"]
    }
  ];

  const benefits = [
    {
      icon: <CreditCard className="w-8 h-8 text-blue-600" />,
      title: "Stripe Powered",
      description: "Industry-leading payment processing trusted by millions of businesses"
    },
    {
      icon: <Calendar className="w-8 h-8 text-blue-600" />,
      title: "Flexible Options",
      description: "Multiple payment methods including BNPL and installment plans"
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Bank-Level Security",
      description: "Your payment information is protected with advanced encryption"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <PromoBar />
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            FLEXIBLE PAYMENT OPTIONS
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Make your dream jewelry affordable with flexible payment options powered by Stripe. 
            Choose from multiple payment methods including Buy Now, Pay Later solutions.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
            Shop Now
          </Button>
        </div>

        {/* Financing Options */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Choose Your Payment Plan
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {financingOptions.map((option, index) => (
              <Card key={index} className="border-2 hover:border-blue-200 transition-colors">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {option.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {option.description}
                    </p>
                    <div className="text-lg font-semibold text-blue-600">
                      {option.provider}
                    </div>
                  </div>
                  
                  <ul className="space-y-3">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                    Select Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose Our Payment Options?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            How Payment Options Work
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Shop</h3>
              <p className="text-gray-600 text-sm">Browse our collection and add items to your cart</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Choose Payment</h3>
              <p className="text-gray-600 text-sm">Select your preferred payment method at checkout</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Secure Processing</h3>
              <p className="text-gray-600 text-sm">All payments processed securely through Stripe</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                4
              </div>
              <h3 className="font-semibold mb-2">Enjoy</h3>
              <p className="text-gray-600 text-sm">Receive your jewelry and manage payments easily</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit and debit cards, as well as Buy Now, Pay Later options 
                like Klarna, Afterpay, and Affirm, all processed securely through Stripe.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How does Buy Now, Pay Later work?
              </h3>
              <p className="text-gray-600">
                BNPL options allow you to split your purchase into smaller, interest-free installments. 
                The approval process is quick and you can complete your purchase immediately.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is my payment information secure?
              </h3>
              <p className="text-gray-600">
                Absolutely! All payments are processed through Stripe, which meets the highest 
                security standards and is PCI DSS compliant for your protection.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-blue-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 mb-6">
            Start shopping today and choose your preferred payment method at checkout.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
            Start Shopping
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Financing;
