import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, MessageCircle, Heart, ShieldCheck, Truck } from "lucide-react";

interface ProductCardProps {
    product: Product;
    index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
    const { addToCart } = useCart();
    const isReady = product.type === "ready";
    const priceValue = Number((product.price || "0").replace(/[^\d]/g, "")) || 0;
    const primaryBadge = product.tag || (isReady ? "Ready to Ship" : "Custom Build");
    const stockLabel = isReady
        ? product.stock && product.stock > 0
            ? product.stock <= 3
                ? `Only ${product.stock} left`
                : "In stock"
            : "Limited stock"
        : "Made to order";
    const deliveryLabel = isReady ? "Fast dispatch across India" : "Design support before production";
    const formattedPrice = priceValue > 0 ? `Rs. ${priceValue.toLocaleString("en-IN")}` : "Price on request";

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -6 }}
            className="group flex flex-col h-full rounded-3xl border border-border/70 bg-white shadow-soft transition-all duration-300 hover:border-primary/25 hover:shadow-elevated overflow-hidden"
        >
            <Link to={`/product/${product.slug}`} className="block relative aspect-square overflow-hidden rounded-t-3xl bg-secondary/20">
                <motion.img
                    src={product.image}
                    alt={`${product.name} | Stone Aura Studio`}
                    className="h-full w-full object-cover"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.6 }}
                />

                <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
                    <span className="rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground shadow-lg">
                        {primaryBadge}
                    </span>
                    {isReady && product.stock && product.stock <= 3 && (
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-700">
                            Hot item
                        </span>
                    )}
                </div>

                <button
                    type="button"
                    className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-charcoal shadow-sm transition-transform duration-300 hover:scale-105 hover:text-primary"
                    aria-label={`Save ${product.name}`}
                >
                    <Heart className="h-4 w-4" />
                </button>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* View Details Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                        className="group-hover:translate-y-0 transform transition-transform pointer-events-auto"
                    >
                        <Button
                            variant="secondary"
                            className="bg-white/90 backdrop-blur-md text-charcoal hover:bg-white hover:text-primary rounded-full px-6 py-2 font-medium shadow-xl"
                        >
                            View Details
                        </Button>
                    </motion.div>
                </div>
            </Link>

            <div className="flex flex-1 flex-col p-3.5 sm:p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-secondary/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-800">
                        {product.category}
                    </span>
                    <span className={`text-[11px] font-semibold ${isReady ? "text-green-700" : "text-primary"}`}>
                        {stockLabel}
                    </span>
                </div>

                <Link to={`/product/${product.slug}`} className="mb-3 block transition-colors group-hover:text-primary">
                    <h3 className="line-clamp-2 min-h-[2.5rem] sm:min-h-[3.5rem] text-sm sm:text-lg font-semibold leading-tight text-gray-800">
                        {product.name}
                    </h3>
                </Link>

                <p className="mb-3 line-clamp-2 text-[11px] sm:text-sm leading-5 sm:leading-6 text-gray-800">
                    {product.description}
                </p>

                <div className="mb-3 space-y-1.5 rounded-xl sm:rounded-2xl bg-secondary/35 p-2 sm:p-3 text-[10px] sm:text-xs text-gray-800">
                    <div className="flex items-center gap-2">
                        <Truck className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-primary" />
                        <span>{deliveryLabel}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-primary" />
                        <span>{isReady ? "Secure packaging" : "Craft consultation"}</span>
                    </div>
                </div>

                <div className="mb-4 flex items-end justify-between gap-3">
                    <div>
                        <p className="text-base sm:text-2xl font-semibold text-primary">{formattedPrice}</p>
                        <p className="text-[9px] sm:text-xs text-gray-800">
                            {priceValue > 0 ? "GST discussed at checkout" : "Price on enquiry"}
                        </p>
                    </div>
                    <div className="text-right text-[9px] sm:text-xs text-gray-800">
                        <p className="truncate max-w-[60px] sm:max-w-none">{product.material}</p>
                        <p>{product.dimensions}</p>
                    </div>
                </div>

                <div className="mt-auto flex items-center gap-3">
                    {isReady ? (
                        <Button
                            size="sm"
                            onClick={handleAddToCart}
                            className="h-8 sm:h-11 flex-1 rounded-full bg-primary px-2 sm:px-4 text-[10px] sm:text-sm text-primary-foreground transition-all duration-300 hover:shadow-gold"
                        >
                            <ShoppingBag className="mr-1 sm:mr-1.5 h-3 sm:h-4 w-3 sm:w-4" />
                            Add
                        </Button>
                    ) : (
                        <Link to="/contact" className="flex-1">
                            <Button
                                size="sm"
                                variant="outline"
                                className="h-8 sm:h-11 w-full rounded-full border-primary/20 bg-white px-2 sm:px-4 text-[10px] sm:text-sm text-foreground transition-all duration-300 hover:bg-primary/5 hover:text-primary"
                            >
                                <MessageCircle className="mr-1 sm:mr-1.5 h-3 sm:h-4 w-3 sm:w-4" />
                                Quote
                            </Button>
                        </Link>
                    )}

                    <Link to={`/product/${product.slug}`}>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 sm:h-11 rounded-full border border-border bg-white px-2 sm:px-4 text-[10px] sm:text-sm text-foreground hover:bg-secondary"
                        >
                            Details
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
