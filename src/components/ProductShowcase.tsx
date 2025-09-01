
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Star } from 'lucide-react';
import DiamondProductModal from './DiamondProductModal';

interface Product {
  id: string;
  name: string;
  image_url: string;
  price: number;
  original_price: number | null;
  rating: number;
  review_count: number;
  category: string;
  discount_percentage: number;
  sizes: string[];
  ships_today: boolean;
}

interface ProductShowcaseProps {
  title: string;
  subtitle?: string;
  category: string;
  tableName: string;
}

const ProductShowcase = ({ title, subtitle, category, tableName }: ProductShowcaseProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['products', tableName, category],
    queryFn: async () => {
      console.log(`Fetching products from ${tableName} for category: ${category}`);
      
      let query = supabase
        .from(tableName)
        .select('*')
        .eq('category', category);

      const { data, error } = await query;
      
      if (error) {
        console.error(`Error fetching ${tableName}:`, error);
        throw error;
      }

      console.log(`Fetched ${data?.length || 0} products from ${tableName}`);
      return data || [];
    },
  });

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
    ));
  };

  if (error) {
    console.error('ProductShowcase error:', error);
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          {subtitle && (
            <div className="flex items-center justify-center gap-4 text-gray-600">
              <div className="h-px bg-gray-300 w-16"></div>
              <p className="text-xl">{subtitle}</p>
              <div className="h-px bg-gray-300 w-16"></div>
            </div>
          )}
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-3 gap-2 md:gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-96"></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Unable to load products</h3>
              <p className="text-gray-400">There was an error loading the products. Please try again later.</p>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">No products available</h3>
              <p className="text-gray-400 text-sm mt-2">Please check back later or contact us for assistance.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2 md:gap-6">
            {products.slice(0, 3).map(product => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={() => handleProductClick(product)}>
                {/* Product image */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-1 md:top-4 left-1 md:left-4 flex flex-col space-y-1 md:space-y-2">
                    {product.discount_percentage && product.discount_percentage > 0 && (
                      <span className="bg-red-500 text-white text-xs font-semibold px-1 md:px-2 py-1 rounded">
                        {product.discount_percentage}% OFF
                      </span>
                    )}
                    {product.ships_today && (
                      <span className="bg-blue-500 text-white text-xs font-semibold px-1 md:px-2 py-1 rounded">
                        SHIPS TODAY
                      </span>
                    )}
                  </div>

                  {/* Size options - hidden on mobile */}
                  {product.sizes && product.sizes.length > 0 && (
                    <div className="absolute bottom-1 md:bottom-4 left-1 md:left-4 flex flex-wrap gap-1 hidden md:flex">
                      {product.sizes.slice(0, 3).map((size, index) => (
                        <span key={index} className="bg-gray-800 text-white text-xs px-2 py-1 rounded">
                          {size}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Product info */}
                <div className="p-2 md:p-4">
                  <div className="text-xs text-gray-500 mb-1 md:mb-2 uppercase tracking-wide">
                    {product.category}
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-1 md:mb-2 line-clamp-2 text-sm md:text-base">
                    {product.name}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-2 md:mb-3">
                    <div className="flex">
                      {renderStars(product.rating || 5)}
                    </div>
                    <span className="ml-1 md:ml-2 text-xs md:text-sm text-gray-600">
                      ({(product.review_count || 0).toLocaleString()})
                    </span>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center mb-2 md:mb-4">
                    <span className="text-lg md:text-2xl font-bold text-blue-600">
                      ${(product.price / 100).toFixed(2)}
                    </span>
                    {product.original_price && (
                      <span className="ml-1 md:ml-2 text-sm md:text-lg text-gray-400 line-through">
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

      {/* Product Modal */}
      {selectedProduct && (
        <DiamondProductModal
          product={selectedProduct}
          allProducts={products}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
};

export default ProductShowcase;
