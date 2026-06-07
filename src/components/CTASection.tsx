import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background with texture/image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1920" 
          alt="Luxury background" 
          className="w-full h-full object-cover opacity-10 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto bg-charcoal rounded-[3rem] p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden"
        >
          {/* Decorative Sparkles */}
          <div className="absolute top-10 left-10 text-primary opacity-20">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48dGV4dCB4PSIwIiB5PSIyMCIgZmlsbD0iZ29sZCIgZm9udC1zaXplPSIyMCI+4pyKPC90ZXh0Pjwvc3ZnPg==" alt="golden embroidery" className="w-12 h-12 opacity-20" />
          </div>
          <div className="absolute bottom-10 right-10 text-primary opacity-20">
            <Sparkles className="w-12 h-12" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-8 leading-tight">
            Ready to Bring <span className="text-gradient-gold">Divine Grace</span> to Your Home?
          </h2>
          <p className="text-white/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            Whether it's a ready-to-ship idol or a complete temple project, 
            our design consultants are here to guide you every step of the way.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <Link 
              to="/shop" 
              className="bg-primary text-primary-foreground px-10 py-4 rounded-full font-bold text-lg hover:shadow-gold transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
            >
              Browse Shop
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/contact" 
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-charcoal transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
            >
              <MessageCircle className="w-6 h-6" />
              WhatsApp Enquiry
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-white/50">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Pan-India Delivery
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Insured Shipping
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Expert Consultation
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
