
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

interface HipHopRingProduct {
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
  created_at?: string;
}

const HipHopRings = () => {
  const isMobile = useIsMobile();
  const [sortBy, setSortBy] = useState('featured');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedGemstones, setSelectedGemstones] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [shipsToday, setShipsToday] = useState(false);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['hip-hop-ring-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hip_hop_ring_products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as HipHopRingProduct[];
    }
  });

  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    const price = product.price / 100;
    const priceFromNum = priceFrom ? parseFloat(priceFrom) : 0;
    const priceToNum = priceTo ? parseFloat(priceTo) : Infinity;

    if (price < priceFromNum || price > priceToNum) return false;
    if (selectedMaterials.length && !selectedMaterials.includes(product.material)) return false;
    if (selectedColors.length && !selectedColors.includes(product.color)) return false;
    if (selectedGemstones.length && product.gemstone && !selectedGemstones.includes(product.gemstone)) return false;
    if (inStockOnly && !product.in_stock) return false;
    if (shipsToday && !product.ships_today) return false;

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        if (a.created_at && b.created_at) {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
        return 0;
      default:
        return 0;
    }
  });

  // Get unique filter options
  const materials = [...new Set(products.map(p => p.material))];
  const colors = [...new Set(products.map(p => p.color))];
  const gemstones = [...new Set(products.map(p => p.gemstone).filter(Boolean))];

  const handleMaterialChange = (material: string, checked: boolean) => {
    if (checked) {
      setSelectedMaterials([...selectedMaterials, material]);
    } else {
      setSelectedMaterials(selectedMaterials.filter(m => m !== material));
    }
  };

  const handleColorChange = (color: string, checked: boolean) => {
    if (checked) {
      setSelectedColors([...selectedColors, color]);
    } else {
      setSelectedColors(selectedColors.filter(c => c !== color));
    }
  };

  const handleGemstoneChange = (gemstone: string, checked: boolean) => {
    if (checked) {
      setSelectedGemstones([...selectedGemstones, gemstone]);
    } else {
      setSelectedGemstones(selectedGemstones.filter(g => g !== gemstone));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <PromoBar />
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gray-50 py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              MOISSANITE DIAMOND HIP HOP RINGS
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              All Moissanite Iced Out 925 Silver, 14K White, Yellow and Rose Gold Hip Hop Rings
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'}`}>
        {/* Sidebar Filters */}
        <div className={`${isMobile ? 'w-full' : 'w-80'} ${isMobile ? 'px-4 py-4' : 'p-8'}`}>
          {/* Mobile Filter Toggle */}
          {isMobile && (
            <Button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full mb-4 flex items-center justify-center space-x-2"
              variant="outline"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
          )}

          <div className={`space-y-6 ${isMobile && !showFilters ? 'hidden' : ''}`}>
            {/* Sort By */}
            <div>
              <h3 className="font-semibold mb-3">Sort By</h3>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-semibold mb-3">Price Range</h3>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="From"
                  value={priceFrom}
                  onChange={(e) => setPriceFrom(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="number"
                  placeholder="To"
                  value={priceTo}
                  onChange={(e) => setPriceTo(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            {/* Material Filter */}
            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full">
                <h3 className="font-semibold">Material</h3>
                <ChevronDown className="w-4 h-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 mt-3">
                {materials.map(material => (
                  <div key={material} className="flex items-center space-x-2">
                    <Checkbox
                      id={`material-${material}`}
                      checked={selectedMaterials.includes(material)}
                      onCheckedChange={(checked) => handleMaterialChange(material, !!checked)}
                    />
                    <label htmlFor={`material-${material}`} className="text-sm">
                      {material}
                    </label>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>

            {/* Color Filter */}
            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full">
                <h3 className="font-semibold">Color</h3>
                <ChevronDown className="w-4 h-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 mt-3">
                {colors.map(color => (
                  <div key={color} className="flex items-center space-x-2">
                    <Checkbox
                      id={`color-${color}`}
                      checked={selectedColors.includes(color)}
                      onCheckedChange={(checked) => handleColorChange(color, !!checked)}
                    />
                    <label htmlFor={`color-${color}`} className="text-sm">
                      {color}
                    </label>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>

            {/* Gemstone Filter */}
            {gemstones.length > 0 && (
              <Collapsible>
                <CollapsibleTrigger className="flex items-center justify-between w-full">
                  <h3 className="font-semibold">Gemstone</h3>
                  <ChevronDown className="w-4 h-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 mt-3">
                  {gemstones.map(gemstone => (
                    <div key={gemstone} className="flex items-center space-x-2">
                      <Checkbox
                        id={`gemstone-${gemstone}`}
                        checked={selectedGemstones.includes(gemstone!)}
                        onCheckedChange={(checked) => handleGemstoneChange(gemstone!, !!checked)}
                      />
                      <label htmlFor={`gemstone-${gemstone}`} className="text-sm">
                        {gemstone}
                      </label>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Availability Filter */}
            <div>
              <h3 className="font-semibold mb-3">Availability</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="in-stock"
                    checked={inStockOnly}
                    onCheckedChange={(checked) => setInStockOnly(!!checked)}
                  />
                  <label htmlFor="in-stock" className="text-sm">
                    In Stock Only
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="ships-today"
                    checked={shipsToday}
                    onCheckedChange={(checked) => setShipsToday(!!checked)}
                  />
                  <label htmlFor="ships-today" className="text-sm">
                    Ships Today
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`flex-1 ${isMobile ? 'py-4 px-4' : 'py-8 px-8'}`}>
          <div className="flex items-center justify-between mb-6">
            <span className="text-lg font-semibold">{sortedProducts.length} Products</span>
          </div>

          <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-4`}>
            {sortedProducts.map((product) => (
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
                  </div>

                  {product.sizes && product.sizes.length > 0 && (
                    <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
                      {product.sizes.slice(0, 2).map((size, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {size}
                        </Badge>
                      ))}
                      {product.sizes.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{product.sizes.length - 2}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>

                <div className="p-3 space-y-2">
                  <div className="text-xs text-gray-500 uppercase">
                    {product.category}
                  </div>
                  
                  <h3 className="font-medium text-gray-900 line-clamp-2 text-sm leading-tight">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center space-x-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">({product.review_count})</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-blue-600">${(product.price / 100).toFixed(2)}</span>
                    {product.original_price && (
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

export default HipHopRings;
