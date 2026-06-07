import hanumanImg from "@/assets/Hanuman-ji.png";
import krishnaImg from "@/assets/Krishna-Ji.png";
import radhaImg from "@/assets/Krishna-Radha.png";

import React from "react";
import { MapPin, Expand, ChevronRight, ChevronLeft } from "lucide-react";
// motion import removed – not needed for horizontal carousel

import { motion } from "framer-motion";

const PlacementStories = () => {
    const stories = [
        {
            id: 1,
            image: hanumanImg,
            location: "Modern Villa, Jaipur",
            description: "Custom Makrana Mandir integrated into a contemporary living space.",
            tag: "Home Mandir"
        },
        {
            id: 2,
            image: krishnaImg,
            location: "Private Residence, Mumbai",
            description: "Pure white Ganesh Ji idol placed in a minimalist pooja room.",
            tag: "Idols"
        },
        {
            id: 3,
            image: radhaImg,
            location: "Heritage Hotel, Udaipur",
            description: "Traditional wall panels adding grandeur to the reception lobby.",
            tag: "Wall Panels"
        },
        {
            id: 4,
            image: hanumanImg,
            location: "Penthouse, Gurgaon",
            description: "Bespoke carved temple with custom lighting and storage.",
            tag: "Ghar Mandir"
        },
        {
            id: 5,
            image: krishnaImg,
            location: "Bungalow, Pune",
            description: "Detailed Radha Krishna idol centerpiece for a family prayer hall.",
            tag: "Idols"
        },
        {
            id: 6,
            image: radhaImg,
            location: "Luxury Apartment, Bangalore",
            description: "Modular marble panels creating a serene balcony sanctuary.",
            tag: "Wall Panels"
        }
    ];

    const [offset, setOffset] = React.useState(0);
    const [isMobile, setIsMobile] = React.useState(typeof window !== 'undefined' && window.innerWidth < 768);
    React.useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    const visibleCount = isMobile ? 1 : 3;
    const displayedStories = stories.slice(offset, offset + visibleCount);
    const handlePrev = () => {
      setOffset((prev) => (prev - 1 + stories.length) % stories.length);
    };
    const handleNext = () => {
      setOffset((prev) => (prev + 1) % stories.length);
    };

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-primary/5 to-background overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-[0.3em] text-primary uppercase mb-4 block">
            Our Legacy
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif mb-6 leading-tight">
            Placement <span className="text-gradient-gold italic">Stories</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg">
            Witness our handcrafted masterpieces bringing divine grace and artistic elegance to premium homes and spaces across India.
          </p>
        </div>

        {/* Premium grid with subtle motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedStories.map((story) => (
            <motion.div
              key={story.id}
              className="group relative bg-white/5 backdrop-blur-md border border-white/30 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: story.id * 0.1 }}
            >
              <div className="relative w-full pb-[56%]">
                <img
                  src={story.image}
                  alt={story.location}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-primary/30 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {story.tag}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2 text-gray-800">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{story.location}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2">
                  {story.description}
                </h3>
                <button className="flex items-center gap-1 text-primary text-sm font-medium hover:underline">
                  <Expand className="w-4 h-4" /> View Installation
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-4 gap-4">
          <button onClick={handlePrev} className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={handleNext} className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-12 text-center">
          <button className="px-10 py-4 border-2 border-primary text-primary font-bold tracking-widest uppercase rounded-full hover:bg-primary hover:text-white transition-all duration-300">
            View All Stories
          </button>
        </div>
      </div>
    </section>
  );
};

export default PlacementStories;
