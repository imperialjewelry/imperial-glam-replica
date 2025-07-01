
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const ProductShowcase = () => {
  const [activeTab, setActiveTab] = useState('BEST SELLERS');

  const products = [
    {
      id: 1,
      name: "VVS Cuban Link Bracelet 14K Gold (ALL SIZES)",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
      badge: "6% OFF",
      badgeColor: "bg-red-500",
      tag: "SHIPS TODAY",
      tagColor: "bg-blue-500",
      category: "CZ / UNISEX",
      rating: 4.8,
      reviews: 372,
      price: 225,
      originalPrice: 237,
      sizes: ["20MM", "15MM", "8MM"]
    },
    {
      id: 2,
      name: "Moissanite Cuban Link Chain 14K Gold (ALL SIZES)",
      image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80",
      badge: "5% OFF",
      badgeColor: "bg-red-500",
      tag: "SHIPS TODAY",
      tagColor: "bg-blue-500",
      category: "925 SILVER / UNISEX",
      rating: 4.9,
      reviews: 1060,
      price: 1235,
      originalPrice: 1300,
      sizes: ["22MM", "18MM", "16MM", "14MM", "12MM", "10MM", "8MM"]
    },
    {
      id: 3,
      name: "7.5MM Moissanite Tennis Chain & Earring Set",
      image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80",
      badge: "6% OFF",
      badgeColor: "bg-red-500",
      tag: "SHIPS TODAY",
      tagColor: "bg-blue-500",
      category: "7.5MM",
      rating: 4.7,
      reviews: 284,
      price: 205,
      originalPrice: 218
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 lg:mb-0">
            MEN'S MOISSANITE JEWELRY
          </h2>
          
          <div className="flex space-x-0 border-b border-gray-200">
            {['BEST SELLERS', 'NEW ARRIVALS'].map((tab) => (
              <Button
                key={tab}
                variant="ghost"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-none border-b-2 transition-colors ${
                  activeTab === tab 
                    ? "border-blue-500 text-blue-600 bg-transparent" 
                    : "border-transparent text-gray-600 hover:bg-transparent hover:text-gray-900"
                }`}
              >
                {tab}
              </Button>
            ))}
          </div>
        </div>

        {/* Product grid - horizontal scroll on mobile */}
        <div className="relative">
          <div className="flex overflow-x-auto lg:grid lg:grid-cols-3 gap-6 pb-4 lg:pb-0 scrollbar-hide">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-80 lg:w-auto bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                {/* Product image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    <Badge className={`${product.badgeColor} text-white text-xs font-semibold px-2 py-1`}>
                      {product.badge}
                    </Badge>
                    <Badge className={`${product.tagColor} text-white text-xs font-semibold px-2 py-1`}>
                      {product.tag}
                    </Badge>
                  </div>

                  {/* Size options */}
                  {product.sizes && (
                    <div className="absolute bottom-4 left-4 flex flex-wrap gap-1">
                      {product.sizes.slice(0, 3).map((size, index) => (
                        <Badge key={index} className="bg-gray-800 text-white text-xs px-2 py-1">
                          {size}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Product info */}
                <div className="p-4">
                  <div className="text-xs text-gray-500 mb-2 uppercase tracking-wide">
                    {product.category}
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex">
                      {renderStars(product.rating)}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      ({product.reviews.toLocaleString()})
                    </span>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold text-blue-600">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="ml-2 text-lg text-gray-400 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shop button */}
        <div className="flex justify-center mt-8">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg">
            SHOP BEST SELLERS →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
