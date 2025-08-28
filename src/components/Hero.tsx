import { Button } from '@/components/ui/button';
const Hero = () => {
  return <section className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 md:scale-100" style={{
      backgroundImage: 'url(https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/images/imperialjewelryhomepage.webp)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center'
    }} />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      
      {/* Main content */}
      
    </section>;
};
export default Hero;