import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import { Instagram, Heart } from "lucide-react";

const SocialGallery = () => {
    const posts = [
        { id: 1, image: product1, likes: "1.2k" },
        { id: 2, image: product2, likes: "850" },
        { id: 3, image: product3, likes: "2.1k" },
        { id: 4, image: product1, likes: "940" },
        { id: 5, image: product2, likes: "1.5k" },
        { id: 6, image: product3, likes: "1.1k" },
    ];

    return (
        <section className="py-16 md:py-24 bg-background overflow-hidden animate-fade-up">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 text-center md:text-left">
                    <div>
                        <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
                            Community
                        </span>
                        <h2 className="text-3xl md:text-4xl font-serif mt-4">
                            Shared by <span className="text-gradient-gold">Our Customers</span>
                        </h2>
                    </div>
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-6 py-3 rounded-full bg-charcoal text-white hover:bg-primary transition-colors shadow-lg"
                    >
                        <Instagram className="w-5 h-5" />
                        <span>Follow @stoneaurastudio</span>
                    </a>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="group relative aspect-square rounded-xl overflow-hidden shadow-soft hover:shadow-gold transition-all duration-500"
                        >
                            <img
                                src={post.image}
                                alt="Customer installation"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <div className="flex items-center gap-2 text-white font-medium">
                                    <Heart className="w-4 h-4 fill-white" />
                                    <span>{post.likes}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SocialGallery;
