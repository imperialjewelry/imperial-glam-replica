// Hero.tsx
const Hero = () => {
  return (
    <section
      className="
        relative block w-screen max-w-none left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]
        h-[380px] md:h-[480px] overflow-hidden
      "
    >
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://customer-91ky5325cuy51tup.cloudflarestream.com/b40231438cda3173c9789099271ec0c3/downloads/default.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* SEO-only content */}
      <div className="sr-only">
        <h1>Diamond Jewelry &amp; Custom Engagement Rings</h1>
        <p>Hip Hop Chains, Moissanite Jewelry &amp; Premium Diamond Collections in Houston</p>
      </div>
    </section>
  );
};

export default Hero;
