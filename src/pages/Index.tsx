import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProductShowcase from "@/components/ProductShowcase";
import FeaturedSlider from "@/components/FeaturedSlider";
import HowWeWork from "@/components/HowWeWork";
import Testimonials from "@/components/Testimonials";
import CustomOrderForm from "@/components/CustomOrderForm";
import PlacementStories from "@/components/PlacementStories";
import FeaturedIn from "@/components/FeaturedIn";
import SEOContent from "@/components/SEOContent";
import Heritage from "@/components/Heritage";
import ProcessShowcase from "@/components/ProcessShowcase";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Stone Aura Studio – Premium Stone Sculptures & Temple Work from India</title>
        <meta
          name="description"
          content="Premium Stone Sculptures, Temple Construction, and Custom Handcrafted Stonework. Exporting timeless Indian heritage globally. Expert craftsmanship from Kishangarh, India."
        />
      </Helmet>
      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <Heritage />
          <WhyChooseUs />
          <ProductShowcase />
          <ProcessShowcase />
          <FeaturedSlider />
          <FeaturedIn />
          <PlacementStories />
          <Testimonials />
          <FAQSection />
          <CTASection />
          <SEOContent />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
