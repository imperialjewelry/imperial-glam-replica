
import Header from '../components/Header';
import Hero from '../components/Hero';
import CategorySection from '../components/CategorySection';
import CustomerReviews from '../components/CustomerReviews';
import BestDeals from '../components/BestDeals';
import ChainsSection from '../components/ChainsSection';
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
      <CategorySection />
      <CustomerReviews />
      <BestDeals />
      <ChainsSection />
      <Footer />
    </div>
  );
};

export default Index;
