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
import VvsSimulantProductModal from '../components/VvsSimulantProductModal';

type VvsSimulantProduct = Tables<'vvs_simulant_products'>;

interface FilterOption {
  value: string;
  count: number;
}

const VvsDiamondSimulants = () => {
  const isMobile = useIsMobile();
  const [products, setProducts] = useState<VvsSimulantProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<VvsSimulantProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<VvsSimulantProduct | null>(null);
  const [sortBy, setSortBy] = useState('featured');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    product_type: [],
    color: [],
    material: [],
    carat_weight: [],
    cut_quality: [],
    clarity_grade: []
  });
  
  // Dynamic filter options
  const [filterOptions, setFilterOptions] = useState<Record<string, FilterOption[]>>({
    product_type: [],
    color: [],
    material: [],
    carat_weight: [],
    cut_quality: [],
    clarity_grade: []
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    generateFilterOptions();
  }, [products]);

  useEffect(() => {
    applyFilters();
  }, [products, selectedFilters, priceFrom, priceTo, sortBy]);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('vvs_simulant_products')
      .select('*')
      .eq('in_stock', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching VVS simulant products:', error);
    } else {
      setProducts(data || []);
    }
  };

  const generateFilterOptions = () => {
    const options: Record<string, FilterOption[]> = {
      product_type: [],
      color: [],
      material: [],
      carat_weight: [],
      cut_quality: [],
      clarity_grade: []
    };

    // Count occurrences of each filter value
    const counts: Record<string, Record<string, number>> = {
      product_type: {},
      color: {},
      material: {},
      carat_weight: {},
      cut_quality: {},
      clarity_grade: {}
    };

    products.forEach(product => {
      ['product_type', 'color', 'material', 'carat_weight', 'cut_quality', 'clarity_grade'].forEach(field => {
        const value = product[field as keyof VvsSimulantProduct] as string;
        if (value && value.trim()) {
          counts[field][value] = (counts[field][value] || 0) + 1;
        }
      });
    });

    // Convert counts to FilterOption arrays
    Object.keys(counts).forEach(field => {
      options[field] = Object.entries(counts[field])
        .map(([value, count]) => ({ value, count }))
        .sort((a, b) => b.count - a.count);
    });

    setFilterOptions(options);
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Apply category filters
    Object.entries(selectedFilters).forEach(([field, values]) => {
      if (values.length > 0) {
        filtered = filtered.filter(product => {
          const productValue = product[field as keyof VvsSimulantProduct] as string;
          return values.includes(productValue);
        });
      }
    });

    // Apply price filters
    if (priceFrom) {
      const minPrice = parseFloat(priceFrom) * 100;
      filtered = filtered.filter(product => product.price >= minPrice);
    }
    if (priceTo) {
      const maxPrice = parseFloat(priceTo) * 100;
      filtered = filtered.filter(product => product.price <= maxPrice);
    }

    // Apply sorting
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
        // Featured - keep current order
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleFilterChange = (field: string, value: string, checked: boolean) => {
    setSelectedFilters(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(v => v !== value)
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({
      product_type: [],
      color: [],
      material: [],
      carat_weight: [],
      cut_quality: [],
      clarity_grade: []
    });
    setPriceFrom('');
    setPriceTo('');
  };

  const renderFilterSection = (title: string, field: string, options: FilterOption[]) => (
    <div className="mb-8">
      <h3 className="font-medium text-gray-900 mb-4 uppercase">{title}</h3>
      <div className="space-y-3 max-h-48 overflow-y-auto">
        {options.map((option) => (
          <div key={option.value} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id={`${field}-${option.value}`}
                checked={selectedFilters[field].includes(option.value)}
                onCheckedChange={(checked) => handleFilterChange(field, option.value, !!checked)}
              />
              <label htmlFor={`${field}-${option.value}`} className="text-sm text-gray-700 cursor-pointer">
                {option.value}
              </label>
            </div>
            <span className="text-sm text-gray-500">({option.count})</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <PromoBar />
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gray-50 py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              VVS DIAMOND SIMULANTS
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Premium VVS Grade Diamond Simulants - Exceptional Clarity & Brilliance
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'}`}>
        {/* Desktop Sidebar Filters */}
        {!isMobile && (
          <div className="w-64 bg-white p-6 border-r border-gray-200 min-h-screen">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-sm text-gray-500">
                Clear All
              </Button>
            </div>
            
            {/* Price Filter */}
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

            {/* Dynamic Filter Sections */}
            {renderFilterSection('Product Type', 'product_type', filterOptions.product_type)}
            {renderFilterSection('Color', 'color', filterOptions.color)}
            {renderFilterSection('Material', 'material', filterOptions.material)}
            {renderFilterSection('Carat Weight', 'carat_weight', filterOptions.carat_weight)}
            {renderFilterSection('Cut Quality', 'cut_quality', filterOptions.cut_quality)}
            {renderFilterSection('Clarity Grade', 'clarity_grade', filterOptions.clarity_grade)}
          </div>
        )}

        {/* Mobile Filters */}
        {isMobile && showFilters && (
          <div className="bg-white p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-sm text-gray-500">
                Clear All
              </Button>
            </div>
            
            {/* Collapsible filter sections for mobile */}
            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left">
                <span className="font-medium">Price Range</span>
                <ChevronDown className="w-4 h-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="pb-4">
                <div className="flex space-x-2 mt-2">
                  <input
                    type="number"
                    value={priceFrom}
                    onChange={(e) => setPriceFrom(e.target.value)}
                    placeholder="Min"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                  <input
                    type="number"
                    value={priceTo}
                    onChange={(e) => setPriceTo(e.target.value)}
                    placeholder="Max"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>

            {Object.entries(filterOptions).map(([field, options]) => {
              if (options.length === 0) return null;
              
              const fieldTitles = {
                product_type: 'Product Type',
                color: 'Color',
                material: 'Material',
                carat_weight: 'Carat Weight',
                cut_quality: 'Cut Quality',
                clarity_grade: 'Clarity Grade'
              };

              return (
                <Collapsible key={field}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left border-t">
                    <span className="font-medium">{fieldTitles[field as keyof typeof fieldTitles]}</span>
                    <ChevronDown className="w-4 h-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pb-4">
                    <div className="space-y-2 mt-2 max-h-32 overflow-y-auto">
                      {options.map((option) => (
                        <div key={option.value} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id={`mobile-${field}-${option.value}`}
                              checked={selectedFilters[field].includes(option.value)}
                              onCheckedChange={(checked) => handleFilterChange(field, option.value, !!checked)}
                            />
                            <label htmlFor={`mobile-${field}-${option.value}`} className="text-sm text-gray-700">
                              {option.value}
                            </label>
                          </div>
                          <span className="text-sm text-gray-500">({option.count})</span>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
          </div>
        )}

        {/* Products Section */}
        <div className={`flex-1 ${isMobile ? 'py-4 px-4' : 'py-8 px-8'}`}>
          {/* Product count and controls */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-lg font-semibold">{filteredProducts.length} Products</span>
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
                  className="flex items-center space-x-2"
                >
                  <Filter className="w-4 h-4" />
                  <span>FILTER</span>
                </Button>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-4`}>
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-lg border hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col space-y-1">
                    {product.in_stock && (
                      <Badge className="text-xs font-semibold bg-green-500 text-white">
                        IN STOCK
                      </Badge>
                    )}
                    {product.discount_percentage && product.discount_percentage > 0 && (
                      <Badge className="text-xs font-semibold bg-red-500 text-white">
                        {product.discount_percentage}% OFF
                      </Badge>
                    )}
                    {product.clarity_grade && (
                      <Badge className="text-xs font-semibold bg-purple-500 text-white">
                        {product.clarity_grade}
                      </Badge>
                    )}
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
                  
                  {/* Specifications */}
                  <div className="text-xs text-gray-600 space-y-1">
                    {product.carat_weight && <div>Weight: {product.carat_weight}</div>}
                    {product.cut_quality && <div>Cut: {product.cut_quality}</div>}
                    {product.clarity_grade && <div>Clarity: {product.clarity_grade}</div>}
                  </div>
                  
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

          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              <Button variant="outline" onClick={clearFilters} className="mt-4">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
      
      {/* Product Modal */}
      <VvsSimulantProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default VvsDiamondSimulants;
