
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 md:scale-100"
        style={{
          backgroundImage: 'url(https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/images/backimage.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center'
        }}
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      
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
          className="bg-white text-black hover:bg-gray-100 font-semibold px-8 py-4 text-lg border border-black"
        >
          SHOP THE SALE
        </Button>
      </div>
    </section>
  );
};

export default Hero;
