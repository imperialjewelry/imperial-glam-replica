
import { Gem } from 'lucide-react';

const PromoBar = () => {
  return (
    <div className="bg-black text-white py-2">
      <div className="flex justify-center items-center">
        <div className="flex items-center space-x-2 text-sm">
          <Gem className="w-4 h-4 text-yellow-400" />
          <span>10% OFF SALE | CODE: SAVE10</span>
        </div>
      </div>
    </div>
  );
};

export default PromoBar;
