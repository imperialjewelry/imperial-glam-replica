
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FaYoutube, FaInstagram, FaFacebook, FaPinterest, FaLinkedin } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setOpenSections(prev => prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]);
  };

  const footerSections = [{
    title: "SHOP BY CATEGORY",
    links: [
      { name: "Best Deals", path: "/" },
      { name: "VVS Diamond Simulants", path: "/vvs-diamond-simulants" },
      { name: "Moissanite Chains", path: "/chains" },
      { name: "Moissanite Watches", path: "/watches" },
      { name: "Moissanite Tennis Chains", path: "/chains" },
      { name: "Moissanite Cuban Link Chains", path: "/chains" },
      { name: "Cuban Link Chains", path: "/chains" },
      { name: "Cuban Link Bracelets", path: "/bracelets" },
      { name: "Moissanite Hip Hop Jewelry", path: "/chains" },
      { name: "Moissanite Bracelets", path: "/bracelets" },
      { name: "Moissanite Cuban Bracelets", path: "/bracelets" },
      { name: "Moissanite Glasses", path: "/glasses" },
      { name: "Moissanite Grillz", path: "/grillz" },
      { name: "Moissanite Hip Hop Pendants", path: "/pendants" },
      { name: "Moissanite Cross Pendants", path: "/pendants" },
      { name: "Moissanite Earrings Screw Back", path: "/earrings" },
      { name: "Iced Out Chains", path: "/chains" },
      { name: "Jesus Pieces", path: "/pendants" },
      { name: "Infinity Link Collection", path: "/chains" },
      { name: "Baguette Chains", path: "/chains" },
      { name: "Gold Chains", path: "/chains" },
      { name: "All Chains", path: "/chains" },
      { name: "All Bracelets", path: "/bracelets" }
    ]
  }, {
    title: "CUSTOM",
    links: [
      { name: "Custom Moissanite Chains", path: "/custom" },
      { name: "Custom Moissanite Pendants", path: "/custom" },
      { name: "Custom Moissanite Rings", path: "/custom" },
      { name: "Custom Grillz", path: "/custom" },
      { name: "All Custom Jewelry", path: "/custom" },
      { name: "FREE Custom Jewelry Quote", path: "/custom" }
    ]
  }, {
    title: "MORE CATEGORIES",
    links: [
      { name: "Black Moissanite Jewelry", path: "/chains" },
      { name: "Best Sellers", path: "/" },
      { name: "Rapper Chains", path: "/chains" },
      { name: "Baguette Bracelet", path: "/bracelets" },
      { name: "Iced Out Bracelets", path: "/bracelets" },
      { name: "Prong Cuban Link Chains", path: "/chains" },
      { name: "Iced Out Watches", path: "/watches" },
      { name: "Men's Pearls", path: "/chains" },
      { name: "Cross Chains", path: "/chains" }
    ]
  }, {
    title: "SUPPORT",
    links: [
      { name: "Contact Support", path: "#contact" },
      { name: "Customer Help Portal", path: "#help" },
      { name: "Frequently Asked Questions", path: "#faq" },
      { name: "Track Your Order", path: "#track" },
      { name: "Affiliate Program", path: "#affiliate" },
      { name: "Certificates", path: "#certificates" },
      { name: "Youtube Video Reviews", path: "#reviews" },
      { name: "Moissanite Color Chart", path: "#color-chart" },
      { name: "Moissanite Size Chart", path: "#size-chart" },
      { name: "Jewelry Care", path: "#care" },
      { name: "Authors", path: "#authors" },
      { name: "Blog", path: "#blog" },
      { name: "Discount Codes", path: "#discounts" }
    ]
  }, {
    title: "POLICY",
    links: [
      { name: "Free Gift Policy", path: "#gift-policy" },
      { name: "Shipping & Delivery", path: "#shipping" },
      { name: "Terms of Service", path: "#terms" },
      { name: "Refund Policy", path: "#refund" },
      { name: "Privacy Policy", path: "#privacy" },
      { name: "Mode of Payment", path: "#payment" },
      { name: "Financing", path: "#financing" }
    ]
  }, {
    title: "GUIDES",
    links: [
      { name: "Pendant Size Guide", path: "#pendant-guide" },
      { name: "Bracelet Guide", path: "#bracelet-guide" },
      { name: "Chain Size Guide", path: "#chain-guide" }
    ]
  }];

  const productCategories = [{
    title: "MOISSANITE RINGS",
    links: [
      { name: "Moissanite Engagement Rings", path: "/rings/engagement" },
      { name: "Cuban Link Rings", path: "/rings/hip-hop" },
      { name: "Men's Hip Hop Rings", path: "/rings/hip-hop" }
    ]
  }, {
    title: "DIAMOND JEWELRY",
    links: [
      { name: "Diamond Chains", path: "/diamond" },
      { name: "Diamond Tennis Chains", path: "/diamond" },
      { name: "Diamond Cuban Link Chains", path: "/diamond" },
      { name: "Diamond Grillz", path: "/diamond" }
    ]
  }];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Contact Info */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="text-2xl font-bold mr-4">💎 IMPERIAL JEWELRY</div>
            <div className="text-sm text-gray-400">Imperial Jewelry - World renowned, bespoke custom jewelers.</div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-6 gap-8">
          {/* Contact and Product Categories */}
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold mb-4">CONTACT US</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>support@imperialjewelry.com</p>
                <p>Whatsapp: +1 212 203 0584</p>
                <p>Monday - Friday</p>
                <p>11AM - 6:30 PM EST</p>
                <p>Weekends: Closed</p>
              </div>
            </div>

            {productCategories.map(category => (
              <div key={category.title}>
                <h3 className="text-sm font-semibold mb-4">{category.title}</h3>
                <ul className="space-y-2">
                  {category.links.map(link => (
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

          {/* Footer Sections */}
          {footerSections.map(section => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map(link => (
                  <li key={link.name}>
                    {link.path.startsWith('#') ? (
                      <a 
                        href={link.path} 
                        className="text-sm text-gray-300 hover:text-white transition-colors"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link 
                        to={link.path} 
                        className="text-sm text-gray-300 hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
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
              <p>support@imperialjewelry.com</p>
              <p>Whatsapp: +1 212 203 0584</p>
              <p>Monday - Friday</p>
              <p>11AM - 6:30 PM EST</p>
              <p>Weekends: Closed</p>
            </div>
          </div>

          {/* Product Categories */}
          {productCategories.map(category => (
            <div key={category.title} className="border-b border-gray-700 pb-4">
              <button 
                onClick={() => toggleSection(category.title)} 
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="text-sm font-semibold">{category.title}</h3>
                {openSections.includes(category.title) ? 
                  <ChevronUp className="w-4 h-4" /> : 
                  <ChevronDown className="w-4 h-4" />
                }
              </button>
              {openSections.includes(category.title) && (
                <ul className="mt-4 space-y-2">
                  {category.links.map(link => (
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

          {/* Main Footer Sections */}
          {footerSections.map(section => (
            <div key={section.title} className="border-b border-gray-700 pb-4">
              <button 
                onClick={() => toggleSection(section.title)} 
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="text-sm font-semibold">{section.title}</h3>
                {openSections.includes(section.title) ? 
                  <ChevronUp className="w-4 h-4" /> : 
                  <ChevronDown className="w-4 h-4" />
                }
              </button>
              {openSections.includes(section.title) && (
                <ul className="mt-4 space-y-2">
                  {section.links.map(link => (
                    <li key={link.name}>
                      {link.path.startsWith('#') ? (
                        <a 
                          href={link.path} 
                          className="text-sm text-gray-300 hover:text-white transition-colors"
                        >
                          {link.name}
                        </a>
                      ) : (
                        <Link 
                          to={link.path} 
                          className="text-sm text-gray-300 hover:text-white transition-colors"
                        >
                          {link.name}
                        </Link>
                      )}
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
              <h3 className="text-sm font-semibold mb-4">SIGN UP, GET 10% OFF.</h3>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-l-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
                <Button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-r-md">
                  →
                </Button>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end space-y-4">
              <div className="flex space-x-3">
                <FaYoutube className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
                <FaInstagram className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
                <FaFacebook className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
                <FaPinterest className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
                <FaLinkedin className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
              </div>

              <div className="text-sm">
                <p className="text-gray-400 font-semibold">LOCATIONS</p>
                <p className="text-gray-300">Houston, TX | Private Showroom</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
