
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ProductShowcase = () => {
  const [activeTab, setActiveTab] = useState('BEST SELLERS');

  const products = [
    {
      id: 1,
      name: "24kt Tennis Bracelet",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
      badge: "30% OFF",
      badgeColor: "bg-red-500",
      tag: "SHIPS TODAY",
      tagColor: "bg-blue-500"
    },
    {
      id: 2,
      name: "24 Iced Out Chains",
      image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80",
      sizes: ["5MM", "8MM", "6MM"],
      tag: "SHIPS TODAY",
      tagColor: "bg-blue-500"
    },
    {
      id: 3,
      name: "6MM Miami Cuban Chain",
      image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80",
      tag: "SHIPS TODAY",
      tagColor: "bg-blue-500"
    },
    {
      id: 4,
      name: "3MM Tennis Chain",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
      tag: "SHIPS TODAY",
      tagColor: "bg-blue-500"
    },
    {
      id: 5,
      name: "20MM Cuban Link Chain",
      image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80",
      sizes: ["20MM", "18MM"],
      tag: "SHIPS TODAY",
      tagColor: "bg-blue-500"
    },
    {
      id: 6,
      name: "14kt Moissanite Cluster Studs",
      image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80",
      badge: "7% OFF",
      badgeColor: "bg-red-500",
      tag: "SHIPS TODAY",
      tagColor: "bg-blue-500"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            MEN'S MOISSANITE JEWELRY
          </h2>
          
          <div className="flex space-x-4">
            {['BEST SELLERS', 'NEW ARRIVALS'].map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "ghost"}
                onClick={() => setActiveTab(tab)}
                className={activeTab === tab ? "bg-gray-900 text-white" : "text-gray-600"}
              >
                {tab}
              </Button>
            ))}
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Product image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {product.badge && (
                    <Badge className={`${product.badgeColor} text-white text-xs font-semibold`}>
                      {product.badge}
                    </Badge>
                  )}
                  {product.tag && (
                    <Badge className={`${product.tagColor} text-white text-xs font-semibold`}>
                      {product.tag}
                    </Badge>
                  )}
                </div>

                {/* Size options */}
                {product.sizes && (
                  <div className="absolute bottom-4 left-4 flex space-x-1">
                    {product.sizes.map((size, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {size}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <Button 
                    className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                    variant="secondary"
                  >
                    Quick View
                  </Button>
                </div>
              </div>

              {/* Product info */}
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
