import { useState } from 'react';
import { ShoppingCart, Menu, X, Instagram, MessageCircle, Star, Truck, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import SearchBar from './SearchBar';
import { useCart } from '@/contexts/CartContext';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    dispatch,
    getTotalItems
  } = useCart();
  const navigation = ['ALL JEWELRY', 'CHAINS', 'BRACELETS', 'WATCHES', 'PENDANTS', 'EARRINGS', 'CUSTOM', 'GRILLZ', 'GLASSES', 'RINGS', 'DIAMOND', 'VVS DIAMOND SIMULANTS', 'POLO G 🐐'];
  const features = ["BUY NOW PAY LATER", "4-DAY SHIPPING", "BUY NOW PAY LATER", "4-DAY SHIPPING"];
  return <>
      {/* Desktop Header */}
      <header className="bg-white shadow-sm hidden lg:block">
        {/* Top bar with social and shipping info */}
        <div className="border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                <span className="text-gray-600 ml-2"> 2,000+ Reviews</span>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-gray-600 flex items-center">
                <Truck className="w-4 h-4 inline mr-1" />
                READY TO SHIP →
              </div>
              <div className="flex items-center space-x-2">
                <a href="https://www.instagram.com/shopimperialjewelry" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram className="w-4 h-4 text-pink-500" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="w-1/4"></div>
            <div className="flex-1 flex justify-center">
              <Link to="/" className="text-2xl font-bold text-black tracking-wide hover:text-gray-800 transition-colors">
                IMPERIAL JEWELRY
              </Link>
            </div>
            <div className="w-1/4 flex items-center justify-end space-x-4">
              <SearchBar />
              <Button variant="ghost" size="sm" onClick={() => dispatch({
              type: 'TOGGLE_CART'
            })} className="relative">
                <ShoppingCart className="w-5 h-5" />
                {getTotalItems() > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>}
              </Button>
            </div>
          </div>
        </div>

        {/* Main navigation */}
        <div className="border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium">
              {navigation.map(item => {
              if (item === 'RINGS') {
                return <DropdownMenu key={item}>
                      <DropdownMenuTrigger className="text-gray-700 hover:text-black transition-colors flex items-center space-x-1">
                        <span>{item}</span>
                        <ChevronDown className="w-3 h-3" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white border shadow-lg">
                        <DropdownMenuItem asChild>
                          <Link to="/rings/hip-hop" className="w-full px-3 py-2 text-sm hover:bg-gray-100">
                            Hip Hop Rings
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/rings/engagement" className="w-full px-3 py-2 text-sm hover:bg-gray-100">
                            Engagement Rings
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>;
              }
              if (item === 'VVS DIAMOND SIMULANTS') {
                return <Link key={item} to="/vvs-diamond-simulants" className="inline-flex items-center gap-1 whitespace-nowrap text-gray-700 hover:text-black transition-colors -mr-2">
                      VVS DIAMOND SIMULANTS
                    </Link>;
              }
              if (item.startsWith('POLO G')) {
                return <Link key="polo-g" to="/polo-g" className="inline-flex items-center gap-1 whitespace-nowrap text-gray-700 hover:text-black transition-colors -ml-2">
                      <span>POLO G</span>
                      <span aria-hidden className="text-base leading-none">🐐</span>
                    </Link>;
              }
              return <Link key={item} to={item === 'ALL JEWELRY' ? '/best-deals' : item === 'CHAINS' ? '/chains' : item === 'BRACELETS' ? '/bracelets' : item === 'WATCHES' ? '/watches' : item === 'PENDANTS' ? '/pendants' : item === 'EARRINGS' ? '/earrings' : item === 'CUSTOM' ? '/custom' : item === 'GRILLZ' ? '/grillz' : item === 'GLASSES' ? '/glasses' : item === 'DIAMOND' ? '/diamond' : '/'} className="inline-flex items-center gap-1 whitespace-nowrap text-gray-700 hover:text-black transition-colors">
                    {item}
                  </Link>;
            })}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden bg-white shadow-sm">
        {/* Top reviews bar */}
        <div className="bg-gray-100 px-4 py-2 text-center">
          <div className="flex items-center justify-center space-x-1 text-sm">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
            <span className="text-gray-600 ml-2">2,000+ Reviews</span>
          </div>
        </div>

        {/* Main mobile header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(true)} className="p-2">
            <Menu className="w-6 h-6" />
          </Button>

        <Link to="/" className="text-lg font-bold text-black tracking-wide">
            IMPERIAL JEWELRY
          </Link>

          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" className="p-2 relative" onClick={() => dispatch({
            type: 'TOGGLE_CART'
          })}>
              <ShoppingCart className="w-5 h-5" />
              {getTotalItems() > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>}
            </Button>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="px-4 py-3 border-b border-gray-200">
          <SearchBar />
        </div>

        {/* Mobile social icons bar */}
        <div className="flex items-center justify-center space-x-4 py-2 bg-gray-50">
          <a href="https://www.instagram.com/shopimperialjewelry" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram className="w-5 h-5 text-pink-500" />
          </a>
        </div>
      </header>

      {/* Feature bar - continuous carousel */}
      <div className="bg-black text-white py-3 overflow-hidden">
        <div className="animate-scroll-header whitespace-nowrap">
          {[...Array(8)].map((_, groupIndex) => <div key={groupIndex} className="inline-flex">
              {features.map((feature, index) => <div key={`${groupIndex}-${index}`} className="inline-flex items-center mx-12">
                  <Star className="w-4 h-4 text-yellow-400 mr-2 flex-shrink-0" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>)}
            </div>)}
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMenuOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto">
            {/* Header with close button */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <Link to="/" className="text-lg font-bold text-black" onClick={() => setIsMenuOpen(false)}>
                IMPERIAL JEWELRY
              </Link>
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Banner sections */}
            <div className="p-4 space-y-6">
              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <Link to="/best-deals" onClick={() => setIsMenuOpen(false)}>
                    <h3 className="font-semibold text-sm mb-2">ALL JEWELRY</h3>
                    <p className="text-xs text-gray-600">Shop our entire collection of jewelry</p>
                  </Link>
                </div>
              </div>

              {/* Categories with images */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b border-gray-200 pb-2">CATEGORIES</h3>

                {/* CHAINS */}
                <div className="flex items-center space-x-3 py-2">
                  <div className="w-12 h-12 rounded-lg flex-shrink-0 overflow-hidden">
                    <img src="https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/chains//infinitylink.webp" alt="Chains" className="w-full h-full object-cover" />
                  </div>
                  <Link to="/chains" className="text-sm font-medium text-gray-700 hover:text-black" onClick={() => setIsMenuOpen(false)}>
                    CHAINS
                  </Link>
                </div>

                {/* BRACELETS */}
                <div className="flex items-center space-x-3 py-2">
                  <div className="w-12 h-12 rounded-lg flex-shrink-0 overflow-hidden">
                    <img src="https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/images/bracelet.webp" alt="Bracelets" className="w-full h-full object-cover" />
                  </div>
                  <Link to="/bracelets" className="text-sm font-medium text-gray-700 hover:text-black" onClick={() => setIsMenuOpen(false)}>
                    BRACELETS
                  </Link>
                </div>

                {/* WATCHES */}
                <div className="flex items-center space-x-3 py-2">
                  <div className="w-12 h-12 rounded-lg flex-shrink-0 overflow-hidden">
                    <img src="https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/watches//rolexoysterperpetuasl.webp" alt="Watches" className="w-full h-full object-cover" />
                  </div>
                  <Link to="/watches" className="text-sm font-medium text-gray-700 hover:text-black" onClick={() => setIsMenuOpen(false)}>
                    WATCHES
                  </Link>
                </div>

                {/* PENDANTS */}
                <div className="flex items-center space-x-3 py-2">
                  <div className="w-12 h-12 rounded-lg flex-shrink-0 overflow-hidden">
                    <img src="https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/pendants/skullpendanyt.webp" alt="Pendants" className="w-full h-full object-cover" />
                  </div>
                  <Link to="/pendants" className="text-sm font-medium text-gray-700 hover:text-black" onClick={() => setIsMenuOpen(false)}>
                    PENDANTS
                  </Link>
                </div>

                {/* EARRINGS */}
                <div className="flex items-center space-x-3 py-2">
                  <div className="w-12 h-12 rounded-lg flex-shrink-0 overflow-hidden">
                    <img src="https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/earrings//dart.webp" alt="Earrings" className="w-full h-full object-cover" />
                  </div>
                  <Link to="/earrings" className="text-sm font-medium text-gray-700 hover:text-black" onClick={() => setIsMenuOpen(false)}>
                    EARRINGS
                  </Link>
                </div>

                {/* CUSTOM - Updated with new image */}
                <div className="flex items-center space-x-3 py-2">
                  <div className="w-12 h-12 rounded-lg flex-shrink-0 overflow-hidden">
                    <img src="https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/images/6ACB04DC-1C32-49D1-996D-DFF4B862DA7D.webp" alt="Custom" className="w-full h-full object-cover" />
                  </div>
                  <Link to="/custom" className="text-sm font-medium text-gray-700 hover:text-black" onClick={() => setIsMenuOpen(false)}>
                    CUSTOM
                  </Link>
                </div>

                {/* GRILLZ */}
                <div className="flex items-center space-x-3 py-2">
                  <div className="w-12 h-12 rounded-lg flex-shrink-0 overflow-hidden">
                    <img src="https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/grillz/10on10vvs.webp" alt="Grillz" className="w-full h-full object-cover" />
                  </div>
                  <Link to="/grillz" className="text-sm font-medium text-gray-700 hover:text-black" onClick={() => setIsMenuOpen(false)}>
                    GRILLZ
                  </Link>
                </div>

                {/* GLASSES */}
                <div className="flex items-center space-x-3 py-2">
                  <div className="w-12 h-12 rounded-lg flex-shrink-0 overflow-hidden">
                    <img src="https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/images/glasses.webp" alt="Glasses" className="w-full h-full object-cover" />
                  </div>
                  <Link to="/glasses" className="text-sm font-medium text-gray-700 hover:text-black" onClick={() => setIsMenuOpen(false)}>
                    GLASSES
                  </Link>
                </div>

                {/* RINGS - Updated with new image */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 py-2">
                    <div className="w-12 h-12 rounded-lg flex-shrink-0 overflow-hidden">
                      <img src="https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/images/Fat_Fuq.webp" alt="Rings" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">RINGS</span>
                  </div>
                  <div className="ml-15 space-y-2">
                    <Link to="/rings/hip-hop" className="block text-sm text-gray-600 hover:text-black pl-4" onClick={() => setIsMenuOpen(false)}>
                      Hip Hop Rings
                    </Link>
                    <Link to="/rings/engagement" className="block text-sm text-gray-600 hover:text-black pl-4" onClick={() => setIsMenuOpen(false)}>
                      Engagement Rings
                    </Link>
                  </div>
                </div>

                {/* DIAMOND (with image) */}
                <div className="flex items-center space-x-3 py-2">
                  <div className="w-12 h-12 rounded-lg flex-shrink-0 overflow-hidden">
                    <img src="https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/pendants/Bart.webp" alt="Diamond" className="w-full h-full object-cover" />
                  </div>
                  <Link to="/diamond" className="text-sm font-medium text-gray-700 hover:text-black" onClick={() => setIsMenuOpen(false)}>
                    DIAMOND
                  </Link>
                </div>

                {/* VVS DIAMOND SIMULANTS (with image) */}
                <div className="flex items-center space-x-3 py-2">
                  <div className="w-12 h-12 rounded-lg flex-shrink-0 overflow-hidden">
                    <img src="https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/bracelets/14mm%20VVS%20Moissanite%20Cuban%20Bracelet%20%20.webp" alt="VVS Diamond Simulants" className="w-full h-full object-cover" />
                  </div>
                  <Link to="/vvs-diamond-simulants" className="text-sm font-medium text-gray-700 hover:text-black" onClick={() => setIsMenuOpen(false)}>
                    VVS DIAMOND SIMULANTS
                  </Link>
                </div>

                {/* POLO G 🐐 (updated with image) */}
                <div className="flex items-center space-x-3 py-2">
                  <div className="w-12 h-12 rounded-lg flex-shrink-0 overflow-hidden">
                    <img src="https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/images/Polo-G-Hitmakers-Rising-Star.webp" alt="Polo G Collection" className="w-full h-full object-cover" />
                  </div>
                  <Link to="/polo-g" className="text-sm font-medium text-gray-700 hover:text-black" onClick={() => setIsMenuOpen(false)}>
                    POLO G 🐐
                  </Link>
                </div>
              </div>

              {/* Bottom section */}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-600">30,000+ Reviews</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">1-Day Shipping</span>
                </div>
              </div>
            </div>
          </div>
        </div>}

      <style dangerouslySetInnerHTML={{
      __html: `
          @keyframes scroll-header {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll-header {
            animation: scroll-header 27s linear infinite;
          }
        `
    }} />
    </>;
};
export default Header;