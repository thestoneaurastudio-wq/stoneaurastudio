import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Product {
    id: number;
    name: string;
    slug: string;
    category: string;
    price: string;
    image: string;
    is_featured: boolean;
    type: 'ready' | 'custom';
}

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'ready' | 'custom'>('all');
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .order("created_at", { ascending: false });

        if (!error && data) {
            setProducts(data);
        }
        setLoading(false);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        const { error } = await supabase.from("products").delete().eq("id", id);

        if (!error) {
            fetchProducts();
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-serif font-bold">Products</h1>
                <Button onClick={() => navigate("/products/new")}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="flex space-x-2 bg-secondary/20 p-1 rounded-lg w-fit">
                        {['all', 'ready', 'custom'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setFilter(tab as any)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${filter === tab
                                    ? "bg-white text-primary shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                {tab === 'all' ? 'All Products' : tab === 'ready' ? 'Ready to Sell' : 'Custom / Enquiry'}
                            </button>
                        ))}
                    </div>

                    <div className="bg-background border border-border rounded-xl overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-secondary/30">
                                <tr>
                                    <th className="text-left p-4 font-medium">Image</th>
                                    <th className="text-left p-4 font-medium">Name</th>
                                    <th className="text-left p-4 font-medium">Type</th>
                                    <th className="text-left p-4 font-medium">Category</th>
                                    <th className="text-left p-4 font-medium">Price</th>
                                    <th className="text-left p-4 font-medium">Featured</th>
                                    <th className="text-right p-4 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products
                                    .filter(p => filter === 'all' || p.type === filter)
                                    .map((product) => (
                                        <tr key={product.id} className="border-t border-border hover:bg-secondary/10">
                                            <td className="p-4">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-16 h-16 object-cover rounded-md"
                                                />
                                            </td>
                                            <td className="p-4 font-medium">{product.name}</td>
                                            <td className="p-4">
                                                <span className={`text-xs px-2 py-1 rounded-full ${product.type === 'ready'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-blue-100 text-blue-700'
                                                    }`}>
                                                    {product.type === 'ready' ? 'Ready' : 'Custom'}
                                                </span>
                                            </td>
                                            <td className="p-4 text-muted-foreground">{product.category}</td>
                                            <td className="p-4">{product.price}</td>
                                            <td className="p-4">
                                                {product.is_featured ? (
                                                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                                        Featured
                                                    </span>
                                                ) : (
                                                    <span className="text-xs text-muted-foreground">-</span>
                                                )}
                                            </td>
                                            <td className="p-4 text-right space-x-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => navigate(`/products/edit/${product.id}`)}
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDelete(product.id)}
                                                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
