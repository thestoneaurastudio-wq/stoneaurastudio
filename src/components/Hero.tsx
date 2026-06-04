import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, MessageCircle, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/saraswati.png";

const proofPoints = [
  { value: "500+", label: "Projects Delivered" },
  { value: "30+", label: "Years of Craft" },
  { value: "100%", label: "Natural Stone" },
];

const benefits = [
  "Premium marble finish and hand carving",
  "Pan-India delivery with packing support",
  "Custom dimensions for home temples",
];

const Hero = () => {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#fdfaf5] pt-28 pb-16 md:pt-40 md:pb-24 lg:min-h-[92vh] flex items-center"
    >
      {/* Background Cinematic Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -right-[5%] w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[20%] -left-[10%] w-[30vw] h-[30vw] bg-gold/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-10" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr,0.95fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-8 order-2 md:order-1"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 px-4 py-2 shadow-soft backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                Stone Aura Signature Collection
              </span>
            </div>

            <div className="space-y-6">
              <h1 className="max-w-4xl font-serif text-4xl leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-7xl lg:text-[5.5rem]">
                Sacred Art for the <br className="hidden sm:block" />
                <span className="text-gradient-gold italic font-medium">Modern Soul</span>
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl font-light">
                Handcrafted marble mandirs and sculptures that bring
                temple serenity into the heart of your luxury home.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-start gap-3 rounded-2xl border border-white/70 bg-white/70 px-4 py-4 shadow-soft backdrop-blur-sm"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                  <span className="text-sm leading-6 text-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/shop"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-gold"
              >
                Explore Collection
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-charcoal/10 bg-white px-7 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary/30 hover:text-primary hover:shadow-soft"
              >
                <MessageCircle className="h-4 w-4" />
                Discuss Custom Design
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-6 border-t border-charcoal/10 pt-10 sm:gap-10">
              {proofPoints.map((item) => (
                <div key={item.label} className="flex flex-col gap-1">
                  <p className="text-2xl font-serif font-bold text-charcoal sm:text-3xl">{item.value}</p>
                  <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-primary sm:text-[10px]">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: "easeOut" }}
            className="relative order-1 md:order-2"
          >
            {/* Soft background glow matching the gold/cream theme */}
            <div className="absolute inset-x-10 bottom-3 top-12 rounded-[2.5rem] bg-primary/5 blur-3xl" />

            {/* Seamless, borderless image container with soft shadow */}
            <div className="relative overflow-hidden rounded-[2.5rem] aspect-[4/5] lg:aspect-auto lg:h-[650px] bg-[#fdfaf5] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-primary/5">
              <img
                src={heroImage}
                alt="Handcrafted marble Saraswati idol by Stone Aura Studio"
                className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
              />
            </div>

            {/* Material Promise floating card - clean glassmorphism */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="absolute -bottom-5 left-0 max-w-sm rounded-[1.5rem] border border-white/85 bg-white/90 p-4 shadow-elevated backdrop-blur-md md:left-6"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-2xl bg-primary/10 p-3">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Material Promise</p>
                  <p className="mt-1 text-base font-semibold text-foreground">Premium Marble</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">Crafted, polished, and packed under artisan supervision.</p>
                </div>
              </div>
            </motion.div>

            {/* Delivery Support floating card - clean glassmorphism matching the bottom card */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="absolute -right-6 top-12 hidden w-60 rounded-[1.5rem] border border-white/85 bg-white/90 p-4 shadow-elevated backdrop-blur-md lg:block"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-2xl bg-primary/10 p-3">
                  <Truck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Delivery Support</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">Pan-India Dispatch</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">Safe wooden crate packing & transit insurance included.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:block"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground rotate-180 [writing-mode:vertical-lr]">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
