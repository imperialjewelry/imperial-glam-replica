
import { Shield } from 'lucide-react';

const PromoBar = () => {
  return (
    <div className="bg-black text-white py-2">
      <div className="flex justify-center items-center">
        <div className="flex items-center space-x-8 text-sm">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-yellow-400" />
            <span>Worn by BigXthaPlug</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-white font-semibold">BUY NOW, PAY LATER</span>
          </div>
          <div className="flex items-center space-x-4">
            <img 
              src="https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/images//afterpaylogo.webp" 
              alt="Afterpay" 
              className="h-6"
            />
            <img 
              src="https://cdn-assets.affirm.com/images/black_logo-white_bg.svg" 
              alt="Affirm" 
              className="h-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBar;
