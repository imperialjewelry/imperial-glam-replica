const VideoSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-5xl md:max-w-3xl lg:max-w-2xl mx-auto px-4">
        <div className="relative pt-[177.78%] md:pt-[80%] lg:pt-[56.25%]">
          <iframe
            src="https://customer-91ky5325cuy51tup.cloudflarestream.com/105bb313dc03d42df32972c41968f578/iframe?autoplay=true&muted=true&loop=true&controls=false&poster=https%3A%2F%2Fcustomer-91ky5325cuy51tup.cloudflarestream.com%2F105bb313dc03d42df32972c41968f578%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
            className="absolute top-0 left-0 w-full h-full border-none"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowFullScreen
            title="Imperial Jewelry Showcase Video"
          />
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
