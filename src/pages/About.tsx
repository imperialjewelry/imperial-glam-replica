
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PromoBar from '@/components/PromoBar';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <PromoBar />
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            ABOUT IMPERIAL JEWELRY
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            World renowned, bespoke custom jewelers crafting extraordinary pieces since our founding. 
            We specialize in premium diamond jewelry, custom designs, and luxury accessories.
          </p>
        </div>

        {/* Our Story */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-600 mb-6">
                Imperial Jewelry began with a simple vision: to create exceptional jewelry that tells a story. 
                Our journey started in Houston, Texas, where we established our private showroom to serve 
                discerning clients who demand nothing but the finest craftsmanship.
              </p>
              <p className="text-gray-600 mb-6">
                Today, we're recognized as world-renowned custom jewelers, specializing in everything from 
                engagement rings to hip-hop jewelry, chains, bracelets, and luxury watches. Every piece 
                we create is a testament to our commitment to excellence and attention to detail.
              </p>
            </div>
            <div className="bg-gray-100 aspect-video rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Our Workshop Image</span>
            </div>
          </div>
        </div>

        {/* Our Expertise */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Expertise</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl">💎</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Custom Design</h3>
              <p className="text-gray-600">
                From concept to creation, we bring your vision to life with our expert custom design services.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl">⚒️</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Master Craftsmanship</h3>
              <p className="text-gray-600">
                Our skilled artisans use traditional techniques combined with modern technology for perfect results.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Premium Materials</h3>
              <p className="text-gray-600">
                We use only the finest diamonds, precious metals, and gemstones in all our creations.
              </p>
            </div>
          </div>
        </div>

        {/* Our Commitment */}
        <div className="bg-gray-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Commitment</h2>
          <p className="text-gray-600 text-lg mb-4">
            At Imperial Jewelry, we believe that jewelry is more than just an accessory—it's a reflection 
            of your personality, your achievements, and your dreams. That's why we're committed to:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Providing exceptional customer service and personalized attention</li>
            <li>Using only ethically sourced materials and conflict-free diamonds</li>
            <li>Offering competitive pricing without compromising on quality</li>
            <li>Standing behind every piece with our comprehensive warranty</li>
            <li>Delivering on-time with our fast shipping and "Ships Today" program</li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
