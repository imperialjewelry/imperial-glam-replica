import Header from '../components/Header';
import Hero from '../components/Hero';
import ProductShowcase from '../components/ProductShowcase';
import CategorySection from '../components/CategorySection';
import CustomerReviews from '../components/CustomerReviews';
import BestDeals from '../components/BestDeals';
import ChainsSection from '../components/ChainsSection';
import MoissaniteGrillzSection from '../components/MoissaniteGrillzSection';
import MoissaniteWatchesSection from '../components/MoissaniteWatchesSection';
import MoissanitePendantsSection from '../components/MoissanitePendantsSection';
import PromoBar from '../components/PromoBar';
import Footer from '../components/Footer';
import CategoryNavigation from '../components/CategoryNavigation';
import LazySection from '../components/LazySection';
import { Skeleton } from '@/components/ui/skeleton';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    "name": "Imperial Jewelry",
    "description": "Premium diamond jewelry, hip hop chains, custom engagement rings, and moissanite jewelry store specializing in luxury accessories.",
    "url": "https://shopimperialjewelry.com",
    "logo": "https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/images/imperialjewelrylogo.webp",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "5085 Westheimer Rd",
      "addressLocality": "Houston",
      "addressRegion": "TX",
      "postalCode": "77056",
      "addressCountry": "US"
    },
    "telephone": "(832) 408-1472",
    "openingHours": ["Mo-Th 10:00-20:00", "Fr-Sa 10:00-21:00", "Su 12:00-19:00"],
    "priceRange": "$$",
    "areaServed": "United States",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Jewelry Collection",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Diamond Chains",
            "category": "Jewelry"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Product",
            "name": "Engagement Rings",
            "category": "Jewelry"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product", 
            "name": "Hip Hop Jewelry",
            "category": "Jewelry"
          }
        }
      ]
    }
  };

  return (
    <>
      <Helmet>
        <title>Imperial Jewelry - Premium Diamond & Hip Hop Jewelry Store | Custom Engagement Rings & Moissanite Chains</title>
        <meta name="description" content="Shop luxury diamond jewelry, hip hop chains, custom engagement rings, and moissanite jewelry at Imperial Jewelry. Premium 14k gold, silver jewelry with expert craftsmanship. Houston's premier jewelry store." />
        <meta name="keywords" content="diamond jewelry, hip hop jewelry, custom engagement rings, moissanite jewelry, gold chains, diamond rings, luxury jewelry store, custom jewelry, Houston jewelry, premium jewelry, 14k gold jewelry, moissanite chains" />
        <link rel="canonical" href="https://shopimperialjewelry.com/" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-white">
        <PromoBar />
        <Header />
        <main>
          <Hero />
          <CategoryNavigation />
          
          <LazySection fallback={<Skeleton className="w-full h-96" />}>
            <ProductShowcase />
          </LazySection>
          
          <LazySection fallback={<Skeleton className="w-full h-80" />}>
            <CategorySection />
          </LazySection>
          
          <LazySection fallback={<Skeleton className="w-full h-96" />}>
            <CustomerReviews />
          </LazySection>
          
          <LazySection fallback={<Skeleton className="w-full h-80" />}>
            <BestDeals />
          </LazySection>
          
          <LazySection fallback={<Skeleton className="w-full h-80" />}>
            <ChainsSection />
          </LazySection>
          
          <LazySection fallback={<Skeleton className="w-full h-80" />}>
            <MoissaniteGrillzSection />
          </LazySection>
          
          <LazySection fallback={<Skeleton className="w-full h-80" />}>
            <MoissaniteWatchesSection />
          </LazySection>
          
          <LazySection fallback={<Skeleton className="w-full h-80" />}>
            <MoissanitePendantsSection />
          </LazySection>
          
          {/* Google Maps Section */}
          <LazySection fallback={<Skeleton className="w-full h-96" />}>
            <section className="py-16 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Visit Our Store</h2>
                  <p className="text-gray-600">5085 Westheimer Rd, Houston, TX 77056</p>
                </div>
                <div className="flex justify-center">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3464.350023021816!2d-95.46300195092621!3d29.738581553287506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c189aebaaa4f%3A0x90ea8de99aaa07c5!2sImperial%20Jewelry!5e0!3m2!1sen!2sus!4v1757356832387!5m2!1sen!2sus"
                    width="100%" 
                    height="450" 
                    style={{ border: 0, maxWidth: '800px' }}
                    allowFullScreen
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg shadow-lg"
                    title="Imperial Jewelry Store Location"
                  />
                </div>
              </div>
            </section>
          </LazySection>
        </main>
        
        <LazySection fallback={<Skeleton className="w-full h-64" />}>
          <Footer />
        </LazySection>
      </div>
    </>
  );
};

export default Index;