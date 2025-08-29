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
import PendantProductModal from '../components/PendantProductModal';

interface LengthPrice {
  length: string;
  price: number;
  stripe_price_id: string;
}

interface PendantProduct extends Omit<Tables<'pendant_products'>, 'lengths_and_prices'> {
  lengths_and_prices?: LengthPrice[];
}

const Pendants = () => {
  const isMobile = useIsMobile();
  const [products, setProducts] = useState<PendantProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<PendantProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<PendantProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    productType: [] as string[],
    color: [] as string[],
    material: [] as string[],
    gemstone: [] as string[],
    diamondCut: [] as string[]
  });
  const [openSections, setOpenSections] = useState({
    productType: false,
    price: false,
    color: false,
    material: false,
    gemstone: false,
    diamondCut: false
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, selectedFilters, priceFrom, priceTo, sortBy]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('pendant_products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform the data to match our interface
      const transformedData: PendantProduct[] = (data || []).map(product => ({
        ...product,
        lengths_and_prices: Array.isArray(product.lengths_and_prices) 
          ? product.lengths_and_prices as LengthPrice[]
          : []
      }));
      
      setProducts(transformedData);
    } catch (error) {
      console.error('Error fetching pendant products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get the base price for filtering and display
  const getBasePrice = (product: PendantProduct) => {
    const lengthsAndPrices = product.lengths_and_prices || [];
    if (lengthsAndPrices.length > 0) {
      // Return the lowest price from lengths_and_prices
      return Math.min(...lengthsAndPrices.map(lp => lp.price));
    }
    return product.price;
  };

  // Helper function to check if product has valid pricing
  const hasValidPricing = (product: PendantProduct) => {
    const lengthsAndPrices = product.lengths_and_prices || [];
    if (lengthsAndPrices.length > 0) {
      return lengthsAndPrices.some(lp => lp.stripe_price_id);
    }
    return !!product.stripe_price_id;
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Apply product type filter
    if (selectedFilters.productType.length > 0) {
      filtered = filtered.filter(product => 
        selectedFilters.productType.includes(product.product_type)
      );
    }

    // Apply color filter
    if (selectedFilters.color.length > 0) {
      filtered = filtered.filter(product => 
        selectedFilters.color.includes(product.color)
      );
    }

    // Apply material filter
    if (selectedFilters.material.length > 0) {
      filtered = filtered.filter(product => 
        selectedFilters.material.includes(product.material)
      );
    }

    // Apply gemstone filter
    if (selectedFilters.gemstone.length > 0) {
      filtered = filtered.filter(product => 
        product.gemstone && selectedFilters.gemstone.includes(product.gemstone)
      );
    }

    // Apply diamond cut filter
    if (selectedFilters.diamondCut.length > 0) {
      filtered = filtered.filter(product => 
        product.diamond_cut && selectedFilters.diamondCut.includes(product.diamond_cut)
      );
    }

    // Apply price range filter using base price
    if (priceFrom || priceTo) {
      filtered = filtered.filter(product => {
        const price = getBasePrice(product) / 100;
        const fromPrice = priceFrom ? parseFloat(priceFrom) : 0;
        const toPrice = priceTo ? parseFloat(priceTo) : Infinity;
        return price >= fromPrice && price <= toPrice;
      });
    }

    // Apply sorting using base price
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => getBasePrice(a) - getBasePrice(b));
        break;
      case 'price-high':
        filtered.sort((a, b) => getBasePrice(b) - getBasePrice(a));
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      default:
        // Keep original order for featured
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

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getFilterOptions = (field: keyof PendantProduct) => {
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
    option: { name: string; count: number },
    prefix: string = ''
  ) => {
    const isChecked = selectedFilters[filterType].includes(option.name);
    const checkboxId = `${prefix}${option.name}`;
    
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

  const renderDesktopFilters = () => (
    <div className="w-64 bg-white p-6 border-r border-gray-200 min-h-screen">
      <h2 className="text-lg font-semibold mb-6">Filters</h2>
      
      {/* Product Type */}
      <div className="mb-8">
        <h3 className="font-medium text-gray-900 mb-4 uppercase">PRODUCT TYPE</h3>
        <div className="space-y-3">
          {productTypes.map((type) => renderFilterCheckbox('productType', type, 'desktop-'))}
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
          {colors.map((color) => renderFilterCheckbox('color', color, 'desktop-'))}
        </div>
      </div>

      {/* Material */}
      <div className="mb-8">
        <h3 className="font-medium text-gray-900 mb-4 uppercase">MATERIAL</h3>
        <div className="space-y-3">
          {materials.map((material) => renderFilterCheckbox('material', material, 'desktop-'))}
        </div>
      </div>

      {/* Gemstone */}
      <div className="mb-8">
        <h3 className="font-medium text-gray-900 mb-4 uppercase">GEMSTONE</h3>
        <div className="space-y-3">
          {gemstones.map((gemstone) => renderFilterCheckbox('gemstone', gemstone, 'desktop-'))}
        </div>
      </div>

      {/* Diamond Cut */}
      <div className="mb-8">
        <h3 className="font-medium text-gray-900 mb-4 uppercase">DIAMOND CUT</h3>
        <div className="space-y-3">
          {diamondCuts.map((cut) => renderFilterCheckbox('diamondCut', cut, 'desktop-'))}
        </div>
      </div>
    </div>
  );

  const renderMobileFilters = () => (
    showFilters && (
      <div className="bg-white border rounded-lg mb-6 overflow-hidden">
        
        {/* Sort By */}
        <div className="p-4 border-b">
          <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Product Type Filter */}
        <Collapsible open={openSections.productType} onOpenChange={() => toggleSection('productType')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left border-b hover:bg-gray-50">
            <span className="font-medium">PRODUCT TYPE</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${openSections.productType ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 border-b">
            <div className="space-y-3">
              {productTypes.map((type) => renderFilterCheckbox('productType', type))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Price Filter */}
        <Collapsible open={openSections.price} onOpenChange={() => toggleSection('price')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left border-b hover:bg-gray-50">
            <span className="font-medium">PRICE</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${openSections.price ? 'rotate-180' : ''}`} />
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
        <Collapsible open={openSections.color} onOpenChange={() => toggleSection('color')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left border-b hover:bg-gray-50">
            <span className="font-medium">COLOR</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${openSections.color ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 border-b">
            <div className="space-y-3">
              {colors.map((color) => renderFilterCheckbox('color', color))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Material Filter */}
        <Collapsible open={openSections.material} onOpenChange={() => toggleSection('material')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left border-b hover:bg-gray-50">
            <span className="font-medium">MATERIAL</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${openSections.material ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 border-b">
            <div className="space-y-3">
              {materials.map((material) => renderFilterCheckbox('material', material))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Gemstone Filter */}
        <Collapsible open={openSections.gemstone} onOpenChange={() => toggleSection('gemstone')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left border-b hover:bg-gray-50">
            <span className="font-medium">GEMSTONE</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${openSections.gemstone ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 border-b">
            <div className="space-y-3">
              {gemstones.map((gemstone) => renderFilterCheckbox('gemstone', gemstone))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Diamond Cut Filter */}
        <Collapsible open={openSections.diamondCut} onOpenChange={() => toggleSection('diamondCut')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left hover:bg-gray-50">
            <span className="font-medium">DIAMOND CUT</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${openSections.diamondCut ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4">
            <div className="space-y-3">
              {diamondCuts.map((cut) => renderFilterCheckbox('diamondCut', cut))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    )
  );

  const pendantTypes = [
    "TENNIS PENDANTS",
    "CUBAN LINK PENDANTS", 
    "BAGUETTE PENDANTS"
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <PromoBar />
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-white">
      <PromoBar />
      <Header />
      
      {/* Desktop Hero Section */}
      {!isMobile && (
        <section className="bg-gray-50 py-12 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                MOISSANITE DIAMOND PENDANTS
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                All Moissanite Iced Out 925 Silver, 14K White, Yellow and Rose Gold Hip Hop Pendants
              </p>
              
              <div className="flex justify-center space-x-8 text-sm text-gray-500">
                {pendantTypes.map((type, index) => (
                  <span key={index} className="border-r border-gray-300 pr-8 last:border-r-0">
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Mobile Hero Section */}
      {isMobile && (
        <section className="bg-gray-50 py-6 px-3">
          <div className="max-w-sm mx-auto">
            <div className="grid grid-cols-4 gap-1.5 mb-4">
              {filteredProducts.slice(0, 4).map((product, index) => (
                <img 
                  key={index}
                  src={product.image_url} 
                  alt={`Pendant ${index + 1}`} 
                  className="w-full aspect-square rounded-lg object-cover"
                />
              ))}
            </div>
            
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-900 mb-2">
                MOISSANITE DIAMOND PENDANTS
              </h1>
              <p className="text-sm text-gray-600 mb-4">
                All Moissanite Iced Out 925 Silver, 14K White, Yellow and Rose Gold Hip Hop Pendants
              </p>
              
              <div className="flex justify-center space-x-3 mb-4 text-xs">
                {pendantTypes.map((type, index) => (
                  <span key={index} className="text-gray-500 border-r border-gray-300 pr-3 last:border-r-0">
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'}`}>
        {/* Desktop Sidebar Filters */}
        {!isMobile && renderDesktopFilters()}

        {/* Products Section */}
        <div className={`flex-1 ${isMobile ? 'py-3 px-3' : 'py-8 px-8'}`}>
          {/* Product count and controls */}
          <div className="flex items-center justify-between mb-4">
            <span className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold`}>
              {filteredProducts.filter(product => hasValidPricing(product)).length} Products
            </span>
            <div className="flex items-center space-x-4">
              {!isMobile && (
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              )}
              {isMobile && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 text-xs px-3 py-1.5"
                >
                  <Filter className="w-3 h-3" />
                  <span>FILTER</span>
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Collapsible Filters */}
          {isMobile && renderMobileFilters()}

          {/* Products Grid - Clean design without badges or overlays */}
          <div className={`grid ${isMobile ? 'grid-cols-2 gap-2' : 'grid-cols-4 gap-4'}`}>
            {filteredProducts
              .filter(product => hasValidPricing(product))
              .map((product) => {
                const basePrice = getBasePrice(product);
                const lengthsAndPrices = product.lengths_and_prices || [];
                const hasVariablePricing = lengthsAndPrices.length > 0;
                
                return (
                  <div 
                    key={product.id} 
                    className="bg-white rounded-lg border hover:shadow-lg transition-shadow cursor-pointer group"
                    onClick={() => setSelectedProduct(product)}
                  >
                    
                    {/* Product Image - Clean without overlays or badges */}
                    <div className="relative aspect-square overflow-hidden rounded-t-lg">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Product Info */}
                    <div className={`${isMobile ? 'p-2 space-y-1.5' : 'p-3 space-y-2'}`}>
                      <div className={`text-gray-500 uppercase ${isMobile ? 'text-xs' : 'text-xs'} font-medium`}>
                        {product.category}
                      </div>
                      
                      <h3 className={`font-medium text-gray-900 line-clamp-2 leading-tight ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center space-x-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`fill-yellow-400 text-yellow-400 ${isMobile ? 'w-2.5 h-2.5' : 'w-3 h-3'}`} />
                          ))}
                        </div>
                        <span className={`text-gray-500 ${isMobile ? 'text-xs' : 'text-xs'}`}>({product.review_count})</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1.5">
                          <span className={`font-bold text-blue-600 ${isMobile ? 'text-sm' : 'text-lg'}`}>
                            {hasVariablePricing ? 'From ' : ''}${(basePrice / 100).toFixed(2)}
                          </span>
                          {product.original_price && product.original_price > basePrice && (
                            <span className={`text-gray-500 line-through ${isMobile ? 'text-xs' : 'text-sm'}`}>
                              ${(product.original_price / 100).toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <PendantProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <Footer />
    </div>
  );
};

export default Pendants;
