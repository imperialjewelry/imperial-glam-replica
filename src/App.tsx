
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import Chains from "./pages/Chains";
import Bracelets from "./pages/Bracelets";
import Watches from "./pages/Watches";
import Grillz from "./pages/Grillz";
import Pendants from "./pages/Pendants";
import Earrings from "./pages/Earrings";
import HipHopRings from "./pages/HipHopRings";
import EngagementRings from "./pages/EngagementRings";
import Glasses from "./pages/Glasses";
import VvsDiamondSimulants from "./pages/VvsDiamondSimulants";
import Custom from "./pages/Custom";
import Diamond from "./pages/Diamond";
import PaymentSuccess from "./pages/PaymentSuccess";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/chains" element={<Chains />} />
            <Route path="/bracelets" element={<Bracelets />} />
            <Route path="/watches" element={<Watches />} />
            <Route path="/grillz" element={<Grillz />} />
            <Route path="/pendants" element={<Pendants />} />
            <Route path="/earrings" element={<Earrings />} />
            <Route path="/hip-hop-rings" element={<HipHopRings />} />
            <Route path="/engagement-rings" element={<EngagementRings />} />
            <Route path="/glasses" element={<Glasses />} />
            <Route path="/vvs-diamond-simulants" element={<VvsDiamondSimulants />} />
            <Route path="/custom" element={<Custom />} />
            <Route path="/diamond" element={<Diamond />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
