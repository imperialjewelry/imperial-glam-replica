
import { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = [
    { name: 'WATCHES', hasDropdown: false },
    { name: 'PENDANTS', hasDropdown: false },
    { name: 'RINGS', hasDropdown: true },
    { name: 'EARRINGS', hasDropdown: false },
    { name: 'GLASSES', hasDropdown: false },
    { name: 'DIAMOND', hasDropdown: true },
    { name: 'VVS DIAMOND SIMULANTS', hasDropdown: false },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-black">💎 IMPERIAL JEWELRY</div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-black font-medium">CHAINS</a>
            <a href="#" className="text-gray-700 hover:text-black font-medium">BRACELETS</a>
            <a href="#" className="text-gray-700 hover:text-black font-medium">PENDANTS</a>
            <a href="#" className="text-gray-700 hover:text-black font-medium">RINGS</a>
            <a href="#" className="text-gray-700 hover:text-black font-medium">EARRINGS</a>
            <a href="#" className="text-gray-700 hover:text-black font-medium">WATCHES</a>
            <a href="#" className="text-gray-700 hover:text-black font-medium">CUSTOM</a>
            <a href="#" className="text-red-600 hover:text-red-700 font-medium">SALE</a>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <Search className="w-6 h-6 text-gray-600 hover:text-black cursor-pointer" />
            <div className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-600 hover:text-black cursor-pointer" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
            </div>
            <User className="w-6 h-6 text-gray-600 hover:text-black cursor-pointer" />
            
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-6 space-y-1">
            {categories.map((category) => (
              <div key={category.name} className="border-b border-gray-100 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 font-medium text-lg">{category.name}</span>
                  {category.hasDropdown && (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                {/* Product images would go here - placeholder for now */}
                <div className="mt-3 flex space-x-2">
                  <div className="w-16 h-16 bg-gray-200 rounded"></div>
                  <div className="w-16 h-16 bg-gray-200 rounded"></div>
                  <div className="w-16 h-16 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
            
            {/* Bottom section */}
            <div className="pt-6 space-y-4">
              <div className="flex justify-center space-x-8">
                <Button variant="outline" className="flex-1">BLOG</Button>
                <Button variant="outline" className="flex-1">FAQ</Button>
              </div>
              
              <div className="text-center text-sm text-gray-600">
                <p className="font-medium">Open Mon - Fri 10AM - 5PM</p>
              </div>
              
              {/* Payment methods */}
              <div className="flex justify-center space-x-3 pt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center">💳</div>
                  <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center">💳</div>
                  <div className="w-8 h-5 bg-gray-800 rounded text-white text-xs flex items-center justify-center">💳</div>
                  <div className="w-8 h-5 bg-blue-800 rounded text-white text-xs flex items-center justify-center">💳</div>
                  <div className="w-8 h-5 bg-gray-600 rounded text-white text-xs flex items-center justify-center">💳</div>
                  <div className="w-8 h-5 bg-black rounded text-white text-xs flex items-center justify-center">💳</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
