import { useState, useMemo } from 'react';
import { Star, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useIsMobile } from '@/hooks/use-mobile';
import { useProductFilters } from '@/hooks/useProductFilters';
import Header from '../components/Header';
import PromoBar from '../components/PromoBar';
import Footer from '../components/Footer';
import MobileProductShowcase from '@/components/MobileProductShowcase';
import FilterSection from '@/components/FilterSection';
import HipHopRingProductModal from '@/components/HipHopRingProductModal';
import { Tables } from '@/integrations/supabase/types';
import { Helmet } from 'react-helmet-async';
type HipHopRingProduct = Tables<'hip_hop_ring_products'>;
const HipHopRings = () => {
  const isMobile = useIsMobile();
  const {
    products,
    filters,
    loading
  } = useProductFilters('hip_hop_ring_products');
  const [sortBy, setSortBy] = useState('featured');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<HipHopRingProduct | null>(null);

  // Selected filter states
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedRingStyles, setSelectedRingStyles] = useState<string[]>([]);
  const toggleProductType = (type: string) => {
    setSelectedProductTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };
  const toggleColor = (color: string) => {
    setSelectedColors(prev => prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]);
  };
  const toggleMaterial = (material: string) => {
    setSelectedMaterials(prev => prev.includes(material) ? prev.filter(m => m !== material) : [...prev, material]);
  };
  const toggleRingStyle = (style: string) => {
    setSelectedRingStyles(prev => prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]);
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Apply filters
    if (selectedProductTypes.length > 0) {
      filtered = filtered.filter(product => selectedProductTypes.includes(product.product_type));
    }
    if (selectedColors.length > 0) {
      filtered = filtered.filter(product => selectedColors.includes(product.color));
    }
    if (selectedMaterials.length > 0) {
      filtered = filtered.filter(product => selectedMaterials.includes(product.material));
    }
    if (selectedRingStyles.length > 0) {
      filtered = filtered.filter(product => product.style && selectedRingStyles.includes(product.style));
    }

    // Apply price filter
    if (priceFrom) {
      filtered = filtered.filter(product => product.price / 100 >= parseFloat(priceFrom));
    }
    if (priceTo) {
      filtered = filtered.filter(product => product.price / 100 <= parseFloat(priceTo));
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price);
      case 'newest':
        return filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      default:
        return filtered;
    }
  }, [products, selectedProductTypes, selectedColors, selectedMaterials, selectedRingStyles, priceFrom, priceTo, sortBy]);
  return <div className="min-h-screen bg-white">
      <Helmet>
        <title>Hip Hop Rings & Diamond Rings | Custom Gold Rings - Imperial Jewelry</title>
        <meta name="description" content="Shop premium hip hop rings, diamond rings, and custom gold rings. Moissanite iced out rings in 14k gold, white gold, and silver. Expert craftsmanship and luxury ring designs." />
        <meta name="keywords" content="hip hop rings, diamond rings, custom gold rings, moissanite rings, iced out rings, luxury rings, 14k gold rings, custom jewelry rings, hip hop jewelry, diamond jewelry rings" />
      </Helmet>
      <PromoBar />
      <Header />
      
      {/* Desktop Hero Section */}
      {!isMobile && <div className="bg-gray-50 py-12 px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">RINGS</h1>
            <p className="text-lg text-gray-600">All Moissanite 925 Silver, 14K White, Yellow and Rose Gold Hip Hop Rings</p>
          </div>
        </div>}

      {/* Mobile Product Showcase */}
      <MobileProductShowcase category="RINGS" tableName="hip_hop_ring_products" title="HIP HOP RINGS" description="All Moissanite 925 Silver, 14K White, Yellow and Rose Gold Hip Hop Rings" />

      {/* Main Content */}
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'}`}>
        {/* Desktop Sidebar Filters */}
        {!isMobile && <div className="w-64 bg-white p-6 border-r border-gray-200 min-h-screen">
            <h2 className="text-lg font-semibold mb-6">Filters</h2>
            
            <FilterSection title="PRODUCT TYPE" items={filters.productTypes} selectedItems={selectedProductTypes} onToggle={toggleProductType} />

            {/* Price */}
            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-4 uppercase">PRICE</h3>
              <div className="flex space-x-2">
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">FROM</label>
                  <input type="number" value={priceFrom} onChange={e => setPriceFrom(e.target.value)} placeholder="0" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">TO</label>
                  <input type="number" value={priceTo} onChange={e => setPriceTo(e.target.value)} placeholder="0" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
                </div>
              </div>
            </div>

            <FilterSection title="COLOR" items={filters.colors} selectedItems={selectedColors} onToggle={toggleColor} />

            <FilterSection title="MATERIAL" items={filters.materials} selectedItems={selectedMaterials} onToggle={toggleMaterial} />

            {filters.ringStyles && filters.ringStyles.length > 0 && <FilterSection title="RING STYLE" items={filters.ringStyles} selectedItems={selectedRingStyles} onToggle={toggleRingStyle} />}
          </div>}

        {/* Products Section */}
        <div className={`flex-1 ${isMobile ? 'py-4 px-4' : 'py-8 px-8'}`}>
          {/* Product count and controls */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-lg font-semibold">
              {loading ? 'Loading...' : `${filteredProducts.length} Products`}
            </span>
            <div className="flex items-center space-x-4">
              {!isMobile && <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>}
              {isMobile && <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>FILTER</span>
                </Button>}
            </div>
          </div>

          {/* Products Grid */}
          <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-4`}>
            {filteredProducts.map(product => <div key={product.id} className="bg-white rounded-lg border hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedProduct(product)}>
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden rounded-t-lg">
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col space-y-1">
                    {product.in_stock && <Badge className="text-xs font-semibold bg-blue-500 text-white">
                        IN STOCK
                      </Badge>}
                    {product.discount_percentage && product.discount_percentage > 0 && <Badge className="text-xs font-semibold bg-red-500 text-white">
                        {product.discount_percentage}% OFF
                      </Badge>}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-3 space-y-2">
                  <div className="text-xs text-gray-500 uppercase">
                    {product.category}
                  </div>
                  
                  <h3 className="font-medium text-gray-900 line-clamp-2 text-sm leading-tight">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center space-x-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <span className="text-xs text-gray-500">({product.review_count})</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-blue-600">
                      ${(product.price / 100).toFixed(2)}
                    </span>
                    {product.original_price && <span className="text-sm text-gray-500 line-through">
                        ${(product.original_price / 100).toFixed(2)}
                      </span>}
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && <HipHopRingProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}

      <Footer />
    </div>;
};
export default HipHopRings;