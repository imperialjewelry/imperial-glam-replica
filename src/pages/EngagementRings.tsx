
import { useState } from 'react';
import { ChevronDown, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const EngagementRings = () => {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');

  const colors = [
    { name: 'Yellow Gold', count: 53 },
    { name: 'White Gold', count: 53 },
    { name: 'Rose Gold', count: 53 }
  ];

  const materials = [
    { name: '14K / 18K / Platinum', count: 159 }
  ];

  const handleFilterChange = (filterType: string, value: string, isChecked: boolean) => {
    const setters = {
      color: setSelectedColors,
      material: setSelectedMaterials
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
            Home / Rings / <span className="font-medium text-black">Engagement Rings</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Engagement Rings</h1>
          <p className="text-gray-600">Discover our collection of premium engagement rings</p>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block w-64 space-y-8">
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
                      <span className="text-gray-500 text-sm">Engagement Ring {index + 1}</span>
                    </div>
                  </div>
                  <h3 className="font-medium text-sm mb-1 group-hover:text-gray-600 transition-colors">
                    Premium Engagement Ring {index + 1}
                  </h3>
                  <p className="text-lg font-bold">${(999 + index * 200).toLocaleString()}</p>
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
              </Accordion>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default EngagementRings;
