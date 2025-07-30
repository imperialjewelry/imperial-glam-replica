
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MoissaniteWatchesSection = () => {
  const watchProducts = [
    {
      id: 1,
      image: "/lovable-uploads/bf68e291-8e46-4cdf-8bc1-9ace2278650d.png",
      title: "VVS Moissanite Presidential Watch | 14K Gold",
      material: "14K GOLD / UNISEX",
      currentPrice: "$2,499",
      originalPrice: "$2,999",
      rating: 5,
      reviews: 87,
      discount: "17% OFF"
    },
    {
      id: 2,
      image: "/lovable-uploads/bf68e291-8e46-4cdf-8bc1-9ace2278650d.png",
      title: "Moissanite Day-Date Watch | Rose Gold",
      material: "14K ROSE GOLD / UNISEX",
      currentPrice: "$2,199",
      originalPrice: "$2,699",
      rating: 4,
      reviews: 56,
      discount: "19% OFF"
    },
    {
      id: 3,
      image: "/lovable-uploads/bf68e291-8e46-4cdf-8bc1-9ace2278650d.png",
      title: "VVS Moissanite Oyster Watch | White Gold",
      material: "14K WHITE GOLD / UNISEX",
      currentPrice: "$2,799",
      originalPrice: "$3,399",
      rating: 5,
      reviews: 102,
      discount: "18% OFF"
    },
    {
      id: 4,
      image: "/lovable-uploads/bf68e291-8e46-4cdf-8bc1-9ace2278650d.png",
      title: "Moissanite GMT Watch | Yellow Gold",
      material: "14K YELLOW GOLD / UNISEX",
      currentPrice: "$3,199",
      originalPrice: "$3,899",
      rating: 5,
      reviews: 73,
      discount: "18% OFF"
    },
    {
      id: 5,
      image: "/lovable-uploads/bf68e291-8e46-4cdf-8bc1-9ace2278650d.png",
      title: "VVS Moissanite Skeleton Watch | Platinum",
      material: "PLATINUM / UNISEX",
      currentPrice: "$4,299",
      originalPrice: "$5,199",
      rating: 5,
      reviews: 41,
      discount: "17% OFF"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="flex flex-col md:flex-row">
        {/* Title section with background image - smaller on mobile */}
        <div className="w-full md:w-64 h-32 md:h-auto bg-gradient-to-br from-green-600 to-blue-600 relative overflow-hidden flex items-center justify-center">
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
          <div className="overflow-x-auto">
            <div className="flex space-x-4 px-4 pb-4">
              {watchProducts.map((product) => (
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
