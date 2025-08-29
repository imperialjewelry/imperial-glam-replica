const Hero = () => {
  return (
    <section className="relative h-[380px] md:h-[480px] overflow-hidden">
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
    </section>
  );
};

export default Hero;


