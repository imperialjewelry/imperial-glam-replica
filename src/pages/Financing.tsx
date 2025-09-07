import { Check, DollarSign, Calendar, Shield, Star, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PromoBar from '@/components/PromoBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Helmet } from 'react-helmet-async';
const Financing = () => {
  const bnplProviders = [{
    name: "Afterpay",
    logo: "https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/images//afterpaylogo.webp",
    description: "Pay in 4 interest-free installments every 2 weeks",
    minPurchase: "$35",
    maxPurchase: "$1,000",
    features: ["Split into 4 payments", "Pay every 2 weeks", "No interest or fees when paid on time", "Instant approval decision", "Available in-store and online"],
    color: "bg-green-50 border-green-200 hover:border-green-300",
    website: "https://www.afterpay.com/"
  }, {
    name: "Klarna",
    logo: "https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/images/klarnalogo.webp",
    description: "Flexible payment options - pay in 4 or pay in 30 days",
    minPurchase: "$35",
    maxPurchase: "$10,000",
    features: ["Pay in 4 interest-free installments", "30-day payment option available", "No fees when paid on time", "Smoooth shopping experience", "App to manage payments"],
    color: "bg-pink-50 border-pink-200 hover:border-pink-300",
    website: "https://www.klarna.com/"
  }, {
    name: "Affirm",
    logo: "https://cdn-assets.affirm.com/images/black_logo-white_bg.svg",
    description: "Monthly payment plans from 3-36 months with transparent rates",
    minPurchase: "$50",
    maxPurchase: "$17,500",
    features: ["Choose 3, 6, 12 or 24 month plans", "Clear, upfront rates (0-36% APR)", "No hidden fees or compounding interest", "Prequalify without affecting credit", "Build credit with on-time payments"],
    color: "bg-blue-50 border-blue-200 hover:border-blue-300",
    website: "https://www.affirm.com/"
  }];
  const benefits = [{
    icon: <DollarSign className="w-8 h-8 text-primary" />,
    title: "Make Luxury Affordable",
    description: "Get that dream piece today and pay over time with 0% interest options"
  }, {
    icon: <Clock className="w-8 h-8 text-primary" />,
    title: "Instant Approval",
    description: "Get approved in seconds with soft credit checks that won't affect your score"
  }, {
    icon: <Shield className="w-8 h-8 text-primary" />,
    title: "Secure & Protected",
    description: "All BNPL providers offer purchase protection and fraud monitoring"
  }, {
    icon: <Star className="w-8 h-8 text-primary" />,
    title: "Build Credit History",
    description: "Some providers help you build credit with responsible payment history"
  }];
  const howItWorks = [{
    step: "1",
    title: "Shop Your Style",
    description: "Browse our premium jewelry collection and find your perfect piece"
  }, {
    step: "2",
    title: "Choose BNPL at Checkout",
    description: "Select Afterpay, Klarna, or Affirm as your payment method"
  }, {
    step: "3",
    title: "Get Instant Approval",
    description: "Complete a quick application - most approvals happen instantly"
  }, {
    step: "4",
    title: "Wear Now, Pay Later",
    description: "Get your jewelry shipped immediately and pay in installments"
  }];
  return <div className="min-h-screen bg-background">
      <Helmet>
        <title>Jewelry Financing | Buy Now Pay Later for Diamond & Hip Hop Jewelry - Imperial Jewelry</title>
        <meta name="description" content="Finance your dream jewelry with Afterpay, Klarna, and Affirm. Buy now, pay later options for diamond jewelry, hip hop chains, engagement rings, and custom pieces at Imperial Jewelry." />
        <meta name="keywords" content="jewelry financing, buy now pay later jewelry, diamond jewelry financing, hip hop jewelry financing, engagement ring financing, Afterpay jewelry, Klarna jewelry, Affirm jewelry" />
      </Helmet>
      <PromoBar />
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            BUY NOW, PAY LATER
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Don't wait to wear the jewelry of your dreams. With Afterpay, Klarna, and Affirm, 
            you can get your Imperial Jewelry pieces today and pay over time with flexible, 
            interest-free options.
          </p>
          
        </div>

        {/* BNPL Providers */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Choose Your Payment Partner
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {bnplProviders.map((provider, index) => <Card key={index} className={`${provider.color} transition-all duration-300 transform hover:scale-105`}>
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="h-12 mb-4 flex items-center justify-center">
                      <img src={provider.logo} alt={provider.name} className="h-8 w-auto" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      {provider.name}
                    </h3>
                    <p className="text-muted-foreground mb-4 min-h-[48px]">
                      {provider.description}
                    </p>
                    <div className="text-sm text-muted-foreground mb-4">
                      <span className="font-semibold">Range:</span> {provider.minPurchase} - {provider.maxPurchase}
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {provider.features.map((feature, idx) => <li key={idx} className="flex items-start">
                        <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-foreground text-sm">{feature}</span>
                      </li>)}
                  </ul>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.open(provider.website, '_blank')}
                  >
                    Learn More About {provider.name}
                  </Button>
                </CardContent>
              </Card>)}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Why Choose Buy Now, Pay Later for Jewelry?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => <div key={index} className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </div>)}
          </div>
        </div>

        {/* How It Works */}
        

        {/* Popular Items */}
        

        {/* FAQ */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Will using BNPL affect my credit score?
              </h3>
              <p className="text-muted-foreground">
                Most BNPL providers only perform a soft credit check for approval, which doesn't affect your credit score. 
                However, missed payments may be reported to credit bureaus, so always pay on time.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                What happens if I miss a payment?
              </h3>
              <p className="text-muted-foreground">
                Each provider has different policies, but generally late fees may apply. Afterpay charges up to $8 per late payment, 
                Klarna may charge late fees, and Affirm may charge late fees depending on your loan terms.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Can I return items purchased with BNPL?
              </h3>
              <p className="text-muted-foreground">
                Yes! Our standard return policy applies to BNPL purchases. Once we process your return, 
                the BNPL provider will adjust your payment schedule accordingly.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                How do I know if I'm approved?
              </h3>
              <p className="text-muted-foreground">
                Approval decisions are typically instant at checkout. You'll know immediately if you're approved 
                and can complete your purchase right away.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        
      </div>

      <Footer />
    </div>;
};
export default Financing;