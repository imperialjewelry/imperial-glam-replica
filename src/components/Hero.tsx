import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 md:scale-100"
        style={{
          backgroundImage:
            'url(https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/images/imperialjewelryhomepage.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />

      {/* Main content (optional) */}
      <div className="relative z-10 text-white text-center">
        <h1 className="text-3xl md:text-5xl font-bold">Imperial Jewelry</h1>
        <p className="mt-2 text-base md:text-lg">
          Premium Diamond & Moissanite Collections
        </p>
        <Button className="mt-4">Shop Now</Button>
      </div>
    </section>
  );
};

export default Hero;


