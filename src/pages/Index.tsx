
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

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <PromoBar />
      <Header />
      <Hero />
      <CategoryNavigation />
      <ProductShowcase />
      <CategorySection />
      <CustomerReviews />
      <BestDeals />
      <ChainsSection />
      <MoissaniteGrillzSection />
      <MoissaniteWatchesSection />
      <MoissanitePendantsSection />
      <Footer />
    </div>
  );
};

export default Index;
