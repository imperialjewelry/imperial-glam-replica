import { useState, useEffect } from 'react';
import { Star, ChevronDown, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Header from '../components/Header';
import PromoBar from '../components/PromoBar';
import Footer from '../components/Footer';
import ProductCheckout from '../components/ProductCheckout';

interface Product {
  id: string;
  stripe_product_id: string;
  name: string;
  description: string;
  price: number;
  original_price: number;
  category: string;
  product_type: string;
  color: string;
  material: string;
  sizes: string[];
  image_url: string;
  rating: number;
  review_count: number;
  discount_percentage: number;
  in_stock: boolean;
  ships_today: boolean;
  featured: boolean;
  stripe_price_id?: string;
}

const Chains = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [openSections, setOpenSections] = useState({
    productType: false,
    price: false,
    color: false,
    material: false
  });

  // Filter states
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('chain_products')
        .select('*')
        .order('featured', { ascending: false });

      if (error) throw error;
      
      // Use the actual data without any modifications
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error loading products",
        description: "Please try refreshing the page.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Get unique filter options from products
  const productTypes = [...new Set(products.map(p => p.product_type))].map(type => ({
    name: type,
    count: products.filter(p => p.product_type === type).length
  }));

  const colors = [...new Set(products.map(p => p.color))].map(color => ({
    name: color,
    count: products.filter(p => p.color === color).length
  }));

  const materials = [...new Set(products.map(p => p.material))].map(material => ({
    name: material,
    count: products.filter(p => p.material === material).length
  }));

  // Filter products based on selections
  const filteredProducts = products.filter(product => {
    if (selectedProductTypes.length > 0 && !selectedProductTypes.includes(product.product_type)) {
      return false;
    }
    if (selectedColors.length > 0 && !selectedColors.includes(product.color)) {
      return false;
    }
    if (selectedMaterials.length > 0 && !selectedMaterials.includes(product.material)) {
      return false;
    }
    if (priceFrom && product.price < parseInt(priceFrom) * 100) {
      return false;
    }
    if (priceTo && product.price > parseInt(priceTo) * 100) {
      return false;
    }
    return true;
  });

  // Filter products that have stripe_price_id
  const validProducts = filteredProducts.filter(product => product.stripe_price_id);

  const chainTypes = [
    "TENNIS CHAINS",
    "CUBAN LINK CHAINS", 
    "BAGUETTE CHAINS"
  ];

  const renderDesktopFilters = () => (
    <div className="w-64 bg-white p-6 border-r border-gray-200 min-h-screen">
      <h2 className="text-lg font-semibold mb-6">Filters</h2>
      
      {/* Product Type */}
      <div className="mb-8">
        <h3 className="font-medium text-gray-900 mb-4 uppercase">PRODUCT TYPE</h3>
        <div className="space-y-3">
          {productTypes.map((type) => (
            <div key={type.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id={`desktop-${type.name}`}
                  checked={selectedProductTypes.includes(type.name)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedProductTypes([...selectedProductTypes, type.name]);
                    } else {
                      setSelectedProductTypes(selectedProductTypes.filter(t => t !== type.name));
                    }
                  }}
                />
                <label htmlFor={`desktop-${type.name}`} className="text-sm text-gray-700">
                  {type.name}
                </label>
              </div>
              <span className="text-sm text-gray-500">({type.count})</span>
            </div>
          ))}
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
          {colors.map((color) => (
            <div key={color.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id={`desktop-${color.name}`}
                  checked={selectedColors.includes(color.name)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedColors([...selectedColors, color.name]);
                    } else {
                      setSelectedColors(selectedColors.filter(c => c !== color.name));
                    }
                  }}
                />
                <label htmlFor={`desktop-${color.name}`} className="text-sm text-gray-700">
                  {color.name}
                </label>
              </div>
              <span className="text-sm text-gray-500">({color.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Material */}
      <div className="mb-8">
        <h3 className="font-medium text-gray-900 mb-4 uppercase">MATERIAL</h3>
        <div className="space-y-3">
          {materials.map((material) => (
            <div key={material.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id={`desktop-${material.name}`}
                  checked={selectedMaterials.includes(material.name)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedMaterials([...selectedMaterials, material.name]);
                    } else {
                      setSelectedMaterials(selectedMaterials.filter(m => m !== material.name));
                    }
                  }}
                />
                <label htmlFor={`desktop-${material.name}`} className="text-sm text-gray-700">
                  {material.name}
                </label>
              </div>
              <span className="text-sm text-gray-500">({material.count})</span>
            </div>
          ))}
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
              {productTypes.map((type) => (
                <div key={type.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id={type.name}
                      checked={selectedProductTypes.includes(type.name)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedProductTypes([...selectedProductTypes, type.name]);
                        } else {
                          setSelectedProductTypes(selectedProductTypes.filter(t => t !== type.name));
                        }
                      }}
                    />
                    <label htmlFor={type.name} className="text-sm text-gray-700">
                      {type.name}
                    </label>
                  </div>
                  <span className="text-sm text-gray-500">({type.count})</span>
                </div>
              ))}
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
              {colors.map((color) => (
                <div key={color.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id={color.name}
                      checked={selectedColors.includes(color.name)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedColors([...selectedColors, color.name]);
                        } else {
                          setSelectedColors(selectedColors.filter(c => c !== color.name));
                        }
                      }}
                    />
                    <label htmlFor={color.name} className="text-sm text-gray-700">
                      {color.name}
                    </label>
                  </div>
                  <span className="text-sm text-gray-500">({color.count})</span>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Material Filter */}
        <Collapsible open={openSections.material} onOpenChange={() => toggleSection('material')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left hover:bg-gray-50">
            <span className="font-medium">MATERIAL</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${openSections.material ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4">
            <div className="space-y-3">
              {materials.map((material) => (
                <div key={material.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id={material.name}
                      checked={selectedMaterials.includes(material.name)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedMaterials([...selectedMaterials, material.name]);
                        } else {
                          setSelectedMaterials(selectedMaterials.filter(m => m !== material.name));
                        }
                      }}
                    />
                    <label htmlFor={material.name} className="text-sm text-gray-700">
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
    )
  );

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
                MOISSANITE DIAMOND CHAINS
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                All Moissanite Iced Out 925 Silver, 14K White, Yellow and Rose Gold Hip Hop Chains
              </p>
              
              {/* Chain Types Navigation */}
              <div className="flex justify-center space-x-8 text-sm text-gray-500">
                {chainTypes.map((type, index) => (
                  <span key={index} className="border-r border-gray-300 pr-8 last:border-r-0">
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Mobile Hero Section - Fixed spacing and margins */}
      {isMobile && (
        <section className="bg-gray-50 py-6 px-3">
          <div className="max-w-sm mx-auto">
            {/* Hero Images */}
            <div className="grid grid-cols-4 gap-1.5 mb-4">
              {filteredProducts.slice(0, 4).map((product, index) => (
                <img 
                  key={index}
                  src={product.image_url} 
                  alt={`Chain ${index + 1}`} 
                  className="w-full aspect-square rounded-lg object-cover"
                />
              ))}
            </div>
            
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-900 mb-2">
                MOISSANITE DIAMOND CHAINS
              </h1>
              <p className="text-sm text-gray-600 mb-4">
                All Moissanite Iced Out 925 Silver, 14K White, Yellow and Rose Gold Hip Hop Chains
              </p>
              
              {/* Chain Types Navigation */}
              <div className="flex justify-center space-x-3 mb-4 text-xs">
                {chainTypes.map((type, index) => (
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

        {/* Products Section - Fixed mobile spacing */}
        <div className={`flex-1 ${isMobile ? 'py-3 px-3' : 'py-8 px-8'}`}>
          {/* Product count and controls */}
          <div className="flex items-center justify-between mb-4">
            <span className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold`}>
              {validProducts.length} Products
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

          {/* Products Grid - Fixed mobile spacing and button sizing */}
          <div className={`grid ${isMobile ? 'grid-cols-2 gap-2' : 'grid-cols-4 gap-4'}`}>
            {validProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg border hover:shadow-lg transition-shadow">
                
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Badges - Smaller on mobile */}
                  <div className="absolute top-1.5 left-1.5 flex flex-col space-y-1">
                    {product.in_stock && (
                      <Badge className={`bg-blue-500 text-white font-semibold ${isMobile ? 'text-xs px-1.5 py-0.5' : 'text-xs'}`}>
                        IN STOCK
                      </Badge>
                    )}
                    {product.discount_percentage > 0 && (
                      <Badge className={`bg-red-500 text-white font-semibold ${isMobile ? 'text-xs px-1.5 py-0.5' : 'text-xs'}`}>
                        {product.discount_percentage}% OFF
                      </Badge>
                    )}
                    {product.ships_today && (
                      <Badge className={`bg-green-500 text-white font-semibold ${isMobile ? 'text-xs px-1.5 py-0.5' : 'text-xs'}`}>
                        SHIPS TODAY
                      </Badge>
                    )}
                  </div>

                  {/* Size options */}
                  {product.sizes && product.sizes.length > 0 && (
                    <div className="absolute bottom-1.5 left-1.5 flex flex-wrap gap-1">
                      {product.sizes.slice(0, 2).map((size, index) => (
                        <Badge key={index} variant="secondary" className={`${isMobile ? 'text-xs px-1 py-0.5' : 'text-xs'}`}>
                          {size}
                        </Badge>
                      ))}
                      {product.sizes.length > 2 && (
                        <Badge variant="secondary" className={`${isMobile ? 'text-xs px-1 py-0.5' : 'text-xs'}`}>
                          +{product.sizes.length - 2}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>

                {/* Product Info - Adjusted mobile spacing */}
                <div className={`${isMobile ? 'p-2 space-y-1.5' : 'p-3 space-y-2'}`}>
                  <div className={`text-gray-500 uppercase ${isMobile ? 'text-xs' : 'text-xs'}`}>
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
                        ${(product.price / 100).toFixed(2)}
                      </span>
                      {product.original_price && (
                        <span className={`text-gray-500 line-through ${isMobile ? 'text-xs' : 'text-sm'}`}>
                          ${(product.original_price / 100).toFixed(2)}
                        </span>
                      )}
                    </div>
                    
                    {/* Buy Now Button - Properly sized for mobile */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          className={`bg-blue-500 hover:bg-blue-600 text-white ${
                            isMobile 
                              ? 'text-xs px-2 py-1 h-7 min-w-0' 
                              : 'text-xs px-3 py-1'
                          }`}
                          onClick={() => setSelectedProduct(product)}
                        >
                          Buy
                        </Button>
                      </DialogTrigger>
                      <DialogContent className={`${isMobile ? 'max-w-[95vw] mx-2' : 'max-w-md'}`}>
                        <DialogHeader>
                          <DialogTitle className={`${isMobile ? 'text-sm' : ''}`}>
                            {product.name}
                          </DialogTitle>
                        </DialogHeader>
                        {selectedProduct && selectedProduct.stripe_price_id && (
                          <ProductCheckout product={{
                            id: selectedProduct.id,
                            name: selectedProduct.name,
                            price: selectedProduct.price,
                            image_url: selectedProduct.image_url,
                            stripe_product_id: selectedProduct.stripe_product_id,
                            stripe_price_id: selectedProduct.stripe_price_id,
                            sizes: selectedProduct.sizes
                          }} />
                        )}
                      </DialogContent>
                    </Dialog>
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

export default Chains;
