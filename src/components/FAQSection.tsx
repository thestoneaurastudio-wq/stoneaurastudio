import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus } from "lucide-react";

const FAQSection = () => {
  const faqs = [
    {
      question: "Do you ship across India and internationally?",
      answer: "Yes, we ship to all pin codes in India and have extensive experience in international shipping to the USA, UK, UAE, and Europe. All items are packed in multi-layered secure wooden crates.",
    },
    {
      question: "How long does it take to make a custom mandir?",
      answer: "A standard custom mandir takes between 4 to 8 weeks depending on the size and complexity of the carving. We provide regular updates and photos throughout the process.",
    },
    {
      question: "What types of marble do you use?",
      answer: "We primarily work with high-quality Makrana Marble, Vietnam White Marble, and Ambaji Marble. We help you choose the best stone based on your budget and design requirements.",
    },
    {
      question: "Can I get a design consultation before ordering?",
      answer: "Absolutely. Our design team offers free consultations via WhatsApp or Video Call to help you visualize your space and choose the right design and dimensions.",
    },
    {
      question: "Is the polishing permanent?",
      answer: "Our premium mirror-finish and gold leafing are designed to last for decades. We also provide a care guide to help you maintain the luster of your marble piece.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-[#fdfaf5]">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-[400px,1fr] gap-16">
          <div className="space-y-6">
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">Help & Support</span>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight">
              Frequently Asked <span className="text-gradient-gold">Questions</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to know about our products, shipping, and custom orders.
            </p>
            <div className="pt-4">
              <div className="p-6 bg-white rounded-2xl shadow-soft border border-primary/10">
                <p className="text-charcoal font-medium mb-2">Still have questions?</p>
                <p className="text-sm text-muted-foreground mb-4">Contact our support team for personalized assistance.</p>
                <a href="/contact" className="text-primary font-bold hover:underline inline-flex items-center gap-2">
                  Contact Support <ChevronDown className="w-4 h-4 -rotate-90" />
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-2xl border transition-all duration-300 ${
                  activeIndex === index 
                    ? "border-primary bg-white shadow-elevated" 
                    : "border-border/60 bg-white/50 hover:border-primary/30"
                }`}
              >
                <button
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className={`text-lg font-medium transition-colors ${activeIndex === index ? "text-primary" : "text-charcoal"}`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${activeIndex === index ? "bg-primary text-white rotate-45" : "bg-secondary text-charcoal"}`}>
                    <Plus className="w-5 h-5" />
                  </div>
                </button>
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
