
import { useState } from 'react';
import { Search, ShoppingCart, Menu, X, Star, Truck } from 'lucide-react';
import { FaWhatsappSquare, FaInstagramSquare } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    'BEST DEALS', 'CHAINS', 'BRACELETS', 'CUSTOM', 'GRILLZ', 
    'WATCHES', 'PENDANTS', 'RINGS', 'EARRINGS', 'GLASSES', 
    'DIAMOND', 'VVS DIAMOND SIMULANTS'
  ];

  const features = [
    "BUY NOW PAY LATER",
    "4-DAY SHIPPING",
    "BUY NOW PAY LATER", 
    "4-DAY SHIPPING",
    "BUY NOW PAY LATER",
    "4-DAY SHIPPING",
    "BUY NOW PAY LATER",
    "4-DAY SHIPPING"
  ];

  const mobileMenuItems = [
    {
      title: "READY TO SHIP",
      type: "banner",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      hasViewAll: true
    },
    {
      title: "BEST DEALS",
      type: "banner", 
      bgColor: "bg-red-100",
      textColor: "text-red-600",
      hasViewAll: true
    },
    {
      title: "CHAINS",
      type: "category",
      image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=150&q=80"
    },
    {
      title: "BRACELETS", 
      type: "category",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=150&q=80"
    },
    {
      title: "CUSTOM",
      type: "category",
      image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=150&q=80"
    },
    {
      title: "GRILLZ",
      type: "category", 
      image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=150&q=80"
    },
    {
      title: "WATCHES",
      type: "category",
      image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=150&q=80"
    },
    {
      title: "PENDANTS",
      type: "category",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=150&q=80"
    },
    {
      title: "RINGS",
      type: "category", 
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <>
      <header className="bg-white shadow-sm">
        {/* Top bar with social and shipping info - Desktop Only */}
        <div className="border-b border-gray-200 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <FaInstagramSquare className="w-5 h-5 text-pink-500" />
              <FaWhatsappSquare className="w-5 h-5 text-green-500" />
              <div className="flex items-center space-x-1 ml-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-gray-600 ml-2">30,000+ Reviews</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-gray-600 flex items-center">
                <Truck className="w-4 h-4 inline mr-1" />
                READY TO SHIP | View all →
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Top Bar */}
        <div className="md:hidden bg-green-600 text-white py-2 px-4">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Excellent</span>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-white text-white" />
              ))}
              <span className="ml-1">13,242 Reviews</span>
            </div>
            <X className="w-4 h-4" />
          </div>
        </div>

        {/* Main header */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </Button>

            {/* Desktop Social Icons */}
            <div className="hidden md:flex w-1/3 items-center space-x-3">
              <FaInstagramSquare className="w-6 h-6 text-pink-500" />
              <FaWhatsappSquare className="w-6 h-6 text-green-500" />
            </div>

            {/* Logo - centered on mobile, centered on desktop */}
            <div className="flex-1 md:flex-none flex justify-center">
              <h1 className="text-xl md:text-2xl font-bold text-black tracking-wide">
                IMPERIAL JEWELRY
              </h1>
            </div>

            {/* Desktop Right Side */}
            <div className="hidden md:flex w-1/3 items-center justify-end space-x-4">
              <Button variant="ghost" size="sm">
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <ShoppingCart className="w-5 h-5" />
              </Button>
            </div>

            {/* Mobile Right Side */}
            <div className="flex md:hidden items-center space-x-2">
              <FaInstagramSquare className="w-6 h-6 text-pink-500" />
              <FaWhatsappSquare className="w-6 h-6 text-green-500" />
              <Button variant="ghost" size="sm">
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <ShoppingCart className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop navigation */}
        <div className="border-t border-gray-200 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-center space-x-8 text-sm font-medium">
              {navigation.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-700 hover:text-black transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Feature bar - continuous carousel - Desktop Only */}
      <div className="bg-black text-white py-3 overflow-hidden hidden md:block">
        <div className="flex animate-scroll whitespace-nowrap">
          {[...Array(4)].map((_, groupIndex) => (
            <div key={groupIndex} className="flex">
              {features.map((feature, index) => (
                <div key={`${groupIndex}-${index}`} className="flex items-center mx-8">
                  <Star className="w-4 h-4 text-yellow-400 mr-2 flex-shrink-0" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMenuOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-full max-w-sm bg-white shadow-xl overflow-y-auto">
            <div className="p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">IMPERIAL JEWELRY</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Menu Items */}
              <div className="space-y-4">
                {mobileMenuItems.map((item, index) => (
                  <div key={index}>
                    {item.type === 'banner' ? (
                      <div className={`${item.bgColor} ${item.textColor} p-4 rounded-lg flex items-center justify-between`}>
                        <div className="flex items-center">
                          <Truck className="w-4 h-4 mr-2" />
                          <span className="font-semibold text-sm">{item.title}</span>
                        </div>
                        {item.hasViewAll && (
                          <span className="text-xs">View all &gt;</span>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center py-3 border-b border-gray-100">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-16 h-12 object-cover rounded mr-4"
                        />
                        <span className="font-medium text-gray-900">{item.title}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
