import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ArrowRight } from 'lucide-react';

const ChainsSection = () => {
  const [activeTab, setActiveTab] = useState('CHAINS');

  const chains = [
    {
      id: 1,
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
      id: 2,
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
      id: 3,
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
      id: 4,
      name: "Moissanite Cuban Link Chain 14K Gold (ALL SIZES)",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
      category: "925 SILVER / UNISEX",
      price: 1235,
      originalPrice: 1300,
      rating: 5,
      reviews: 1060,
      discount: "5% OFF",
      shipsToday: true,
      sizes: ["20MM", "15MM", "12MM", "10MM", "8MM"]
    },
    {
      id: 5,
      name: "Diamond Tennis Chain 14K White Gold",
      image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80",
      category: "DIAMOND / UNISEX",
      price: 892,
      originalPrice: 939,
      rating: 5,
      reviews: 445,
      discount: "5% OFF",
      shipsToday: true,
      sizes: ["4MM", "5MM"]
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="flex flex-col md:flex-row">
        {/* Title section with background image - smaller on mobile */}
        <div className="w-full md:w-64 h-32 md:h-auto bg-gradient-to-br from-gray-800 to-black relative overflow-hidden flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80')`
            }}
          />
          <div className="relative z-10 text-center text-white p-4 md:p-8">
            <h2 className="text-lg md:text-xl font-bold mb-1 md:mb-2">MOISSANITE</h2>
            <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">CHAINS</h2>
            <ArrowRight className="w-6 h-6 md:w-8 md:h-8 mx-auto text-white" />
          </div>
        </div>

        {/* Products horizontal scroll */}
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center justify-between mb-6 px-4">
            <div className="flex space-x-4">
              {['CHAINS', 'NECKLACES'].map((tab) => (
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
              {chains.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-64 group relative bg-white overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 rounded-lg"
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
        </div>
      </div>

      {/* Shop Chains Button */}
      <div className="text-center mt-8 px-4">
        <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 font-medium">
          SHOP CHAINS →
        </Button>
      </div>
    </section>
  );
};

export default ChainsSection;
