
import { useState } from 'react';
import { Star, ChevronDown, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useIsMobile } from '@/hooks/use-mobile';
import Header from '../components/Header';
import PromoBar from '../components/PromoBar';
import Footer from '../components/Footer';

const Watches = () => {
  const isMobile = useIsMobile();
  const [sortBy, setSortBy] = useState('featured');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [openSections, setOpenSections] = useState({
    productType: false,
    price: false,
    color: false,
    dialColor: false,
    size: false
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const products = [
    {
      id: 1,
      name: "Presidential Moissanite Watch 14K Gold",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      category: "PRESIDENTIAL / UNISEX",
      price: 1850,
      originalPrice: 1947,
      rating: 5,
      reviews: 342,
      badges: ["IN STOCK", "5% OFF"],
      sizes: ["41MM", "42MM"]
    },
    {
      id: 2,
      name: "Bust Down VVS Diamond Watch 14K Gold",
      image: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?auto=format&fit=crop&w=800&q=80",
      category: "BUST DOWN / UNISEX",
      price: 2450,
      originalPrice: 2578,
      rating: 5,
      reviews: 156,
      badges: ["IN STOCK", "5% OFF"],
      sizes: ["40MM", "41MM"]
    },
    {
      id: 3,
      name: "Colored Dial Tennis Watch 14K Gold",
      image: "https://images.unsplash.com/photo-1548181622-7187e8b5c5b4?auto=format&fit=crop&w=800&q=80",
      category: "COLORED DIAL / UNISEX",
      price: 1680,
      originalPrice: 1768,
      rating: 5,
      reviews: 289,
      badges: ["IN STOCK", "5% OFF"],
      sizes: ["41MM", "42MM"]
    },
    {
      id: 4,
      name: "Skeleton Automatic Watch 14K White Gold",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      category: "SKELETON / UNISEX",
      price: 2890,
      originalPrice: 3042,
      rating: 5,
      reviews: 89,
      badges: ["IN STOCK", "5% OFF"]
    },
    {
      id: 5,
      name: "Presidential Blue Dial Watch 14K Rose Gold",
      image: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?auto=format&fit=crop&w=800&q=80",
      category: "PRESIDENTIAL / UNISEX",
      price: 1950,
      originalPrice: 2052,
      rating: 5,
      reviews: 234,
      badges: ["IN STOCK", "5% OFF"]
    },
    {
      id: 6,
      name: "Bust Down Black Dial Watch 14K Gold",
      image: "https://images.unsplash.com/photo-1548181622-7187e8b5c5b4?auto=format&fit=crop&w=800&q=80",
      category: "BUST DOWN / UNISEX",
      price: 2650,
      originalPrice: 2789,
      rating: 5,
      reviews: 178,
      badges: ["IN STOCK", "5% OFF"]
    }
  ];

  const productTypes = [
    { name: "Presidential Watches", count: 12 },
    { name: "Ships Today", count: 12 },
    { name: "Colored Dial Watches", count: 9 },
    { name: "Bust Down Watches", count: 4 },
    { name: "Skeleton Watches", count: 3 }
  ];

  const colors = [
    { name: "Yellow Gold", count: 8 },
    { name: "White Gold", count: 12 },
    { name: "Rose Gold", count: 6 }
  ];

  const dialColors = [
    { name: "Black", count: 2 },
    { name: "Blue", count: 2 },
    { name: "Green", count: 2 },
    { name: "Red", count: 2 },
    { name: "White", count: 1 }
  ];

  const sizes = [
    { name: "41MM", count: 12 },
    { name: "42MM", count: 6 },
    { name: "40MM", count: 3 },
    { name: "44MM", count: 4 }
  ];

  const watchTypes = [
    "PRESIDENTIAL WATCHES",
    "BUST DOWN WATCHES", 
    "SKELETON WATCHES"
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

      {/* Dial Color */}
      <div className="mb-8">
        <h3 className="font-medium text-gray-900 mb-4 uppercase">DIAL COLOR</h3>
        <div className="space-y-3">
          {dialColors.map((dialColor) => (
            <div key={dialColor.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id={`desktop-${dialColor.name}`} />
                <label htmlFor={`desktop-${dialColor.name}`} className="text-sm text-gray-700">
                  {dialColor.name}
                </label>
              </div>
              <span className="text-sm text-gray-500">({dialColor.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="mb-8">
        <h3 className="font-medium text-gray-900 mb-4 uppercase">SIZE</h3>
        <div className="space-y-3">
          {sizes.map((size) => (
            <div key={size.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id={`desktop-${size.name}`} />
                <label htmlFor={`desktop-${size.name}`} className="text-sm text-gray-700">
                  {size.name}
                </label>
              </div>
              <span className="text-sm text-gray-500">({size.count})</span>
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

        {/* Dial Color Filter */}
        <Collapsible open={openSections.dialColor} onOpenChange={() => toggleSection('dialColor')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left border-b hover:bg-gray-50">
            <span className="font-medium">DIAL COLOR</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${openSections.dialColor ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 border-b">
            <div className="space-y-3">
              {dialColors.map((dialColor) => (
                <div key={dialColor.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id={dialColor.name} />
                    <label htmlFor={dialColor.name} className="text-sm text-gray-700">
                      {dialColor.name}
                    </label>
                  </div>
                  <span className="text-sm text-gray-500">({dialColor.count})</span>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Size Filter */}
        <Collapsible open={openSections.size} onOpenChange={() => toggleSection('size')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left hover:bg-gray-50">
            <span className="font-medium">SIZE</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${openSections.size ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4">
            <div className="space-y-3">
              {sizes.map((size) => (
                <div key={size.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id={size.name} />
                    <label htmlFor={size.name} className="text-sm text-gray-700">
                      {size.name}
                    </label>
                  </div>
                  <span className="text-sm text-gray-500">({size.count})</span>
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
                MOISSANITE DIAMOND WATCHES
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                All Moissanite Iced Out 925 Silver, 14K White, Yellow and Rose Gold Hip Hop Watches
              </p>
              
              {/* Watch Types Navigation */}
              <div className="flex justify-center space-x-8 text-sm text-gray-500">
                {watchTypes.map((type, index) => (
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
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                MOISSANITE DIAMOND WATCHES
              </h1>
              <p className="text-sm text-gray-600 mb-6">
                All Moissanite Iced Out 925 Silver, 14K White, Yellow and Rose Gold Hip Hop Watches
              </p>
              
              {/* Watch Types Navigation */}
              <div className="flex justify-center space-x-4 mb-6 text-xs">
                {watchTypes.map((type, index) => (
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
        {!isMobile && renderDesktopFilters()}

        {/* Products Section */}
        <div className={`flex-1 ${isMobile ? 'py-4 px-4' : 'py-8 px-8'}`}>
          {/* Product count and controls */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-lg font-semibold">40 Products</span>
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
          {isMobile && renderMobileFilters()}

          {/* Products Grid */}
          <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-4`}>
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg border hover:shadow-lg transition-shadow">
                
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col space-y-1">
                    {product.badges.map((badge, index) => (
                      <Badge
                        key={index}
                        className={`text-xs font-semibold ${
                          badge.includes('STOCK') 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-red-500 text-white'
                        }`}
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>

                  {/* Size options */}
                  {product.sizes && (
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
                    <span className="text-xs text-gray-500">({product.reviews})</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-blue-600">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
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

export default Watches;
