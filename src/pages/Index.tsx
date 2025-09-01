
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

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <PromoBar />
      <Header />
      <Hero />
      <CategoryNavigation />
      
      <LazySection fallback={<Skeleton className="w-full h-96" />}>
        <ProductShowcase 
          title="Diamond Collection"
          subtitle="Premium VVS Diamonds"
          category="diamonds"
          tableName="diamond_products"
        />
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3464.338343488329!2d-95.46823848783117!3d29.738919674974873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c16f38c46c87%3A0x9dea2daeead2580d!2s5085%20Westheimer%20Rd%2C%20Houston%2C%20TX%2077056!5e0!3m2!1sen!2sus!4v1756584160678!5m2!1sen!2sus"
                width="100%" 
                height="450" 
                style={{ border: 0, maxWidth: '800px' }}
                allowFullScreen
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>
      </LazySection>
      
      <LazySection fallback={<Skeleton className="w-full h-64" />}>
        <Footer />
      </LazySection>
    </div>
  );
};

export default Index;
