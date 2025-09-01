
import { Check, CreditCard, Calendar, Shield } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PromoBar from '@/components/PromoBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Financing = () => {
  const financingOptions = [
    {
      name: "0% APR for 6 Months",
      description: "No interest if paid in full within 6 months",
      minAmount: "$299",
      features: ["No credit check impact", "Instant approval", "Easy monthly payments"]
    },
    {
      name: "0% APR for 12 Months",
      description: "Extended payment terms for larger purchases",
      minAmount: "$599",
      features: ["Flexible payment schedule", "No hidden fees", "Early payoff option"]
    },
    {
      name: "Low APR Extended Terms",
      description: "Competitive rates for 18-36 month terms",
      minAmount: "$1,000",
      features: ["Low monthly payments", "Fixed interest rates", "Up to 36 months"]
    }
  ];

  const benefits = [
    {
      icon: <CreditCard className="w-8 h-8 text-blue-600" />,
      title: "Easy Application",
      description: "Quick online application with instant decision in most cases"
    },
    {
      icon: <Calendar className="w-8 h-8 text-blue-600" />,
      title: "Flexible Terms",
      description: "Choose payment terms that work best for your budget"
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Secure & Safe",
      description: "Your personal information is protected with bank-level security"
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
            JEWELRY FINANCING
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Make your dream jewelry affordable with our flexible financing options. 
            Get approved in minutes and enjoy your purchase today.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
            Apply Now
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
                    <div className="text-2xl font-bold text-blue-600">
                      Min. {option.minAmount}
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
            Why Choose Our Financing?
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
            How It Works
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
              <h3 className="font-semibold mb-2">Apply</h3>
              <p className="text-gray-600 text-sm">Complete our quick application at checkout</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Get Approved</h3>
              <p className="text-gray-600 text-sm">Receive instant decision in most cases</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                4
              </div>
              <h3 className="font-semibold mb-2">Enjoy</h3>
              <p className="text-gray-600 text-sm">Receive your jewelry and start making payments</p>
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
                What do I need to apply for financing?
              </h3>
              <p className="text-gray-600">
                You'll need to be at least 18 years old, have a valid Social Security number, 
                and provide basic information about your income and employment.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Will applying affect my credit score?
              </h3>
              <p className="text-gray-600">
                We perform a soft credit check initially, which doesn't affect your credit score. 
                A hard inquiry only occurs if you're approved and accept the financing terms.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I pay off my balance early?
              </h3>
              <p className="text-gray-600">
                Yes! You can pay off your balance early without any prepayment penalties. 
                This can also help you save on interest charges.
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
            Apply for financing today and make your dream jewelry purchase affordable.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
            Apply for Financing
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Financing;
