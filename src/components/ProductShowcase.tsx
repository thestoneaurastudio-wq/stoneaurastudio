import { Link } from "react-router-dom";
import hanumanImg from "@/assets/Hanuman-ji.png";
import krishnaImg from "@/assets/Krishna-Ji.png";
import radhaImg from "@/assets/Krishna-Radha.png";
import RevealOnScroll from "./RevealOnScroll";
import { motion } from "framer-motion";

const ProductShowcase = () => {
  const categories = [
    {
      id: 1,
      name: "Ghar Mandir",
      image: hanumanImg,
      count: "25+ Designs",
    },
    {
      id: 2,
      name: "Marble Idols",
      image: krishnaImg,
      count: "50+ Pieces",
    },
    {
      id: 3,
      name: "Wall Panels",
      image: radhaImg,
      count: "15+ Styles",
    },
    {
      id: 4,
      name: "Temple Decor",
      image: hanumanImg,
      count: "30+ Items",
    },
    {
      id: 5,
      name: "Custom Designs",
      image: krishnaImg,
      count: "Unlimited",
    },
    {
      id: 6,
      name: "Luxury Collection",
      image: radhaImg,
      count: "Premium",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-cream overflow-hidden">
      <RevealOnScroll className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Our Specializations</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
            Curated <span className="text-gradient-gold">Masterpieces</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Discover our diverse range of stone art, from sacred idols to luxury architectural elements.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Link
                to="/shop"
                className="group relative block aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-secondary/50 shadow-soft hover:shadow-elevated transition-all duration-500"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-3 mb-1 sm:mb-2 overflow-hidden">
                    <div className="h-px w-4 sm:w-8 bg-primary/60 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                    <span className="text-[8px] sm:text-[10px] text-primary font-bold uppercase tracking-[0.3em]">
                      {category.count}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg sm:text-2xl md:text-3xl text-white mb-2 sm:mb-4">
                    {category.name}
                  </h3>
                  <div className="flex items-center gap-2 text-white/60 text-[10px] sm:text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    Explore <div className="w-4 sm:w-8 h-px bg-white/40" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
};

export default ProductShowcase;
