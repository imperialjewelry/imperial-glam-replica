import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface Review {
  author: string;
  avatar: string;
  rating: number;
  text: string;
  time: string;
}

interface ReviewsData {
  businessName: string;
  avgRating: number;
  totalRatings: number;
  reviews: Review[];
  source: string;
}

const CustomerReviews = () => {
  const [reviewsData, setReviewsData] = useState<ReviewsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('reviews');
        
        if (error) throw error;
        
        setReviewsData(data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError(err instanceof Error ? err.message : 'Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const renderStars = (rating: number) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <section className="py-16 bg-black text-white relative overflow-hidden">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0 bg-repeat bg-center"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">CUSTOMER REVIEWS</h2>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            <p className="mt-4">Loading reviews...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-400">Error: {error}</p>
          </div>
        )}

        {!loading && !error && reviewsData && (
          <>
            {/* Reviews Header */}
            <div className="flex justify-between items-start flex-wrap mb-8 gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-yellow-400 text-xl tracking-wider">★★★★★</span>
                <span className="text-base font-medium">
                  <span className="text-white">{reviewsData.avgRating}</span> rating of{" "}
                  <span className="text-white">{reviewsData.totalRatings}</span> reviews
                </span>
              </div>

              <a
                href="https://search.google.com/local/writereview?placeid=ChIJT6q6ronBQIYRxQeqmumN6pA"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-6 py-3 rounded transition-all hover:shadow-lg inline-block"
              >
                Leave a review
              </a>
            </div>

            {/* Reviews Carousel */}
            <div className="mb-12">
              <Carousel
  opts={{
    align: "start",
    loop: true,
  }}
  plugins={[
    Autoplay({
      delay: 5000,
    }),
  ]}
  className="w-full"
>
  <CarouselContent className="-ml-4">
    {reviewsData.reviews.map((review, index) => (
      <CarouselItem
        key={index}
        className="pl-4 md:basis-1/2 lg:basis-1/4"
      >
        <div className="h-full">
          <div className="bg-white text-gray-900 rounded-lg p-6 border border-gray-200 h-full flex flex-col items-center text-center">
            <img
              src={review.avatar || "https://via.placeholder.com/64"}
              alt={review.author}
              className="w-12 h-12 rounded-full object-cover border border-gray-200 mb-3"
              loading="lazy"
            />

            <h3 className="font-semibold text-base mb-1">{review.author}</h3>
            <p className="text-xs text-gray-600 mb-3">{review.time}</p>

            <div className="text-yellow-400 text-base tracking-wider mb-3">
              {renderStars(review.rating)}
            </div>

            <p className="text-sm text-gray-900 leading-relaxed mb-4 flex-grow line-clamp-4 max-w-[260px]">
              {review.text}
            </p>

            <img
              src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_74x24dp.png"
              alt="Google"
              className="h-5 object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>

  <CarouselPrevious
    className="left-2 md:-left-12 bg-white text-black border border-white shadow-xl hover:bg-white hover:text-black hover:shadow-2xl w-10 h-10 rounded-full flex items-center justify-center"
  />
  <CarouselNext
    className="right-2 md:-right-12 bg-white text-black border border-white shadow-xl hover:bg-white hover:text-black hover:shadow-2xl w-10 h-10 rounded-full flex items-center justify-center"
  />
</Carousel>

            </div>
          </>
        )}
      </div>

      {/* Payment Options Strip */}
      <div className="bg-white border-t border-b border-gray-200 py-6 mt-16">
        <div className="overflow-hidden">
          <div className="flex items-center animate-scroll-payment space-x-16">
            {[...Array(6)].map((_, setIndex) => (
              <div key={setIndex} className="flex items-center gap-16 min-w-max">
                <img
                  src="https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/images//afterpaylogo.webp"
                  alt="Afterpay"
                  className="h-8"
                />
                <img src="https://cdn-assets.affirm.com/images/black_logo-white_bg.svg" alt="Affirm" className="h-8" />
                <img
                  src="https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/images/klarnalogo.webp"
                  alt="Klarna Pay Later"
                  className="h-8"
                />
                <span className="text-xs text-gray-600 whitespace-nowrap">Payment plans 3-36 months</span>
                <span className="text-xl font-bold text-black whitespace-nowrap">BUY NOW PAY LATER</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes scroll-payment {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-scroll-payment {
              animation: scroll-payment 17s linear infinite;
            }
          `,
        }}
      />
    </section>
  );
};

export default CustomerReviews;
