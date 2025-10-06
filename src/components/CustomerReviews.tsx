import { useEffect } from 'react';

const CustomerReviews = () => {
  useEffect(() => {
    // Load EmbedSocial script
    const script = document.createElement('script');
    script.src = "https://embedsocial.com/cdn/ht.js";
    script.id = "EmbedSocialHashtagScript";
    script.async = true;
    
    if (!document.getElementById("EmbedSocialHashtagScript")) {
      document.head.appendChild(script);
    }

    return () => {
      // Cleanup script on unmount
      const existingScript = document.getElementById("EmbedSocialHashtagScript");
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <section className="py-16 bg-black text-white relative overflow-hidden">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0 bg-repeat bg-center" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">CUSTOMER REVIEWS</h2>
        </div>

        {/* EmbedSocial Reviews Widget */}
        <div className="mb-12">
          <div 
            className="embedsocial-hashtag" 
            data-ref="c7f87cdbd72323b5db205677fc089e2470062c97"
          >
            <a 
              className="feed-powered-by-es feed-powered-by-es-slider-img es-widget-branding" 
              href="https://embedsocial.com/blog/embed-google-reviews/" 
              target="_blank" 
              rel="noopener noreferrer"
              title="Embed Google reviews"
            >
              <img 
                src="https://embedsocial.com/cdn/icon/embedsocial-logo.webp" 
                alt="EmbedSocial" 
              />
              <div className="es-widget-branding-text">Embed Google reviews</div>
            </a>
          </div>
        </div>
      </div>

      {/* Payment Options Strip */}
      <div className="bg-white border-t border-b border-gray-200 py-6 mt-16">
        <div className="overflow-hidden">
          <div className="flex items-center animate-scroll-payment space-x-16">
            {/* Duplicate payment items for seamless loop */}
            {[...Array(6)].map((_, setIndex) => (
              <div key={setIndex} className="flex items-center gap-16 min-w-max">
                <img 
                  src="https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/images//afterpaylogo.webp" 
                  alt="Afterpay" 
                  className="h-8" 
                />
                <img 
                  src="https://cdn-assets.affirm.com/images/black_logo-white_bg.svg" 
                  alt="Affirm" 
                  className="h-8" 
                />
                <img 
                  src="https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/images/klarnalogo.webp" 
                  alt="Klarna Pay Later" 
                  className="h-8" 
                />
                <span className="text-xs text-gray-600 whitespace-nowrap">
                  Payment plans 3-36 months
                </span>
                <span className="text-xl font-bold text-black whitespace-nowrap">
                  BUY NOW PAY LATER
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes scroll-payment {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll-payment {
            animation: scroll-payment 17s linear infinite;
          }
        `
      }} />
    </section>
  );
};

export default CustomerReviews;
