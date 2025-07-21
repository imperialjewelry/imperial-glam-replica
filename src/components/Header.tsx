
import { useState } from 'react';
import { Menu, X, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchBar from './SearchBar';
import ShoppingCart from './ShoppingCart';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navigationItems = [
    { name: 'Chains', href: '/chains' },
    { name: 'Bracelets', href: '/bracelets' },
    { name: 'Watches', href: '/watches' },
    { name: 'Grillz', href: '/grillz' },
    { name: 'Pendants', href: '/pendants' },
    { name: 'Earrings', href: '/earrings' },
    { name: 'Rings', href: '/hip-hop-rings' },
    { name: 'Engagement Rings', href: '/engagement-rings' },
    { name: 'Glasses', href: '/glasses' },
    { name: 'VVS Diamond Simulants', href: '/vvs-diamond-simulants' },
    { name: 'Custom', href: '/custom' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-gray-900">
              ICECARTEL
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop Search, Cart, and User */}
          <div className="hidden lg:flex items-center space-x-4">
            <SearchBar />
            <ShoppingCart />
            <Button variant="outline" size="sm">
              <User className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile menu button and actions */}
          <div className="lg:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-4 w-4" />
            </Button>
            <ShoppingCart />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="lg:hidden py-2 border-t">
            <SearchBar />
          </div>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="px-3 py-2">
                <Button variant="outline" className="w-full">
                  <User className="h-4 w-4 mr-2" />
                  Account
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
