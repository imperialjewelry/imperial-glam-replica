import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import ChainProductModal from '@/components/ChainProductModal';
import BraceletProductModal from '@/components/BraceletProductModal';
import EarringProductModal from '@/components/EarringProductModal';
import GrillzProductModal from '@/components/GrillzProductModal';
import WatchProductModal from '@/components/WatchProductModal';
import PendantProductModal from '@/components/PendantProductModal';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price: number;
  category: string;
  image_url: string;
  discount_percentage: number;
  source_table: string;
  source_id: string;
  [key: string]: any;
}

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [fullProductData, setFullProductData] = useState<any>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const { data: searchResults = [], isLoading } = useQuery({
    queryKey: ['search', searchTerm],
    queryFn: async () => {
      if (!searchTerm.trim()) return [];
      
      const searchPattern = `%${searchTerm}%`;
      const allResults: Product[] = [];

      // Define all product tables to search
      const productTables = [
        'chain_products',
        'bracelet_products', 
        'watch_products',
        'pendant_products',
        'earring_products',
        'grillz_products',
        'vvs_simulant_products',
        'hip_hop_ring_products',
        'engagement_ring_products',
        'diamond_products',
        'glasses_products',
        'custom_products'
      ];

      // Search each table
      for (const table of productTables) {
        try {
          const { data, error } = await supabase
            .from(table as any)
            .select('id, name, description, price, original_price, category, image_url, discount_percentage, in_stock')
            .or(`name.ilike.${searchPattern},description.ilike.${searchPattern},category.ilike.${searchPattern}`)
            .eq('in_stock', true)
            .limit(20);

          if (!error && data && Array.isArray(data)) {
            const formattedResults = data.map(product => ({
              ...product,
              source_table: table,
              source_id: product.id
            }));
            allResults.push(...formattedResults);
          }
        } catch (error) {
          console.error(`Error searching ${table}:`, error);
        }
      }

      // Sort by relevance (name matches first, then description matches)
      return allResults
        .sort((a, b) => {
          const aNameMatch = a.name.toLowerCase().includes(searchTerm.toLowerCase());
          const bNameMatch = b.name.toLowerCase().includes(searchTerm.toLowerCase());
          
          if (aNameMatch && !bNameMatch) return -1;
          if (!aNameMatch && bNameMatch) return 1;
          
          return a.name.localeCompare(b.name);
        })
        .slice(0, 6); // Limit to 6 results for display
    },
    enabled: searchTerm.length > 2,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsOpen(e.target.value.length > 0);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setIsOpen(false);
  };

  const formatPrice = (price: number) => `$${(price / 100).toFixed(2)}`;

  const handleProductClick = async (product: Product) => {
    setSelectedProduct(product);
    setIsOpen(false);

    try {
      const { data, error } = await supabase
        .from(product.source_table as any)
        .select('*')
        .eq('id', product.source_id)
        .single();

      if (error) {
        console.error('Error fetching full product data:', error);
        setFullProductData(product);
      } else {
        setFullProductData(data);
      }
    } catch (error) {
      console.error('Error fetching full product data:', error);
      setFullProductData(product);
    }
  };

  const renderProductModal = () => {
    if (!selectedProduct || !fullProductData) return null;

    switch (selectedProduct.source_table) {
      case 'chain_products':
        return (
          <ChainProductModal
            product={fullProductData}
            onClose={() => {
              setSelectedProduct(null);
              setFullProductData(null);
            }}
          />
        );
      case 'bracelet_products':
        return (
          <BraceletProductModal
            product={fullProductData}
            onClose={() => {
              setSelectedProduct(null);
              setFullProductData(null);
            }}
          />
        );
      case 'earring_products':
        return (
          <EarringProductModal
            product={fullProductData}
            onClose={() => {
              setSelectedProduct(null);
              setFullProductData(null);
            }}
          />
        );
      case 'grillz_products':
        return (
          <GrillzProductModal
            product={fullProductData}
            onClose={() => {
              setSelectedProduct(null);
              setFullProductData(null);
            }}
          />
        );
      case 'watch_products':
        return (
          <WatchProductModal
            product={fullProductData}
            onClose={() => {
              setSelectedProduct(null);
              setFullProductData(null);
            }}
          />
        );
      case 'pendant_products':
        return (
          <PendantProductModal
            product={fullProductData}
            onClose={() => {
              setSelectedProduct(null);
              setFullProductData(null);
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div ref={searchRef} className="relative w-full max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleInputChange}
            className="pl-10 pr-10 w-full"
            onFocus={() => searchTerm.length > 0 && setIsOpen(true)}
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {isOpen && searchTerm.length > 2 && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 mt-1 max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-gray-500">Searching...</div>
            ) : searchResults.length > 0 ? (
              <>
                {searchResults.map((product) => (
                  <div
                    key={`${product.source_table}-${product.id}`}
                    className="flex items-center p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 cursor-pointer"
                    onClick={() => handleProductClick(product)}
                  >
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-md mr-3"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs text-gray-500 truncate">
                        {product.category}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm font-bold text-gray-900">
                          {formatPrice(product.price)}
                        </span>
                        {product.original_price && product.original_price > product.price && (
                          <span className="text-xs text-gray-500 line-through">
                            {formatPrice(product.original_price)}
                          </span>
                        )}
                        {product.discount_percentage && product.discount_percentage > 0 && (
                          <span className="text-xs text-red-600 font-medium">
                            -{product.discount_percentage}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="p-3 text-center">
                  <Link
                    to={`/search?q=${encodeURIComponent(searchTerm)}`}
                    className="text-sm text-blue-600 hover:text-blue-800"
                    onClick={() => setIsOpen(false)}
                  >
                    View all results
                  </Link>
                </div>
              </>
            ) : (
              <div className="p-4 text-center text-gray-500">
                No products found for "{searchTerm}"
              </div>
            )}
          </div>
        )}
      </div>

      {renderProductModal()}
    </>
  );
};

export default SearchBar;
