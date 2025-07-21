
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
    { name: 'Chains', href: '/chains' },
    { name: 'Bracelets', href: '/bracelets' },
    { name: 'Watches', href: '/watches' },
    { name: 'Pendants', href: '/pendants' },
    { name: 'Earrings', href: '/earrings' },
    { name: 'Custom', href: '/custom' },
    { name: 'Grillz', href: '/grillz' },
    { name: 'Glasses', href: '/glasses' },
  ];

  const rings = [
    { name: 'Hip Hop Rings', href: '/rings/hip-hop' },
    { name: 'Engagement Rings', href: '/rings/engagement' },
  ];

  return (
    <header className="bg-white shadow-sm border-b">
      {/* Top bar */}
      <div className="bg-gray-50 px-4 py-2 text-sm text-gray-600 text-center">
        <span>Free shipping on orders over $100 | Use code: FREESHIP</span>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-gray-900">
              Imperial Jewelry
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {categories.map((category) => (
              <a
                key={category.name}
                href={category.href}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                {category.name}
              </a>
            ))}
            <div className="relative group">
              <button className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
                Rings
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  {rings.map((ring) => (
                    <a
                      key={ring.name}
                      href={ring.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {ring.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button className="text-gray-700 hover:text-gray-900">
              <Search className="w-5 h-5" />
            </button>

            {/* User */}
            <button className="text-gray-700 hover:text-gray-900">
              <User className="w-5 h-5" />
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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {categories.map((category) => (
                <a
                  key={category.name}
                  href={category.href}
                  className="text-gray-700 hover:text-gray-900 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </a>
              ))}
              <div className="border-t border-gray-200 pt-4">
                <p className="text-gray-500 text-sm font-medium mb-2">Rings</p>
                {rings.map((ring) => (
                  <a
                    key={ring.name}
                    href={ring.href}
                    className="block text-gray-700 hover:text-gray-900 text-base font-medium py-1 ml-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {ring.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
