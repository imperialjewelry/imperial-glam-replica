import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider, useCart } from "@/contexts/CartContext";
import Index from "./pages/Index";
import BestDeals from "./pages/BestDeals";
import Chains from "./pages/Chains";
import Bracelets from "./pages/Bracelets";
import Watches from "./pages/Watches";
import Pendants from "./pages/Pendants";
import Earrings from "./pages/Earrings";
import Custom from "./pages/Custom";
import Grillz from "./pages/Grillz";
import Glasses from "./pages/Glasses";
import HipHopRings from "./pages/HipHopRings";
import EngagementRings from "./pages/EngagementRings";
import VvsDiamondSimulants from "./pages/VvsDiamondSimulants";
import Diamond from "./pages/Diamond";
import Product from "./pages/Product";
import PaymentSuccess from "./pages/PaymentSuccess";
import SearchResults from "./pages/SearchResults";
import About from "./pages/About";

import Financing from "./pages/Financing";
import Certificates from "./pages/Certificates";
import Contact from "./pages/Contact";
import Shipping from "./pages/Shipping";
import Returns from "./pages/Returns";
import SizeGuides from "./pages/SizeGuides";
import Faqs from "./pages/Faqs";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import ShoppingCart from "./components/ShoppingCart";

const queryClient = new QueryClient();

const AppContent = () => {
  const { state, dispatch } = useCart();

  const handleCloseCart = () => {
    dispatch({ type: 'CLOSE_CART' });
  };

  return (
    <>
      <ShoppingCart isOpen={state.isOpen} onClose={handleCloseCart} />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/best-deals" element={<BestDeals />} />
        <Route path="/chains" element={<Chains />} />
        <Route path="/bracelets" element={<Bracelets />} />
        <Route path="/watches" element={<Watches />} />
        <Route path="/pendants" element={<Pendants />} />
        <Route path="/earrings" element={<Earrings />} />
        <Route path="/custom" element={<Custom />} />
        <Route path="/grillz" element={<Grillz />} />
        <Route path="/glasses" element={<Glasses />} />
        <Route path="/rings/hip-hop" element={<HipHopRings />} />
        <Route path="/rings/engagement" element={<EngagementRings />} />
        <Route path="/vvs-diamond-simulants" element={<VvsDiamondSimulants />} />
        <Route path="/diamond" element={<Diamond />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/search" element={<SearchResults />} />
        
        {/* Company Pages */}
        <Route path="/about" element={<About />} />
        
        <Route path="/financing" element={<Financing />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Help Pages */}
        <Route path="/policies/shipping" element={<Shipping />} />
        <Route path="/policies/returns" element={<Returns />} />
        <Route path="/size-guides" element={<SizeGuides />} />
        <Route path="/faqs" element={<Faqs />} />
        
        {/* Legal Pages */}
        <Route path="/legal/privacy" element={<Privacy />} />
        <Route path="/legal/terms" element={<Terms />} />
        
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
