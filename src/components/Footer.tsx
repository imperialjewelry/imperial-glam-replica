import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Footer = () => {
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const toggleSection = (section: string) => {
    setOpenSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter your email address',
        variant: 'destructive'
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('newsletter-signup', {
        body: { email: email.trim() }
      });
      if (error) {
        console.error('Newsletter signup error:', error);
        toast({
          title: 'Error',
          description: error.message || 'Failed to subscribe. Please try again.',
          variant: 'destructive'
        });
      } else {
        toast({
          title: 'Success!',
          description: "Thank you for subscribing! You'll receive all future promos."
        });
        setEmail('');
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again later.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const footerSections = [
    {
      title: 'SHOP',
      links: [
        { name: 'Best Deals', path: '/best-deals' },
        { name: 'Custom', path: '/custom' },
        { name: 'Engagement Rings', path: '/rings/engagement' },
        { name: 'Hip Hop Rings', path: '/rings/hip-hop' },
        { name: 'Chains', path: '/chains' },
        { name: 'Bracelets', path: '/bracelets' },
        { name: 'Pendants', path: '/pendants' },
        { name: 'Earrings', path: '/earrings' },
        { name: 'Watches', path: '/watches' },
        { name: 'Grillz', path: '/grillz' },
        { name: 'Diamond', path: '/diamond' },
        { name: 'Diamond Simulants', path: '/vvs-diamond-simulants' }
      ]
    },
    {
      title: 'HELP',
      links: [
        { name: 'Shipping & Delivery', path: '/policies/shipping' },
        { name: 'Returns & Refunds', path: '/policies/returns' },
        { name: 'Size Guides', path: '/size-guides' },
        { name: 'FAQs', path: '/faqs' }
      ]
    },
    {
      title: 'COMPANY',
      links: [
        { name: 'About Imperial Jewelry', path: '/about' },
        { name: 'Reviews', path: '/reviews' },
        { name: 'Financing', path: '/financing' },
        { name: 'Certificates', path: '/certificates' },
        { name: 'Contact', path: '/contact' }
      ]
    }
  ];

  return (
    <footer className="bg-black text-white">
      {/* Main black section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Brand */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <img
              src="https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/images/imperialjewelrylogo.webp"
              alt="Imperial Jewelry logo"
              className="h-10 w-auto mr-3 select-none"
              loading="lazy"
              decoding="async"
            />
            <div className="text-2xl font-bold mr-4">IMPERIAL JEWELRY</div>
          </div>
        </div>

        {/* Desktop columns */}
        <div className="hidden md:grid md:grid-cols-4 gap-8">
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold mb-4">CONTACT US</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>
                  <a
                    href="mailto:imperialjewelryshop@gmail.com"
                    className="hover:text-white"
                  >
                    imperialjewelryshop@gmail.com
                  </a>
                </p>
                <p>
                  <a
                    href="tel:+18324081472"
                    className="hover:text-white"
                  >
                    Phone: (832) 408-1472
                  </a>
                </p>
                <p>Monday - Friday</p>
                <p>11AM - 6:30 PM EST</p>
                <p>Weekends: Closed</p>
              </div>
            </div>
          </div>

          {footerSections.map(section => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map(link => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile accordions */}
        <div className="md:hidden space-y-4">
          <div className="border-b border-gray-700 pb-4">
            <h3 className="text-sm font-semibold mb-4">CONTACT US</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>
                <a
                  href="mailto:support@imperialjewelry.com"
                  className="hover:text-white"
                >
                  support@imperialjewelry.com
                </a>
              </p>
              <p>
                <a
                  href="https://wa.me/12122030584"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Whatsapp: +1 212 203 0584
                </a>
              </p>
              <p>Monday - Friday</p>
              <p>11AM - 6:30 PM EST</p>
              <p>Weekends: Closed</p>
            </div>
          </div>

          {footerSections.map(section => (
            <div key={section.title} className="border-b border-gray-700 pb-4">
              <button
                onClick={() => toggleSection(section.title)}
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="text-sm font-semibold">{section.title}</h3>
                {openSections.includes(section.title) ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {openSections.includes(section.title) && (
                <ul className="mt-4 space-y-2">
                  {section.links.map(link => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className="text-sm text-gray-300 hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Newsletter & social */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
            <div className="flex-1 max-w-md">
              <h3 className="text-sm font-semibold mb-4">SIGN UP FOR PROMOTIONAL OFFERS</h3>
              <form onSubmit={handleEmailSubmit} className="flex">
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-l-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-50"
                  required
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-white hover:bg-gray-200 text-black px-6 py-2 rounded-r-md disabled:opacity-50"
                >
                  {isSubmitting ? '...' : '→'}
                </Button>
              </form>
            </div>

            <div className="flex flex-col items-start md:items-end space-y-4">
              <div className="flex space-x-3">
                <a
                  href="https://www.instagram.com/shopimperialjewelry"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex"
                >
                  <FaInstagram className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
                </a>
              </div>

              <div className="text-sm">
                <p className="text-gray-400 font-semibold">LOCATIONS</p>
                <a
                  href="https://maps.google.com/?q=5085+Westheimer+Rd,+Houston,+TX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  5085 Westheimer Rd, Houston, TX
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Options — full-width WHITE stripe */}
      <div className="bg-white text-black">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-sm font-semibold text-gray-800">PAY OVER TIME WITH</p>
            <div className="flex items-center justify-center sm:justify-between gap-4 sm:gap-6 flex-wrap w-full sm:w-auto">
              <img
                src="https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/images//afterpaylogo.webp"
                alt="Afterpay"
                className="h-6 sm:h-7 md:h-8 w-auto"
                loading="lazy"
                decoding="async"
              />
              <img
                src="https://cdn-assets.affirm.com/images/black_logo-white_bg.svg"
                alt="Affirm"
                className="h-6 sm:h-7 md:h-8 w-auto"
                loading="lazy"
                decoding="async"
              />
              <img
                src="https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/images/klarnalogo.webp"
                alt="Klarna"
                className="h-6 sm:h-7 md:h-8 w-auto"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Utility Strip (back to black) */}
      <div className="max-w-7xl mx-auto px-4 pb-10 md:pb-8">
        <div className="mt-8 pt-4 border-t border-gray-800 text-center">
          <div className="text-xs text-gray-400">
            © 2025 Imperial Jewelry ·
            <Link to="/legal/privacy" className="hover:text-white ml-1">
              Privacy
            </Link>{' '}
            ·
            <Link to="/legal/terms" className="hover:text-white ml-1">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;