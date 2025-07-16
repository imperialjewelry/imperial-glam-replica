import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, Search, ShoppingCart } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCart } from '../hooks/useCart';
import CartSidebar from './CartSidebar';

interface MobileNavItem {
  title: string;
  href: string;
}

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const mobileNavItems: MobileNavItem[] = [
    { title: 'Chains', href: '/chains' },
    { title: 'Bracelets', href: '/bracelets' },
    { title: 'Watches', href: '/watches' },
    { title: 'Pendants', href: '/pendants' },
    { title: 'Earrings', href: '/earrings' },
    { title: 'Custom', href: '/custom' },
    { title: 'Grillz', href: '/grillz' },
    { title: 'Glasses', href: '/glasses' },
    { title: 'Rings', href: '/rings/hip-hop' },
    { title: 'Engagement Rings', href: '/rings/engagement' },
    { title: 'VVS Diamond Simulants', href: '/vvs-diamond-simulants' },
    { title: 'Diamond', href: '/diamond' },
  ];

  const [cartOpen, setCartOpen] = useState(false);
  const { getTotalItems } = useCart();

  const renderMobileMenu = () => (
    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:w-64">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>
            Explore our collections and find the perfect piece.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          {mobileNavItems.map((item) => (
            <Button
              key={item.title}
              variant="ghost"
              className="w-full justify-start"
              onClick={closeMobileMenu}
              asChild
            >
              <a href={item.href}>{item.title}</a>
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );

  const renderDesktopMenu = () => (
    <nav className="hidden lg:flex space-x-6">
      <a href="/chains" className="text-sm font-medium hover:text-gray-800 transition-colors">
        Chains
      </a>
      <a href="/bracelets" className="text-sm font-medium hover:text-gray-800 transition-colors">
        Bracelets
      </a>
      <a href="/watches" className="text-sm font-medium hover:text-gray-800 transition-colors">
        Watches
      </a>
      <a href="/pendants" className="text-sm font-medium hover:text-gray-800 transition-colors">
        Pendants
      </a>
      <a href="/earrings" className="text-sm font-medium hover:text-gray-800 transition-colors">
        Earrings
      </a>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="text-sm font-medium hover:text-gray-800 transition-colors">
            More
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Collections</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem><a href="/custom">Custom</a></DropdownMenuItem>
          <DropdownMenuItem><a href="/grillz">Grillz</a></DropdownMenuItem>
          <DropdownMenuItem><a href="/glasses">Glasses</a></DropdownMenuItem>
          <DropdownMenuItem><a href="/rings/hip-hop">Hip Hop Rings</a></DropdownMenuItem>
          <DropdownMenuItem><a href="/rings/engagement">Engagement Rings</a></DropdownMenuItem>
          <DropdownMenuItem><a href="/vvs-diamond-simulants">VVS Diamond Simulants</a></DropdownMenuItem>
          <DropdownMenuItem><a href="/diamond">Diamond</a></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="mx-auto px-4">
          <div className="lg:hidden flex items-center justify-between h-16">
            {renderMobileMenu()}
            <a href="/" className="font-bold text-xl">
              ICECARTEL
            </a>
            
            {/* Mobile cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-gray-600"
            >
              <ShoppingCart className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>
          
          <div className="hidden lg:flex items-center justify-between h-16">
            <a href="/" className="font-bold text-2xl">
              ICECARTEL
            </a>
            {renderDesktopMenu()}
            
            {/* Right side with search and cart */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Input type="text" placeholder="Search..." className="pr-10" />
                <Search className="absolute top-1/2 right-3 -translate-y-1/2 w-4 h-4 text-gray-500" />
              </div>
              
              {/* Cart Icon */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-gray-600 hover:text-blue-600"
              >
                <ShoppingCart className="w-6 h-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
      </header>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Header;
