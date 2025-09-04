import { useState } from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PromoBar from '@/components/PromoBar';
import { useProductFilters } from '@/hooks/useProductFilters';
import FilterSection from '@/components/FilterSection';
import PoloGProductModal from '@/components/PoloGProductModal';
import { Tables } from '@/integrations/supabase/types';

type PoloGProduct = Tables<'polo_g'>;

const PoloG = () => {
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({
    productTypes: [],
    colors: [],
    materials: [],
  });
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<PoloGProduct | null>(null);

  const { products, filters, loading } = useProductFilters('polo_g');

  const applyFilters = () => {
    let filtered = [...products];

    if (selectedFilters.productTypes.length > 0) {
      filtered = filtered.filter(p => selectedFilters.productTypes.includes(p.product_type));
    }
    if (selectedFilters.colors.length > 0) {
      filtered = filtered.filter(p => selectedFilters.colors.includes(p.color));
    }
    if (selectedFilters.materials.length > 0) {
      filtered = filtered.filter(p => selectedFilters.materials.includes(p.material));
    }

    if (priceFrom) filtered = filtered.filter(p => p.price >= parseInt(priceFrom) * 100);
    if (priceTo) filtered = filtered.filter(p => p.price <= parseInt(priceTo) * 100);

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      default:
        filtered.sort(
          (a, b) =>
            new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()
        );
    }
    return filtered;
  };

  const handleFilterChange = (category: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(i => i !== value)
        : [...prev[category], value],
    }));
  };

  const filteredProducts = applyFilters();

  const renderDesktopFilters = () => (
    <div className="w-64 bg-white p-6 border-r">
      <h2 className="text-lg font-semibold mb-6">FILTERS</h2>

      <FilterSection
        title="PRODUCT TYPE"
        items={filters.productTypes}
        selectedItems={selectedFilters.productTypes}
        onToggle={item => handleFilterChange('productTypes', item)}
      />

      <FilterSection
        title="COLOR"
        items={filters.colors}
        selectedItems={selectedFilters.colors}
        onToggle={item => handleFilterChange('colors', item)}
      />

      <FilterSection
        title="MATERIAL"
        items={filters.materials}
        selectedItems={selectedFilters.materials}
        onToggle={item => handleFilterChange('materials', item)}
      />

      <div className="mb-8">
        <h3 className="font-medium text-gray-900 mb-4 uppercase">PRICE RANGE</h3>
        <div className="space-y-2">
          <input
            type="number"
            placeholder="From"
            value={priceFrom}
            onChange={e => setPriceFrom(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
          />
          <input
            type="number"
            placeholder="To"
            value={priceTo}
            onChange={e => setPriceTo(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
          />
        </div>
      </div>
    </div>
  );

  const renderMobileFilters = () => (
    <div className="lg:hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2"
        >
          <Filter className="w-4 h-4" />
          <span>FILTER</span>
        </Button>

        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded text-sm"
        >
          <option value="newest">NEWEST</option>
          <option value="price-low">PRICE: LOW TO HIGH</option>
          <option value="price-high">PRICE: HIGH TO LOW</option>
          <option value="rating">HIGHEST RATED</option>
        </select>
      </div>

      {showFilters && (
        <div className="bg-white border-b p-4 space-y-6">
          <FilterSection
            title="PRODUCT TYPE"
            items={filters.productTypes}
            selectedItems={selectedFilters.productTypes}
            onToggle={item => handleFilterChange('productTypes', item)}
          />

          <FilterSection
            title="COLOR"
            items={filters.colors}
            selectedItems={selectedFilters.colors}
            onToggle={item => handleFilterChange('colors', item)}
          />

          <FilterSection
            title="MATERIAL"
            items={filters.materials}
            selectedItems={selectedFilters.materials}
            onToggle={item => handleFilterChange('materials', item)}
          />

          <div>
            <h3 className="font-medium text-gray-900 mb-4 uppercase">PRICE RANGE</h3>
            <div className="space-y-2">
              <input
                type="number"
                placeholder="From"
                value={priceFrom}
                onChange={e => setPriceFrom(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
              <input
                type="number"
                placeholder="To"
                value={priceTo}
                onChange={e => setPriceTo(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <PromoBar />
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">Loading Polo G collection...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <PromoBar />
      <Header />

      {/* Hero Section – less crop on LG, fully zoomed out on XL */}
      <div className="relative w-full bg-black">
        <img
          src="https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/images/Untitled%20-%202025-09-04T141328.596.webp"
          alt="Polo G Collection Hero"
          className="
            w-full
            h-[340px]
            md:h-[420px]
            lg:h-[480px]
            xl:h-[560px]
            object-cover
            lg:object-[50%_42%]
            xl:object-contain
            mx-auto
          "
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/20 to-black/60" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="text-center text-white">
              <h1 className="text-4xl lg:text-6xl font-bold mb-4">POLO G 🐐 COLLECTION</h1>
              <p className="text-lg lg:text-xl text-gray-200 max-w-2xl mx-auto">
                Exclusive jewelry collection inspired by the GOAT himself. Premium pieces for those who demand excellence.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex">
        {/* Desktop Filters */}
        <div className="hidden lg:block">{renderDesktopFilters()}</div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Mobile Filters */}
          {renderMobileFilters()}

          {/* Desktop Sort */}
          <div className="hidden lg:flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-semibold">
              POLO G COLLECTION ({filteredProducts.length} products)
            </h2>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded text-sm"
            >
              <option value="newest">NEWEST</option>
              <option value="price-low">PRICE: LOW TO HIGH</option>
              <option value="price-high">PRICE: HIGH TO LOW</option>
              <option value="rating">HIGHEST RATED</option>
            </select>
          </div>

          {/* Products Grid */}
          <div className="p-6">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your filters or check back later for new arrivals.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className="group cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        onError={e => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80';
                        }}
                      />
                      {product.discount_percentage > 0 && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
                          -{product.discount_percentage}%
                        </div>
                      )}
                      {product.featured && (
                        <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 text-xs font-bold rounded">
                          FEATURED
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-900 group-hover:text-black transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600">{product.category}</p>
                      <div className="flex items-center space-x-1">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < Math.floor(product.rating ?? 0) ? '★' : '☆'}>
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">({product.review_count})</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-lg">
                          ${(product.price / 100).toFixed(2)}
                        </span>
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
            )}
          </div>
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <PoloGProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <Footer />
    </div>
  );
};

export default PoloG;
