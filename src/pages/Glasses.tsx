
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

type GlassesProduct = Tables<'glasses_products'>;

const Glasses = () => {
  const isMobile = useIsMobile();
  const [products, setProducts] = useState<GlassesProduct[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [openSections, setOpenSections] = useState({
    productType: false,
    price: false,
    color: false,
    lensColor: false
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('glasses_products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching glasses products:', error);
    } else {
      setProducts(data || []);
    }
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const productTypes = [
    { name: "Custom Sunglasses", count: 9 },
    { name: "Fleuree Glasses", count: 3 },
    { name: "Classic Glasses", count: 2 },
    { name: "Aviator Glasses", count: 1 },
    { name: "Rectangle Glasses", count: 1 },
    { name: "Square Glasses", count: 1 },
    { name: "Wayfarer Glasses", count: 1 },
    { name: "Ankh Glasses", count: 1 },
    { name: "Prong Sunglasses", count: 1 }
  ];

  const colors = [
    { name: "Yellow Gold", count: 6 },
    { name: "White Gold", count: 9 },
    { name: "Rose Gold", count: 6 }
  ];

  const lensColors = [
    { name: "Black", count: 8 },
    { name: "Clear", count: 7 },
    { name: "Blue", count: 4 },
    { name: "Pink", count: 5 },
    { name: "Brown", count: 4 },
    { name: "Burgundy & Clear", count: 1 },
    { name: "Navy", count: 1 },
    { name: "Dark Blue", count: 2 },
    { name: "Red", count: 1 }
  ];

  const glassesTypes = [
    "SUNGLASSES",
    "PRESCRIPTION GLASSES", 
    "DESIGNER FRAMES"
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
                <Checkbox id={`desktop-${type.name}`} />
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
                <Checkbox id={`desktop-${color.name}`} />
                <label htmlFor={`desktop-${color.name}`} className="text-sm text-gray-700">
                  {color.name}
                </label>
              </div>
              <span className="text-sm text-gray-500">({color.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lens Color */}
      <div className="mb-8">
        <h3 className="font-medium text-gray-900 mb-4 uppercase">LENS COLOR</h3>
        <div className="space-y-3">
          {lensColors.map((lensColor) => (
            <div key={lensColor.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id={`desktop-${lensColor.name}`} />
                <label htmlFor={`desktop-${lensColor.name}`} className="text-sm text-gray-700">
                  {lensColor.name}
                </label>
              </div>
              <span className="text-sm text-gray-500">({lensColor.count})</span>
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
                    <Checkbox id={type.name} />
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
                    <Checkbox id={color.name} />
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

        {/* Lens Color Filter */}
        <Collapsible open={openSections.lensColor} onOpenChange={() => toggleSection('lensColor')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left hover:bg-gray-50">
            <span className="font-medium">LENS COLOR</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${openSections.lensColor ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4">
            <div className="space-y-3">
              {lensColors.map((lensColor) => (
                <div key={lensColor.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id={lensColor.name} />
                    <label htmlFor={lensColor.name} className="text-sm text-gray-700">
                      {lensColor.name}
                    </label>
                  </div>
                  <span className="text-sm text-gray-500">({lensColor.count})</span>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    )
  );

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
                MOISSANITE DIAMOND GLASSES
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                All Moissanite Iced Out 14K White, Yellow and Rose Gold Designer Glasses
              </p>
              
              {/* Glasses Types Navigation */}
              <div className="flex justify-center space-x-8 text-sm text-gray-500">
                {glassesTypes.map((type, index) => (
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
        <section className="bg-gray-50 py-8 px-4">
          <div className="max-w-sm mx-auto">
            {/* Hero Images */}
            <div className="grid grid-cols-4 gap-2 mb-6">
              <img 
                src="https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=200&q=80" 
                alt="Glasses 1" 
                className="w-full aspect-square rounded-lg object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=200&q=80" 
                alt="Glasses 2" 
                className="w-full aspect-square rounded-lg object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=200&q=80" 
                alt="Glasses 3" 
                className="w-full aspect-square rounded-lg object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=200&q=80" 
                alt="Glasses 4" 
                className="w-full aspect-square rounded-lg object-cover"
              />
            </div>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                MOISSANITE DIAMOND GLASSES
              </h1>
              <p className="text-sm text-gray-600 mb-6">
                All Moissanite Iced Out 14K White, Yellow and Rose Gold Designer Glasses
              </p>
              
              {/* Glasses Types Navigation */}
              <div className="flex justify-center space-x-4 mb-6 text-xs">
                {glassesTypes.map((type, index) => (
                  <span key={index} className="text-gray-500 border-r border-gray-300 pr-4 last:border-r-0">
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
        {!isMobile && (
          <div className="w-64 bg-white p-6 border-r border-gray-200 min-h-screen">
            <h2 className="text-lg font-semibold mb-6">Filters</h2>
            
            {/* Product Type */}
            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-4 uppercase">PRODUCT TYPE</h3>
              <div className="space-y-3">
                {productTypes.map((type) => (
                  <div key={type.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id={`desktop-${type.name}`} />
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
                      <Checkbox id={`desktop-${color.name}`} />
                      <label htmlFor={`desktop-${color.name}`} className="text-sm text-gray-700">
                        {color.name}
                      </label>
                    </div>
                    <span className="text-sm text-gray-500">({color.count})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Lens Color */}
            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-4 uppercase">LENS COLOR</h3>
              <div className="space-y-3">
                {lensColors.map((lensColor) => (
                  <div key={lensColor.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id={`desktop-${lensColor.name}`} />
                      <label htmlFor={`desktop-${lensColor.name}`} className="text-sm text-gray-700">
                        {lensColor.name}
                      </label>
                    </div>
                    <span className="text-sm text-gray-500">({lensColor.count})</span>
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
            <span className="text-lg font-semibold">{products.length} Products</span>
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

          {/* Mobile Collapsible Filters */}
          {isMobile && showFilters && (
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
                          <Checkbox id={type.name} />
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
                          <Checkbox id={color.name} />
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

              {/* Lens Color Filter */}
              <Collapsible open={openSections.lensColor} onOpenChange={() => toggleSection('lensColor')}>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left hover:bg-gray-50">
                  <span className="font-medium">LENS COLOR</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openSections.lensColor ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4">
                  <div className="space-y-3">
                    {lensColors.map((lensColor) => (
                      <div key={lensColor.name} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox id={lensColor.name} />
                          <label htmlFor={lensColor.name} className="text-sm text-gray-700">
                            {lensColor.name}
                          </label>
                        </div>
                        <span className="text-sm text-gray-500">({lensColor.count})</span>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          )}

          {/* Products Grid */}
          <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-4`}>
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg border hover:shadow-lg transition-shadow">
                
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
                      <Badge className="text-xs font-semibold bg-blue-500 text-white">
                        IN STOCK
                      </Badge>
                    )}
                    {product.discount_percentage && product.discount_percentage > 0 && (
                      <Badge className="text-xs font-semibold bg-red-500 text-white">
                        {product.discount_percentage}% OFF
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

export default Glasses;
