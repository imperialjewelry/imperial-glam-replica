
import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from "@/integrations/supabase/client";
import ProductCheckout from "@/components/ProductCheckout";

interface BraceletProduct {
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
}

const Bracelets = () => {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedGemstones, setSelectedGemstones] = useState<string[]>([]);
  const [selectedDiamondCuts, setSelectedDiamondCuts] = useState<string[]>([]);
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['bracelet-products'],
    queryFn: async (): Promise<BraceletProduct[]> => {
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
      diamondCut: setSelectedDiamondCuts
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
    <div className="space-y-3">
      <h3 className="font-semibold text-sm uppercase tracking-wide">{title}</h3>
      <div className="space-y-2">
        {items.map(item => (
          <div key={item.name} className="flex items-center space-x-2">
            <Checkbox
              id={`${filterType}-${item.name}`}
              onCheckedChange={(checked) => handleFilterChange(filterType, item.name, !!checked)}
            />
            <label 
              htmlFor={`${filterType}-${item.name}`}
              className="text-sm text-gray-700 cursor-pointer"
            >
              {item.name}({item.count})
            </label>
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
          <div className="text-lg">Loading products...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-sm text-gray-600">
            Home / Jewelry / <span className="font-medium text-black">Bracelets</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Premium Bracelets</h1>
          <p className="text-gray-600">Discover our collection of luxury bracelets with VVS stones and premium materials</p>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block w-64 space-y-8">
            <FilterSection title="PRODUCT TYPE" items={productTypes} filterType="productType" />
            
            {/* Price Range */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm uppercase tracking-wide">PRICE</h3>
              <div className="space-y-2">
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
            </div>

            <FilterSection title="COLOR" items={colors} filterType="color" />
            <FilterSection title="MATERIAL" items={materials} filterType="material" />
            {gemstones.length > 0 && <FilterSection title="GEMSTONE" items={gemstones} filterType="gemstone" />}
            {diamondCuts.length > 0 && <FilterSection title="DIAMOND CUT" items={diamondCuts} filterType="diamondCut" />}
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6">
              <Button
                onClick={() => setIsMobileFiltersOpen(true)}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </Button>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {products.length} bracelets
              </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="group cursor-pointer">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden relative">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.featured && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        Featured
                      </div>
                    )}
                    {product.ships_today && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                        Ships Today
                      </div>
                    )}
                    {product.discount_percentage && product.discount_percentage > 0 && (
                      <div className="absolute bottom-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                        {product.discount_percentage}% OFF
                      </div>
                    )}
                  </div>
                  
                  <h3 className="font-medium text-sm mb-1 group-hover:text-gray-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-lg font-bold">${(product.price / 100).toFixed(2)}</p>
                    {product.original_price && product.original_price > product.price && (
                      <p className="text-sm text-gray-500 line-through">
                        ${(product.original_price / 100).toFixed(2)}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1 text-xs text-gray-600 mb-3">
                    <p><span className="font-medium">Type:</span> {product.product_type}</p>
                    <p><span className="font-medium">Color:</span> {product.color}</p>
                    <p><span className="font-medium">Material:</span> {product.material}</p>
                    {product.gemstone && (
                      <p><span className="font-medium">Gemstone:</span> {product.gemstone}</p>
                    )}
                    {product.diamond_cut && (
                      <p><span className="font-medium">Cut:</span> {product.diamond_cut}</p>
                    )}
                  </div>

                  <ProductCheckout
                    product={{
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      sizes: product.sizes || [],
                      image_url: product.image_url,
                    }}
                  />
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
