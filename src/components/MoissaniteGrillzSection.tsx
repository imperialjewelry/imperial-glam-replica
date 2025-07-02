
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MoissaniteGrillzSection = () => {
  const grillzProducts = [
    {
      id: 1,
      image: "/lovable-uploads/bf68e291-8e46-4cdf-8bc1-9ace2278650d.png",
      title: "8 on 8 VVS Moissanite Diamond Grillz",
      material: "925 SILVER / UNISEX",
      currentPrice: "$1,159",
      originalPrice: "$1,288",
      rating: 4,
      reviews: 24,
      discount: "9% OFF"
    },
    {
      id: 2,
      image: "/lovable-uploads/bf68e291-8e46-4cdf-8bc1-9ace2278650d.png",
      title: "8 on 8 VVS Baguette Moissanite Diamond Grillz",
      material: "925 SILVER / UNISEX",
      currentPrice: "$1,829",
      originalPrice: "$2,032",
      rating: 4,
      reviews: 28,
      discount: "9% OFF"
    },
    {
      id: 3,
      image: "/lovable-uploads/bf68e291-8e46-4cdf-8bc1-9ace2278650d.png",
      title: "Custom Moissanite Diamond Grillz 14K Yellow Gold",
      material: "925 SILVER / UNISEX",
      currentPrice: "$1,209",
      originalPrice: "$1,343",
      rating: 5,
      reviews: 1,
      discount: "10% OFF"
    },
    {
      id: 4,
      image: "/lovable-uploads/bf68e291-8e46-4cdf-8bc1-9ace2278650d.png",
      title: "10 on 10 VVS Moissanite Prong Diamond Grillz",
      material: "925 SILVER / UNISEX",
      currentPrice: "$1,829",
      originalPrice: "$2,032",
      rating: 5,
      reviews: 1,
      discount: "10% OFF"
    },
    {
      id: 5,
      image: "/lovable-uploads/bf68e291-8e46-4cdf-8bc1-9ace2278650d.png",
      title: "10 on 10 VVS Moissanite Diamond Grillz",
      material: "925 SILVER / UNISEX",
      currentPrice: "$1,829",
      originalPrice: "$2,032",
      rating: 4,
      reviews: 29,
      discount: "10% OFF"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-lg p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4">MOISSANITE</h2>
              <h3 className="text-5xl font-bold mb-6">GRILLZ</h3>
              <Button className="bg-white text-black hover:bg-gray-100 px-6 py-3 rounded-full font-semibold">
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            <div className="absolute right-0 top-0 w-1/2 h-full opacity-20">
              <img 
                src="/lovable-uploads/bf68e291-8e46-4cdf-8bc1-9ace2278650d.png" 
                alt="Grillz" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            {grillzProducts.slice(0, 2).map((product) => (
              <Card key={product.id} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex space-x-4">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 uppercase mb-1">{product.material}</p>
                      <h4 className="font-semibold text-sm mb-2 line-clamp-2">{product.title}</h4>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-lg font-bold text-blue-600">{product.currentPrice}</span>
                        <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3 h-3 ${i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">({product.reviews})</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {grillzProducts.map((product) => (
            <Card key={product.id} className="border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                  {product.discount && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      {product.discount}
                    </span>
                  )}
                </div>
                
                <p className="text-xs text-blue-500 uppercase mb-1">{product.material}</p>
                <h4 className="font-semibold text-sm mb-2 line-clamp-2">{product.title}</h4>
                
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-lg font-bold text-blue-600">{product.currentPrice}</span>
                  <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">({product.reviews})</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/grillz">
            <Button variant="outline" className="px-8 py-3">
              View All Grillz
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MoissaniteGrillzSection;
