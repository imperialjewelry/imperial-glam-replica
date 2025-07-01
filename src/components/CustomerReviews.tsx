
import { Star } from 'lucide-react';

const CustomerReviews = () => {
  const reviews = [
    {
      id: 1,
      title: "Top Quality!",
      content: "Naa cartel came in clutch I'll definitely be so real!! Literally the best",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      title: "Nonstop Compliments",
      content: "Just received my custom pendant from cartel and I",
      image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      title: "Outstanding Attention to Detail",
      content: "My chain from ICE Cartel is impressive, but the shipping",
      image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 4,
      title: "Just how I wanted",
      content: "Exactly how I imagined it, thank you! I love it, definitely",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 5,
      title: "So Happy!",
      content: "Just received my custom pendant from cartel and I",
      image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 6,
      title: "Impressive Chain",
      content: "My chain from ICE Cartel is impressive, but the shipping",
      image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <section className="py-16 bg-black text-white relative overflow-hidden">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-repeat bg-center" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
             }}>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <p className="text-gray-400 text-sm font-medium mb-2">SHOP BY</p>
          <h2 className="text-4xl font-bold mb-4">CUSTOMER REVIEWS</h2>
          <div className="flex items-center justify-center space-x-2">
            <span className="text-2xl font-bold">4.8</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-green-400 text-green-400" />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-12">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white text-black rounded-lg overflow-hidden shadow-lg"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={review.image}
                  alt={review.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{review.title}</h3>
                <p className="text-gray-600 text-sm">{review.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Options Strip */}
      <div className="bg-white border-t border-b border-gray-200 py-4 mt-16">
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee items-center space-x-8 whitespace-nowrap">
            {/* First set */}
            <div className="flex items-center space-x-8">
              <span className="text-lg font-bold text-black">✨</span>
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                afterpay
              </div>
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                affirm
              </div>
              <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                Pay Later
              </div>
              <span className="text-lg font-bold text-black">⭐</span>
              <span className="text-sm text-gray-600">📅 Payment plans for 12-36 months</span>
              <span className="text-sm text-gray-600">🛡️ Doesn't affect credit score</span>
              <span className="text-lg font-bold text-black">✨</span>
              <span className="text-xl font-bold text-black">BUY NOW, PAY LATER</span>
              <span className="text-lg font-bold text-black">⭐</span>
            </div>
            {/* Duplicate set for seamless loop */}
            <div className="flex items-center space-x-8">
              <span className="text-lg font-bold text-black">✨</span>
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                afterpay
              </div>
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                affirm
              </div>
              <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                Pay Later
              </div>
              <span className="text-lg font-bold text-black">⭐</span>
              <span className="text-sm text-gray-600">📅 Payment plans for 12-36 months</span>
              <span className="text-sm text-gray-600">🛡️ Doesn't affect credit score</span>
              <span className="text-lg font-bold text-black">✨</span>
              <span className="text-xl font-bold text-black">BUY NOW, PAY LATER</span>
              <span className="text-lg font-bold text-black">⭐</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
