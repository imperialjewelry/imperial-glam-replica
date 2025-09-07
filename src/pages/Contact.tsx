
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PromoBar from '@/components/PromoBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_requests')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          subject: formData.subject,
          message: formData.message
        }]);

      if (error) {
        throw error;
      }

      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again or contact us directly.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6 text-blue-600" />,
      title: "Visit Our Showroom",
      details: ["5085 Westheimer Rd", "Houston, TX", "Private Showroom by Appointment"]
    },
    {
      icon: <Phone className="w-6 h-6 text-blue-600" />,
      title: "Call Us",
      details: ["+1 212 203 0584", "WhatsApp Available", "Call or Text Anytime"]
    },
    {
      icon: <Mail className="w-6 h-6 text-blue-600" />,
      title: "Email Us",
      details: ["support@imperialjewelry.com", "Fast Response Guaranteed", "24/7 Email Support"]
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      title: "Business Hours",
      details: ["Monday - Friday", "11AM - 6:30 PM EST", "Weekends: Closed"]
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
            CONTACT IMPERIAL JEWELRY
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about our jewelry, need a custom quote, or want to schedule a showroom visit? 
            We're here to help make your jewelry dreams come true.
          </p>
        </div>

        {/* Contact Information Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  {info.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {info.title}
                </h3>
                <div className="space-y-1">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="custom-design">Custom Design Quote</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="sizing-help">Sizing Help</option>
                    <option value="order-status">Order Status</option>
                    <option value="return-exchange">Return/Exchange</option>
                    <option value="financing">Financing Options</option>
                    <option value="showroom-visit">Showroom Visit</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>

          {/* Additional Information */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Get in Touch</h2>
            
            {/* Quick Contact Options */}
            <div className="space-y-6 mb-8">
              <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                <MessageCircle className="w-8 h-8 text-green-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">WhatsApp Us</h3>
                  <p className="text-gray-600">+1 212 203 0584</p>
                  <p className="text-sm text-gray-500">Fastest response time</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                <Phone className="w-8 h-8 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Call Us Direct</h3>
                  <p className="text-gray-600">+1 212 203 0584</p>
                  <p className="text-sm text-gray-500">Available during business hours</p>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Common Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">How long does custom jewelry take?</h4>
                  <p className="text-gray-600 text-sm">Custom pieces typically take 2-4 weeks depending on complexity.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Do you offer financing?</h4>
                  <p className="text-gray-600 text-sm">Yes! We offer flexible financing options with 0% APR available.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Can I visit your showroom?</h4>
                  <p className="text-gray-600 text-sm">Absolutely! Schedule an appointment to view our collection in person.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">What's your return policy?</h4>
                  <p className="text-gray-600 text-sm">30-day return policy with original packaging and condition.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Visit Our Showroom</h2>
          <p className="text-center text-gray-600 mb-8">5085 Westheimer Rd, Houston, TX 77056</p>
          <div className="flex justify-center">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3464.338343488329!2d-95.46823848783117!3d29.738919674974873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c16f38c46c87%3A0x9dea2daeead2580d!2s5085%20Westheimer%20Rd%2C%20Houston%2C%20TX%2077056!5e0!3m2!1sen!2sus!4v1756584160678!5m2!1sen!2sus"
              width="100%" 
              height="450" 
              style={{ border: 0, maxWidth: '800px' }}
              allowFullScreen
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
