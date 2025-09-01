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
    setOpenSections(prev => prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
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
          title: "Error",
          description: error.message || "Failed to subscribe. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success!",
          description: "Thank you for subscribing! You'll receive all future promos.",
        });
        setEmail('');
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const footerSections = [{
    title: "SHOP",
    links: [
      { name: "Best Deals", path: "/best-deals" },
      { name: "Custom (Free Quote)", path: "/custom" },
      { name: "Engagement Rings", path: "/rings/engagement" },
      { name: "Hip Hop Rings", path: "/rings/hip-hop" },
      { name: "Chains", path: "/chains" },
      { name: "Bracelets", path: "/bracelets" },
      { name: "Pendants", path: "/pendants" },
      { name: "Earrings", path: "/earrings" },
      { name: "Watches", path: "/watches" },
      { name: "Grillz", path: "/grillz" },
      { name: "Diamond", path: "/diamond" },
      { name: "VVS Simulants", path: "/vvs-diamond-simulants" }
    ]
  }, {
    title: "HELP",
    links: [
      { name: "Shipping & Delivery", path: "/policies/shipping" },
      { name: "Returns & Refunds", path: "/policies/returns" },
      { name: "Size Guides", path: "/size-guides" },
      { name: "FAQs", path: "/faqs" }
    ]
  }, {
    title: "COMPANY",
    links: [
      { name: "About Imperial Jewelry", path: "/about" },
      { name: "Reviews", path: "/reviews" },
      { name: "Financing", path: "/financing" },
      { name: "Certificates", path: "/certificates" },
      { name: "Contact", path: "/contact" }
    ]
  }];

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Contact Info */}
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
            <div className="text-sm text-gray-400">
              Imperial Jewelry - World renowned, bespoke custom jewelers.
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-4 gap-8">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold mb-4">CONTACT US</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>5085 Westheimer Rd</p>
                <p>support@imperialjewelry.com</p>
                <p>Whatsapp: +1 212 203 0584</p>
                <p>Monday - Friday</p>
                <p>11AM - 6:30 PM EST</p>
                <p>Weekends: Closed</p>
              </div>
            </div>
          </div>

          {/* Footer Sections */}
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

        {/* Mobile Layout with Dropdowns */}
        <div className="md:hidden space-y-4">
          {/* Contact Section - Always Visible on Mobile */}
          <div className="border-b border-gray-700 pb-4">
            <h3 className="text-sm font-semibold mb-4">CONTACT US</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>5085 Westheimer Rd</p>
              <p>support@imperialjewelry.com</p>
              <p>Whatsapp: +1 212 203 0584</p>
              <p>Monday - Friday</p>
              <p>11AM - 6:30 PM EST</p>
              <p>Weekends: Closed</p>
            </div>
          </div>

          {/* Main Footer Sections */}
          {footerSections.map(section => (
            <div key={section.title} className="border-b border-gray-700 pb-4">
              <button
                onClick={() => toggleSection(section.title)}
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="text-sm font-semibold">{section.title}</h3>
                {openSections.includes(section.title)
                  ? <ChevronUp className="w-4 h-4" />
                  : <ChevronDown className="w-4 h-4" />
                }
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

        {/* Newsletter and Social */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
            <div className="flex-1 max-w-md">
              <h3 className="text-sm font-semibold mb-4">SIGN UP, PROMOS.</h3>
              <form onSubmit={handleEmailSubmit} className="flex">
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                <p className="text-gray-300">Houston, TX | Private Showroom</p>
              </div>
            </div>
          </div>
        </div>

        {/* Utility Strip */}
        <div className="mt-8 pt-4 border-t border-gray-700 text-center">
          <div className="text-xs text-gray-400">
            © 2025 Imperial Jewelry ·
            <Link to="/legal/privacy" className="hover:text-white ml-1">Privacy</Link> ·
            <Link to="/legal/terms" className="hover:text-white ml-1">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

