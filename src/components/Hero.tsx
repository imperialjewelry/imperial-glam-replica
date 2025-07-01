
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative h-[500px] bg-gradient-to-r from-amber-100 to-yellow-200 flex items-center justify-center overflow-hidden">
      {/* Background image overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-90"
        style={{
          backgroundImage: `url('/lovable-uploads/ee1bf690-a39e-4362-9437-c0bcb5258b5d.png')`
        }}
      />
      
      {/* Content overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30" />
      
      {/* Main content */}
      <div className="relative z-10 text-center text-white px-4">
        <div className="mb-4">
          <span className="inline-block bg-red-600 text-white px-4 py-1 rounded text-sm font-medium mb-4">
            INDEPENDENCE DAY SALE
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
          UP TO 40% OFF +<br />
          <span className="text-white">FREE GIFTS</span>
        </h1>
        
        <p className="text-lg md:text-xl mb-8 opacity-90">
          Sale ends on July 7th
        </p>
        
        <Button 
          size="lg" 
          className="bg-white text-black hover:bg-gray-100 font-semibold px-8 py-4 text-lg"
        >
          SHOP THE SALE
        </Button>
      </div>
    </section>
  );
};

export default Hero;
