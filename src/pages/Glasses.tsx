import { useState, useEffect } from 'react';
import { Star, ChevronDown, Filter, Eye } from 'lucide-react';
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
import GlassesProductModal from '../components/GlassesProductModal';

type GlassesProduct = Tables<'glasses_products'>;

const Glasses = () => {
  const isMobile = useIsMobile();
  const [products, setProducts] = useState<GlassesProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<GlassesProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<GlassesProduct | null>(null);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  // Dynamic filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedLensColors, setSelectedLensColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  // Dynamic filter options
  const [filterOptions, setFilterOptions] = useState({
    categories: [] as { name: string; count: number }[],
    colors: [] as { name: string; count: number }[],
    lensColors: [] as { name: string; count: number }[],
    materials: [] as { name: string; count: number }[],
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    generateFilterOptions();
  }, [products]);

  useEffect(() => {
    applyFilters();
  }, [products, selectedCategories, selectedColors, selectedLensColors, selectedMaterials, priceRange, sortBy]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('glasses_products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching glasses products:', error);
      } else {
        setProducts(data || []);
      }
    } finally {
      setLoading(false);
    }
  };

  const generateFilterOptions = () => {
    const categories = new Map<string, number>();
    const colors = new Map<string, number>();
    const lensColors = new Map<string, number>();
    const materials = new Map<string, number>();

    products.forEach(product => {
      // Categories
      categories.set(product.category, (categories.get(product.category) || 0) + 1);
      
      // Colors
      colors.set(product.color, (colors.get(product.color) || 0) + 1);
      
      // Lens Colors
      if (product.lens_color) {
        lensColors.set(product.lens_color, (lensColors.get(product.lens_color) || 0) + 1);
      }
      
      // Materials
      materials.set(product.material, (materials.get(product.material) || 0) + 1);
    });

    setFilterOptions({
      categories: Array.from(categories.entries()).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count),
      colors: Array.from(colors.entries()).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count),
      lensColors: Array.from(lensColors.entries()).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count),
      materials: Array.from(materials.entries()).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count),
    });
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => selectedCategories.includes(product.category));
    }

    // Apply color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter(product => selectedColors.includes(product.color));
    }

    // Apply lens color filter
    if (selectedLensColors.length > 0) {
      filtered = filtered.filter(product => product.lens_color && selectedLensColors.includes(product.lens_color));
    }

    // Apply material filter
    if (selectedMaterials.length > 0) {
      filtered = filtered.filter(product => selectedMaterials.includes(product.material));
    }

    // Apply price filter
    if (priceRange.min || priceRange.max) {
      filtered = filtered.filter(product => {
        const price = product.price / 100;
        const min = priceRange.min ? parseFloat(priceRange.min) : 0;
        const max = priceRange.max ? parseFloat(priceRange.max) : Infinity;
        return price >= min && price <= max;
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
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    setFilteredProducts(filtered);
  };

  const handleFilterChange = (type: string, value: string) => {
    switch (type) {
      case 'category':
        setSelectedCategories(prev => 
          prev.includes(value) 
            ? prev.filter(item => item !== value)
            : [...prev, value]
        );
        break;
      case 'color':
        setSelectedColors(prev => 
          prev.includes(value) 
            ? prev.filter(item => item !== value)
            : [...prev, value]
        );
        break;
      case 'lensColor':
        setSelectedLensColors(prev => 
          prev.includes(value) 
            ? prev.filter(item => item !== value)
            : [...prev, value]
        );
        break;
      case 'material':
        setSelectedMaterials(prev => 
          prev.includes(value) 
            ? prev.filter(item => item !== value)
            : [...prev, value]
        );
        break;
    }
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedColors([]);
    setSelectedLensColors([]);
    setSelectedMaterials([]);
    setPriceRange({ min: '', max: '' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <PromoBar />
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-lg">Loading glasses...</div>
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
      <section className={`bg-gray-50 ${isMobile ? 'py-8 px-4' : 'py-12 px-8'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <h1 className={`font-bold text-gray-900 mb-4 ${isMobile ? 'text-2xl' : 'text-4xl'}`}>
            MOISSANITE DIAMOND GLASSES
          </h1>
          <p className={`text-gray-600 mb-8 ${isMobile ? 'text-sm' : 'text-lg'}`}>
            All Moissanite Iced Out 14K White, Yellow and Rose Gold Designer Glasses
          </p>
          
          {/* Category Pills */}
          <div className={`flex ${isMobile ? 'flex-wrap justify-center gap-2' : 'justify-center space-x-8'} text-sm text-gray-500`}>
            {['SUNGLASSES', 'PRESCRIPTION GLASSES', 'DESIGNER FRAMES'].map((type, index) => (
              <span key={index} className={`${isMobile ? 'px-3 py-1 bg-gray-200 rounded-full' : 'border-r border-gray-300 pr-8 last:border-r-0'}`}>
                {type}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'}`}>
        {/* Desktop Sidebar Filters */}
        {!isMobile && (
          <div className="w-80 bg-white p-6 border-r border-gray-200 min-h-screen">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Filters</h2>
              {(selectedCategories.length > 0 || selectedColors.length > 0 || selectedLensColors.length > 0 || selectedMaterials.length > 0 || priceRange.min || priceRange.max) && (
                <Button variant="outline" size="sm" onClick={clearAllFilters}>
                  Clear All
                </Button>
              )}
            </div>
            
            {/* Price Filter */}
            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-4 uppercase">PRICE</h3>
              <div className="flex space-x-2">
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">FROM</label>
                  <input
                    type="number"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">TO</label>
                  <input
                    type="number"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-4 uppercase">CATEGORY</h3>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {filterOptions.categories.map((category) => (
                  <div key={category.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id={`category-${category.name}`}
                        checked={selectedCategories.includes(category.name)}
                        onCheckedChange={() => handleFilterChange('category', category.name)}
                      />
                      <label htmlFor={`category-${category.name}`} className="text-sm text-gray-700 cursor-pointer">
                        {category.name}
                      </label>
                    </div>
                    <span className="text-sm text-gray-500">({category.count})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-4 uppercase">COLOR</h3>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {filterOptions.colors.map((color) => (
                  <div key={color.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id={`color-${color.name}`}
                        checked={selectedColors.includes(color.name)}
                        onCheckedChange={() => handleFilterChange('color', color.name)}
                      />
                      <label htmlFor={`color-${color.name}`} className="text-sm text-gray-700 cursor-pointer">
                        {color.name}
                      </label>
                    </div>
                    <span className="text-sm text-gray-500">({color.count})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Lens Color Filter */}
            {filterOptions.lensColors.length > 0 && (
              <div className="mb-8">
                <h3 className="font-medium text-gray-900 mb-4 uppercase">LENS COLOR</h3>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {filterOptions.lensColors.map((lensColor) => (
                    <div key={lensColor.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id={`lens-${lensColor.name}`}
                          checked={selectedLensColors.includes(lensColor.name)}
                          onCheckedChange={() => handleFilterChange('lensColor', lensColor.name)}
                        />
                        <label htmlFor={`lens-${lensColor.name}`} className="text-sm text-gray-700 cursor-pointer">
                          {lensColor.name}
                        </label>
                      </div>
                      <span className="text-sm text-gray-500">({lensColor.count})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Material Filter */}
            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-4 uppercase">MATERIAL</h3>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {filterOptions.materials.map((material) => (
                  <div key={material.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id={`material-${material.name}`}
                        checked={selectedMaterials.includes(material.name)}
                        onCheckedChange={() => handleFilterChange('material', material.name)}
                      />
                      <label htmlFor={`material-${material.name}`} className="text-sm text-gray-700 cursor-pointer">
                        {material.name}
                      </label>
                    </div>
                    <span className="text-sm text-gray-500">({material.count})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Products Section */}
        <div className={`flex-1 ${isMobile ? 'py-4 px-4' : 'py-8 px-8'}`}>
          {/* Product count and controls */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-lg font-semibold">{filteredProducts.length} Products</span>
            <div className="flex items-center space-x-4">
              {!isMobile ? (
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
              ) : (
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

          {/* Mobile Filters */}
          {isMobile && showFilters && (
            <div className="bg-white border rounded-lg mb-6 overflow-hidden">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Filters</h3>
                  {(selectedCategories.length > 0 || selectedColors.length > 0 || selectedLensColors.length > 0 || selectedMaterials.length > 0 || priceRange.min || priceRange.max) && (
                    <Button variant="outline" size="sm" onClick={clearAllFilters}>
                      Clear All
                    </Button>
                  )}
                </div>
                
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

              {/* Mobile Price Filter */}
              <Collapsible>
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
                        value={priceRange.min}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                        placeholder="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs text-gray-500 mb-1">TO</label>
                      <input
                        type="number"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                        placeholder="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Mobile filter sections for categories, colors, lens colors, and materials would go here */}
              {/* Category Filter */}
              <Collapsible>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left border-b hover:bg-gray-50">
                  <span className="font-medium">CATEGORY</span>
                  <ChevronDown className="w-4 h-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 border-b">
                  <div className="space-y-3">
                    {filterOptions.categories.map((category) => (
                      <div key={category.name} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`mobile-category-${category.name}`}
                            checked={selectedCategories.includes(category.name)}
                            onCheckedChange={() => handleFilterChange('category', category.name)}
                          />
                          <label htmlFor={`mobile-category-${category.name}`} className="text-sm text-gray-700 cursor-pointer">
                            {category.name}
                          </label>
                        </div>
                        <span className="text-sm text-gray-500">({category.count})</span>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Color Filter */}
              <Collapsible>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left border-b hover:bg-gray-50">
                  <span className="font-medium">COLOR</span>
                  <ChevronDown className="w-4 h-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 border-b">
                  <div className="space-y-3">
                    {filterOptions.colors.map((color) => (
                      <div key={color.name} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`mobile-color-${color.name}`}
                            checked={selectedColors.includes(color.name)}
                            onCheckedChange={() => handleFilterChange('color', color.name)}
                          />
                          <label htmlFor={`mobile-color-${color.name}`} className="text-sm text-gray-700 cursor-pointer">
                            {color.name}
                          </label>
                        </div>
                        <span className="text-sm text-gray-500">({color.count})</span>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Lens Color Filter */}
              {filterOptions.lensColors.length > 0 && (
                <Collapsible>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left border-b hover:bg-gray-50">
                    <span className="font-medium">LENS COLOR</span>
                    <ChevronDown className="w-4 h-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-4 border-b">
                    <div className="space-y-3">
                      {filterOptions.lensColors.map((lensColor) => (
                        <div key={lensColor.name} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`mobile-lens-${lensColor.name}`}
                              checked={selectedLensColors.includes(lensColor.name)}
                              onCheckedChange={() => handleFilterChange('lensColor', lensColor.name)}
                            />
                            <label htmlFor={`mobile-lens-${lensColor.name}`} className="text-sm text-gray-700 cursor-pointer">
                              {lensColor.name}
                            </label>
                          </div>
                          <span className="text-sm text-gray-500">({lensColor.count})</span>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )}

              {/* Material Filter */}
              <Collapsible>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left hover:bg-gray-50">
                  <span className="font-medium">MATERIAL</span>
                  <ChevronDown className="w-4 h-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4">
                  <div className="space-y-3">
                    {filterOptions.materials.map((material) => (
                      <div key={material.name} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`mobile-material-${material.name}`}
                            checked={selectedMaterials.includes(material.name)}
                            onCheckedChange={() => handleFilterChange('material', material.name)}
                          />
                          <label htmlFor={`mobile-material-${material.name}`} className="text-sm text-gray-700 cursor-pointer">
                            {material.name}
                          </label>
                        </div>
                        <span className="text-sm text-gray-500">({material.count})</span>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          )}

          {/* Products Grid */}
          <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-3 lg:grid-cols-4'} gap-6`}>
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg border hover:shadow-lg transition-shadow group">
                
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Quick View Button */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <Button
                      onClick={() => setSelectedProduct(product)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-black hover:bg-gray-100"
                      size="sm"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Quick View
                    </Button>
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col space-y-1">
                    {product.in_stock && (
                      <Badge className="text-xs font-semibold bg-blue-500 text-white">
                        IN STOCK
                      </Badge>
                    )}
                    {product.discount_percentage && product.discount_percentage > 0 && (
                      <Badge className="text-xs font-semibold bg-red-500 text-white">
                        {product.discount_percentage}% OFF
                      </Badge>
                    )}
                    {product.featured && (
                      <Badge className="text-xs font-semibold bg-yellow-500 text-white">
                        FEATURED
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 space-y-3">
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

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No glasses found matching your filters.</p>
              <Button onClick={clearAllFilters} variant="outline" className="mt-4">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <GlassesProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <Footer />
    </div>
  );
};

export default Glasses;
