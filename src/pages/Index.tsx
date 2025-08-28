
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
      
      <LazySection fallback={<Skeleton className="w-full h-64" />}>
        <Footer />
      </LazySection>
    </div>
  );
};

export default Index;
