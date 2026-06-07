import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Collections from "./pages/Collections";
import Shop from "./pages/Shop";
import About from "./pages/About";
import ContactPage from "./pages/ContactPage";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import FloatingContactHub from "./components/FloatingContactHub";
import SchemaMarkup from "./components/SchemaMarkup";
import SmoothScroll from "./components/SmoothScroll";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

import { CartProvider } from "@/context/CartContext";

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <SchemaMarkup />
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <SmoothScroll />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <FloatingContactHub />
          </BrowserRouter>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
