"use client";
import { useEffect, useRef } from "react";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let hls: any;
    const setup = async () => {
      const video = videoRef.current;
      if (!video) return;

      const HLS_URL =
        "https://customer-91ky5325cuy51tup.cloudflarestream.com/b40231438cda3173c9789099271ec0c3/manifest/video.m3u8";

      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = HLS_URL; // native Safari support
      } else {
        const { default: Hls } = await import("hls.js");
        if (Hls.isSupported()) {
          hls = new Hls();
          hls.loadSource(HLS_URL);
          hls.attachMedia(video);
        }
      }
    };
    setup();
    return () => hls?.destroy();
  }, []);

  return (
    <section
      className="
        relative block w-screen max-w-none left-1/2 right-1/2 
        -ml-[50vw] -mr-[50vw] h-[380px] md:h-[480px] overflow-hidden
      "
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
    </section>
  );
};
export default Hero;
