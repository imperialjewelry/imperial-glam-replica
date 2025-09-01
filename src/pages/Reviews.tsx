
import { useState } from 'react';
import { Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PromoBar from '@/components/PromoBar';
import { Button } from '@/components/ui/button';

const Reviews = () => {
  const [filter, setFilter] = useState('all');

  const reviews = [
    {
      id: 1,
      name: "Marcus Johnson",
      rating: 5,
      date: "2024-01-15",
      product: "14K Gold Cuban Chain",
      review: "Absolutely stunning quality! The craftsmanship is incredible and the chain feels substantial. Imperial Jewelry exceeded my expectations. Fast shipping and excellent customer service.",
      verified: true
    },
    {
      id: 2,
      name: "Sarah Williams",
      rating: 5,
      date: "2024-01-10",
      product: "Moissanite Engagement Ring",
      review: "My fiancé proposed with this ring and it's absolutely perfect! The moissanite sparkles more than any diamond I've seen. The custom design process was smooth and the team was very helpful.",
      verified: true
    },
    {
      id: 3,
      name: "David Chen",
      rating: 5,
      date: "2024-01-08",
      product: "Custom Grillz Set",
      review: "These grillz are fire! Perfect fit, amazing shine, and the VVS simulants look incredible. The whole process from impression to delivery was professional. Highly recommend!",
      verified: true
    },
    {
      id: 4,
      name: "Jessica Martinez",
      rating: 4,
      date: "2024-01-05",
      product: "Diamond Tennis Bracelet",
      review: "Beautiful bracelet with excellent sparkle. The clasp is secure and the diamonds are well-matched. Shipping was a bit slower than expected but the quality makes up for it.",
      verified: true
    },
    {
      id: 5,
      name: "Robert Thompson",
      rating: 5,
      date: "2024-01-03",
      product: "Iced Out Watch",
      review: "This watch is absolutely incredible! The attention to detail is phenomenal and it catches light from every angle. Worth every penny and the customer service was top-notch.",
      verified: true
    },
    {
      id: 6,
      name: "Amanda Foster",
      rating: 5,
      date: "2023-12-28",
      product: "Diamond Stud Earrings",
      review: "Perfect earrings for everyday wear. The diamonds are brilliant and the setting is secure. Great value for the quality and they arrived exactly as described.",
      verified: true
    }
  ];

  const filteredReviews = filter === 'all' ? reviews : reviews.filter(review => review.rating === parseInt(filter));

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const ratingCounts = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PromoBar />
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            CUSTOMER REVIEWS
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See what our customers say about their Imperial Jewelry experience
          </p>
        </div>

        {/* Rating Summary */}
        <div className="bg-white rounded-lg p-8 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <div className="text-5xl font-bold text-gray-900 mb-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex justify-center md:justify-start mb-2">
                {renderStars(Math.round(averageRating))}
              </div>
              <div className="text-gray-600">
                Based on {reviews.length} reviews
              </div>
            </div>
            
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map(rating => (
                <div key={rating} className="flex items-center space-x-3">
                  <span className="text-sm font-medium w-6">{rating}</span>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full" 
                      style={{ width: `${(ratingCounts[rating as keyof typeof ratingCounts] / reviews.length) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">
                    {ratingCounts[rating as keyof typeof ratingCounts]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <Button 
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            className="text-sm"
          >
            All Reviews
          </Button>
          {[5, 4, 3, 2, 1].map(rating => (
            <Button 
              key={rating}
              variant={filter === rating.toString() ? 'default' : 'outline'}
              onClick={() => setFilter(rating.toString())}
              className="text-sm"
            >
              {rating} Stars ({ratingCounts[rating as keyof typeof ratingCounts]})
            </Button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredReviews.map(review => (
            <div key={review.id} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="font-semibold text-gray-900">{review.name}</div>
                  <div className="text-sm text-gray-500">{review.date}</div>
                </div>
                {review.verified && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Verified Purchase
                  </span>
                )}
              </div>
              
              <div className="flex items-center mb-3">
                <div className="flex mr-2">
                  {renderStars(review.rating)}
                </div>
                <span className="text-sm text-gray-600">for {review.product}</span>
              </div>
              
              <p className="text-gray-700 leading-relaxed">
                {review.review}
              </p>
            </div>
          ))}
        </div>

        {/* Write Review CTA */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Share Your Experience
            </h3>
            <p className="text-gray-600 mb-6">
              We'd love to hear about your Imperial Jewelry experience. Your review helps other customers make informed decisions.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              Write a Review
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Reviews;
