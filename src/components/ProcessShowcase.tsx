import { motion } from "framer-motion";
import stoneSelection from "@/assets/stone-selection.webp";
import roughBlocking from "@/assets/rough-blocking.webp";
import intricateCarving from "@/assets/intricate-carving.webp";
import mirrorPolish from "@/assets/mirror-polish.webp";

const ProcessShowcase = () => {
  const steps = [
    {
      number: "01",
      title: "Stone Selection",
      description: "We handpick the finest blocks of Makrana and Ambaji marble, ensuring zero cracks and uniform texture.",
      image: stoneSelection,
    },
    {
      number: "02",
      title: "Rough Blocking",
      description: "Master artisans use traditional tools to outline the primary form, removing excess stone with precision.",
      image: roughBlocking,
    },
    {
      number: "03",
      title: "Intricate Carving",
      description: "Using specialized chisels, we breathe life into the stone, carving fine jewelry, expressions, and textures.",
      image: intricateCarving,
    },
    {
      number: "04",
      title: "Mirror Polishing",
      description: "A multi-stage hand polishing process that achieves a glass-like finish without using any chemicals.",
      image: mirrorPolish,
    },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-primary font-semibold tracking-widest uppercase text-xs mb-4 block">The Creation Process</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">From <span className="text-gradient-gold">Earth to Altar</span></h2>
          <p className="text-muted-foreground text-lg">
            Discover the meticulous journey of transforming a raw marble block into a timeless masterpiece.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line for desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border/50 hidden lg:block" />

          <div className="space-y-24 lg:space-y-40">
            {steps.map((step, index) => (
              <div key={step.number} className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <motion.div 
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="lg:w-1/2"
                >
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-primary/5 rounded-3xl scale-95 group-hover:scale-100 transition-transform duration-500" />
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      className="relative z-10 w-full h-[400px] object-cover rounded-2xl shadow-xl transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    <div className="absolute -top-6 -right-6 lg:-right-10 z-20 bg-white shadow-xl rounded-full w-20 h-20 flex items-center justify-center border border-border">
                      <span className="text-3xl font-serif font-bold text-primary">{step.number}</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="lg:w-1/2 space-y-4"
                >
                  <h3 className="text-3xl font-serif font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {step.description}
                  </p>
                  <div className="pt-4">
                    <div className="h-1 w-20 bg-primary/20 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-primary"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessShowcase;
