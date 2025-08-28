import { useState, useMemo } from 'react';
import { Star, ChevronDown, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import BraceletProductModal from '@/components/BraceletProductModal';
import Header from '../components/Header';
import PromoBar from '../components/PromoBar';
import Footer from '../components/Footer';
import { Tables } from '@/integrations/supabase/types';

interface LengthPrice {
  length: string;
  price: number;
  stripe_price_id: string;
}

interface Product extends Omit<Tables<'bracelet_products'>, 'lengths_and_prices'> {
  lengths_and_prices?: LengthPrice[];
}

const Bracelets = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('ALL BRACELETS');
  const [sortBy, setSortBy] = useState('featured');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Filter states
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  // Helper function to get starting price for products with multiple lengths
  const getStartingPrice = (product: Product): number => {
    if (product.lengths_and_prices && Array.isArray(product.lengths_and_prices)) {
      const lengthsAndPrices = product.lengths_and_prices;
      if (lengthsAndPrices.length > 0) {
        const prices = lengthsAndPrices.map(lp => lp.price);
        return Math.min(...prices);
      }
    }
    return product.price || 0;
  };

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['bracelet-products'],
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from('bracelet_products')
        .select('*')
        .order('featured', { ascending: false });
      
      if (error) {
        console.error('Error fetching bracelet products:', error);
        throw error;
      }
      
      return (data || []).map(product => ({
        ...product,
        lengths_and_prices: Array.isArray(product.lengths_and_prices) 
          ? (product.lengths_and_prices as unknown as LengthPrice[])
          : undefined
      }));
    },
  });

  // Filter products that have either stripe_price_id or lengths_and_prices
  const validProducts = products.filter(product => 
    product.stripe_price_id || (product.lengths_and_prices && Array.isArray(product.lengths_and_prices))
  );

  // Calculate dynamic filter options and counts
  const filterOptions = useMemo(() => {
    const productTypes = new Set<string>();
    const colors = new Set<string>();
    const materials = new Set<string>();
    
    const productTypeCounts: Record<string, number> = {};
    const colorCounts: Record<string, number> = {};
    const materialCounts: Record<string, number> = {};

    validProducts.forEach(product => {
      // Extract unique product types
      if (product.product_type) {
        const type = product.product_type.trim();
        if (type) {
          productTypes.add(type);
          productTypeCounts[type] = (productTypeCounts[type] || 0) + 1;
        }
      }

      // Extract unique colors
      if (product.color) {
        const color = product.color.trim();
        if (color) {
          colors.add(color);
          colorCounts[color] = (colorCounts[color] || 0) + 1;
        }
      }

      // Extract unique materials
      if (product.material) {
        const material = product.material.trim();
        if (material) {
          materials.add(material);
          materialCounts[material] = (materialCounts[material] || 0) + 1;
        }
      }
    });

    return {
      productTypes: Array.from(productTypes).sort(),
      colors: Array.from(colors).sort(),
      materials: Array.from(materials).sort(),
      productTypeCounts,
      colorCounts,
      materialCounts
    };
  }, [validProducts]);

  // Apply filters
  const filteredProducts = validProducts.filter(product => {
    // Category filter based on active tab
    if (activeTab === 'TENNIS BRACELETS') {
      const isTennis = product.name?.toLowerCase().includes('tennis') || 
                      product.product_type?.toLowerCase().includes('tennis') ||
                      product.category?.toLowerCase().includes('tennis');
      if (!isTennis) return false;
    }
    if (activeTab === 'CUBAN LINK BRACELETS') {
      const isCuban = product.name?.toLowerCase().includes('cuban') || 
                      product.product_type?.toLowerCase().includes('cuban') ||
                      product.category?.toLowerCase().includes('cuban');
      if (!isCuban) return false;
    }
    if (activeTab === 'BAGUETTE BRACELETS') {
      const isBaguette = product.name?.toLowerCase().includes('baguette') || 
                         product.product_type?.toLowerCase().includes('baguette') ||
                         product.category?.toLowerCase().includes('baguette');
      if (!isBaguette) return false;
    }

    // Product type filter
    if (selectedProductTypes.length > 0) {
      const productTypeMatch = selectedProductTypes.some(type => 
        product.product_type === type
      );
      if (!productTypeMatch) return false;
    }

    // Color filter
    if (selectedColors.length > 0) {
      const colorMatch = selectedColors.some(color => 
        product.color === color
      );
      if (!colorMatch) return false;
    }

    // Material filter
    if (selectedMaterials.length > 0) {
      const materialMatch = selectedMaterials.some(material => 
        product.material === material
      );
      if (!materialMatch) return false;
    }

    // Price filter
    const productPrice = getStartingPrice(product);
    if (priceFrom && productPrice < parseInt(priceFrom) * 100) return false;
    if (priceTo && productPrice > parseInt(priceTo) * 100) return false;

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return getStartingPrice(a) - getStartingPrice(b);
      case 'price-high':
        return getStartingPrice(b) - getStartingPrice(a);
      case 'newest':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case 'featured':
      default:
        return (b.featured === a.featured) ? 0 : (b.featured ? 1 : -1);
    }
  });

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  // Filter handlers
  const handleProductTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setSelectedProductTypes(prev => [...prev, type]);
    } else {
      setSelectedProductTypes(prev => prev.filter(t => t !== type));
    }
  };

  const handleColorChange = (color: string, checked: boolean) => {
    if (checked) {
      setSelectedColors(prev => [...prev, color]);
    } else {
      setSelectedColors(prev => prev.filter(c => c !== color));
    }
  };

  const handleMaterialChange = (material: string, checked: boolean) => {
    if (checked) {
      setSelectedMaterials(prev => [...prev, material]);
    } else {
      setSelectedMaterials(prev => prev.filter(m => m !== material));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <PromoBar />
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading bracelets...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <PromoBar />
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-500">
            Error loading bracelets. Please try again later.
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
      
      {/* Hero Section */}
      <section className="bg-gray-50 py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              MOISSANITE DIAMOND BRACELETS
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              All Moissanite Iced Out 925 Silver, 14K White, Yellow and Rose Gold Hip Hop Bracelets
            </p>
            
            {/* Category Tabs */}
            <div className="flex justify-center space-x-8 mb-8">
              {['ALL BRACELETS', 'TENNIS BRACELETS', 'CUBAN LINK BRACELETS', 'BAGUETTE BRACELETS'].map((tab) => (
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
            {filterOptions.productTypes.length > 0 && (
              <Collapsible defaultOpen className="mb-6">
                <CollapsibleTrigger className="flex items-center justify-between w-full font-medium">
                  PRODUCT TYPE
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 space-y-2">
                  {filterOptions.productTypes.map((type) => (
                    <div key={type} className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id={`product-type-${type}`} 
                          checked={selectedProductTypes.includes(type)}
                          onCheckedChange={(checked) => handleProductTypeChange(type, checked as boolean)}
                        />
                        <label htmlFor={`product-type-${type}`} className="text-sm">{type}</label>
                      </div>
                      <span className="text-xs text-gray-500">({filterOptions.productTypeCounts[type] || 0})</span>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            )}

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
            {filterOptions.colors.length > 0 && (
              <Collapsible defaultOpen className="mb-6">
                <CollapsibleTrigger className="flex items-center justify-between w-full font-medium">
                  COLOR
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 space-y-2">
                  {filterOptions.colors.map((color) => (
                    <div key={color} className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id={`color-${color}`} 
                          checked={selectedColors.includes(color)}
                          onCheckedChange={(checked) => handleColorChange(color, checked as boolean)}
                        />
                        <label htmlFor={`color-${color}`} className="text-sm">{color}</label>
                      </div>
                      <span className="text-xs text-gray-500">({filterOptions.colorCounts[color] || 0})</span>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Material */}
            {filterOptions.materials.length > 0 && (
              <Collapsible defaultOpen className="mb-6">
                <CollapsibleTrigger className="flex items-center justify-between w-full font-medium">
                  MATERIAL
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 space-y-2">
                  {filterOptions.materials.map((material) => (
                    <div key={material} className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id={`material-${material}`} 
                          checked={selectedMaterials.includes(material)}
                          onCheckedChange={(checked) => handleMaterialChange(material, checked as boolean)}
                        />
                        <label htmlFor={`material-${material}`} className="text-sm">{material}</label>
                      </div>
                      <span className="text-xs text-gray-500">({filterOptions.materialCounts[material] || 0})</span>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            )}
          </div>
        )}

        {/* Products Section */}
        <div className={`flex-1 ${isMobile ? 'py-4 px-4' : 'py-8 px-8'}`}>
          <div className="flex items-center justify-between mb-6">
            <span className="text-lg font-semibold">{sortedProducts.length} Products</span>
            
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
          <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-6`}>
            {sortedProducts.map((product) => {
              const startingPrice = getStartingPrice(product);
              const displayPrice = startingPrice > 0 ? startingPrice : product.price;
              
              return (
                <div 
                  key={product.id} 
                  className="bg-white rounded-lg border hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleProductClick(product)}
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
                        ${(displayPrice / 100).toFixed(2)}
                      </span>
                      {product.original_price && product.original_price > displayPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          ${(product.original_price / 100).toFixed(2)}
                        </span>
                      )}
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
        <BraceletProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}

      <Footer />
    </div>
  );
};

export default Bracelets;
