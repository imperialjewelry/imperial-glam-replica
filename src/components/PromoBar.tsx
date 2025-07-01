
import { Star, Shield, Truck } from 'lucide-react';

const PromoBar = () => {
  const promos = [
    { icon: Star, text: "30,000+ Reviews" },
    { icon: Shield, text: "Worn by Lil Pump & BigXthaPlug" },
    { icon: Truck, text: "4-Day Free Shipping" }
  ];

  return (
    <div className="bg-black text-white py-2 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(3)].map((_, groupIndex) => (
          <div key={groupIndex} className="flex items-center space-x-8 mr-8">
            {promos.map((promo, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <promo.icon className="w-4 h-4 text-yellow-400" />
                <span>{promo.text}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromoBar;
