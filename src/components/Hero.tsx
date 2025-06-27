
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative h-[500px] bg-gradient-to-r from-blue-900 to-gray-800 flex items-center justify-center overflow-hidden">
      {/* Background image overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-70"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=2000&q=80')`
        }}
      />
      
      {/* Content overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      
      {/* Main content */}
      <div className="relative z-10 text-center text-white px-4">
        <div className="mb-4">
          <span className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
            JUNE 2025 DEALS
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
          UP TO 20% OFF +<br />
          <span className="text-yellow-400">FREE GIFTS</span>
        </h1>
        
        <p className="text-lg md:text-xl mb-8 opacity-90">
          *Only applies to selected products
        </p>
        
        <Button 
          size="lg" 
          className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8 py-4 text-lg"
        >
          SHOP BEST DEALS
        </Button>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border-2 border-yellow-400 rounded-full opacity-20 animate-pulse" />
      <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-blue-400 rounded-full opacity-20 animate-pulse" />
    </section>
  );
};

export default Hero;
