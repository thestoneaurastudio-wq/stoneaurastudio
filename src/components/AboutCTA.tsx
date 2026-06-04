import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";

const AboutCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-card to-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            Bring <span className="text-gradient-gold">Luxury</span> Home
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Custom Mandirs • Marble Idols • Wall Murals • Decor Items
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/collections"
              className="inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground px-8 py-3.5 rounded-full font-medium hover:shadow-gold transition-all duration-300"
            >
              Explore Collection
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/919876543210?text=Hi%20StoneAura%2C%20I%20would%20like%20to%20enquire%20about%20your%20products"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-medium border border-border hover:border-primary hover:text-primary transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Enquiry
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;
