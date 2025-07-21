
import { useState } from 'react';
import { Search, Menu, X, User, ShoppingBag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ShoppingCart from './ShoppingCart';
import { useCart } from '@/contexts/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems } = useCart();

  const categories = [
    { name: 'BEST DEALS', href: '/best-deals' },
    { name: 'CHAINS', href: '/chains' },
    { name: 'BRACELETS', href: '/bracelets' },
    { name: 'WATCHES', href: '/watches' },
    { name: 'PENDANTS', href: '/pendants' },
    { name: 'EARRINGS', href: '/earrings' },
    { name: 'CUSTOM', href: '/custom' },
    { name: 'GRILLZ', href: '/grillz' },
    { name: 'GLASSES', href: '/glasses' },
    { name: 'RINGS', href: '/rings' },
    { name: 'DIAMOND', href: '/diamond' },
    { name: 'VVS DIAMOND SIMULANTS', href: '/vvs-diamond-simulants' },
  ];

  return (
    <header className="bg-white shadow-sm">
      {/* Top bar with reviews and shipping info */}
      <div className="bg-gray-50 px-4 py-2 text-sm text-gray-600">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <span>30,000+ Reviews</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span>📦 READY TO SHIP | View all →</span>
            <div className="flex space-x-2">
              <span>📷</span>
              <span>🔗</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-3xl font-bold text-gray-900 tracking-wider">
              IMPERIAL JEWELRY
            </a>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* User */}
            <button className="text-gray-700 hover:text-gray-900">
              <User className="w-6 h-6" />
            </button>

            {/* Shopping Cart */}
            <ShoppingCart />

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-700 hover:text-gray-900"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex border-t border-gray-200 py-4">
          <div className="flex space-x-8 mx-auto">
            {categories.map((category) => (
              <a
                key={category.name}
                href={category.href}
                className="text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors uppercase tracking-wide"
              >
                {category.name}
              </a>
            ))}
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {categories.map((category) => (
                <a
                  key={category.name}
                  href={category.href}
                  className="text-gray-700 hover:text-gray-900 text-base font-medium uppercase"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Promotional banner */}
      <div className="bg-black text-white py-2 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          <span className="mx-4">⭐ BUY NOW PAY LATER</span>
          <span className="mx-4">⭐ 4-DAY SHIPPING</span>
          <span className="mx-4">⭐ BUY NOW PAY LATER</span>
          <span className="mx-4">⭐ 4-DAY SHIPPING</span>
          <span className="mx-4">⭐ BUY NOW PAY LATER</span>
          <span className="mx-4">⭐ 4-DAY SHIPPING</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
