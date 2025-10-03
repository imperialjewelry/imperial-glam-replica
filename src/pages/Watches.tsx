import { useState, useEffect } from 'react';
import { Star, ChevronDown, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useIsMobile } from '@/hooks/use-mobile';
import { useProductFilters } from '@/hooks/useProductFilters';
import { Tables } from '@/integrations/supabase/types';
import Header from '../components/Header';
import PromoBar from '../components/PromoBar';
import Footer from '../components/Footer';
import WatchProductModal from '../components/WatchProductModal';
import MobileProductShowcase from '@/components/MobileProductShowcase';
import FilterSection from '@/components/FilterSection';
import { Helmet } from 'react-helmet-async';
type WatchProduct = Tables<'watch_products'>;
const Watches = () => {
  const isMobile = useIsMobile();
  const {
    products,
    filters,
    loading
  } = useProductFilters('watch_products');
  const [filteredProducts, setFilteredProducts] = useState<WatchProduct[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<WatchProduct | null>(null);
  const [selectedFilters, setSelectedFilters] = useState({
    productType: [] as string[],
    color: [] as string[],
    material: [] as string[]
  });
  const [openSections, setOpenSections] = useState({
    productType: false,
    price: false,
    color: false,
    material: false
  });
  useEffect(() => {
    applyFilters();
  }, [products, selectedFilters, priceFrom, priceTo, sortBy]);
  const applyFilters = () => {
    let filtered = [...products];

    // Apply filters
    if (selectedFilters.productType.length > 0) {
      filtered = filtered.filter(product => selectedFilters.productType.includes(product.product_type));
    }
    if (selectedFilters.color.length > 0) {
      filtered = filtered.filter(product => selectedFilters.color.includes(product.color));
    }
    if (selectedFilters.material.length > 0) {
      filtered = filtered.filter(product => selectedFilters.material.includes(product.material));
    }

    // Apply price range filter
    if (priceFrom || priceTo) {
      filtered = filtered.filter(product => {
        const price = product.price / 100;
        const fromPrice = priceFrom ? parseFloat(priceFrom) : 0;
        const toPrice = priceTo ? parseFloat(priceTo) : Infinity;
        return price >= fromPrice && price <= toPrice;
      });
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
        break;
    }
    setFilteredProducts(filtered);
  };
  const handleFilterToggle = (filterType: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters(prev => {
      const currentFilters = prev[filterType];
      const newFilters = currentFilters.includes(value) ? currentFilters.filter(item => item !== value) : [...currentFilters, value];
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
  if (loading) {
    return <div className="min-h-screen bg-white">
        <PromoBar />
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
        <Footer />
      </div>;
  }
  return <div className="min-h-screen bg-white">
      <Helmet>
        <title>Diamond Watches & Hip Hop Watches | Moissanite Iced Out Watches - Imperial Jewelry</title>
        <meta name="description" content="Shop luxury diamond watches, hip hop watches, and moissanite iced out watches in 14k gold, white gold, and silver. Premium watch jewelry with expert craftsmanship and custom designs." />
        <meta name="keywords" content="diamond watches, hip hop watches, moissanite watches, gold watches, iced out watches, luxury watches, 14k gold watches, silver watches, custom watch jewelry, premium timepieces" />
      </Helmet>
      <PromoBar />
      <Header />
      
      {/* Desktop Hero Section */}
      {!isMobile && <div className="bg-gray-50 py-12 px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">WATCHES</h1>
            <p className="text-lg text-gray-600">
              All Moissanite Iced Out 925 Silver, 14K White, Yellow and Rose Gold Hip Hop Watches
            </p>
          </div>
        </div>}

      {/* Mobile Product Showcase */}
      <MobileProductShowcase category="WATCHES" tableName="watch_products" title="WATCHES" description="All Moissanite Iced Out 925 Silver, 14K White, Yellow and Rose Gold Hip Hop Watches" />

      {/* Main Content */}
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'}`}>
        {/* Desktop Sidebar Filters */}
        {!isMobile && <div className="w-64 bg-white p-6 border-r border-gray-200 min-h-screen">
            <h2 className="text-lg font-semibold mb-6">Filters</h2>
            
            <FilterSection title="PRODUCT TYPE" items={filters.productTypes} selectedItems={selectedFilters.productType} onToggle={item => handleFilterToggle('productType', item)} />

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

            <FilterSection title="COLOR" items={filters.colors} selectedItems={selectedFilters.color} onToggle={item => handleFilterToggle('color', item)} />

            <FilterSection title="MATERIAL" items={filters.materials} selectedItems={selectedFilters.material} onToggle={item => handleFilterToggle('material', item)} />
          </div>}

        {/* Products Section */}
        <div className={`flex-1 ${isMobile ? 'py-4 px-4' : 'py-8 px-8'}`}>
          {/* Product count and controls */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-lg font-semibold">{filteredProducts.length} Products</span>
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

          {/* Mobile Filters */}
          {isMobile && showFilters && <div className="bg-white border rounded-lg mb-6 overflow-hidden">
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

              <Collapsible open={openSections.productType} onOpenChange={() => toggleSection('productType')}>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left border-b hover:bg-gray-50">
                  <span className="font-medium">PRODUCT TYPE</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openSections.productType ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 border-b">
                  <FilterSection title="" items={filters.productTypes} selectedItems={selectedFilters.productType} onToggle={item => handleFilterToggle('productType', item)} />
                </CollapsibleContent>
              </Collapsible>

              <Collapsible open={openSections.price} onOpenChange={() => toggleSection('price')}>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left border-b hover:bg-gray-50">
                  <span className="font-medium">PRICE</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openSections.price ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 border-b">
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
                </CollapsibleContent>
              </Collapsible>

              <Collapsible open={openSections.color} onOpenChange={() => toggleSection('color')}>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left border-b hover:bg-gray-50">
                  <span className="font-medium">COLOR</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openSections.color ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 border-b">
                  <FilterSection title="" items={filters.colors} selectedItems={selectedFilters.color} onToggle={item => handleFilterToggle('color', item)} />
                </CollapsibleContent>
              </Collapsible>

              <Collapsible open={openSections.material} onOpenChange={() => toggleSection('material')}>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left border-b hover:bg-gray-50">
                  <span className="font-medium">MATERIAL</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openSections.material ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 border-b">
                  <FilterSection title="" items={filters.materials} selectedItems={selectedFilters.material} onToggle={item => handleFilterToggle('material', item)} />
                </CollapsibleContent>
              </Collapsible>
            </div>}

          {/* Products Grid */}
          <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-4`}>
            {filteredProducts.map(product => <div key={product.id} className="bg-white rounded-lg border hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedProduct(product)}>
                <div className="relative aspect-square overflow-hidden rounded-t-lg">
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  
                  <div className="absolute top-2 left-2 flex flex-col space-y-1">
                    {product.in_stock && <Badge className="text-xs font-semibold bg-blue-500 text-white">
                        IN STOCK
                      </Badge>}
                    {product.discount_percentage && product.discount_percentage > 0 && <Badge className="text-xs font-semibold bg-red-500 text-white">
                        {product.discount_percentage}% OFF
                      </Badge>}
                  </div>
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
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <span className="text-xs text-gray-500">({product.review_count})</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-blue-600">${(product.price / 100).toFixed(2)}</span>
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
      {selectedProduct && <WatchProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}

      <Footer />
    </div>;
};
export default Watches;