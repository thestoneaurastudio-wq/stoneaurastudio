import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AnimatePresence, motion } from "framer-motion";
import {
    BadgeCheck,
    ChevronDown,
    CreditCard,
    Heart,
    Info,
    MessageCircle,
    Minus,
    PackageCheck,
    Plus,
    Ruler,
    Share2,
    ShieldCheck,
    ShoppingBag,
    Star,
    Truck,
    ZoomIn,
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { api } from "@/lib/api";
import { Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

import stoneSelection from "@/assets/stone-selection.webp";
import intricateCarving from "@/assets/intricate-carving.webp";
import mirrorPolish from "@/assets/mirror-polish.webp";

const formatPrice = (price: string) => {
    const priceValue = Number(price.replace(/[^\d]/g, "")) || 0;
    return priceValue > 0 ? `Rs. ${priceValue.toLocaleString("en-IN")}` : "Price on request";
};

const ProductDetail = () => {
    const { slug } = useParams();
    const { addToCart } = useCart();

    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isWishlist, setIsWishlist] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    useEffect(() => {
        const load = async () => {
            if (!slug) return;

            try {
                const data = await api.getProduct(slug);
                setProduct(data);

                const allProducts = await api.getProducts();
                setRelatedProducts(
                    allProducts.filter((item) => item.id !== data.id).slice(0, 4),
                );
            } catch (error) {
                console.error("Failed to load product", error);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [slug]);

    const gallery = useMemo(() => {
        if (!product) return [];
        return [
            product.image,
            intricateCarving,
            mirrorPolish,
            stoneSelection
        ];
    }, [product]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <h1 className="mb-4 text-2xl font-semibold">Product Not Found</h1>
                    <Link to="/shop" className="text-primary hover:underline">
                        Return to Shop
                    </Link>
                </div>
            </div>
        );
    }

    const formattedPrice = formatPrice(product.price);
    const isReady = product.type === "ready";
    const rating = isReady ? 4.8 : 4.9;
    const reviews = isReady ? 41 : 17;
    const dispatchText = isReady ? "Dispatch in 5-7 business days" : "Custom quote in 24 hours";
    const stockText = isReady
        ? product.stock && product.stock <= 3
            ? `Only ${product.stock} left`
            : "In stock"
        : "Made to order";
    const features = product.features?.length
        ? product.features
        : ["Premium polish", "Secure packing", "Expert craftsmanship", "Support included"];

    const toggleWishlist = () => {
        setIsWishlist((prev) => !prev);
        toast.success(isWishlist ? "Removed from wishlist" : "Added to wishlist");
    };

    const copyLink = async () => {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Product link copied");
    };

    return (
        <>
            <Helmet>
                <title>{product.name} | StoneAura Studio</title>
                <meta name="description" content={product.description} />
            </Helmet>

            <Header />

            <main className="bg-[#f8f5ef] pb-20 pt-28">
                <div className="mx-auto max-w-[1440px] px-4 sm:px-6 xl:px-10">
                    <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <Link to="/" className="hover:text-primary">Home</Link>
                        <span>/</span>
                        <Link to="/shop" className="hover:text-primary">Shop</Link>
                        <span>/</span>
                        <span className="text-foreground">{product.name}</span>
                    </div>

                    <div className="grid gap-10 items-start lg:grid-cols-[minmax(0,560px),minmax(0,1fr)] xl:grid-cols-[600px,minmax(0,1fr)]">
                        {/* LEFT COLUMN: Image Gallery + Detailed Narrative Sections */}
                        <section className="space-y-8">
                            {/* Product Image Gallery */}
                            <div className="grid gap-4 lg:grid-cols-[88px,minmax(0,1fr)]">
                                <div className="order-2 grid grid-cols-4 gap-3 lg:order-1 lg:grid-cols-1 lg:content-start">
                                    {gallery.map((image, index) => (
                                        <button
                                            key={`${image}-${index}`}
                                            type="button"
                                            onClick={() => setSelectedImage(index)}
                                            className={`overflow-hidden rounded-2xl border bg-white shadow-soft transition-all ${
                                                selectedImage === index
                                                    ? "border-primary ring-2 ring-primary/15"
                                                    : "border-border/70 hover:border-primary/30"
                                            }`}
                                        >
                                            <img src={image} alt={`${product.name} view ${index + 1}`} className="aspect-square h-full w-full object-cover" />
                                        </button>
                                    ))}
                                </div>

                                <div className="order-1 overflow-hidden rounded-[2rem] border border-border/70 bg-white shadow-soft lg:order-2">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <button type="button" className="group relative block w-full overflow-hidden bg-[#f6ecd2] text-left">
                                                <img
                                                    src={gallery[selectedImage]}
                                                    alt={product.name}
                                                    className="aspect-square h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                                <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                                                    <Badge className="bg-primary px-3 py-1 text-[10px] uppercase tracking-[0.18em]">
                                                        {product.tag || "Featured"}
                                                    </Badge>
                                                    <Badge variant="secondary" className="bg-white/95 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-foreground">
                                                        {stockText}
                                                    </Badge>
                                                </div>
                                                <div className="absolute bottom-5 right-5 rounded-full bg-white/95 p-3 shadow-md">
                                                    <ZoomIn className="h-5 w-5 text-charcoal" />
                                                </div>
                                            </button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-screen-lg border-none bg-transparent p-0 shadow-none">
                                            <img src={gallery[selectedImage]} alt={product.name} className="max-h-[90vh] w-full rounded-3xl object-contain" />
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>

                            {/* Product Description */}
                            {product.longDescription && (
                                <div className="rounded-[2rem] border border-border/70 bg-white p-6 shadow-soft xl:p-8">
                                    <h2 className="mb-4 text-2xl font-semibold">Product Description</h2>
                                    <div className="prose max-w-none text-muted-foreground" dangerouslySetInnerHTML={{ __html: product.longDescription }} />
                                </div>
                            )}

                            {/* About This Piece */}
                            {product.aboutText && (
                                <div className="rounded-[2rem] border border-border/70 bg-white p-6 shadow-soft xl:p-8">
                                    <h2 className="mb-4 text-2xl font-semibold">About This Piece</h2>
                                    <div className="whitespace-pre-line leading-8 text-muted-foreground">
                                        {product.aboutText}
                                    </div>
                                </div>
                            )}

                            {/* Care & Maintenance */}
                            <div className="rounded-[2rem] border border-border/70 bg-white p-6 shadow-soft xl:p-8">
                                <h2 className="mb-4 text-2xl font-semibold">Care & Maintenance</h2>
                                <div className="leading-8 text-muted-foreground">
                                    {product.careInstructions ||
                                        "Dust gently with a soft dry cloth. Avoid using harsh chemicals or abrasive materials. For marble, wipe with a damp cloth occasionally."}
                                </div>
                            </div>

                            {/* The Artisanal Journey Section */}
                            <div className="rounded-[2rem] border border-border/70 bg-white p-6 shadow-soft xl:p-8">
                                <h2 className="mb-6 text-2xl font-semibold">The Artisanal Journey</h2>
                                <div className="relative border-l border-primary/20 pl-6 ml-3 space-y-8">
                                    <div className="relative">
                                        <span className="absolute -left-[35px] top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white border-2 border-primary text-[10px] font-bold text-primary shadow-sm">1</span>
                                        <h3 className="font-semibold text-foreground text-sm">Premium Stone Selection</h3>
                                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">We source the finest blocks of pure Makrana & Alwar marble, inspect for cracks, and ensure consistent color and structural integrity.</p>
                                    </div>
                                    <div className="relative">
                                        <span className="absolute -left-[35px] top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white border-2 border-primary text-[10px] font-bold text-primary shadow-sm">2</span>
                                        <h3 className="font-semibold text-foreground text-sm">Sizing & Rough Blocking</h3>
                                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">Artisans block the stone to precise dimensions based on Vastu Shastra requirements, laying down outlines for the sculpture.</p>
                                    </div>
                                    <div className="relative">
                                        <span className="absolute -left-[35px] top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white border-2 border-primary text-[10px] font-bold text-primary shadow-sm">3</span>
                                        <h3 className="font-semibold text-foreground text-sm">Detailed Hand Carving</h3>
                                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">Using hand chisels and hammers, master carvers meticulously sculpt intricate facial expressions, drapery, and detailed ornaments.</p>
                                    </div>
                                    <div className="relative">
                                        <span className="absolute -left-[35px] top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white border-2 border-primary text-[10px] font-bold text-primary shadow-sm">4</span>
                                        <h3 className="font-semibold text-foreground text-sm">Mirror Polishing & Finished Touch</h3>
                                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">A meticulous multi-stage manual polishing process yields a smooth, lustrous, mirror-like finish that prevents discoloration over decades.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* RIGHT COLUMN: Product Info, Purchase panel, Highlights, Key Details, FAQs */}
                        <section className="space-y-6">
                            {/* Main Info Block */}
                            <div className="rounded-[2rem] border border-border/70 bg-white p-6 shadow-soft xl:p-8">
                                <div className="mb-4 flex flex-wrap items-center gap-2">
                                    <Badge variant="secondary" className="bg-primary/10 text-primary">{product.category}</Badge>
                                    <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">{stockText}</Badge>
                                    <Badge variant="outline">{isReady ? "Ready Product" : "Custom Build"}</Badge>
                                </div>

                                <h1 className="mb-4 text-3xl font-semibold leading-tight text-foreground xl:text-5xl">
                                    {product.name}
                                </h1>

                                <div className="mb-5 flex flex-wrap items-center gap-4">
                                    <div className="inline-flex items-center gap-2 rounded-full bg-secondary/45 px-4 py-2 text-sm">
                                        <span className="font-semibold">{rating}</span>
                                        <div className="flex items-center gap-0.5 text-amber-500">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star key={star} className="h-3.5 w-3.5 fill-current" />
                                            ))}
                                        </div>
                                        <span className="text-muted-foreground">({reviews} reviews)</span>
                                    </div>
                                    <span className="text-sm text-muted-foreground">Handcrafted in Kishangarh, Rajasthan</span>
                                </div>

                                <p className="mb-6 text-base leading-8 text-muted-foreground">
                                    {product.description}
                                </p>

                                <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
                                    <MiniCard icon={<Ruler className="h-4 w-4 text-primary" />} label="Dimensions" value={product.dimensions} />
                                    <MiniCard icon={<PackageCheck className="h-4 w-4 text-primary" />} label="Weight" value={product.weight} />
                                    <MiniCard icon={<Info className="h-4 w-4 text-primary" />} label="Depth" value={product.depth} />
                                    <MiniCard icon={<BadgeCheck className="h-4 w-4 text-primary" />} label="Material" value={product.material} />
                                </div>
                            </div>

                            {/* Purchase Panel Card */}
                            <div className="rounded-[2rem] border border-border/70 bg-white p-6 shadow-soft xl:p-8">
                                <h2 className="mb-4 text-xl font-semibold">Purchase Options</h2>

                                {/* Price Box */}
                                <div className="mb-6 rounded-[1.5rem] bg-[#fcf4df] p-5">
                                    <div className="flex flex-wrap items-end gap-3">
                                        <p className="text-4xl font-semibold text-primary xl:text-5xl">{formattedPrice}</p>
                                        <p className="pb-1 text-sm text-muted-foreground">
                                            {isReady ? "Free shipping on this item" : "Pricing depends on size and detailing"}
                                        </p>
                                    </div>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                            {dispatchText}
                                        </span>
                                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-foreground">
                                            Secure packaging included
                                        </span>
                                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-foreground">
                                            Direct support available
                                        </span>
                                    </div>
                                </div>

                                {/* Order & Trust Assurances */}
                                <div className="mb-6 grid gap-4 rounded-2xl bg-[#f8f5ef]/50 p-4 sm:grid-cols-3 text-sm font-medium">
                                    <InfoLine icon={<Truck className="h-4 w-4 text-primary" />} text="Pan-India delivery coordination" />
                                    <InfoLine icon={<ShieldCheck className="h-4 w-4 text-primary" />} text="Wooden crate & protected packaging" />
                                    <InfoLine icon={<CreditCard className="h-4 w-4 text-primary" />} text="Online payment & WhatsApp support" />
                                </div>

                                {/* Cart & Quantity Controls */}
                                <div className="mb-6 flex flex-col sm:flex-row gap-3">
                                    <div className="flex items-center justify-between rounded-2xl border border-border bg-white px-2 py-1 h-12 w-full sm:w-36 shrink-0">
                                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:text-primary">
                                            <Minus className="h-4 w-4" />
                                        </button>
                                        <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
                                        <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:text-primary">
                                            <Plus className="h-4 w-4" />
                                        </button>
                                    </div>

                                    <div className="flex-1 flex flex-col gap-2">
                                        {isReady ? (
                                            <div className="flex gap-3">
                                                <Button onClick={() => addToCart(product, quantity)} size="lg" className="h-12 flex-1 rounded-2xl bg-primary text-base hover:shadow-gold transition-all duration-300">
                                                    <ShoppingBag className="mr-2 h-5 w-5" />
                                                    Add to Cart
                                                </Button>
                                                <a
                                                    href={`https://wa.me/919876543210?text=${encodeURIComponent(
                                                        `Hi! I'm interested in purchasing the ready stock of "${product.name}" (Price: ${formattedPrice}). Can you help me proceed?`
                                                    )}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1"
                                                >
                                                    <Button
                                                        variant="outline"
                                                        size="lg"
                                                        className="h-12 w-full rounded-2xl border-green-500/30 bg-green-50/50 text-green-700 hover:bg-green-50 hover:text-green-800 text-base"
                                                    >
                                                        <MessageCircle className="mr-2 h-5 w-5 text-green-600" />
                                                        WhatsApp Buy
                                                    </Button>
                                                </a>
                                            </div>
                                        ) : (
                                            <div className="flex gap-3">
                                                <a
                                                    href={`https://wa.me/919876543210?text=${encodeURIComponent(
                                                        `Hi! I'm interested in customizing the "${product.name}". Can we discuss the dimensions, pricing, and stone options?`
                                                    )}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1"
                                                >
                                                    <Button
                                                        size="lg"
                                                        className="h-12 w-full rounded-2xl bg-gradient-gold text-primary-foreground text-base hover:shadow-gold"
                                                    >
                                                        <MessageCircle className="mr-2 h-5 w-5" />
                                                        WhatsApp Chat
                                                    </Button>
                                                </a>
                                                <Link to="/contact" className="flex-1">
                                                    <Button
                                                        variant="outline"
                                                        size="lg"
                                                        className="h-12 w-full rounded-2xl border-primary/20 bg-white text-foreground hover:bg-secondary text-base"
                                                    >
                                                        Email Quote
                                                    </Button>
                                                </Link>
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={toggleWishlist}
                                        className="rounded-2xl border border-border bg-white px-4 h-12 transition-colors hover:border-red-500 hover:text-red-500 flex items-center justify-center w-full sm:w-12 shrink-0"
                                    >
                                        <Heart className={`h-5 w-5 ${isWishlist ? "fill-red-500 text-red-500" : ""}`} />
                                    </button>
                                </div>

                                <div className="flex flex-wrap gap-6 border-t border-border/60 pt-4 text-sm text-muted-foreground">
                                    <button type="button" onClick={copyLink} className="inline-flex items-center gap-2 hover:text-primary transition-colors">
                                        <Share2 className="h-4 w-4" />
                                        Share Link
                                    </button>
                                    <span className="inline-flex items-center gap-2">
                                        <ShieldCheck className="h-4 w-4 text-primary" />
                                        Trusted Finish
                                    </span>
                                    <span className="inline-flex items-center gap-2">
                                        <Truck className="h-4 w-4 text-primary" />
                                        Delivery Support
                                    </span>
                                </div>
                            </div>

                            {/* Highlights/Features Block */}
                            <div className="rounded-[2rem] border border-border/70 bg-white p-6 shadow-soft xl:p-8">
                                <h2 className="mb-4 text-xl font-semibold">Highlights</h2>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    {features.slice(0, 4).map((feature) => (
                                        <div key={feature} className="flex items-start gap-3 rounded-2xl bg-[#f8f5ef]/50 p-3.5 border border-border/30">
                                            <BadgeCheck className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                                            <span className="text-sm font-medium text-foreground">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Key Details Card */}
                            <div className="rounded-[2rem] border border-border/70 bg-white p-6 shadow-soft xl:p-8">
                                <h2 className="mb-4 text-xl font-semibold">Key Details</h2>
                                <div className="grid gap-3 text-sm">
                                    <DetailRow label="Material" value={product.material} />
                                    <DetailRow label="Dimensions" value={product.dimensions} />
                                    <DetailRow label="Weight" value={product.weight} />
                                    <DetailRow label="Depth" value={product.depth} />
                                    <DetailRow label="Availability" value={isReady ? "In stock" : "Made to order"} />
                                    <DetailRow label="Dispatch" value={dispatchText} />
                                </div>
                            </div>

                            {/* Frequently Asked Questions */}
                            {product.faqs && (
                                <div className="rounded-[2rem] border border-border/70 bg-white p-6 shadow-soft xl:p-8">
                                    <h2 className="mb-4 text-xl font-semibold">Frequently Asked Questions</h2>
                                    <div className="space-y-3">
                                        {product.faqs.map((faq, index) => (
                                            <FAQItem key={`${faq.question}-${index}`} question={faq.question} answer={faq.answer} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </section>
                    </div>
                </div>

                <section className="mt-16 border-t border-border bg-secondary/20 py-16">
                    <div className="mx-auto max-w-[1440px] px-4 sm:px-6 xl:px-10">
                        <div className="mb-8 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">More to explore</p>
                                <h2 className="mt-2 text-3xl font-semibold">Related Products</h2>
                            </div>
                            <Link to="/shop" className="text-sm font-medium text-primary hover:underline">
                                View All
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-6">
                            {relatedProducts.length > 0 ? (
                                relatedProducts.map((item) => (
                                    <Link
                                        key={item.id}
                                        to={`/product/${item.slug}`}
                                        className="group overflow-hidden rounded-[1.5rem] border border-border/70 bg-white shadow-soft transition-all duration-300 hover:border-primary/20 hover:shadow-elevated"
                                    >
                                        <div className="aspect-square overflow-hidden bg-secondary/20">
                                            <img src={item.image} alt={item.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                        </div>
                                        <div className="p-4">
                                            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{item.category}</p>
                                            <h3 className="mb-2 line-clamp-2 text-base font-semibold text-foreground group-hover:text-primary">
                                                {item.name}
                                            </h3>
                                            <p className="font-semibold text-primary">{formatPrice(item.price)}</p>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <p className="col-span-full py-10 text-center text-muted-foreground">No related products found.</p>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
};

const MiniCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
    <div className="rounded-2xl border border-border/70 bg-white p-4">
        <div className="mb-2 flex items-center gap-2">
            {icon}
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
        </div>
        <p className="text-sm font-semibold leading-6 text-foreground">{value}</p>
    </div>
);

const InfoLine = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
    <div className="flex items-start gap-3">
        <div className="mt-0.5">{icon}</div>
        <span>{text}</span>
    </div>
);

const DetailRow = ({ label, value }: { label: string; value: string }) => (
    <div>
        <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground">{label}</span>
            <span className="text-right font-medium text-foreground">{value}</span>
        </div>
        <Separator className="mt-3" />
    </div>
);

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="overflow-hidden rounded-2xl border border-border bg-background">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between p-4 text-left font-medium transition-colors hover:bg-secondary/30"
            >
                {question}
                <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : "text-muted-foreground"}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="border-t border-border/50 bg-secondary/5 p-4 pt-3 text-sm leading-relaxed text-muted-foreground">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProductDetail;
