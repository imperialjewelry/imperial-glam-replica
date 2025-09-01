
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import ProductCheckout from '@/components/ProductCheckout';
import { Star } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  original_price?: number;
  image_url: string;
  rating: number;
  review_count: number;
  discount_percentage?: number;
  sizes?: string[];
  stripe_product_id: string;
  stripe_price_id?: string;
  category: string;
  product_type: string;
  material: string;
  color: string;
}

const SearchResults = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const query = urlParams.get('q') || '';
    setSearchTerm(query);

    if (query.trim()) {
      searchProducts(query);
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [location.search]);

  const searchProducts = async (query: string) => {
    console.log('Searching for:', query);
    setLoading(true);
    
    try {
      const searchPattern = `%${query.toLowerCase()}%`;
      console.log('Search pattern:', searchPattern);

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .or(`name.ilike.${searchPattern},category.ilike.${searchPattern},product_type.ilike.${searchPattern},material.ilike.${searchPattern}`)
        .eq('in_stock', true);

      console.log('Search query executed');
      console.log('Search results:', data);
      console.log('Search error:', error);

      if (error) throw error;

      if (!data || data.length === 0) {
        console.log('No results with in_stock filter, trying without it');
        
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('products')
          .select('*')
          .or(`name.ilike.${searchPattern},category.ilike.${searchPattern},product_type.ilike.${searchPattern},material.ilike.${searchPattern}`);

        console.log('Fallback results:', fallbackData);
        console.log('Fallback error:', fallbackError);

        if (fallbackError) throw fallbackError;
        setProducts(fallbackData || []);
      } else {
        setProducts(data);
      }
    } catch (error) {
      console.error('Search error:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-lg">Searching...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">
          Search Results for "{searchTerm}"
        </h1>
        <p className="text-gray-600">
          {products.length} {products.length === 1 ? 'result' : 'results'} found
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">
            No products found matching your search.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Try searching with different keywords or browse our categories.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                {product.discount_percentage && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                    -{product.discount_percentage}%
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    ({product.review_count})
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-blue-600">
                      ${(product.price / 100).toFixed(2)}
                    </span>
                    {product.original_price && (
                      <span className="text-sm text-gray-500 line-through">
                        ${(product.original_price / 100).toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <ProductCheckout product={product} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
