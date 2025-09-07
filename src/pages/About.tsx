import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PromoBar from '@/components/PromoBar';
import { Helmet } from 'react-helmet-async';
const About = () => {
  return <div className="min-h-screen bg-white">
      <Helmet>
        <title>About Imperial Jewelry - Custom Diamond & Hip Hop Jewelry Experts | Houston Jewelers</title>
        <meta name="description" content="Learn about Imperial Jewelry, Houston's premier custom jewelry experts specializing in diamond jewelry, hip hop chains, engagement rings, and luxury accessories. World-renowned craftsmanship since our founding." />
        <meta name="keywords" content="custom jewelry experts, diamond jewelry specialists, hip hop jewelry Houston, custom engagement rings, luxury jewelry craftsmanship, Houston jewelers, custom diamond jewelry, jewelry design experts" />
      </Helmet>
      <PromoBar />
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            ABOUT IMPERIAL JEWELRY
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Houston's premier destination for custom diamond jewelry, hip hop chains, engagement rings, 
            and luxury accessories. Serving discerning clients with world-class craftsmanship and personalized service.
          </p>
        </div>

        {/* Our Story */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-600 mb-6">
                Located in the heart of Houston at 5085 Westheimer Rd, Imperial Jewelry has established itself 
                as the go-to destination for luxury jewelry and custom design services. Our showroom serves 
                clients who appreciate exceptional quality and personalized attention.
              </p>
              <p className="text-gray-600 mb-6">
                We specialize in men's diamond jewelry, custom engagement rings, hip hop jewelry, chains, 
                bracelets, pendants, earrings, luxury watches, and custom grillz. Every piece reflects our 
                commitment to superior craftsmanship and attention to detail.
              </p>
              <p className="text-gray-600">
                Our team is available Monday through Friday, 11AM - 6:30 PM EST, to provide expert guidance 
                and personalized service for all your jewelry needs.
              </p>
            </div>
            <div className="aspect-video rounded-lg overflow-hidden border">
              <img 
                src="https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/images/imperial_jewelry.webp"
                alt="Imperial Jewelry Houston Showroom"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Our Specialties */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Specialties</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
              
              <h3 className="text-xl font-semibold mb-3">Custom Jewelry Design</h3>
              <p className="text-gray-600">
                Bespoke engagement rings, custom pendants, and personalized pieces designed to your exact specifications.
              </p>
            </div>
            <div className="text-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
              
              <h3 className="text-xl font-semibold mb-3">Hip Hop Jewelry</h3>
              <p className="text-gray-600">
                Premium chains, bracelets, pendants, and grillz crafted with the finest materials and attention to detail.
              </p>
            </div>
            <div className="text-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
              
              <h3 className="text-xl font-semibold mb-3">Diamond Jewelry</h3>
              <p className="text-gray-600">
                Men's diamond jewelry, VVS diamond simulants, and premium pieces featuring only the highest quality stones.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Imperial Jewelry */}
        <div className="bg-gray-50 p-8 rounded-lg mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Imperial Jewelry</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">✓</span>
                  <span><strong>Ships Today Program:</strong> Fast delivery on select items</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">✓</span>
                  <span><strong>Flexible Financing:</strong> Afterpay, Affirm, and Klarna available</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">✓</span>
                  <span><strong>Expert Consultation:</strong> Personalized service from jewelry specialists</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">✓</span>
                  <span><strong>Quality Guarantee:</strong> Premium materials and craftsmanship</span>
                </li>
              </ul>
            </div>
            <div>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">✓</span>
                  <span><strong>Custom Design Services:</strong> Bring your vision to life</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">✓</span>
                  <span><strong>Competitive Pricing:</strong> Best value without compromising quality</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">✓</span>
                  <span><strong>Houston Showroom:</strong> Experience our pieces in person</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">✓</span>
                  <span><strong>Secure Shopping:</strong> Safe online ordering with reliable delivery</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="text-center bg-white p-8 rounded-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Visit Our Houston Showroom</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
              <p className="text-gray-600">5085 Westheimer Rd<br />Houston, TX</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Hours</h3>
              <p className="text-gray-600">Monday - Friday<br />11AM - 6:30 PM EST<br />Weekends: Closed</p>
            </div>
          </div>
          
        </div>
      </div>

      <Footer />
    </div>;
};
export default About;