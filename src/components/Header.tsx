
import { useState } from 'react';
import { Search, ShoppingCart, Menu, X, Instagram, MessageCircle, Star, Truck } from 'lucide-react';
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

  return (
    <>
      <header className="bg-white shadow-sm">
        {/* Top bar with social and shipping info */}
        <div className="border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
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
              <div className="flex items-center space-x-2">
                <Instagram className="w-4 h-4 text-pink-500" />
                <MessageCircle className="w-4 h-4 text-green-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="w-1/3"></div>
            <div className="flex-1 flex justify-center">
              <h1 className="text-2xl font-bold text-black tracking-wide">
                IMPERIAL JEWELRY
              </h1>
            </div>
            <div className="w-1/3 flex items-center justify-end space-x-4">
              <Button variant="ghost" size="sm">
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <ShoppingCart className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main navigation */}
        <div className="border-t border-gray-200">
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

      {/* Feature bar - continuous carousel */}
      <div className="bg-black text-white py-3 overflow-hidden">
        <div className="flex animate-scroll whitespace-nowrap">
          {/* Duplicate the features array multiple times for seamless loop */}
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
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMenuOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-xl">
            <div className="p-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(false)}
                className="mb-4"
              >
                <X className="w-5 h-5" />
              </Button>
              <nav className="space-y-4">
                {navigation.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block text-sm font-medium text-gray-700 hover:text-black"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
