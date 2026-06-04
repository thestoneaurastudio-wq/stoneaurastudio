import { MessageSquare, FileCheck, Hammer, Package } from "lucide-react";

const HowWeWork = () => {
  const steps = [
    {
      step: "01",
      icon: MessageSquare,
      title: "Share Design / Inspiration",
      description: "Send us your ideas, reference images, or let us suggest designs",
    },
    {
      step: "02",
      icon: FileCheck,
      title: "Get Quote & Size Confirmation",
      description: "Receive detailed quote with dimensions and material options",
    },
    {
      step: "03",
      icon: Hammer,
      title: "Crafting & Polishing",
      description: "Our artisans handcraft your piece with premium finishes",
    },
    {
      step: "04",
      icon: Package,
      title: "Insured Delivery to Your Home",
      description: "Safe, insured shipping with professional installation support",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-cream overflow-hidden">
      <div className="container mx-auto px-6 animate-fade-up">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-medium tracking-widest text-primary uppercase">
            Our Process
          </span>
          <h2 className="text-3xl md:text-4xl font-serif mt-4 mb-4">
            How <span className="text-gradient-gold">We Work</span>
          </h2>
          <p className="text-muted-foreground">
            Simple 4-step process from your vision to reality
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-[2px] bg-gradient-to-r from-primary/30 to-transparent" />
              )}

              <div className="relative bg-background rounded-2xl p-6 text-center border border-border hover:border-primary/30 hover:shadow-soft transition-all duration-300">
                {/* Step number */}
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                  Step {step.step}
                </span>

                <div className="w-16 h-16 mx-auto mt-4 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>

                <h3 className="font-serif text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
