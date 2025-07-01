
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";

const ProductShowcase = () => {
  const [activeTab, setActiveTab] = useState('BEST SELLERS');
  const isMobile = useIsMobile();

  const products = [
    {
      id: 1,
      name: "Diamond Essentials Bundle 14K White Gold",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
      category: "CZ / UNISEX",
      price: 586,
      originalPrice: 617,
      rating: 5,
      reviews: 188,
      discount: "5% OFF",
      shipsToday: true
    },
    {
      id: 2,
      name: "Moissanite Tennis Chain 14K Gold (ALL SIZES)",
      image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80",
      category: "925 SILVER / UNISEX",
      price: 476,
      originalPrice: 501,
      rating: 5,
      reviews: 1082,
      discount: "5% OFF",
      shipsToday: true,
      sizes: ["6MM", "5MM", "4MM", "3MM", "2MM"]
    },
    {
      id: 3,
      name: "VVS Moissanite Stud Earrings (ALL SIZES)",
      image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80",
      category: "3-10MM / UNISEX",
      price: 153,
      originalPrice: 161,
      rating: 5,
      reviews: 873,
      discount: "5% OFF",
      shipsToday: true
    },
    {
      id: 4,
      name: "VVS Tennis Chain 14K Gold (ALL SIZES)",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
      category: "CZ / UNISEX",
      price: 225,
      originalPrice: 237,
      rating: 5,
      reviews: 256,
      discount: "5% OFF",
      shipsToday: true,
      sizes: ["3MM", "5MM"]
    },
    {
      id: 5,
      name: "VVS Cuban Link Chain 14K Gold (ALL SIZES)",
      image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80",
      category: "CZ / UNISEX",
      price: 337,
      originalPrice: 355,
      rating: 5,
      reviews: 626,
      discount: "5% OFF",
      shipsToday: true,
      sizes: ["20MM", "15MM", "8MM"]
    },
    {
      id: 6,
      name: "3-in-1 Moissanite Earrings Bundle 14K Gold",
      image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80",
      category: "925 SILVER / UNISEX",
      price: 418,
      originalPrice: 697,
      rating: 5,
      reviews: 191,
      discount: "40% OFF",
      shipsToday: true
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-full px-0">
        {/* Section header */}
        <div className="flex items-center justify-between mb-12 px-4 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900">
            MEN'S MOISSANITE JEWELRY
          </h2>
          
          <div className="flex space-x-4">
            {['BEST SELLERS', 'NEW ARRIVALS'].map((tab) => (
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

        {/* Product grid - mobile horizontal scroll, desktop grid */}
        {isMobile ? (
          <div className="overflow-x-auto mb-8">
            <div className="flex space-x-4 px-4 pb-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-64 group relative bg-white overflow-hidden hover:shadow-lg transition-shadow rounded-lg"
                >
                  {/* Product image */}
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Discount badge - positioned on left side */}
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-red-500 text-white text-xs font-semibold px-2 py-1">
                        {product.discount}
                      </Badge>
                    </div>

                    {/* Ships Today badge - positioned on right side */}
                    {product.shipsToday && (
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-blue-500 text-white text-xs font-semibold px-2 py-1">
                          SHIPS TODAY
                        </Badge>
                      </div>
                    )}

                    {/* Size options - positioned at bottom */}
                    {product.sizes && (
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
                      {product.category}
                    </div>
                    
                    <h3 className="font-medium text-gray-900 mb-2 text-sm leading-tight line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center space-x-1 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">({product.reviews})</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-blue-600">${product.price}</span>
                      <span className="text-sm text-gray-400 line-through">
                        ${product.originalPrice}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-0 mb-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white overflow-hidden hover:shadow-lg transition-shadow border-r border-gray-200 last:border-r-0"
              >
                {/* Product image */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Discount badge - positioned on left side */}
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-red-500 text-white text-xs font-semibold px-2 py-1">
                      {product.discount}
                    </Badge>
                  </div>

                  {/* Ships Today badge - positioned on right side */}
                  {product.shipsToday && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-blue-500 text-white text-xs font-semibold px-2 py-1">
                        SHIPS TODAY
                      </Badge>
                    </div>
                  )}

                  {/* Size options - positioned at bottom */}
                  {product.sizes && (
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
                    {product.category}
                  </div>
                  
                  <h3 className="font-medium text-gray-900 mb-2 text-sm leading-tight line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center space-x-1 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">({product.reviews})</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-blue-600">${product.price}</span>
                    <span className="text-sm text-gray-400 line-through">
                      ${product.originalPrice}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Shop Best Sellers Button */}
        <div className="text-center px-4">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 font-medium">
            SHOP BEST SELLERS →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
