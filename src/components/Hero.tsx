// Hero.tsx
import { useEffect, useRef } from "react";
import Hls from "hls.js";

const Hero = () => {
  const vidRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = vidRef.current;
    if (!video) return;

    const src =
      "https://customer-91ky5325cuy51tup.cloudflarestream.com/b40231438cda3173c9789099271ec0c3/manifest/video.m3u8";

    if (Hls.isSupported()) {
      const hls = new Hls({ autoStartLoad: true });
      hls.loadSource(src);
      hls.attachMedia(video);
      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src; // native HLS (iOS/Safari)
    }
  }, []);

  return (
    <section
      className="
        relative block w-screen max-w-none left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]
        h-[380px] md:h-[480px] overflow-hidden
      "
    >
      <video
        ref={vidRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="sr-only">
        <h1>Diamond Jewelry &amp; Custom Engagement Rings</h1>
        <p>Hip Hop Chains, Moissanite Jewelry &amp; Premium Diamond Collections in Houston</p>
      </div>
    </section>
  );
};
export default Hero;
