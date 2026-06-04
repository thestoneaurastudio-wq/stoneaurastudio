import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import AboutHero from "@/components/AboutHero";
import OurStory from "@/components/OurStory";
import Heritage from "@/components/Heritage";
import CraftsmanshipProcess from "@/components/CraftsmanshipProcess";
import WorkshopGallery from "@/components/WorkshopGallery";
import OurPhilosophy from "@/components/OurPhilosophy";
import Testimonials from "@/components/Testimonials";
import AboutCTA from "@/components/AboutCTA";
import AboutSEO from "@/components/AboutSEO";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | StoneAura Studio - 40+ Years of Marble Mastery</title>
        <meta
          name="description"
          content="Discover StoneAura Studio's legacy of 40+ years in luxury marble craftsmanship. Traditional Indian artisanship from Kishangarh, Rajasthan. Custom mandirs, idols & decor."
        />
      </Helmet>
      <div className="min-h-screen">
        <Header />
        <main>
          <AboutHero />
          <OurStory />
          <Heritage />
          <CraftsmanshipProcess />
          <WorkshopGallery />
          <OurPhilosophy />
          <Testimonials />
          <AboutCTA />
          <AboutSEO />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default About;
