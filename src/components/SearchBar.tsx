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
import CustomProductModal from '@/components/CustomProductModal';

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
      if (!searchTerm.trim() || searchTerm.length < 2) return [];
      
      
      const searchPattern = `%${searchTerm.toLowerCase()}%`;
      
      try {
        // First let's see what products exist in the database
        const { data: sampleProducts, error: sampleError } = await supabase
          .from('products')
          .select('name, category, product_type, material')
          .limit(10);
          
        
        
        // Direct search on specific fields
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .or(`name.ilike.${searchPattern},category.ilike.${searchPattern},product_type.ilike.${searchPattern},material.ilike.${searchPattern}`)
          .eq('in_stock', true)
          .order('featured', { ascending: false })
          .order('created_at', { ascending: false })
          .limit(6);

        if (error) {
          console.error('SearchBar - Search error:', error);
          return [];
        }

        
        if (!data || data.length === 0) {
          // Try searching without the in_stock filter
          
          const { data: allData, error: allError } = await supabase
            .from('products')
            .select('*')
            .or(`name.ilike.${searchPattern},category.ilike.${searchPattern},product_type.ilike.${searchPattern},material.ilike.${searchPattern}`)
            .order('featured', { ascending: false })
            .limit(6);
            
          
          
          if (allError) {
            console.error('SearchBar - All search error:', allError);
          }
          
          return (allData || []).map((product: any) => ({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            original_price: product.original_price,
            category: product.category,
            image_url: product.image_url,
            discount_percentage: product.discount_percentage,
            source_table: product.source_table,
            source_id: product.source_id,
          }));
        }

        return (data || []).map((product: any) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          original_price: product.original_price,
          category: product.category,
          image_url: product.image_url,
          discount_percentage: product.discount_percentage,
          source_table: product.source_table,
          source_id: product.source_id,
        }));
      } catch (error) {
        console.error('SearchBar - Search error:', error);
        return [];
      }
    },
    enabled: searchTerm.length > 1,
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
      case 'custom_products':
        return (
          <CustomProductModal
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

        {isOpen && searchTerm.length > 1 && (
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
