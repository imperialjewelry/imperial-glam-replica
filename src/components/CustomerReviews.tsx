
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
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

      {/* Chat Now button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold flex items-center space-x-2 shadow-lg transition-colors">
          <span>💬</span>
          <span>CHAT NOW</span>
        </button>
      </div>
    </section>
  );
};

export default CustomerReviews;
