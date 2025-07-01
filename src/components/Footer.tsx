
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FaYoutube, FaInstagram, FaFacebook, FaPinterest, FaLinkedin } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const footerSections = [
    {
      title: "SHOP BY CATEGORY",
      links: [
        "Best Deals",
        "VVS Diamond Simulants",
        "Moissanite Chains",
        "Moissanite Watches",
        "Moissanite Tennis Chains",
        "Moissanite Cuban Link Chains",
        "Cuban Link Chains",
        "Cuban Link Bracelets",
        "Moissanite Hip Hop Jewelry",
        "Moissanite Bracelets",
        "Moissanite Cuban Bracelets",
        "Moissanite Glasses",
        "Moissanite Grillz",
        "Moissanite Hip Hop Pendants",
        "Moissanite Cross Pendants",
        "Moissanite Earrings Screw Back",
        "Iced Out Chains",
        "Jesus Pieces",
        "Infinity Link Collection",
        "Baguette Chains",
        "Gold Chains",
        "All Chains",
        "All Bracelets"
      ]
    },
    {
      title: "CUSTOM",
      links: [
        "Custom Moissanite Chains",
        "Custom Moissanite Pendants",
        "Custom Moissanite Rings",
        "Custom Grillz",
        "All Custom Jewelry",
        "FREE Custom Jewelry Quote"
      ]
    },
    {
      title: "MORE CATEGORIES",
      links: [
        "Black Moissanite Jewelry",
        "Best Sellers",
        "Rapper Chains",
        "Baguette Bracelet",
        "Iced Out Bracelets",
        "Prong Cuban Link Chains",
        "Iced Out Watches",
        "Men's Pearls",
        "Cross Chains"
      ]
    },
    {
      title: "SUPPORT",
      links: [
        "Contact Support",
        "Customer Help Portal",
        "Frequently Asked Questions",
        "Track Your Order",
        "Affiliate Program",
        "Certificates",
        "Youtube Video Reviews",
        "Moissanite Color Chart",
        "Moissanite Size Chart",
        "Jewelry Care",
        "Authors",
        "Blog",
        "Discount Codes"
      ]
    },
    {
      title: "POLICY",
      links: [
        "Free Gift Policy",
        "Shipping & Delivery",
        "Terms of Service",
        "Refund Policy",
        "Privacy Policy",
        "Mode of Payment",
        "Financing"
      ]
    },
    {
      title: "GUIDES",
      links: [
        "Pendant Size Guide",
        "Bracelet Guide",
        "Chain Size Guide"
      ]
    }
  ];

  const productCategories = [
    {
      title: "MOISSANITE RINGS",
      links: [
        "Moissanite Engagement Rings",
        "Cuban Link Rings",
        "Men's Hip Hop Rings"
      ]
    },
    {
      title: "DIAMOND JEWELRY",
      links: [
        "Diamond Chains",
        "Diamond Tennis Chains",
        "Diamond Cuban Link Chains",
        "Diamond Grillz"
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Contact Info */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="text-2xl font-bold mr-4">❄️ ICECARTEL</div>
            <div className="text-sm text-gray-400">ICECARTEL - World renowned, bespoke custom jewelers.</div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-6 gap-8">
          {/* Contact and Product Categories */}
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold mb-4">CONTACT US</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>support@icecartel.com</p>
                <p>Whatsapp: +1 212 203 0584</p>
                <p>Monday - Friday</p>
                <p>11AM - 6:30 PM EST</p>
                <p>Weekends: Closed</p>
              </div>
            </div>

            {productCategories.map((category) => (
              <div key={category.title}>
                <h3 className="text-sm font-semibold mb-4">{category.title}</h3>
                <ul className="space-y-2">
                  {category.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                      {link}
                    </a>
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
              <p>support@icecartel.com</p>
              <p>Whatsapp: +1 212 203 0584</p>
              <p>Monday - Friday</p>
              <p>11AM - 6:30 PM EST</p>
              <p>Weekends: Closed</p>
            </div>
          </div>

          {/* Product Categories */}
          {productCategories.map((category) => (
            <div key={category.title} className="border-b border-gray-700 pb-4">
              <button
                onClick={() => toggleSection(category.title)}
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="text-sm font-semibold">{category.title}</h3>
                {openSections.includes(category.title) ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {openSections.includes(category.title) && (
                <ul className="mt-4 space-y-2">
                  {category.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Main Footer Sections */}
          {footerSections.map((section) => (
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
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                        {link}
                      </a>
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
                <p className="text-gray-300">BROOKLYN, NY | Private Showroom</p>
                <p className="text-gray-300">Atlanta, GA | Visit our website &gt;</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
