import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Loader2, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ShopProduct {
    id: number;
    name: string;
    slug: string;
    category: string;
    price: string;
    image: string;
    stock: number;
    is_featured: boolean;
}

export default function ShopList() {
    const [products, setProducts] = useState<ShopProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("shop_products")
            .select("*")
            .order("created_at", { ascending: false });

        if (!error && data) {
            setProducts(data);
        }
        setLoading(false);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        const { error } = await supabase.from("shop_products").delete().eq("id", id);
        if (!error) fetchProducts();
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-foreground">Shop Inventory</h1>
                    <p className="text-muted-foreground mt-1">Manage products available for purchase</p>
                </div>
                <Button onClick={() => navigate("/shop/new")} className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            ) : (
                <div className="bg-background border border-border rounded-xl overflow-hidden shadow-sm">
                    <table className="w-full">
                        <thead className="bg-secondary/30 border-b border-border">
                            <tr>
                                <th className="text-left p-4 font-medium text-muted-foreground w-20">Image</th>
                                <th className="text-left p-4 font-medium text-muted-foreground">Name</th>
                                <th className="text-left p-4 font-medium text-muted-foreground">Category</th>
                                <th className="text-left p-4 font-medium text-muted-foreground">Price</th>
                                <th className="text-center p-4 font-medium text-muted-foreground">Stock</th>
                                <th className="text-center p-4 font-medium text-muted-foreground">Featured</th>
                                <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-12 text-muted-foreground">
                                        No products found. Add your first item!
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product.id} className="border-b border-border last:border-0 hover:bg-secondary/10 transition-colors">
                                        <td className="p-4">
                                            <div className="w-12 h-12 rounded-lg bg-secondary/30 overflow-hidden">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </td>
                                        <td className="p-4 font-medium text-foreground">{product.name}</td>
                                        <td className="p-4 text-muted-foreground">{product.category}</td>
                                        <td className="p-4 font-medium text-primary">{product.price}</td>
                                        <td className="p-4 text-center">
                                            {product.stock > 0 ? (
                                                <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full font-medium">
                                                    {product.stock} in stock
                                                </span>
                                            ) : (
                                                <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-2 py-1 rounded-full font-medium">
                                                    Out of stock
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4 text-center">
                                            {product.is_featured ? (
                                                <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full">
                                                    ★
                                                </span>
                                            ) : (
                                                <span className="text-muted-foreground">-</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-right space-x-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => navigate(`/shop/edit/${product.id}`)}
                                                className="hover:bg-primary/10 hover:text-primary"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDelete(product.id)}
                                                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
