
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

// Mock data for hip hop rings
interface HipHopRingProduct {
  id: string;
  name: string;
  price: number;
  original_price?: number;
  image_url: string;
  in_stock: boolean;
  discount_percentage?: number;
  ships_today: boolean;
  rating: number;
  review_count: number;
  category: string;
  sizes: string[];
  color: string;
  material: string;
  gemstone: string | null;
  diamond_cut: string | null;
  created_at?: string;
}

const HipHopRings = () => {
  const isMobile = useIsMobile();
  const [sortBy, setSortBy] = useState('featured');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [openSections, setOpenSections] = useState({
    price: false,
    color: false,
    material: false,
    gemstone: false,
    diamondCut: false,
    availability: false
  });

  // Filter state
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedGemstones, setSelectedGemstones] = useState<string[]>([]);
  const [selectedDiamondCuts, setSelectedDiamondCuts] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [shipsToday, setShipsToday] = useState(false);

  // Mock products data
  const allProducts: HipHopRingProduct[] = [];

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Filter and sort products
  const filteredAndSortedProducts = (() => {
    let filtered = [...allProducts];

    // Apply filters
    if (selectedColors.length > 0) {
      filtered = filtered.filter(product => selectedColors.includes(product.color));
    }

    if (selectedMaterials.length > 0) {
      filtered = filtered.filter(product => selectedMaterials.includes(product.material));
    }

    if (selectedGemstones.length > 0) {
      filtered = filtered.filter(product => product.gemstone && selectedGemstones.includes(product.gemstone));
    }

    if (selectedDiamondCuts.length > 0) {
      filtered = filtered.filter(product => product.diamond_cut && selectedDiamondCuts.includes(product.diamond_cut));
    }

    if (inStockOnly) {
      filtered = filtered.filter(product => product.in_stock);
    }

    if (shipsToday) {
      filtered = filtered.filter(product => product.ships_today);
    }

    // Apply price filter
    if (priceFrom || priceTo) {
      const fromPrice = priceFrom ? parseFloat(priceFrom) * 100 : 0;
      const toPrice = priceTo ? parseFloat(priceTo) * 100 : Infinity;
      filtered = filtered.filter(product => product.price >= fromPrice && product.price <= toPrice);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          if (a.created_at && b.created_at) {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          }
          return 0;
        default:
          return 0;
      }
    });

    return filtered;
  })();

  // Filter options
  const colors = [
    { name: "Yellow Gold", count: 0 },
    { name: "White Gold", count: 0 },
    { name: "Rose Gold", count: 0 },
    { name: "Silver", count: 0 }
  ];

  const materials = [
    { name: "925 Silver", count: 0 },
    { name: "14K Gold", count: 0 },
    { name: "18K Gold", count: 0 },
    { name: "Brass", count: 0 }
  ];

  const gemstones = [
    { name: "Moissanite", count: 0 },
    { name: "VVS Diamond Simulants (CZ)", count: 0 },
    { name: "VVS Moissanite", count: 0 }
  ];

  const diamondCuts = [
    { name: "Round Cut", count: 0 },
    { name: "Princess Cut", count: 0 },
    { name: "Emerald Cut", count: 0 },
    { name: "Oval Cut", count: 0 }
  ];

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

  const renderDesktopFilters = () => (
    <div className="w-64 bg-white p-6 border-r border-gray-200 min-h-screen">
      <h2 className="text-lg font-semibold mb-6">Filters</h2>
      
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

      {/* Availability */}
      <div className="mb-8">
        <h3 className="font-medium text-gray-900 mb-4 uppercase">AVAILABILITY</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="desktop-in-stock"
              checked={inStockOnly}
              onCheckedChange={(checked) => setInStockOnly(!!checked)}
            />
            <label htmlFor="desktop-in-stock" className="text-sm text-gray-700">
              In Stock Only
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="desktop-ships-today"
              checked={shipsToday}
              onCheckedChange={(checked) => setShipsToday(!!checked)}
            />
            <label htmlFor="desktop-ships-today" className="text-sm text-gray-700">
              Ships Today
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMobileFilters = () => showFilters && (
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
            <SelectItem value="rating">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

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
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left border-b hover:bg-gray-50">
          <span className="font-medium">DIAMOND CUT</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${openSections.diamondCut ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4 border-b">
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

      {/* Availability Filter */}
      <Collapsible open={openSections.availability} onOpenChange={() => toggleSection('availability')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left hover:bg-gray-50">
          <span className="font-medium">AVAILABILITY</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${openSections.availability ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="in-stock"
                checked={inStockOnly}
                onCheckedChange={(checked) => setInStockOnly(!!checked)}
              />
              <label htmlFor="in-stock" className="text-sm text-gray-700">
                In Stock Only
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="ships-today"
                checked={shipsToday}
                onCheckedChange={(checked) => setShipsToday(!!checked)}
              />
              <label htmlFor="ships-today" className="text-sm text-gray-700">
                Ships Today
              </label>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <PromoBar />
      <Header />
      
      {/* Hero Section */}
      <section className={`bg-gray-50 ${isMobile ? 'py-8 px-4' : 'py-12 px-8'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <h1 className={`font-bold text-gray-900 mb-4 ${isMobile ? 'text-2xl' : 'text-4xl'}`}>
            MOISSANITE HIP HOP RINGS
          </h1>
          <p className={`text-gray-600 ${isMobile ? 'text-sm mb-6' : 'text-lg mb-8'}`}>
            Premium Moissanite Hip Hop Rings in 925 Silver, 14K & 18K Gold
          </p>
        </div>
      </section>

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
                    <SelectItem value="rating">Highest Rated</SelectItem>
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
            {filteredAndSortedProducts.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No products available yet.</p>
              </div>
            ) : (
              filteredAndSortedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg border hover:shadow-lg transition-shadow cursor-pointer"
                >
                  {/* Product content would go here */}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HipHopRings;
