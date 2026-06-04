import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Loader2, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CollectionItem {
    id: number;
    name: string;
    slug: string;
    category: string;
    image: string;
    is_featured: boolean;
}

export default function CollectionList() {
    const [items, setItems] = useState<CollectionItem[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("collection_items")
            .select("*")
            .order("created_at", { ascending: false });

        if (!error && data) {
            setItems(data);
        }
        setLoading(false);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this specific custom item?")) return;
        const { error } = await supabase.from("collection_items").delete().eq("id", id);
        if (!error) fetchItems();
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-foreground">Collections & Portfolio</h1>
                    <p className="text-muted-foreground mt-1">Manage custom works and enquiry-only items</p>
                </div>
                <Button onClick={() => navigate("/collections/new")} className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
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
                                <th className="text-center p-4 font-medium text-muted-foreground">Featured</th>
                                <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-12 text-muted-foreground">
                                        No collection items found. Add your portfolio pieces!
                                    </td>
                                </tr>
                            ) : (
                                items.map((item) => (
                                    <tr key={item.id} className="border-b border-border last:border-0 hover:bg-secondary/10 transition-colors">
                                        <td className="p-4">
                                            <div className="w-12 h-12 rounded-lg bg-secondary/30 overflow-hidden">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </td>
                                        <td className="p-4 font-medium text-foreground">{item.name}</td>
                                        <td className="p-4 text-muted-foreground">{item.category}</td>
                                        <td className="p-4 text-center">
                                            {item.is_featured ? (
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
                                                onClick={() => navigate(`/collections/edit/${item.id}`)}
                                                className="hover:bg-primary/10 hover:text-primary"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDelete(item.id)}
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
