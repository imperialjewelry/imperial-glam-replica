import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import ProductCheckout from '@/components/ProductCheckout';
import { Badge } from '@/components/ui/badge';
import { Star, Truck } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price: number;
  category: string;
  product_type: string;
  color: string;
  material: string;
  gemstone: string;
  diamond_cut: string;
  sizes: string[];
  image_url: string;
  rating: number;
  review_count: number;
  discount_percentage: number;
  in_stock: boolean;
  ships_today: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
  stripe_product_id: string;
  stripe_price_id?: string; // Made optional since it was recently added
}

const Bracelets = () => {
  const { data: products = [], isLoading, error } = useQuery({
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

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading bracelets...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          Error loading bracelets. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Premium Bracelets</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our stunning collection of luxury bracelets featuring premium materials and exquisite craftsmanship.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              {product.discount_percentage > 0 && (
                <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                  -{product.discount_percentage}%
                </Badge>
              )}
              {product.featured && (
                <Badge className="absolute top-2 right-2 bg-gold text-white">
                  Featured
                </Badge>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
              
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-current text-yellow-400" />
                  <span className="ml-1 text-sm text-gray-600">
                    {product.rating} ({product.review_count} reviews)
                  </span>
                </div>
              </div>

              <div className="mb-3">
                <span className="text-xs text-gray-500 uppercase tracking-wide">
                  {product.material} • {product.color}
                </span>
                {product.gemstone && (
                  <span className="block text-xs text-gray-500">
                    Gemstone: {product.gemstone}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-blue-600">
                    ${(product.price / 100).toFixed(2)}
                  </span>
                  {product.original_price && product.original_price > product.price && (
                    <span className="text-lg text-gray-400 line-through">
                      ${(product.original_price / 100).toFixed(2)}
                    </span>
                  )}
                </div>
                {product.ships_today && (
                  <div className="flex items-center text-green-600 text-xs">
                    <Truck className="w-3 h-3 mr-1" />
                    Ships Today
                  </div>
                )}
              </div>

              <ProductCheckout product={product} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bracelets;
