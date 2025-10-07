const Hero = () => (
  <section className="relative w-screen h-[380px] md:h-[480px] overflow-hidden">
    <div className="absolute inset-0">
      <iframe
        src="https://customer-91ky5325cuy51tup.cloudflarestream.com/b40231438cda3173c9789099271ec0c3/iframe?autoplay=1&muted=1&loop=1&controls=0&playsinline=1"
        className="absolute inset-0 w-full h-full border-0"
        style={{ objectFit: "cover" }}
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        allowFullScreen
        title="Imperial Jewelry Showcase"
      />
    </div>
  </section>
);
export default Hero;
