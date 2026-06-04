import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

const FeaturedSlider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const [featured, setFeatured] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await api.getFeaturedProducts();
        setFeatured(data);
      } catch (error) {
        console.error('Failed to fetch featured products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-xs font-medium tracking-widest text-primary uppercase">
              Featured Designs
            </span>
            <h2 className="text-3xl md:text-4xl font-serif mt-4">
              <span className="text-gradient-gold">Bestsellers</span> & Top Picks
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full border border-border hover:border-primary hover:bg-primary/5 flex items-center justify-center transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="w-12 h-12 rounded-full border border-border hover:border-primary hover:bg-primary/5 flex items-center justify-center transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {loading ? (
              <div className="w-full flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : featured.length === 0 ? (
              <div className="w-full text-center py-12 text-muted-foreground">
                No featured products available.
              </div>
            ) : (
              featured.map((item) => (
                <div
                  key={item.id}
                  className="flex-[0_0_80%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0"
                >
                  <ProductCard product={item} />
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex md:hidden justify-center gap-2 mt-6">
          <button
            onClick={scrollPrev}
            className="w-10 h-10 rounded-full border border-border hover:border-primary flex items-center justify-center transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={scrollNext}
            className="w-10 h-10 rounded-full border border-border hover:border-primary flex items-center justify-center transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSlider;
