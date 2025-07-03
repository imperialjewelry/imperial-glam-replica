
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MoissaniteWatchesSection = () => {
  const [activeTab, setActiveTab] = useState('WATCHES');

  const watchProducts = [
    {
      id: 1,
      image: "/lovable-uploads/bf68e291-8e46-4cdf-8bc1-9ace2278650d.png",
      title: "Bust Down Moissanite Watch | 44MM | 18K White Gold",
      material: "44MM / UNISEX",
      currentPrice: "$1,891",
      originalPrice: "$1,990",
      rating: 5,
      reviews: 167,
      discount: "5% OFF",
      badge: "SHIPS TODAY"
    },
    {
      id: 2,
      image: "/lovable-uploads/bf68e291-8e46-4cdf-8bc1-9ace2278650d.png",
      title: "Men's VVS Moissanite Watch | 42MM | 18CT Bust Down | 14K",
      material: "42MM / UNISEX",
      currentPrice: "$2,206",
      originalPrice: "$2,322",
      rating: 4,
      reviews: 25,
      discount: "5% OFF",
      badge: "SHIPS TODAY"
    },
    {
      id: 3,
      image: "/lovable-uploads/bf68e291-8e46-4cdf-8bc1-9ace2278650d.png",
      title: "Moissanite Skeleton Watch | 42MM | 14K White Gold | 3-11ct",
      material: "42MM / UNISEX",
      currentPrice: "$2,181",
      originalPrice: "$2,423",
      rating: 5,
      reviews: 398,
      discount: "10% OFF",
      badge: "SHIPS TODAY"
    },
    {
      id: 4,
      image: "/lovable-uploads/bf68e291-8e46-4cdf-8bc1-9ace2278650d.png",
      title: "Moissanite Iced Out Silicone Band Watch | 35MM | 14K VVS",
      material: "40MM / UNISEX",
      currentPrice: "$2,181",
      originalPrice: "$2,423",
      rating: 5,
      reviews: 16,
      discount: "10% OFF",
      badge: "SHIPS TODAY"
    },
    {
      id: 5,
      image: "/lovable-uploads/bf68e291-8e46-4cdf-8bc1-9ace2278650d.png",
      title: "Moissanite Presidential Watch | Green Face | 41MM",
      material: "41MM / UNISEX",
      currentPrice: "$1,868",
      originalPrice: "$2,076",
      rating: 4,
      reviews: 12,
      discount: "10% OFF",
      badge: "MADE TO ORDER"
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
              backgroundImage: `url('/lovable-uploads/bf68e291-8e46-4cdf-8bc1-9ace2278650d.png')`
            }}
          />
          <div className="relative z-10 text-center text-white p-4 md:p-8">
            <h2 className="text-lg md:text-xl font-bold mb-1 md:mb-2">MOISSANITE</h2>
            <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">WATCHES</h2>
            <ArrowRight className="w-6 h-6 md:w-8 md:h-8 mx-auto text-white" />
          </div>
        </div>

        {/* Products horizontal scroll */}
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center justify-between mb-6 px-4">
            <div className="flex space-x-4">
              {['WATCHES', 'LUXURY'].map((tab) => (
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
              {watchProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-64 group relative bg-white overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 rounded-lg"
                >
                  {/* Product image */}
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Discount badge - positioned on left side */}
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-red-500 text-white text-xs font-semibold px-2 py-1">
                        {product.discount}
                      </Badge>
                    </div>

                    {/* Ships Today badge - positioned on right side */}
                    {product.badge && (
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-blue-500 text-white text-xs font-semibold px-2 py-1">
                          {product.badge}
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Product info */}
                  <div className="p-4">
                    <div className="text-xs text-gray-500 uppercase mb-1 font-medium">
                      {product.material}
                    </div>
                    
                    <h3 className="font-medium text-gray-900 mb-2 text-sm leading-tight line-clamp-2">
                      {product.title}
                    </h3>
                    
                    <div className="flex items-center space-x-1 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">({product.reviews})</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-blue-600">{product.currentPrice}</span>
                      <span className="text-sm text-gray-400 line-through">
                        {product.originalPrice}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Shop Watches Button */}
      <div className="text-center mt-8 px-4">
        <Link to="/watches">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 font-medium">
            SHOP WATCHES →
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default MoissaniteWatchesSection;
