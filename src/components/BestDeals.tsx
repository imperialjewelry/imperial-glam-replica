
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from "@/hooks/use-mobile";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const BestDeals = () => {
  const isMobile = useIsMobile();

  // Fetch products from all tables
  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ['best-deals-products'],
    queryFn: async () => {
      const [
        { data: bracelets },
        { data: chains },
        { data: pendants },
        { data: grillz },
        { data: watches },
        { data: glasses }
      ] = await Promise.all([
        supabase.from('bracelet_products').select('*').eq('featured', true).limit(2),
        supabase.from('chain_products').select('*').limit(2),
        supabase.from('pendant_products').select('*').limit(2),
        supabase.from('grillz_products').select('*').limit(2),
        supabase.from('watch_products').select('*').eq('featured', true).limit(2),
        supabase.from('glasses_products').select('*').eq('featured', true).limit(2)
      ]);

      // Combine all products and add category info
      const combined = [
        ...(bracelets || []).map(p => ({ ...p, categoryType: 'Bracelets', link: '/bracelets' })),
        ...(chains || []).map(p => ({ ...p, categoryType: 'Chains', link: '/chains' })),
        ...(pendants || []).map(p => ({ ...p, categoryType: 'Pendants', link: '/pendants' })),
        ...(grillz || []).map(p => ({ ...p, categoryType: 'Grillz', link: '/grillz' })),
        ...(watches || []).map(p => ({ ...p, categoryType: 'Watches', link: '/watches' })),
        ...(glasses || []).map(p => ({ ...p, categoryType: 'Glasses', link: '/glasses' }))
      ];

      // Shuffle and return first 8 products
      return combined.sort(() => Math.random() - 0.5).slice(0, 8);
    }
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">BEST DEALS</h2>
            <p className="text-gray-600 text-lg">Limited time offers on premium moissanite jewelry</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg border animate-pulse">
                <div className="aspect-square bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">BEST DEALS</h2>
          <p className="text-gray-600 text-lg">Limited time offers on premium moissanite jewelry</p>
        </div>

        {/* Mobile: Horizontal scroll, Desktop: Grid */}
        {isMobile ? (
          <div className="overflow-x-auto">
            <div className="flex space-x-4 pb-4">
              {allProducts.map((product) => (
                <Link key={product.id} to={product.link} className="group flex-shrink-0 w-64">
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                    {/* Product image */}
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col space-y-1">
                        {product.in_stock && (
                          <Badge className="text-xs font-semibold bg-blue-500 text-white">
                            IN STOCK
                          </Badge>
                        )}
                        {product.discount_percentage && product.discount_percentage > 0 && (
                          <Badge className="text-xs font-semibold bg-red-500 text-white">
                            {product.discount_percentage}% OFF
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Product info */}
                    <div className="p-4">
                      <div className="text-xs text-gray-500 uppercase mb-1 font-medium">
                        {product.categoryType}
                      </div>
                      
                      <h3 className="font-medium text-gray-900 mb-2 text-sm leading-tight line-clamp-2">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center space-x-1 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < (product.rating || 5) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">({product.review_count || 0})</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-blue-600">${(product.price / 100).toFixed(2)}</span>
                        {product.original_price && (
                          <span className="text-sm text-gray-400 line-through">
                            ${(product.original_price / 100).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allProducts.map((product) => (
              <Link key={product.id} to={product.link} className="group">
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                  {/* Product image */}
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col space-y-1">
                      {product.in_stock && (
                        <Badge className="text-xs font-semibold bg-blue-500 text-white">
                          IN STOCK
                        </Badge>
                      )}
                      {product.discount_percentage && product.discount_percentage > 0 && (
                        <Badge className="text-xs font-semibold bg-red-500 text-white">
                          {product.discount_percentage}% OFF
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Product info */}
                  <div className="p-4">
                    <div className="text-xs text-gray-500 uppercase mb-1 font-medium">
                      {product.categoryType}
                    </div>
                    
                    <h3 className="font-medium text-gray-900 mb-2 leading-tight line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center space-x-1 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < (product.rating || 5) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">({product.review_count || 0})</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-blue-600">${(product.price / 100).toFixed(2)}</span>
                      {product.original_price && (
                        <span className="text-sm text-gray-400 line-through">
                          ${(product.original_price / 100).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Shop All Deals Button */}
        <div className="text-center mt-12">
          <Link to="/vvs-diamond-simulants">
            <Button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 text-lg font-medium">
              SHOP ALL DEALS →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestDeals;
