
import { useState, useEffect } from 'react';
import { Star, ChevronDown, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import Header from '../components/Header';
import PromoBar from '../components/PromoBar';
import Footer from '../components/Footer';
import WatchProductModal from '../components/WatchProductModal';
import { Tables } from '@/integrations/supabase/types';

type WatchProduct = Tables<'watch_products'>;

const Watches = () => {
  const isMobile = useIsMobile();
  const [sortBy, setSortBy] = useState('featured');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<WatchProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openSections, setOpenSections] = useState({
    productType: false,
    price: false,
    color: false,
    material: false,
    gemstone: false,
    diamondCut: false
  });

  // Filter state
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedGemstones, setSelectedGemstones] = useState<string[]>([]);
  const [selectedDiamondCuts, setSelectedDiamondCuts] = useState<string[]>([]);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleProductClick = (product: WatchProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ['watch-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('watch_products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as WatchProduct[];
    }
  });

  // Filter and sort products
  const filteredAndSortedProducts = (() => {
    let filtered = [...allProducts];

    // Apply product type filter
    if (selectedProductTypes.length > 0) {
      filtered = filtered.filter(product => 
        selectedProductTypes.includes(product.product_type)
      );
    }

    // Apply color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter(product => 
        selectedColors.includes(product.color)
      );
    }

    // Apply material filter
    if (selectedMaterials.length > 0) {
      filtered = filtered.filter(product => 
        selectedMaterials.includes(product.material)
      );
    }

    // Apply gemstone filter
    if (selectedGemstones.length > 0) {
      filtered = filtered.filter(product => 
        product.gemstone && selectedGemstones.includes(product.gemstone)
      );
    }

    // Apply diamond cut filter
    if (selectedDiamondCuts.length > 0) {
      filtered = filtered.filter(product => 
        product.diamond_cut && selectedDiamondCuts.includes(product.diamond_cut)
      );
    }

    // Apply price filter
    if (priceFrom || priceTo) {
      const fromPrice = priceFrom ? parseFloat(priceFrom) * 100 : 0;
      const toPrice = priceTo ? parseFloat(priceTo) * 100 : Infinity;
      
      filtered = filtered.filter(product => 
        product.price >= fromPrice && product.price <= toPrice
      );
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
      case 'featured':
      default:
        filtered.sort((a, b) => Number(b.featured) - Number(a.featured));
        break;
    }

    return filtered;
  })();

  // Filter option handlers
  const handleProductTypeChange = (productType: string, checked: boolean) => {
    if (checked) {
      setSelectedProductTypes(prev => [...prev, productType]);
    } else {
      setSelectedProductTypes(prev => prev.filter(type => type !== productType));
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

  const handleGemstoneChange = (gemstone: string, checked: boolean) => {
    if (checked) {
      setSelectedGemstones(prev => [...prev, gemstone]);
    } else {
      setSelectedGemstones(prev => prev.filter(g => g !== gemstone));
    }
  };

  const handleDiamondCutChange = (cut: string, checked: boolean) => {
    if (checked) {
      setSelectedDiamondCuts(prev => [...prev, cut]);
    } else {
      setSelectedDiamondCuts(prev => prev.filter(c => c !== cut));
    }
  };

  const productTypes = [
    { name: "Presidential Watches", count: allProducts.filter(p => p.product_type === "Presidential Watches").length },
    { name: "Ships Today", count: allProducts.filter(p => p.ships_today).length },
    { name: "Bust Down Watches", count: allProducts.filter(p => p.product_type === "Bust Down Watches").length },
    { name: "Skeleton Watches", count: allProducts.filter(p => p.product_type === "Skeleton Watches").length }
  ];

  const colors = [
    { name: "Yellow Gold", count: allProducts.filter(p => p.color === "Yellow Gold").length },
    { name: "White Gold", count: allProducts.filter(p => p.color === "White Gold").length },
    { name: "Rose Gold", count: allProducts.filter(p => p.color === "Rose Gold").length },
    { name: "Black Gold", count: allProducts.filter(p => p.color === "Black Gold").length }
  ];

  const materials = [
    { name: "925 Silver", count: allProducts.filter(p => p.material === "925 Silver").length },
    { name: "Solid Gold", count: allProducts.filter(p => p.material === "Solid Gold").length },
    { name: "Brass", count: allProducts.filter(p => p.material === "Brass").length }
  ];

  const gemstones = [
    { name: "Moissanite", count: allProducts.filter(p => p.gemstone === "Moissanite").length },
    { name: "VVS Diamond Simulants (CZ)", count: allProducts.filter(p => p.gemstone === "VVS Diamond Simulants (CZ)").length },
    { name: "VVS Moissanite", count: allProducts.filter(p => p.gemstone === "VVS Moissanite").length },
    { name: "VVS Moissanites", count: allProducts.filter(p => p.gemstone === "VVS Moissanites").length }
  ];

  const diamondCuts = [
    { name: "Round Cut", count: allProducts.filter(p => p.diamond_cut === "Round Cut").length },
    { name: "Baguette", count: allProducts.filter(p => p.diamond_cut === "Baguette").length },
    { name: "Emerald Cut", count: allProducts.filter(p => p.diamond_cut === "Emerald Cut").length },
    { name: "Baguette Cut", count: allProducts.filter(p => p.diamond_cut === "Baguette Cut").length },
    { name: "Heart Cut", count: allProducts.filter(p => p.diamond_cut === "Heart Cut").length },
    { name: "Marquise Cut", count: allProducts.filter(p => p.diamond_cut === "Marquise Cut").length },
    { name: "Oval Cut", count: allProducts.filter(p => p.diamond_cut === "Oval Cut").length },
    { name: "Pear Cut", count: allProducts.filter(p => p.diamond_cut === "Pear Cut").length },
    { name: "Princess Cut", count: allProducts.filter(p => p.diamond_cut === "Princess Cut").length }
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
                <Checkbox 
                  id={`desktop-${type.name}`} 
                  checked={selectedProductTypes.includes(type.name)}
                  onCheckedChange={(checked) => handleProductTypeChange(type.name, checked as boolean)}
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
                  onCheckedChange={(checked) => handleColorChange(color.name, checked as boolean)}
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
                  onCheckedChange={(checked) => handleMaterialChange(material.name, checked as boolean)}
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

      {/* Gemstone */}
      <div className="mb-8">
        <h3 className="font-medium text-gray-900 mb-4 uppercase">GEMSTONE</h3>
        <div className="space-y-3">
          {gemstones.map((gemstone) => (
            <div key={gemstone.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id={`desktop-${gemstone.name}`} 
                  checked={selectedGemstones.includes(gemstone.name)}
                  onCheckedChange={(checked) => handleGemstoneChange(gemstone.name, checked as boolean)}
                />
                <label htmlFor={`desktop-${gemstone.name}`} className="text-sm text-gray-700">
                  {gemstone.name}
                </label>
              </div>
              <span className="text-sm text-gray-500">({gemstone.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Diamond Cut */}
      <div className="mb-8">
        <h3 className="font-medium text-gray-900 mb-4 uppercase">DIAMOND CUT</h3>
        <div className="space-y-3">
          {diamondCuts.map((cut) => (
            <div key={cut.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id={`desktop-${cut.name}`} 
                  checked={selectedDiamondCuts.includes(cut.name)}
                  onCheckedChange={(checked) => handleDiamondCutChange(cut.name, checked as boolean)}
                />
                <label htmlFor={`desktop-${cut.name}`} className="text-sm text-gray-700">
                  {cut.name}
                </label>
              </div>
              <span className="text-sm text-gray-500">({cut.count})</span>
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
                      onCheckedChange={(checked) => handleProductTypeChange(type.name, checked as boolean)}
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
                      onCheckedChange={(checked) => handleColorChange(color.name, checked as boolean)}
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
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left border-b hover:bg-gray-50">
            <span className="font-medium">MATERIAL</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${openSections.material ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 border-b">
            <div className="space-y-3">
              {materials.map((material) => (
                <div key={material.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id={material.name} 
                      checked={selectedMaterials.includes(material.name)}
                      onCheckedChange={(checked) => handleMaterialChange(material.name, checked as boolean)}
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

        {/* Gemstone Filter */}
        <Collapsible open={openSections.gemstone} onOpenChange={() => toggleSection('gemstone')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left border-b hover:bg-gray-50">
            <span className="font-medium">GEMSTONE</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${openSections.gemstone ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 border-b">
            <div className="space-y-3">
              {gemstones.map((gemstone) => (
                <div key={gemstone.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id={gemstone.name} 
                      checked={selectedGemstones.includes(gemstone.name)}
                      onCheckedChange={(checked) => handleGemstoneChange(gemstone.name, checked as boolean)}
                    />
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

        {/* Diamond Cut Filter */}
        <Collapsible open={openSections.diamondCut} onOpenChange={() => toggleSection('diamondCut')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left hover:bg-gray-50">
            <span className="font-medium">DIAMOND CUT</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${openSections.diamondCut ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4">
            <div className="space-y-3">
              {diamondCuts.map((cut) => (
                <div key={cut.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id={cut.name} 
                      checked={selectedDiamondCuts.includes(cut.name)}
                      onCheckedChange={(checked) => handleDiamondCutChange(cut.name, checked as boolean)}
                    />
                    <label htmlFor={cut.name} className="text-sm text-gray-700">
                      {cut.name}
                    </label>
                  </div>
                  <span className="text-sm text-gray-500">({cut.count})</span>
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
            <span className="text-lg font-semibold">{filteredAndSortedProducts.length} Products</span>
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
            {filteredAndSortedProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-lg border hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleProductClick(product)}
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

                  {/* Size options */}
                  {product.sizes && product.sizes.length > 0 && (
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
      
      {/* Watch Product Modal */}
      {selectedProduct && isModalOpen && (
        <WatchProductModal
          product={selectedProduct}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default Watches;
