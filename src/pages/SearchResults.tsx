
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';
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
  featured?: boolean;
  created_at?: string;
  [key: string]: any;
}

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('q') || '';
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [fullProductData, setFullProductData] = useState<any>(null);

  const { data: searchResults = [], isLoading } = useQuery({
    queryKey: ['searchResults', searchTerm],
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
            .from(table)
            .select('id, name, description, price, original_price, category, image_url, discount_percentage, in_stock, featured, created_at')
            .or(`name.ilike.${searchPattern},description.ilike.${searchPattern},category.ilike.${searchPattern}`)
            .eq('in_stock', true);

          if (!error && data && Array.isArray(data)) {
            const formattedResults = data.map((product: any) => ({
              id: product.id,
              name: product.name || '',
              description: product.description || '',
              price: product.price || 0,
              original_price: product.original_price || 0,
              category: product.category || '',
              image_url: product.image_url || '',
              discount_percentage: product.discount_percentage || 0,
              featured: product.featured || false,
              created_at: product.created_at || new Date().toISOString(),
              source_table: table,
              source_id: product.id
            }));
            allResults.push(...formattedResults);
          }
        } catch (error) {
          console.error(`Error searching ${table}:`, error);
        }
      }

      // Sort by relevance and featured status
      return allResults.sort((a, b) => {
        // Featured products first
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        
        // Then by name relevance
        const aNameMatch = a.name.toLowerCase().includes(searchTerm.toLowerCase());
        const bNameMatch = b.name.toLowerCase().includes(searchTerm.toLowerCase());
        
        if (aNameMatch && !bNameMatch) return -1;
        if (!aNameMatch && bNameMatch) return 1;
        
        // Finally by creation date (newest first)
        return new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime();
      });
    },
    enabled: searchTerm.length > 0,
  });

  const formatPrice = (price: number) => `$${(price / 100).toFixed(2)}`;

  const handleProductClick = async (product: Product) => {
    setSelectedProduct(product);

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
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Search Results
          </h1>
          <p className="text-gray-600">
            {searchTerm ? `Results for "${searchTerm}"` : 'Please enter a search term'}
            {searchResults.length > 0 && ` (${searchResults.length} products found)`}
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : searchResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults.map((product) => (
              <div
                key={`${product.source_table}-${product.id}`}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                onClick={() => handleProductClick(product)}
              >
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2">{product.category}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-gray-900">
                        {formatPrice(product.price)}
                      </span>
                      {product.original_price && product.original_price > product.price && (
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(product.original_price)}
                        </span>
                      )}
                    </div>
                    {product.discount_percentage && product.discount_percentage > 0 && (
                      <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">
                        -{product.discount_percentage}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : searchTerm ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">
              Try searching with different keywords or browse our categories.
            </p>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Start your search</h3>
            <p className="text-gray-500">
              Enter a search term to find products.
            </p>
          </div>
        )}
      </main>

      <Footer />
      {renderProductModal()}
    </div>
  );
};

export default SearchResults;
