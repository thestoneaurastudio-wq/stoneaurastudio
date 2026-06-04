import { Mountain, Hammer, Sparkles, CheckCircle, Package, Truck } from "lucide-react";

const CraftsmanshipProcess = () => {
  const steps = [
    {
      icon: Mountain,
      step: "01",
      title: "Stone Selection",
      description: "Premium Makrana & Vietnam marble, hand-picked for quality and veining.",
    },
    {
      icon: Hammer,
      step: "02",
      title: "Hand Carving",
      description: "Master artisans chisel intricate details with generations of expertise.",
    },
    {
      icon: Sparkles,
      step: "03",
      title: "Polishing",
      description: "Mirror-smooth finishes with premium white and gold luxury polishing.",
    },
    {
      icon: CheckCircle,
      step: "04",
      title: "Quality Check",
      description: "7-point inspection ensuring perfection in every curve and detail.",
    },
    {
      icon: Package,
      step: "05",
      title: "Secure Packaging",
      description: "Wooden crates, foam padding, and bubble wrap for maximum protection.",
    },
    {
      icon: Truck,
      step: "06",
      title: "Insured Delivery",
      description: "Safe transit with full insurance coverage to your doorstep.",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-card rounded-full border border-border text-xs font-medium tracking-widest text-muted-foreground uppercase mb-4">
            Our Process
          </span>
          <h2 className="text-3xl md:text-4xl font-serif">
            How We Craft Your <span className="text-gradient-gold">Masterpiece</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((item, index) => (
            <div
              key={item.title}
              className="group relative p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-soft transition-all duration-300"
            >
              <div className="absolute top-4 right-4 text-4xl font-serif text-primary/10 group-hover:text-primary/20 transition-colors">
                {item.step}
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CraftsmanshipProcess;
