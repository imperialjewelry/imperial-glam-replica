
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import DiamondProductModal from '@/components/DiamondProductModal';
import { useIsMobile } from '@/hooks/use-mobile';

type DiamondProduct = Tables<'diamond_products'>;

const ProductShowcase = () => {
  const [activeTab, setActiveTab] = useState('BEST SELLERS');
  const [selectedProduct, setSelectedProduct] = useState<DiamondProduct | null>(null);
  const isMobile = useIsMobile();

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['diamond-products-showcase'],
    queryFn: async () => {
      console.log('Fetching diamond products...');
      const { data, error } = await supabase
        .from('diamond_products')
        .select('*')
        .limit(3);
      
      if (error) {
        console.error('Error fetching diamond products:', error);
        throw error;
      }
      
      console.log('Fetched diamond products:', data);
      return data || [];
    }
  });

  const handleProductClick = (product: DiamondProduct) => {
    setSelectedProduct(product);
  };

  const renderStars = (rating: number) => {
    return Array.from({
      length: 5
    }, (_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />);
  };

  const renderProductCard = (product: DiamondProduct) => (
    <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer w-full" onClick={() => handleProductClick(product)}>
      {/* Product image */}
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={product.image_url || '/placeholder.svg'} 
          alt={product.name} 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
        
        {/* Badges */}
        <div className="absolute top-1 md:top-4 left-1 md:left-4 flex flex-col space-y-1 md:space-y-2">
          {product.discount_percentage && product.discount_percentage > 0 && (
            <Badge className="bg-red-500 text-white text-xs font-semibold px-1 md:px-2 py-1">
              {product.discount_percentage}% OFF
            </Badge>
          )}
          {product.ships_today && (
            <Badge className="bg-blue-500 text-white text-xs font-semibold px-1 md:px-2 py-1">
              SHIPS TODAY
            </Badge>
          )}
        </div>

        {/* Size options - hidden on mobile */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="absolute bottom-1 md:bottom-4 left-1 md:left-4 flex flex-wrap gap-1 hidden md:flex">
            {product.sizes.slice(0, 3).map((size, index) => (
              <Badge key={index} className="bg-gray-800 text-white text-xs px-2 py-1">
                {size}
              </Badge>
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
  );

  if (error) {
    console.error('Query error:', error);
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">MEN'S DIAMOND JEWELRY</h2>
          <p className="text-red-500">Error loading products. Please try again later.</p>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 lg:mb-0">MEN'S DIAMOND JEWELRY</h2>
            
            <div className="flex space-x-0 border-b border-gray-200">
              {['BEST SELLERS', 'NEW ARRIVALS'].map(tab => 
                <Button key={tab} variant="ghost" className="px-4 py-2 rounded-none border-b-2 border-transparent text-gray-600">
                  {tab}
                </Button>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 md:gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-96"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  console.log('Products to display:', products);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 lg:mb-0">MEN'S DIAMOND JEWELRY</h2>
          
          <div className="flex space-x-0 border-b border-gray-200">
            {['BEST SELLERS', 'NEW ARRIVALS'].map(tab => 
              <Button key={tab} variant="ghost" onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-none border-b-2 transition-colors ${activeTab === tab ? "border-blue-500 text-blue-600 bg-transparent" : "border-transparent text-gray-600 hover:bg-transparent hover:text-gray-900"}`}>
                {tab}
              </Button>
            )}
          </div>
        </div>

        {/* Product grid */}
        <div className="relative">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products available at the moment.</p>
              <p className="text-gray-400 text-sm mt-2">Please check back later or contact us for assistance.</p>
            </div>
          ) : (
            <>
              {/* Mobile Carousel */}
              {isMobile ? (
                <Carousel className="w-full">
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {products.map(product => (
                      <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-4/5">
                        {renderProductCard(product)}
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>
              ) : (
                /* Desktop Grid */
                <div className="grid grid-cols-3 gap-6">
                  {products.map(product => renderProductCard(product))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Shop button */}
        <div className="flex justify-center mt-8">
          <Link to="/diamond">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg">
              SHOP DIAMOND JEWELRY →
            </Button>
          </Link>
        </div>
      </div>

      {/* Product Modal */}
      <DiamondProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </section>
  );
};

export default ProductShowcase;
