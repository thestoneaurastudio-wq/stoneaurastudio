import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { ExternalLink, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    created_at: string;
    image: string;
    is_featured: boolean;
}

export function RecentProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .order("created_at", { ascending: false })
                .limit(5);

            if (!error && data) {
                setProducts(data);
            }
            setLoading(false);
        };

        fetchProducts();
    }, []);

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(price);
    };

    if (loading) {
        return (
            <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Recent Products</h3>
                </div>
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center gap-4 animate-pulse">
                            <div className="w-12 h-12 bg-muted rounded-xl" />
                            <div className="flex-1">
                                <div className="h-4 bg-muted rounded w-1/3 mb-2" />
                                <div className="h-3 bg-muted rounded w-1/4" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Recent Products</h3>
                <Link
                    to="/products"
                    className="text-sm text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
                >
                    View All
                    <ExternalLink className="w-4 h-4" />
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-border">
                            <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Product
                            </th>
                            <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">
                                Category
                            </th>
                            <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Price
                            </th>
                            <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                                Date
                            </th>
                            <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Status
                            </th>
                            <th className="py-3 px-2"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {products.map((product) => (
                            <tr
                                key={product.id}
                                className="group hover:bg-secondary/50 transition-colors"
                            >
                                <td className="py-3 px-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                                            {product.image ? (
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/10" />
                                            )}
                                        </div>
                                        <span className="font-medium text-sm truncate max-w-[150px]">
                                            {product.name}
                                        </span>
                                    </div>
                                </td>
                                <td className="py-3 px-2 hidden sm:table-cell">
                                    <span className="text-sm text-muted-foreground">
                                        {product.category}
                                    </span>
                                </td>
                                <td className="py-3 px-2">
                                    <span className="font-medium text-sm">
                                        {formatPrice(product.price)}
                                    </span>
                                </td>
                                <td className="py-3 px-2 hidden md:table-cell">
                                    <span className="text-sm text-muted-foreground">
                                        {formatDate(product.created_at)}
                                    </span>
                                </td>
                                <td className="py-3 px-2">
                                    <span className={cn(
                                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                                        product.is_featured
                                            ? "bg-green-500/10 text-green-500"
                                            : "bg-blue-500/10 text-blue-500"
                                    )}>
                                        {product.is_featured ? "Featured" : "Active"}
                                    </span>
                                </td>
                                <td className="py-3 px-2">
                                    <Link
                                        to={`/products/edit/${product.id}`}
                                        className="p-1 rounded-lg hover:bg-muted transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {products.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                        No products found.
                        <Link to="/products/new" className="text-primary ml-1">
                            Add your first product
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
