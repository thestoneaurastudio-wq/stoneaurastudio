import heroImage from "@/assets/hero-mandir.jpg";

const AboutHero = () => {
  return (
    <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Master craftsmen creating luxury marble mandir"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <span className="inline-block px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full text-xs font-medium tracking-widest text-primary uppercase mb-6">
          Est. 1978 • Kishangarh, Rajasthan
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4">
          About <span className="text-gradient-gold">StoneAura Studio</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Crafting Timeless Elegance from Nature's Finest Creations
        </p>
      </div>
    </section>
  );
};

export default AboutHero;
