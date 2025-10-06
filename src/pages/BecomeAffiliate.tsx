import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Instagram, Send } from 'lucide-react';

const BecomeAffiliate = () => {
  const [formData, setFormData] = useState({
    instagram_handle: '',
    tiktok_handle: '',
    phone_number: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.instagram_handle || !formData.phone_number || !formData.email) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('affiliate_applications')
        .insert([formData]);

      if (error) throw error;

      toast({
        title: 'Application Submitted!',
        description: 'Thank you for your interest. We will review your application and get back to you soon.'
      });

      setFormData({
        instagram_handle: '',
        tiktok_handle: '',
        phone_number: '',
        email: ''
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: 'Submission Failed',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Become an Affiliate - Imperial Jewelry</title>
        <meta name="description" content="Join the Imperial Jewelry affiliate network. Partner with a trusted name in fine and fashion jewelry." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 bg-background">
          <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Join the Imperial Network</h1>
              <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            </div>

            {/* Intro Text */}
            <div className="prose prose-lg max-w-none mb-12 text-foreground/90">
              <p className="text-lg leading-relaxed mb-6">
                For over ten years, Imperial has been a trusted name in fine and fashion jewelry. We've collaborated with rappers, athletes, models, and public figures, offering a full spectrum of jewelry — from accessible fashion pieces to ultra high-end designs.
              </p>
              <p className="text-lg leading-relaxed">
                Now, we're opening the doors for creators, athletes, and influencers to join our affiliate and partnership program.
              </p>
            </div>

            {/* What We Look For */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">What We Look For</h2>
              <p className="text-lg mb-6 text-foreground/90">
                We partner with individuals who share our commitment to quality, authenticity, and style. Ideal candidates include:
              </p>
              <ul className="space-y-3 text-lg text-foreground/90 mb-6">
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  <span>Influencers with a strong social media presence</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  <span>College athletes (NIL partnerships welcome)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  <span>NBA and NFL players</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  <span>Models, actors, and television personalities</span>
                </li>
              </ul>
              <p className="text-lg text-foreground/90">
                Anyone passionate about the Imperial brand is encouraged to apply, even if you don't meet all of the above criteria.
              </p>
            </section>

            {/* Why Partner */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Why Partner with Imperial</h2>
              <div className="grid gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Established Reputation</h3>
                  <p className="text-foreground/90">Over a decade of trust and excellence in the jewelry industry.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Wide Range of Products</h3>
                  <p className="text-foreground/90">Offerings that cater to every style and budget — from everyday fashion pieces to exclusive high-end collections.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Celebrity Collaborations</h3>
                  <p className="text-foreground/90">Proudly trusted by top names in entertainment and sports.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Flexible Financing for Customers</h3>
                  <p className="text-foreground/90">We offer multiple financing options through Synchrony, Acima, Progressive, Snap, AFF, Affirm, and Klarna, each capable of approving purchases up to $5,000 or more.</p>
                </div>
              </div>
            </section>

            {/* Application Form */}
            <section className="bg-card border border-border rounded-lg p-6 md:p-8 mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Apply to Become a Partner</h2>
              <p className="text-foreground/90 mb-6">To apply, please provide the following information:</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="instagram_handle" className="text-base">
                    Instagram Handle <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative mt-2">
                    <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="instagram_handle"
                      type="text"
                      placeholder="@yourusername"
                      value={formData.instagram_handle}
                      onChange={(e) => setFormData({ ...formData, instagram_handle: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="tiktok_handle" className="text-base">
                    TikTok Handle
                  </Label>
                  <Input
                    id="tiktok_handle"
                    type="text"
                    placeholder="@yourusername"
                    value={formData.tiktok_handle}
                    onChange={(e) => setFormData({ ...formData, tiktok_handle: e.target.value })}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="phone_number" className="text-base">
                    Phone Number <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone_number"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.phone_number}
                    onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                    className="mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-base">
                    Email Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-2"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? (
                    'Submitting...'
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Submit Application
                    </>
                  )}
                </Button>
              </form>
            </section>

            {/* Questions */}
            <section className="text-center">
              <h2 className="text-2xl font-bold mb-4">Questions?</h2>
              <p className="text-lg text-foreground/90">
                If you have any questions, please contact us at{' '}
                <a href="mailto:support@imperialjewelry.com" className="text-primary hover:underline">
                  support@imperialjewelry.com
                </a>
                {' '}or reach out via Instagram{' '}
                <a 
                  href="https://www.instagram.com/shopimperialjewelry" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  @shopimperialjewelry
                </a>
                .
              </p>
              <p className="text-lg text-foreground/90 mt-4">
                We look forward to partnering with you.
              </p>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BecomeAffiliate;
