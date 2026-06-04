import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | StoneAura Studio - Get in Touch</title>
        <meta
          name="description"
          content="Contact StoneAura Studio for custom marble mandirs, idols, and decor. WhatsApp support, pan-India delivery."
        />
      </Helmet>
      <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ContactPage;
