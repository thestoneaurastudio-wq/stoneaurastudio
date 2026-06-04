import { motion } from "framer-motion";
import { Sparkles, Award, Globe, History } from "lucide-react";
import artisan from "@/assets/artisan.webp";

const Heritage = () => {
  const stats = [
    { icon: <History className="w-6 h-6" />, label: "Years of Legacy", value: "30+" },
    { icon: <Award className="w-6 h-6" />, label: "Master Artisans", value: "50+" },
    { icon: <Globe className="w-6 h-6" />, label: "Global Clients", value: "500+" },
    { icon: <Sparkles className="w-6 h-6" />, label: "Masterpieces", value: "2000+" },
  ];

  return (
    <section className="py-24 bg-[#0a0a0a] text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary/20 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-semibold tracking-widest uppercase text-xs mb-4 block">Our Heritage</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
              Preserving the <span className="text-gradient-gold">Traditional Art</span> of Stone Carving
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              Born in the heart of Kishangarh, Rajasthan, Stone Aura Studio is more than just a carving unit. 
              We are custodians of an ancient craft that transforms solid marble into living poetry. 
              Every chisel stroke is guided by generations of wisdom and a passion for perfection.
            </p>

            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col gap-2"
                >
                  <div className="text-primary mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold font-serif">{stat.value}</div>
                  <div className="text-white/50 text-sm uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-square rounded-full border border-primary/20 absolute -inset-4 animate-spin-slow pointer-events-none" />
            <div className="aspect-square rounded-full border border-primary/10 absolute -inset-12 animate-reverse-spin-slow pointer-events-none" />
            
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
              <img 
                src={artisan} 
                alt="Stone carving artisan" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8">
                <p className="text-primary font-medium italic text-lg">"Every stone has a story; we just help it speak."</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Heritage;
