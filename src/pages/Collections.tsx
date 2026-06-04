import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Products from "@/components/Products";
import Footer from "@/components/Footer";

const Collections = () => {
  return (
    <>
      <Helmet>
        <title>Collections | StoneAura Studio - Marble Mandirs & Idols</title>
        <meta
          name="description"
          content="Explore our curated collection of handcrafted marble mandirs, idols, and home decor. Premium craftsmanship from Kishangarh."
        />
      </Helmet>
      <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          <Products />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Collections;
