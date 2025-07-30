
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ChainsSection = () => {
  const [activeTab, setActiveTab] = useState('CHAINS');

  const chainProducts = [
    {
      id: 1,
      image: "/lovable-uploads/bf68e291-8e46-4cdf-8bc1-9ace2278650d.png",
      title: "VVS Moissanite Cuban Link Chain | 14K Gold",
      material: "14K GOLD / UNISEX",
      currentPrice: "$1,899",
      originalPrice: "$2,299",
      rating: 5,
      reviews: 156,
      discount: "17% OFF",
      sizes: ["20MM", "18MM", "16MM"]
    },
    {
      id: 2,
      image: "/lovable-uploads/bf68e291-8e46-4cdf-8bc1-9ace2278650d.png",
      title: "Moissanite Tennis Chain | White Gold",
      material: "14K WHITE GOLD / UNISEX",
      currentPrice: "$1,299",
      originalPrice: "$1,599",
      rating: 4,
      reviews: 89,
      discount: "19% OFF",
      sizes: ["7.5MM", "5MM", "3MM"]
    },
    {
      id: 3,
      image: "/lovable-uploads/bf68e291-8e46-4cdf-8bc1-9ace2278650d.png",
      title: "VVS Moissanite Rope Chain | Yellow Gold",
      material: "14K YELLOW GOLD / UNISEX",
      currentPrice: "$999",
      originalPrice: "$1,199",
      rating: 5,
      reviews: 203,
      discount: "17% OFF",
      sizes: ["8MM", "6MM", "4MM"]
    },
    {
      id: 4,
      image: "/lovable-uploads/bf68e291-8e46-4cdf-8bc1-9ace2278650d.png",
      title: "Moissanite Franco Chain | Rose Gold",
      material: "14K ROSE GOLD / UNISEX",
      currentPrice: "$1,599",
      originalPrice: "$1,899",
      rating: 4,
      reviews: 74,
      discount: "16% OFF",
      sizes: ["10MM", "8MM", "6MM"]
    },
    {
      id: 5,
      image: "/lovable-uploads/bf68e291-8e46-4cdf-8bc1-9ace2278650d.png",
      title: "VVS Moissanite Figaro Chain | White Gold",
      material: "14K WHITE GOLD / UNISEX",
      currentPrice: "$1,799",
      originalPrice: "$2,199",
      rating: 5,
      reviews: 127,
      discount: "18% OFF",
      sizes: ["12MM", "10MM", "8MM"]
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="flex flex-col md:flex-row">
        {/* Title section with background image - smaller on mobile */}
        <div className="w-full md:w-64 h-32 md:h-auto bg-gradient-to-br from-blue-600 to-purple-600 relative overflow-hidden flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage: `url('/lovable-uploads/bf68e291-8e46-4cdf-8bc1-9ace2278650d.png')`
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
              {['CHAINS', 'CUSTOM'].map((tab) => (
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
              {chainProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-64 group relative bg-white overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 rounded-lg"
                >
                  {/* Product image */}
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
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

                    {/* Size options */}
                    {product.sizes && (
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

      {/* Shop Chains Button */}
      <div className="text-center mt-8 px-4">
        <Link to="/chains">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 font-medium">
            SHOP CHAINS →
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ChainsSection;
