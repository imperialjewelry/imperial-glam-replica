
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import ProductCheckout from '@/components/ProductCheckout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ArrowRight, Truck } from 'lucide-react';

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
  stripe_price_id?: string;
}

const Bracelets = () => {
  const [activeTab, setActiveTab] = useState('BRACELETS');

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
    <section className="py-16 bg-gray-50">
      <div className="flex flex-col md:flex-row">
        {/* Title section with background image - smaller on mobile */}
        <div className="w-full md:w-64 h-32 md:h-auto bg-gradient-to-br from-blue-600 to-purple-600 relative overflow-hidden flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80')`
            }}
          />
          <div className="relative z-10 text-center text-white p-4 md:p-8">
            <h2 className="text-lg md:text-xl font-bold mb-1 md:mb-2">PREMIUM</h2>
            <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">BRACELETS</h2>
            <ArrowRight className="w-6 h-6 md:w-8 md:h-8 mx-auto text-white" />
          </div>
        </div>

        {/* Products horizontal scroll */}
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center justify-between mb-6 px-4">
            <div className="flex space-x-4">
              {['BRACELETS', 'TENNIS'].map((tab) => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? "default" : "ghost"}
                  onClick={() => setActiveTab(tab)}
                  className={`${
                    activeTab === tab 
                      ? "text-blue-600 border-b-2 border-blue-600 bg-transparent hover:bg-transparent" 
                      : "text-gray-400 hover:text-gray-600"
                  } font-medium px-0 rounded-none`}
                >
                  {tab}
                </Button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="flex space-x-4 px-4 pb-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-64 group relative bg-white overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 rounded-lg"
                >
                  {/* Product image */}
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Discount badge - positioned on left side */}
                    {product.discount_percentage > 0 && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-red-500 text-white text-xs font-semibold px-2 py-1">
                          -{product.discount_percentage}% OFF
                        </Badge>
                      </div>
                    )}

                    {/* Featured badge */}
                    {product.featured && (
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-gold text-white text-xs font-semibold px-2 py-1">
                          Featured
                        </Badge>
                      </div>
                    )}

                    {/* Ships Today badge */}
                    {product.ships_today && (
                      <div className="absolute bottom-3 right-3">
                        <Badge className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 flex items-center">
                          <Truck className="w-3 h-3 mr-1" />
                          SHIPS TODAY
                        </Badge>
                      </div>
                    )}

                    {/* Size options - positioned at bottom left */}
                    {product.sizes && product.sizes.length > 0 && (
                      <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                        {product.sizes.slice(0, 3).map((size, index) => (
                          <Badge key={index} variant="secondary" className="text-xs bg-white/90 text-gray-800">
                            {size}
                          </Badge>
                        ))}
                        {product.sizes.length > 3 && (
                          <Badge variant="secondary" className="text-xs bg-white/90 text-gray-800">
                            +{product.sizes.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Product info */}
                  <div className="p-4">
                    <div className="text-xs text-gray-500 uppercase mb-1 font-medium">
                      {product.material} • {product.color}
                      {product.gemstone && ` • ${product.gemstone}`}
                    </div>
                    
                    <h3 className="font-medium text-gray-900 mb-2 text-sm leading-tight line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center space-x-1 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">({product.review_count})</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-lg font-bold text-blue-600">
                        ${(product.price / 100).toFixed(2)}
                      </span>
                      {product.original_price && product.original_price > product.price && (
                        <span className="text-sm text-gray-400 line-through">
                          ${(product.original_price / 100).toFixed(2)}
                        </span>
                      )}
                    </div>

                    <ProductCheckout product={product} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Shop Bracelets Button */}
      <div className="text-center mt-8 px-4">
        <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 font-medium">
          SHOP BRACELETS →
        </Button>
      </div>
    </section>
  );
};

export default Bracelets;
