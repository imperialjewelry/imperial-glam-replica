const Hero = () => (
  <section className="relative w-screen h-[380px] md:h-[480px] overflow-hidden">
    <div className="absolute inset-0">
      <iframe
        src="https://customer-91ky5325cuy51tup.cloudflarestream.com/b40231438cda3173c9789099271ec0c3/iframe?autoplay=true&muted=true&loop=true&controls=false"
        className="absolute inset-0 w-[300%] h-[300%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-0"
        style={{ objectFit: "cover" }}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        title="Imperial Jewelry Showcase"
      />
    </div>
  </section>
);
export default Hero;
