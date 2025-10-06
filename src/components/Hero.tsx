"use client";
import { useEffect, useRef } from "react";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let hls: any;

    const setup = async () => {
      const video = videoRef.current;
      if (!video) return;

      const src =
        "https://customer-91ky5325cuy51tup.cloudflarestream.com/b40231438cda3173c9789099271ec0c3/manifest/video.m3u8";

      // Dynamically import to avoid SSR issues
      const { default: Hls } = await import("hls.js");

      if (Hls.isSupported()) {
        hls = new Hls({ autoStartLoad: true });
        hls.loadSource(src);
        hls.attachMedia(video);
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // iOS/Safari native HLS
        video.src = src;
      }
    };

    setup();
    return () => {
      if (hls) hls.destroy();
    };
  }, []);

  return (
    <section
      className="
        relative block w-screen max-w-none left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]
        h-[380px] md:h-[480px] overflow-hidden
      "
      aria-label="Imperial Jewelry showcase video"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        // Helpful for some Android webviews:
        // x5-playsinline="true" webkit-playsinline="true"
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
