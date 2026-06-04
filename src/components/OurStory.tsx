import { Heart, Sparkles } from "lucide-react";

const OurStory = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-background rounded-full border border-border mb-6">
            <Heart className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
              Our Story
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-serif mb-8">
            A Legacy Born from <span className="text-gradient-gold">Passion</span>
          </h2>

          <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
            <p>
              <strong className="text-foreground">StoneAura Studio</strong> was born from a family legacy of marble artisans in Kishangarh. What began as a small workshop in 1978 has grown into a global luxury brand trusted by homes, temples, and designers worldwide.
            </p>
            <p>
              Our expertise comes from generations who lived and breathed stone. Every chisel mark, every polish stroke carries the wisdom of our ancestors combined with modern precision techniques.
            </p>
            <p>
              At StoneAura Studio, we believe every stone tells a story — a story of strength, beauty, and timeless craftsmanship. Our mission is to transform these natural elements into exquisite lifestyle pieces that elevate spaces and inspire aesthetics.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-2xl text-foreground mb-2">40+</h3>
              <p className="text-muted-foreground text-sm">Years of Excellence</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-2xl text-foreground mb-2">5000+</h3>
              <p className="text-muted-foreground text-sm">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-2xl text-foreground mb-2">15+</h3>
              <p className="text-muted-foreground text-sm">Countries Served</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
