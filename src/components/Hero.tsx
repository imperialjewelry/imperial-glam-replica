const Hero = () => {
  return (
    <section className="relative h-[380px] md:h-[480px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 md:scale-100"
        style={{
          backgroundImage:
            'url(https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/images/Untitled%20-%202025-09-08T112955.263.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      
      {/* SEO Content - Hidden but accessible */}
      <div className="sr-only">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Premium Diamond & Hip Hop Jewelry
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Custom Engagement Rings, Moissanite Chains & Luxury Jewelry in Houston
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;



