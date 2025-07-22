
import { useState } from 'react';
import { Star, ChevronDown, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import Header from '../components/Header';
import PromoBar from '../components/PromoBar';
import Footer from '../components/Footer';

interface EarringProduct {
  id: string;
  name: string;
  image_url: string;
  category: string;
  price: number;
  original_price: number | null;
  rating: number;
  review_count: number;
  in_stock: boolean;
  ships_today: boolean;
  discount_percentage: number;
  sizes: string[];
  product_type: string;
  color: string;
  material: string;
  gemstone: string | null;
  diamond_cut: string | null;
}

const Earrings = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('STUD EARRINGS');
  const [sortBy, setSortBy] = useState('featured');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['earring-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('earring_products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as EarringProduct[];
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <PromoBar />
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading earrings...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <PromoBar />
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gray-50 py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              MOISSANITE DIAMOND EARRINGS
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              All Moissanite Iced Out 925 Silver, 14K White, Yellow and Rose Gold Hip Hop Earrings
            </p>
            
            {/* Category Tabs */}
            <div className="flex justify-center space-x-8 mb-8">
              {['STUD EARRINGS', 'HOOP EARRINGS', 'DROP EARRINGS'].map((tab) => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? "default" : "ghost"}
                  onClick={() => setActiveTab(tab)}
                  className={`${
                    activeTab === tab 
                      ? "text-blue-600 border-b-2 border-blue-600 bg-transparent hover:bg-transparent" 
                      : "text-gray-400 hover:text-gray-600"
                  } font-medium px-4 py-2 rounded-none`}
                >
                  {tab}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'}`}>
        {/* Filters Sidebar */}
        {!isMobile && (
          <div className="w-64 p-6 border-r bg-gray-50">
            <h3 className="font-semibold mb-4">Filters</h3>
            
            {/* Product Type */}
            <Collapsible defaultOpen className="mb-6">
              <CollapsibleTrigger className="flex items-center justify-between w-full font-medium">
                PRODUCT TYPE
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="stud-earrings" />
                  <label htmlFor="stud-earrings" className="text-sm">Stud Earrings</label>
                  <span className="text-xs text-gray-500">(2)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="hoop-earrings" />
                  <label htmlFor="hoop-earrings" className="text-sm">Hoop Earrings</label>
                  <span className="text-xs text-gray-500">(1)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="drop-earrings" />
                  <label htmlFor="drop-earrings" className="text-sm">Drop Earrings</label>
                  <span className="text-xs text-gray-500">(1)</span>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Price Range */}
            <Collapsible defaultOpen className="mb-6">
              <CollapsibleTrigger className="flex items-center justify-between w-full font-medium">
                PRICE
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2">
                <div className="flex space-x-2">
                  <div>
                    <label className="text-xs text-gray-500">FROM</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={priceFrom}
                      onChange={(e) => setPriceFrom(e.target.value)}
                      className="w-full p-2 border rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">TO</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={priceTo}
                      onChange={(e) => setPriceTo(e.target.value)}
                      className="w-full p-2 border rounded text-sm"
                    />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Color */}
            <Collapsible defaultOpen className="mb-6">
              <CollapsibleTrigger className="flex items-center justify-between w-full font-medium">
                COLOR
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="yellow-gold" />
                  <label htmlFor="yellow-gold" className="text-sm">Yellow Gold</label>
                  <span className="text-xs text-gray-500">(1)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="rose-gold" />
                  <label htmlFor="rose-gold" className="text-sm">Rose Gold</label>
                  <span className="text-xs text-gray-500">(1)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="white-gold" />
                  <label htmlFor="white-gold" className="text-sm">White Gold</label>
                  <span className="text-xs text-gray-500">(2)</span>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Material */}
            <Collapsible defaultOpen className="mb-6">
              <CollapsibleTrigger className="flex items-center justify-between w-full font-medium">
                MATERIAL
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="925-silver" />
                  <label htmlFor="925-silver" className="text-sm">925 Silver</label>
                  <span className="text-xs text-gray-500">(2)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="14k-gold" />
                  <label htmlFor="14k-gold" className="text-sm">14K Gold</label>
                  <span className="text-xs text-gray-500">(2)</span>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        )}

        {/* Products Section */}
        <div className={`flex-1 ${isMobile ? 'py-4 px-4' : 'py-8 px-8'}`}>
          <div className="flex items-center justify-between mb-6">
            <span className="text-lg font-semibold">{products.length} Products</span>
            
            <div className="flex items-center space-x-4">
              {isMobile && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              )}
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Grid */}
          <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-3'} gap-6`}>
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg border hover:shadow-lg transition-shadow">
                <div className="relative aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  
                  <div className="absolute top-2 left-2 flex flex-col space-y-1">
                    {product.in_stock && (
                      <Badge className="text-xs font-semibold bg-blue-500 text-white">
                        IN STOCK
                      </Badge>
                    )}
                    {product.discount_percentage > 0 && (
                      <Badge className="text-xs font-semibold bg-red-500 text-white">
                        {product.discount_percentage}% OFF
                      </Badge>
                    )}
                    {product.ships_today && (
                      <Badge className="text-xs font-semibold bg-green-500 text-white">
                        SHIPS TODAY
                      </Badge>
                    )}
                  </div>

                  {/* Size options */}
                  {product.sizes && product.sizes.length > 0 && (
                    <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
                      {product.sizes.slice(0, 3).map((size, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-white/90 text-gray-800">
                          {size}
                        </Badge>
                      ))}
                      {product.sizes.length > 3 && (
                        <Badge variant="secondary" className="text-xs bg-white/90 text-gray-800">
                          +{product.sizes.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-2">
                  <div className="text-xs text-gray-500 uppercase">
                    {product.material} / {product.category}
                  </div>
                  
                  <h3 className="font-medium text-gray-900 line-clamp-2 text-sm leading-tight">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center space-x-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">({product.review_count})</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-blue-600">
                      ${(product.price / 100).toFixed(2)}
                    </span>
                    {product.original_price && product.original_price > product.price && (
                      <span className="text-sm text-gray-500 line-through">
                        ${(product.original_price / 100).toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Earrings;
