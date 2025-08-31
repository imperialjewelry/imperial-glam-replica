import { useState, useEffect } from 'react';
import { Star, ChevronDown, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import Header from '../components/Header';
import PromoBar from '../components/PromoBar';
import Footer from '../components/Footer';
import EarringProductModal from '../components/EarringProductModal';
import MobileProductShowcase from '@/components/MobileProductShowcase';

type EarringProduct = Tables<'earring_products'>;

const Earrings = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('STUD EARRINGS');
  const [sortBy, setSortBy] = useState('featured');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<EarringProduct | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<EarringProduct[]>([]);
  const [selectedFilters, setSelectedFilters] = useState({
    productType: [] as string[],
    color: [] as string[],
    material: [] as string[],
    gemstone: [] as string[],
    diamondCut: [] as string[]
  });

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

  useEffect(() => {
    applyFilters();
  }, [products, selectedFilters, priceFrom, priceTo, sortBy]);

  const applyFilters = () => {
    let filtered = [...products];

    // Product type
    if (selectedFilters.productType.length > 0) {
      filtered = filtered.filter(product => 
        selectedFilters.productType.includes(product.product_type)
      );
    }

    // Color
    if (selectedFilters.color.length > 0) {
      filtered = filtered.filter(product => 
        selectedFilters.color.includes(product.color)
      );
    }

    // Material
    if (selectedFilters.material.length > 0) {
      filtered = filtered.filter(product => 
        selectedFilters.material.includes(product.material)
      );
    }

    // Gemstone
    if (selectedFilters.gemstone.length > 0) {
      filtered = filtered.filter(product => 
        product.gemstone && selectedFilters.gemstone.includes(product.gemstone)
      );
    }

    // Diamond cut
    if (selectedFilters.diamondCut.length > 0) {
      filtered = filtered.filter(product => 
        product.diamond_cut && selectedFilters.diamondCut.includes(product.diamond_cut)
      );
    }

    // Price range
    if (priceFrom || priceTo) {
      filtered = filtered.filter(product => {
        const price = product.price / 100;
        const fromPrice = priceFrom ? parseFloat(priceFrom) : 0;
        const toPrice = priceTo ? parseFloat(priceTo) : Infinity;
        return price >= fromPrice && price <= toPrice;
      });
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleFilterChange = (filterType: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters(prev => {
      const currentFilters = prev[filterType];
      const newFilters = currentFilters.includes(value)
        ? currentFilters.filter(item => item !== value)
        : [...currentFilters, value];
      
      return {
        ...prev,
        [filterType]: newFilters
      };
    });
  };

  // Build options + counts
  const getFilterOptions = (field: keyof EarringProduct) => {
    const counts: { [key: string]: number } = {};
    products.forEach(product => {
      const value = product[field] as string;
      if (value) {
        counts[value] = (counts[value] || 0) + 1;
      }
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  };

  const productTypes = getFilterOptions('product_type');
  const colors = getFilterOptions('color');
  const materials = getFilterOptions('material');
  const gemstones = getFilterOptions('gemstone');
  const diamondCuts = getFilterOptions('diamond_cut');

  const renderFilterCheckbox = (
    filterType: keyof typeof selectedFilters,
    option: { name: string; count: number }
  ) => {
    const isChecked = selectedFilters[filterType].includes(option.name);
    const checkboxId = `${filterType}-${option.name}`;
    
    return (
      <div key={option.name} className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id={checkboxId}
            checked={isChecked}
            onCheckedChange={() => handleFilterChange(filterType, option.name)}
          />
          <label htmlFor={checkboxId} className="text-sm text-gray-700">
            {option.name}
          </label>
        </div>
        <span className="text-sm text-gray-500">({option.count})</span>
      </div>
    );
  };

  // Only show products that can be sold
  const validProducts = filteredProducts.filter(product => product.stripe_price_id);

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
              MOISSANITE EARRINGS COLLECTION
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Premium Moissanite Iced Out Earrings - Hip Hop Jewelry
            </p>
          </div>
        </div>
      </section>

      {/* Mobile Product Showcase */}
      <MobileProductShowcase category="EARRINGS" tableName="earring_products" />

      {/* Main Content */}
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'}`}>
        {/* Desktop Sidebar Filters */}
        {!isMobile && (
          <div className="w-64 bg-white p-6 border-r border-gray-200 min-h-screen">
            <h2 className="text-lg font-semibold mb-6">Filters</h2>
            
            {/* Product Type */}
            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-4 uppercase">PRODUCT TYPE</h3>
              <div className="space-y-3">
                {productTypes.map((type) => renderFilterCheckbox('productType', type))}
              </div>
            </div>

            {/* Price */}
            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-4 uppercase">PRICE</h3>
              <div className="flex space-x-2">
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">FROM</label>
                  <input
                    type="number"
                    value={priceFrom}
                    onChange={(e) => setPriceFrom(e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">TO</label>
                  <input
                    type="number"
                    value={priceTo}
                    onChange={(e) => setPriceTo(e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Color */}
            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-4 uppercase">COLOR</h3>
              <div className="space-y-3">
                {colors.map((color) => renderFilterCheckbox('color', color))}
              </div>
            </div>

            {/* Material */}
            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-4 uppercase">MATERIAL</h3>
              <div className="space-y-3">
                {materials.map((material) => renderFilterCheckbox('material', material))}
              </div>
            </div>

            {/* Gemstone */}
            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-4 uppercase">GEMSTONE</h3>
              <div className="space-y-3">
                {gemstones.map((gemstone) => renderFilterCheckbox('gemstone', gemstone))}
              </div>
            </div>

            {/* Diamond Cut */}
            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-4 uppercase">DIAMOND CUT</h3>
              <div className="space-y-3">
                {diamondCuts.map((cut) => renderFilterCheckbox('diamondCut', cut))}
              </div>
            </div>
          </div>
        )}

        {/* Products Section */}
        <div className={`flex-1 ${isMobile ? 'py-4 px-4' : 'py-8 px-8'}`}>
          <div className="flex items-center justify-between mb-6">
            <span className="text-lg font-semibold">{validProducts.length} Products</span>
            
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
              
              <Select value={sortBy} onValueChange={(v) => setSortBy(v)}>
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

          {/* Mobile Filters */}
          {isMobile && showFilters && (
            <div className="bg-white border rounded-lg mb-6 overflow-hidden">
              {/* Product Type Filter */}
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left border-b hover:bg-gray-50">
                  <span className="font-medium">PRODUCT TYPE</span>
                  <ChevronDown className="w-4 h-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 border-b">
                  <div className="space-y-3">
                    {productTypes.map((type) => renderFilterCheckbox('productType', type))}
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Price Filter */}
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left border-b hover:bg-gray-50">
                  <span className="font-medium">PRICE</span>
                  <ChevronDown className="w-4 h-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 border-b">
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <label className="block text-xs text-gray-500 mb-1">FROM</label>
                      <input
                        type="number"
                        value={priceFrom}
                        onChange={(e) => setPriceFrom(e.target.value)}
                        placeholder="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs text-gray-500 mb-1">TO</label>
                      <input
                        type="number"
                        value={priceTo}
                        onChange={(e) => setPriceTo(e.target.value)}
                        placeholder="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Color Filter */}
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left border-b hover:bg-gray-50">
                  <span className="font-medium">COLOR</span>
                  <ChevronDown className="w-4 h-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 border-b">
                  <div className="space-y-3">
                    {colors.map((color) => renderFilterCheckbox('color', color))}
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Material Filter */}
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left border-b hover:bg-gray-50">
                  <span className="font-medium">MATERIAL</span>
                  <ChevronDown className="w-4 h-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 border-b">
                  <div className="space-y-3">
                    {materials.map((material) => renderFilterCheckbox('material', material))}
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Gemstone Filter */}
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left border-b hover:bg-gray-50">
                  <span className="font-medium">GEMSTONE</span>
                  <ChevronDown className="w-4 h-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 border-b">
                  <div className="space-y-3">
                    {gemstones.map((gemstone) => renderFilterCheckbox('gemstone', gemstone))}
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Diamond Cut Filter */}
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left hover:bg-gray-50">
                  <span className="font-medium">DIAMOND CUT</span>
                  <ChevronDown className="w-4 h-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4">
                  <div className="space-y-3">
                    {diamondCuts.map((cut) => renderFilterCheckbox('diamondCut', cut))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {validProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-lg border hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
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
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">({product.review_count})</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
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
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <EarringProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <Footer />
    </div>
  );
};

export default Earrings;
