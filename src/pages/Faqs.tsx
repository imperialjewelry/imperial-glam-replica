import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PromoBar from '@/components/PromoBar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
const Faqs = () => {
  const faqCategories = [{
    category: "Ordering & Payment",
    questions: [{
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and financing options through our partners. All payments are processed securely using industry-standard encryption."
    }, {
      question: "Is it safe to order online?",
      answer: "Yes, absolutely! Our website uses SSL encryption and we comply with all security standards. We never store your payment information on our servers, and all transactions are processed through secure payment gateways."
    }, {
      question: "Can I modify or cancel my order?",
      answer: "You can modify or cancel your order within 2 hours of placing it by contacting our customer service team. After this time, your order may have already entered production and changes may not be possible."
    }, {
      question: "Do you offer financing options?",
      answer: "Yes! We offer 0% APR financing for qualified customers through our financing partners. You can apply at checkout and get instant approval for purchases over $500."
    }]
  }, {
    category: "Shipping & Delivery",
    questions: [{
      question: "How long does shipping take?",
      answer: "Standard shipping (FREE on orders over $50) takes 5-7 business days. Express shipping (2-3 days) is $15.99, and overnight shipping is $29.99. International shipping varies by location but typically takes 7-21 business days."
    }, {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to over 100+ countries worldwide. International shipping costs and delivery times vary by destination. Customers are responsible for any applicable customs duties and taxes."
    }, {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can track your package using this number on our website or the carrier's website. We use FedEx, UPS, and USPS for domestic shipments."
    }, {
      question: "What if my package is lost or damaged?",
      answer: "All our shipments are fully insured and require adult signature upon delivery. If your package is lost or arrives damaged, contact us immediately and we'll file a claim and send a replacement at no charge."
    }]
  }, {
    category: "Products & Quality",
    questions: [{
      question: "Are your diamonds real?",
      answer: "Yes, all our diamonds are 100% genuine and come with certificates from reputable grading institutes like GIA. We also offer premium diamond simulants (CZ and moissanite) which are clearly labeled as such."
    }, {
      question: "What does VVS mean?",
      answer: "VVS stands for 'Very Very Slightly Included' and refers to diamond clarity. VVS diamonds have minute inclusions that are extremely difficult to see under 10x magnification, making them among the highest quality diamonds available."
    }, {
      question: "What metal purities do you offer?",
      answer: "We offer 10K gold (41.7% pure), 14K gold (58.3% pure), 18K gold (75% pure), sterling silver (92.5% pure), and platinum (95% pure). All metals are hallmarked and come with certificates of authenticity."
    }, {
      question: "Do you offer custom jewelry?",
      answer: "Absolutely! We specialize in custom jewelry design. Our master jewelers can create unique pieces based on your specifications. Custom orders typically take 2-4 weeks and require a 50% deposit to begin production."
    }]
  }, {
    category: "Returns & Exchanges",
    questions: [{
      question: "What is your return policy?",
      answer: "We offer a 30-day money-back guarantee on all purchases. Items must be returned in original condition with all packaging and certificates. Custom and personalized items are not eligible for return."
    }, {
      question: "How do I return an item?",
      answer: "Contact our customer service team at support@imperialjewelry.com to initiate a return. We'll provide a prepaid return label and return authorization number. Once we receive and inspect the item, we'll process your refund within 5-7 business days."
    }, {
      question: "Can I exchange for a different size?",
      answer: "Yes! We offer free exchanges for different sizes within 30 days of purchase. Simply contact us to arrange the exchange. We'll send the new size and provide a prepaid label to return the original item."
    }, {
      question: "What items cannot be returned?",
      answer: "Custom jewelry, engraved items, and earrings (for hygiene reasons) cannot be returned. All other items are eligible for return within 30 days in original condition."
    }]
  }, {
    category: "Care & Maintenance",
    questions: [{
      question: "How do I care for my jewelry?",
      answer: "Store jewelry in a cool, dry place away from sunlight. Clean with a soft cloth and mild soap solution. Avoid harsh chemicals, perfumes, and lotions. We recommend professional cleaning annually for diamond pieces."
    }, {
      question: "Will my gold jewelry tarnish?",
      answer: "Pure gold doesn't tarnish, but gold alloys (10K, 14K, 18K) may show some discoloration over time due to other metals in the alloy. This is normal and can be easily cleaned with proper jewelry cleaning solutions."
    }, {
      question: "Do you offer repair services?",
      answer: "Yes! We offer comprehensive repair services including ring sizing, chain repair, stone replacement, and refinishing. Contact us for a repair quote. Most repairs are completed within 1-2 weeks."
    }, {
      question: "How often should I have my jewelry inspected?",
      answer: "We recommend annual inspections for fine jewelry, especially pieces with precious stones. This helps identify any loose stones or wear issues before they become problems. We offer free inspections for life on all purchases."
    }]
  }];
  return <div className="min-h-screen bg-white">
      <PromoBar />
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            FREQUENTLY ASKED QUESTIONS
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to the most common questions about Imperial Jewelry, 
            our products, policies, and services.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => <Card key={categoryIndex}>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {category.category}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, index) => <AccordionItem key={index} value={`${categoryIndex}-${index}`} className="border-b border-gray-200">
                      <AccordionTrigger className="text-left hover:no-underline py-4">
                        <span className="font-semibold text-gray-900">
                          {faq.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </AccordionContent>
                    </AccordionItem>)}
                </Accordion>
              </CardContent>
            </Card>)}
        </div>

        {/* Contact Support Section */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Still Have Questions?
          </h2>
          <p className="text-gray-600 mb-8">
            Our customer service team is here to help! Contact us and we'll get back to you within 24 hours.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-blue-600">support@imperialjewelry.com</p>
              <p className="text-gray-500 mt-1">Response within 24 hours</p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">WhatsApp</h3>
              <p className="text-blue-600">+1 212 203 0584</p>
              <p className="text-gray-500 mt-1">Monday - Friday, 11AM - 6:30PM EST</p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-blue-600">Available on website</p>
              <p className="text-gray-500 mt-1">Real-time assistance</p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        
      </div>

      <Footer />
    </div>;
};
export default Faqs;