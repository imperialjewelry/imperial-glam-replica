
import Header from '../components/Header';
import Hero from '../components/Hero';
import ProductShowcase from '../components/ProductShowcase';
import PromoBar from '../components/PromoBar';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <PromoBar />
      <Header />
      <Hero />
      <ProductShowcase />
      <Footer />
    </div>
  );
};

export default Index;
