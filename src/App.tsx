
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Chains from "./pages/Chains";
import Bracelets from "./pages/Bracelets";
import Watches from "./pages/Watches";
import Pendants from "./pages/Pendants";
import Earrings from "./pages/Earrings";
import Custom from "./pages/Custom";
import Grillz from "./pages/Grillz";
import Glasses from "./pages/Glasses";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/chains" element={<Chains />} />
          <Route path="/bracelets" element={<Bracelets />} />
          <Route path="/watches" element={<Watches />} />
          <Route path="/pendants" element={<Pendants />} />
          <Route path="/earrings" element={<Earrings />} />
          <Route path="/custom" element={<Custom />} />
          <Route path="/grillz" element={<Grillz />} />
          <Route path="/glasses" element={<Glasses />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
