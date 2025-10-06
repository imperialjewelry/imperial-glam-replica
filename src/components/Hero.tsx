const Hero = () => {
  return (
    <section className="relative h-[380px] md:h-[480px] overflow-hidden w-full">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <iframe
          src="https://customer-91ky5325cuy51tup.cloudflarestream.com/b40231438cda3173c9789099271ec0c3/iframe?autoplay=true&muted=true&loop=true&controls=false&poster=https%3A%2F%2Fcustomer-91ky5325cuy51tup.cloudflarestream.com%2Fb40231438cda3173c9789099271ec0c3%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
          className="absolute top-0 left-0 w-full h-full border-0"
          style={{
            objectFit: "cover",
            width: "100vw",
            height: "100%",
          }}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          allowFullScreen
          title="Imperial Jewelry showcase video"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 pointer-events-none" />

      {/* SEO Content - Hidden but accessible */}
      <div className="sr-only">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Diamond Jewelry & Custom Engagement Rings</h1>
          <p className="text-xl md:text-2xl mb-8">
            Hip Hop Chains, Moissanite Jewelry & Premium Diamond Collections in Houston
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
