
import { useState } from 'react';
import { ChevronDown, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const HipHopRings = () => {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedShapes, setSelectedShapes] = useState<string[]>([]);
  const [selectedGemstones, setSelectedGemstones] = useState<string[]>([]);
  const [selectedDiamondCuts, setSelectedDiamondCuts] = useState<string[]>([]);
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');

  const productTypes = [
    { name: 'Ships Today', count: 8 },
    { name: 'Band Rings', count: 23 },
    { name: 'Signet Rings', count: 19 },
    { name: 'Cross Rings', count: 4 },
    { name: 'Cuban Rings', count: 4 },
    { name: 'Custom Rings', count: 3 },
    { name: 'Rings', count: 8 }
  ];

  const colors = [
    { name: 'Yellow Gold', count: 51 },
    { name: 'White Gold', count: 57 },
    { name: 'Rose Gold', count: 49 }
  ];

  const materials = [
    { name: '925 Silver', count: 53 },
    { name: 'S925 Sterling Silver', count: 1 },
    { name: 'Brass', count: 8 }
  ];

  const shapes = [
    { name: 'Round', count: 3 }
  ];

  const gemstones = [
    { name: 'VVS Diamond Simulants (CZ)', count: 8 }
  ];

  const diamondCuts = [
    { name: 'Emerald Cut', count: 0 }
  ];

  const handleFilterChange = (filterType: string, value: string, isChecked: boolean) => {
    const setters = {
      productType: setSelectedProductTypes,
      color: setSelectedColors,
      material: setSelectedMaterials,
      shape: setSelectedShapes,
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

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-sm text-gray-600">
            Home / Rings / <span className="font-medium text-black">Hip Hop Rings</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Hip Hop Rings</h1>
          <p className="text-gray-600">Discover our collection of premium hip hop rings</p>
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
            <FilterSection title="SHAPE" items={shapes} filterType="shape" />
            <FilterSection title="GEMSTONE" items={gemstones} filterType="gemstone" />
            <FilterSection title="DIAMOND CUT" items={diamondCuts} filterType="diamondCut" />
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

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(12)].map((_, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Hip Hop Ring {index + 1}</span>
                    </div>
                  </div>
                  <h3 className="font-medium text-sm mb-1 group-hover:text-gray-600 transition-colors">
                    Premium Hip Hop Ring {index + 1}
                  </h3>
                  <p className="text-lg font-bold">${(199 + index * 50).toLocaleString()}</p>
                </div>
              ))}
            </div>
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
                <MobileFilterSection title="SHAPE" items={shapes} filterType="shape" />
                <MobileFilterSection title="GEMSTONE" items={gemstones} filterType="gemstone" />
                <MobileFilterSection title="DIAMOND CUT" items={diamondCuts} filterType="diamondCut" />
              </Accordion>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default HipHopRings;
