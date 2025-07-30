
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const BestDeals = () => {
  const deals = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
      title: "VVS Moissanite Cuban Link Bracelet",
      category: "BRACELETS",
      currentPrice: "$599",
      originalPrice: "$799",
      rating: 5,
      reviews: 124,
      discount: "25% OFF",
      link: "/bracelets"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80",
      title: "Moissanite Tennis Chain Set",
      category: "CHAINS",
      currentPrice: "$1,299",
      originalPrice: "$1,699",
      rating: 5,
      reviews: 89,
      discount: "24% OFF",
      link: "/chains"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80",
      title: "VVS Moissanite Stud Earrings",
      category: "EARRINGS",
      currentPrice: "$399",
      originalPrice: "$599",
      rating: 4,
      reviews: 203,
      discount: "33% OFF",
      link: "/earrings"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
      title: "Moissanite Presidential Watch",
      category: "WATCHES",
      currentPrice: "$2,499",
      originalPrice: "$3,299",
      rating: 5,
      reviews: 67,
      discount: "24% OFF",
      link: "/watches"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">BEST DEALS</h2>
          <p className="text-gray-600 text-lg">Limited time offers on premium moissanite jewelry</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((deal) => (
            <Link key={deal.id} to={deal.link} className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                {/* Product image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Discount badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-500 text-white text-xs font-semibold px-2 py-1">
                      {deal.discount}
                    </Badge>
                  </div>
                </div>

                {/* Product info */}
                <div className="p-4">
                  <div className="text-xs text-gray-500 uppercase mb-1 font-medium">
                    {deal.category}
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {deal.title}
                  </h3>
                  
                  <div className="flex items-center space-x-1 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < deal.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({deal.reviews})</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-blue-600">{deal.currentPrice}</span>
                    <span className="text-sm text-gray-400 line-through">
                      {deal.originalPrice}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

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
