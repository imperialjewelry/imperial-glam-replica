
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const BestDeals = () => {
  const { data: dealProducts = [], isLoading, error } = useQuery({
    queryKey: ['best-deals-homepage'],
    queryFn: async () => {
      console.log('Fetching best deals products...');
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('in_stock', true)
        .gt('discount_percentage', 0)
        .order('discount_percentage', { ascending: false })
        .limit(5);
      
      if (error) {
        console.error('Error fetching best deals products:', error);
        throw error;
      }
      console.log('Best deals products fetched:', data);
      return data || [];
    }
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="flex items-center justify-center">
          <div className="text-lg">Loading best deals...</div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error('Best deals products error:', error);
    return (
      <section className="py-16 bg-white">
        <div className="flex items-center justify-center">
          <div className="text-lg text-red-500">Error loading best deals</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="flex flex-col md:flex-row">
        {/* Title section with background image - smaller on mobile */}
        <div className="w-full md:w-64 h-32 md:h-auto bg-gradient-to-br from-red-500 to-red-600 relative overflow-hidden flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80')`
            }}
          />
          <div className="relative z-10 text-center text-white p-4 md:p-8">
            <h2 className="text-lg md:text-xl font-bold mb-1 md:mb-2">BEST</h2>
            <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">DEALS</h2>
            <ArrowRight className="w-6 h-6 md:w-8 md:h-8 mx-auto text-white" />
          </div>
        </div>

        {/* Products horizontal scroll */}
        <div className="flex-1 overflow-hidden">
          <div className="overflow-x-auto">
            <div className="flex space-x-4 px-4 pb-4">
              {dealProducts.length > 0 ? (
                dealProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex-shrink-0 w-64 group relative bg-white overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 rounded-lg"
                  >
                    {/* Product image */}
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      <img
                        src={product.image_url || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80'}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          console.log('Image failed to load for product:', product.name, product.image_url);
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      
                      {/* Discount badge - positioned on left side */}
                      {product.discount_percentage > 0 && (
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-red-500 text-white text-xs font-semibold px-2 py-1">
                            {product.discount_percentage}% OFF
                          </Badge>
                        </div>
                      )}

                      {/* Size options */}
                      {product.sizes && product.sizes.length > 0 && (
                        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                          {product.sizes.slice(0, 2).map((size, index) => (
                            <Badge key={index} className="bg-gray-800 text-white text-xs px-1 py-0.5">
                              {size}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Product info */}
                    <div className="p-4">
                      <div className="text-xs text-gray-500 uppercase mb-1 font-medium">
                        {product.category || 'JEWELRY'} • {product.material || 'MOISSANITE'}
                      </div>
                      
                      <h3 className="font-medium text-gray-900 mb-2 text-sm leading-tight line-clamp-2">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center space-x-1 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating || 5) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">({product.review_count || 0})</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-blue-600">${(product.price / 100).toFixed(2)}</span>
                        {product.original_price && product.original_price > product.price && (
                          <span className="text-sm text-gray-400 line-through">
                            ${(product.original_price / 100).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center w-full py-8">
                  <div className="text-gray-500">No deals available at the moment</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Shop All Deals Button */}
      <div className="text-center mt-8 px-4">
        <Link to="/best-deals">
          <Button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 font-medium">
            SHOP ALL DEALS →
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default BestDeals;
