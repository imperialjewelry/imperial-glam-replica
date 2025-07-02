
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

const Custom = () => {
  const isMobile = useIsMobile();
  const [sortBy, setSortBy] = useState('featured');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [openSections, setOpenSections] = useState({
    category: false,
    price: false,
    color: false,
    material: false,
    shape: false,
    gemstone: false
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
      name: "Custom Name Pendant 14K Gold",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
      category: "NAME PENDANTS / UNISEX",
      price: 385,
      originalPrice: 405,
      rating: 5,
      reviews: 892,
      badges: ["IN STOCK", "5% OFF"],
      customizable: true
    },
    {
      id: 2,
      name: "Custom Letter Pendant 925 Silver",
      image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80",
      category: "LETTER PENDANTS / UNISEX",
      price: 156,
      originalPrice: 164,
      rating: 5,
      reviews: 445,
      badges: ["IN STOCK", "5% OFF"],
      customizable: true
    },
    {
      id: 3,
      name: "Custom Logo Pendant Moissanite 14K Gold",
      image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80",
      category: "LOGO PENDANTS / UNISEX",
      price: 567,
      originalPrice: 597,
      rating: 5,
      reviews: 328,
      badges: ["IN STOCK", "5% OFF"],
      customizable: true
    },
    {
      id: 4,
      name: "Custom Circle Pendant 925 Silver",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
      category: "CIRCLE PENDANTS / UNISEX",
      price: 278,
      originalPrice: 293,
      rating: 5,
      reviews: 156,
      badges: ["IN STOCK", "5% OFF"],
      customizable: true
    },
    {
      id: 5,
      name: "Custom Chain with Pendant 14K Gold",
      image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80",
      category: "CUSTOMIZED CHAINS / UNISEX",
      price: 789,
      originalPrice: 830,
      rating: 5,
      reviews: 234,
      badges: ["IN STOCK", "5% OFF"],
      customizable: true
    },
    {
      id: 6,
      name: "Custom Ring with Moissanite 14K Gold",
      image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80",
      category: "CUSTOM RINGS / UNISEX",
      price: 445,
      originalPrice: 468,
      rating: 5,
      reviews: 178,
      badges: ["IN STOCK", "5% OFF"],
      customizable: true
    }
  ];

  const categories = [
    { name: "Name Pendants", count: 148 },
    { name: "Letter Pendants", count: 4 },
    { name: "Logo Pendants", count: 108 },
    { name: "Circle Pendants", count: 44 },
    { name: "Customized Chains", count: 1 },
    { name: "Custom Rings", count: 2 },
    { name: "Custom Pendants", count: 5 },
    { name: "Diamond", count: 2 },
    { name: "name Pendants", count: 2 },
    { name: "Pendants", count: 4 }
  ];

  const colors = [
    { name: "Yellow Gold", count: 228 },
    { name: "White Gold", count: 226 },
    { name: "Rose Gold", count: 226 }
  ];

  const materials = [
    { name: "925 Silver", count: 226 },
    { name: "14K Gold", count: 2 }
  ];

  const shapes = [
    { name: "Round", count: 100 },
    { name: "Letters", count: 96 },
    { name: "Circle", count: 50 },
    { name: "Bolt", count: 1 },
    { name: "Crown", count: 2 },
    { name: "Dollar", count: 1 },
    { name: "Dragon", count: 1 },
    { name: "Horn", count: 1 },
    { name: "House", count: 1 },
    { name: "Initials", count: 1 },
    { name: "King", count: 1 },
    { name: "Letter shape", count: 1 },
    { name: "Logo", count: 3 },
    { name: "Name", count: 2 },
    { name: "Name pendant", count: 10 },
    { name: "Number", count: 1 },
    { name: "Numbers", count: 3 },
    { name: "Shield", count: 1 }
  ];

  const gemstones = [
    { name: "Green Moissanite", count: 1 },
    { name: "Moissanite", count: 176 },
    { name: "Purple Moissanite", count: 1 },
    { name: "VVS Moissanite", count: 6 }
  ];

  const customTypes = [
    "NAME PENDANTS",
    "LETTER PENDANTS", 
    "LOGO PENDANTS"
  ];

  const renderDesktopFilters = () => (
    <div className="w-64 bg-white p-6 border-r border-gray-200 min-h-screen">
      <h2 className="text-lg font-semibold mb-6">Filters</h2>
      
      {/* Category */}
      <div className="mb-8">
        <h3 className="font-medium text-gray-900 mb-4 uppercase">CATEGORY</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id={`desktop-${category.name}`} />
                <label htmlFor={`desktop-${category.name}`} className="text-sm text-gray-700">
                  {category.name}
                </label>
              </div>
              <span className="text-sm text-gray-500">({category.count})</span>
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

      {/* Material */}
      <div className="mb-8">
        <h3 className="font-medium text-gray-900 mb-4 uppercase">MATERIAL</h3>
        <div className="space-y-3">
          {materials.map((material) => (
            <div key={material.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id={`desktop-${material.name}`} />
                <label htmlFor={`desktop-${material.name}`} className="text-sm text-gray-700">
                  {material.name}
                </label>
              </div>
              <span className="text-sm text-gray-500">({material.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Shape */}
      <div className="mb-8">
        <h3 className="font-medium text-gray-900 mb-4 uppercase">SHAPE</h3>
        <div className="space-y-3">
          {shapes.map((shape) => (
            <div key={shape.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id={`desktop-${shape.name}`} />
                <label htmlFor={`desktop-${shape.name}`} className="text-sm text-gray-700">
                  {shape.name}
                </label>
              </div>
              <span className="text-sm text-gray-500">({shape.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Gemstone */}
      <div className="mb-8">
        <h3 className="font-medium text-gray-900 mb-4 uppercase">GEMSTONE</h3>
        <div className="space-y-3">
          {gemstones.map((gemstone) => (
            <div key={gemstone.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id={`desktop-${gemstone.name}`} />
                <label htmlFor={`desktop-${gemstone.name}`} className="text-sm text-gray-700">
                  {gemstone.name}
                </label>
              </div>
              <span className="text-sm text-gray-500">({gemstone.count})</span>
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

        {/* Category Filter */}
        <Collapsible open={openSections.category} onOpenChange={() => toggleSection('category')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left border-b hover:bg-gray-50">
            <span className="font-medium">CATEGORY</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${openSections.category ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 border-b">
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id={category.name} />
                    <label htmlFor={category.name} className="text-sm text-gray-700">
                      {category.name}
                    </label>
                  </div>
                  <span className="text-sm text-gray-500">({category.count})</span>
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

        {/* Material Filter */}
        <Collapsible open={openSections.material} onOpenChange={() => toggleSection('material')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left border-b hover:bg-gray-50">
            <span className="font-medium">MATERIAL</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${openSections.material ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 border-b">
            <div className="space-y-3">
              {materials.map((material) => (
                <div key={material.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id={material.name} />
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

        {/* Shape Filter */}
        <Collapsible open={openSections.shape} onOpenChange={() => toggleSection('shape')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left border-b hover:bg-gray-50">
            <span className="font-medium">SHAPE</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${openSections.shape ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 border-b">
            <div className="space-y-3">
              {shapes.map((shape) => (
                <div key={shape.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id={shape.name} />
                    <label htmlFor={shape.name} className="text-sm text-gray-700">
                      {shape.name}
                    </label>
                  </div>
                  <span className="text-sm text-gray-500">({shape.count})</span>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Gemstone Filter */}
        <Collapsible open={openSections.gemstone} onOpenChange={() => toggleSection('gemstone')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left hover:bg-gray-50">
            <span className="font-medium">GEMSTONE</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${openSections.gemstone ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4">
            <div className="space-y-3">
              {gemstones.map((gemstone) => (
                <div key={gemstone.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id={gemstone.name} />
                    <label htmlFor={gemstone.name} className="text-sm text-gray-700">
                      {gemstone.name}
                    </label>
                  </div>
                  <span className="text-sm text-gray-500">({gemstone.count})</span>
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
                CUSTOM JEWELRY COLLECTION
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Personalized Custom Name Pendants, Letter Pendants and Logo Jewelry Made Just For You
              </p>
              
              {/* Custom Types Navigation */}
              <div className="flex justify-center space-x-8 text-sm text-gray-500">
                {customTypes.map((type, index) => (
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
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=200&q=80" 
                alt="Custom 1" 
                className="w-full aspect-square rounded-lg object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=200&q=80" 
                alt="Custom 2" 
                className="w-full aspect-square rounded-lg object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=200&q=80" 
                alt="Custom 3" 
                className="w-full aspect-square rounded-lg object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=200&q=80" 
                alt="Custom 4" 
                className="w-full aspect-square rounded-lg object-cover"
              />
            </div>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                CUSTOM JEWELRY COLLECTION
              </h1>
              <p className="text-sm text-gray-600 mb-6">
                Personalized Custom Name Pendants, Letter Pendants and Logo Jewelry Made Just For You
              </p>
              
              {/* Custom Types Navigation */}
              <div className="flex justify-center space-x-4 mb-6 text-xs">
                {customTypes.map((type, index) => (
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
            <span className="text-lg font-semibold">320 Products</span>
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

                  {/* Customizable Badge */}
                  {product.customizable && (
                    <div className="absolute bottom-2 right-2">
                      <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-800">
                        CUSTOMIZABLE
                      </Badge>
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

export default Custom;
