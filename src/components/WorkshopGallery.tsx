import artisan from "@/assets/artisan.webp";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

const WorkshopGallery = () => {
  const images = [
    {
      src: artisan,
      alt: "Master craftsman carving marble",
      caption: "Hand Carving",
    },
    {
      src: product2,
      alt: "Marble polishing process",
      caption: "Polishing",
    },
    {
      src: product3,
      alt: "Premium raw marble slabs",
      caption: "Raw Stone Selection",
    },
  ];

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-background rounded-full border border-border text-xs font-medium tracking-widest text-muted-foreground uppercase mb-4">
            Our Workshop
          </span>
          <h2 className="text-3xl md:text-4xl font-serif">
            Where <span className="text-gradient-gold">Magic Happens</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={image.caption}
              className="group relative overflow-hidden rounded-xl aspect-[4/3]"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1.5 bg-primary/90 text-primary-foreground text-sm font-medium rounded-full">
                  {image.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkshopGallery;
