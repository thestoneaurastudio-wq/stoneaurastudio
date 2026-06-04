import { Gem, Target, Heart, Award } from "lucide-react";

const OurPhilosophy = () => {
  const values = [
    {
      icon: Gem,
      title: "Purity",
      description: "Using only the finest, ethically sourced natural stones.",
    },
    {
      icon: Target,
      title: "Precision",
      description: "Every curve, edge, and finish crafted with uncompromising accuracy.",
    },
    {
      icon: Heart,
      title: "Purpose",
      description: "Designs that are not just beautiful, but meaningful and long-lasting.",
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "A luxury approach to craftsmanship, packaging, and experience.",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-card rounded-full border border-border text-xs font-medium tracking-widest text-muted-foreground uppercase mb-4">
            Our Philosophy
          </span>
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            What We <span className="text-gradient-gold">Stand For</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We don't create for the masses — we create for those who value elegance, originality, and timeless design.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => (
            <div
              key={value.title}
              className="text-center p-8 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-soft transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl text-foreground mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPhilosophy;
