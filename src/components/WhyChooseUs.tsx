import { Check, Award, Truck, Palette, Sparkles } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: Award,
      title: "100% Natural Makrana / Vietnam Marble",
      description: "Only the finest quality marble sourced directly",
    },
    {
      icon: Sparkles,
      title: "40+ Years of Traditional Craftsmanship",
      description: "Generations of artisan expertise in every piece",
    },
    {
      icon: Truck,
      title: "Pan-India Delivery with Safe Packaging",
      description: "Insured shipping to your doorstep",
    },
    {
      icon: Palette,
      title: "Custom Size, Design & Finish",
      description: "Tailored to your exact specifications",
    },
    {
      icon: Check,
      title: "Premium White / Gold Luxury Polishing",
      description: "Mirror-finish quality that lasts generations",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      <RevealOnScroll className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Our Excellence</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
            The StoneAura <span className="text-gradient-gold">Difference</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Decades of tradition meets modern luxury. Here is why architects and homeowners trust us globally.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-primary/5 rounded-[2rem] translate-x-2 translate-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="relative p-8 bg-white rounded-[2rem] border border-border/60 hover:border-primary/20 shadow-soft hover:shadow-elevated transition-all duration-500 h-full flex flex-col items-center text-center">
                <div className="w-16 h-16 mb-6 rounded-2xl bg-secondary/50 flex items-center justify-center group-hover:bg-primary group-hover:rotate-6 transition-all duration-500">
                  <reason.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-serif text-xl mb-4 leading-tight text-charcoal">{reason.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
};

export default WhyChooseUs;
