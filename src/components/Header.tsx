
import { useState } from 'react';
import { Search, ShoppingCart, Menu, X, Instagram, MessageCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    'BEST DEALS', 'CHAINS', 'BRACELETS', 'CUSTOM', 'GRILLZ', 
    'WATCHES', 'PENDANTS', 'RINGS', 'EARRINGS', 'GLASSES', 
    'DIAMOND', 'VVS DIAMOND SIMULANTS'
  ];

  const features = [
    "4-DAY SHIPPING",
    "BUY NOW PAY LATER",
    "4-DAY SHIPPING", 
    "BUY NOW PAY LATER",
    "4-DAY SHIPPING",
    "BUY NOW PAY LATER"
  ];

  return (
    <>
      <header className="bg-white shadow-sm">
        {/* Top bar with social and shipping info */}
        <div className="border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-gray-600 ml-2">50,000+ Reviews</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Instagram className="w-4 h-4 text-pink-500" />
                <MessageCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="text-gray-600">
                <Truck className="w-4 h-4 inline mr-1" />
                READY TO SHIP | View all →
              </div>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-3xl font-bold text-gray-800 tracking-wide">
                IMPERIAL JEWELRY
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:block">
              <div className="flex items-center space-x-6">
                {navigation.slice(0, 8).map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </nav>

            <div className="flex items-center space-x-4">
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

        {/* Secondary navigation */}
        <div className="border-t border-gray-100 hidden lg:block">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="flex items-center justify-center space-x-8 text-sm">
              {navigation.slice(8).map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Feature bar */}
      <div className="bg-gray-900 text-white py-3 overflow-hidden">
        <div className="flex animate-scroll">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center whitespace-nowrap mx-8">
              <Star className="w-4 h-4 text-yellow-400 mr-2" />
              <span className="text-sm font-medium">{feature}</span>
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
                    className="block text-sm font-medium text-gray-700 hover:text-blue-600"
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
