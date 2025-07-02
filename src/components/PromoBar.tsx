
import { Shield } from 'lucide-react';

const PromoBar = () => {
  return (
    <div className="bg-black text-white py-2">
      <div className="flex justify-center items-center">
        <div className="flex items-center space-x-2 text-sm">
          <Shield className="w-4 h-4 text-yellow-400" />
          <span>Worn by BigXthaPlug</span>
        </div>
      </div>
    </div>
  );
};

export default PromoBar;
