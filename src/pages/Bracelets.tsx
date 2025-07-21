import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from "@/integrations/supabase/client";
import ProductCheckout from "@/components/ProductCheckout";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  original_price: number | null;
  category: string;
  product_type: string;
  color: string;
  material: string;
  gemstone: string | null;
  diamond_cut: string | null;
  sizes: string[] | null;
  image_url: string;
  rating: number | null;
  review_count: number | null;
  discount_percentage: number | null;
  in_stock: boolean | null;
  ships_today: boolean | null;
  featured: boolean | null;
  created_at: string;
  updated_at: string;
  stripe_product_id: string;
  stripe_price_id: string;
}

const Bracelets = () => {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedGemstones, setSelectedGemstones] = useState<string[]>([]);
  const [selectedDiamondCuts, setSelectedDiamondCuts] = useState<string[]>([]);
  const [shipsToday, setShipsToday] = useState(false);
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');

  const { data: products = [], isLoading } = useQuery({
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
      return data || [];
    },
  });

  // Get unique filter values from products
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

  const gemstones = [...new Set(products.map(p => p.gemstone).filter(Boolean))].map(gemstone => ({
    name: gemstone!,
    count: products.filter(p => p.gemstone === gemstone).length
  }));

  const diamondCuts = [...new Set(products.map(p => p.diamond_cut).filter(Boolean))].map(cut => ({
    name: cut!,
    count: products.filter(p => p.diamond_cut === cut).length
  }));

  const shipsToday_count = products.filter(p => p.ships_today).length;

  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    const priceInDollars = product.price / 100;
    const priceFromNum = priceFrom ? parseFloat(priceFrom) : 0;
    const priceToNum = priceTo ? parseFloat(priceTo) : Infinity;

    return (
      (selectedProductTypes.length === 0 || selectedProductTypes.includes(product.product_type)) &&
      (selectedColors.length === 0 || selectedColors.includes(product.color)) &&
      (selectedMaterials.length === 0 || selectedMaterials.includes(product.material)) &&
      (selectedGemstones.length === 0 || (product.gemstone && selectedGemstones.includes(product.gemstone))) &&
      (selectedDiamondCuts.length === 0 || (product.diamond_cut && selectedDiamondCuts.includes(product.diamond_cut))) &&
      (!shipsToday || product.ships_today) &&
      priceInDollars >= priceFromNum &&
      priceInDollars <= priceToNum
    );
  });

  const handleFilterChange = (filterType: string, value: string, isChecked: boolean) => {
    const setters = {
      productType: setSelectedProductTypes,
      color: setSelectedColors,
      material: setSelectedMaterials,
      gemstone: setSelectedGemstones,
      diamondCut: setSelectedDiamondCuts,
    };

    const setter = setters[filterType as keyof typeof setters];
    if (setter) {
      setter(prev => 
        isChecked 
          ? [...prev, value]
          : prev.filter(item => item !== value)
      );
    }
  };

  const FilterSection = ({ title, items, filterType }: { title: string; items: { name: string; count: number }[]; filterType: string }) => (
    <div className="mb-8">
      <h3 className="font-medium text-gray-900 mb-4 uppercase">{title}</h3>
      <div className="space-y-3">
        {items.map(item => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`${filterType}-${item.name}`}
                onCheckedChange={(checked) => handleFilterChange(filterType, item.name, !!checked)}
              />
              <label 
                htmlFor={`${filterType}-${item.name}`}
                className="text-sm text-gray-700 cursor-pointer"
              >
                {item.name}
              </label>
            </div>
            <span className="text-sm text-gray-500">({item.count})</span>
          </div>
        ))}
      </div>
    </div>
  );

  const MobileFilterSection = ({ title, items, filterType }: { title: string; items: { name: string; count: number }[]; filterType: string }) => (
    <AccordionItem value={filterType}>
      <AccordionTrigger className="text-sm font-semibold uppercase tracking-wide">
        {title}
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-3 pt-2">
          {items.map(item => (
            <div key={item.name} className="flex items-center space-x-2">
              <Checkbox
                id={`mobile-${filterType}-${item.name}`}
                onCheckedChange={(checked) => handleFilterChange(filterType, item.name, !!checked)}
              />
              <label 
                htmlFor={`mobile-${filterType}-${item.name}`}
                className="text-sm text-gray-700 cursor-pointer"
              >
                {item.name}({item.count})
              </label>
            </div>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
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
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gray-50 py-16 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            MOISSANITE DIAMOND BRACELETS
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            All Moissanite Iced Out 925 Silver, 14K White, Yellow and Rose Gold Hip Hop Bracelets
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto flex">
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block w-64 bg-white p-6 border-r border-gray-200 min-h-screen">
          <h2 className="text-lg font-semibold mb-6">Filters</h2>
          
          <FilterSection title="PRODUCT TYPE" items={productTypes} filterType="productType" />
          
          {/* Ships Today Filter */}
          <div className="mb-8">
            <h3 className="font-medium text-gray-900 mb-4 uppercase">SHIPS TODAY</h3>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="ships-today"
                checked={shipsToday}
                onCheckedChange={(checked) => setShipsToday(!!checked)}
              />
              <label 
                htmlFor="ships-today"
                className="text-sm text-gray-700 cursor-pointer"
              >
                Ships Today({shipsToday_count})
              </label>
            </div>
          </div>

          {/* Price Range */}
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

          <FilterSection title="COLOR" items={colors} filterType="color" />
          <FilterSection title="MATERIAL" items={materials} filterType="material" />
          {gemstones.length > 0 && <FilterSection title="GEMSTONE" items={gemstones} filterType="gemstone" />}
          {diamondCuts.length > 0 && <FilterSection title="DIAMOND CUT" items={diamondCuts} filterType="diamondCut" />}
        </div>

        {/* Products Section */}
        <div className="flex-1 py-8 px-8">
          {/* Product count and controls */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-lg font-semibold">
              {filteredProducts.length} Products
            </span>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsMobileFiltersOpen(true)}
                className="lg:hidden flex items-center space-x-2"
              >
                <Filter className="w-4 h-4" />
                <span>FILTER</span>
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg border hover:shadow-lg transition-shadow">
                
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col space-y-1">
                    {product.in_stock && (
                      <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded font-semibold">
                        IN STOCK
                      </div>
                    )}
                    {product.discount_percentage && product.discount_percentage > 0 && (
                      <div className="bg-red-500 text-white text-xs px-2 py-1 rounded font-semibold">
                        {product.discount_percentage}% OFF
                      </div>
                    )}
                    {product.ships_today && (
                      <div className="bg-green-500 text-white text-xs px-2 py-1 rounded font-semibold">
                        SHIPS TODAY
                      </div>
                    )}
                  </div>

                  {/* Size options */}
                  {product.sizes && product.sizes.length > 0 && (
                    <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                      {product.sizes.slice(0, 2).map((size, index) => (
                        <div key={index} className="bg-white/90 text-gray-800 text-xs px-2 py-1 rounded">
                          {size}
                        </div>
                      ))}
                      {product.sizes.length > 2 && (
                        <div className="bg-white/90 text-gray-800 text-xs px-2 py-1 rounded">
                          +{product.sizes.length - 2}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="text-xs text-gray-500 uppercase mb-1 font-medium">
                    {product.category}
                  </div>
                  
                  <h3 className="font-medium text-gray-900 mb-2 text-sm leading-tight line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center space-x-1 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-3 h-3 text-yellow-400">★</div>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">({product.review_count})</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-blue-600">
                        ${(product.price / 100).toFixed(2)}
                      </span>
                      {product.original_price && product.original_price > product.price && (
                        <span className="text-sm text-gray-500 line-through">
                          ${(product.original_price / 100).toFixed(2)}
                        </span>
                      )}
                    </div>
                    
                    <ProductCheckout
                      product={{
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        sizes: product.sizes || [],
                        image_url: product.image_url,
                        stripe_product_id: product.stripe_product_id,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No bracelets found matching your filters.</p>
              <Button
                onClick={() => {
                  setSelectedProductTypes([]);
                  setSelectedColors([]);
                  setSelectedMaterials([]);
                  setSelectedGemstones([]);
                  setSelectedDiamondCuts([]);
                  setShipsToday(false);
                  setPriceFrom('');
                  setPriceTo('');
                }}
                className="mt-4"
                variant="outline"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileFiltersOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button variant="ghost" size="sm" onClick={() => setIsMobileFiltersOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="p-4">
              <Accordion type="multiple" className="space-y-4">
                <MobileFilterSection title="PRODUCT TYPE" items={productTypes} filterType="productType" />
                
                <AccordionItem value="ships-today">
                  <AccordionTrigger className="text-sm font-semibold uppercase tracking-wide">
                    SHIPS TODAY
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="mobile-ships-today"
                          checked={shipsToday}
                          onCheckedChange={(checked) => setShipsToday(!!checked)}
                        />
                        <label 
                          htmlFor="mobile-ships-today"
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          Ships Today({shipsToday_count})
                        </label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="price">
                  <AccordionTrigger className="text-sm font-semibold uppercase tracking-wide">
                    PRICE
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">From</span>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-600">$</span>
                          <input
                            type="number"
                            value={priceFrom}
                            onChange={(e) => setPriceFrom(e.target.value)}
                            className="w-20 px-2 py-1 border border-gray-300 rounded text-sm ml-1"
                            placeholder="0"
                          />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">To</span>
                        <div className="flex items-center ml-2">
                          <span className="text-sm text-gray-600">$</span>
                          <input
                            type="number"
                            value={priceTo}
                            onChange={(e) => setPriceTo(e.target.value)}
                            className="w-20 px-2 py-1 border border-gray-300 rounded text-sm ml-1"
                            placeholder="1000"
                          />
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <MobileFilterSection title="COLOR" items={colors} filterType="color" />
                <MobileFilterSection title="MATERIAL" items={materials} filterType="material" />
                {gemstones.length > 0 && <MobileFilterSection title="GEMSTONE" items={gemstones} filterType="gemstone" />}
                {diamondCuts.length > 0 && <MobileFilterSection title="DIAMOND CUT" items={diamondCuts} filterType="diamondCut" />}
              </Accordion>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Bracelets;
