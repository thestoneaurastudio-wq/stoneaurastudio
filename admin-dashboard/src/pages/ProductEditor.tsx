import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, ArrowLeft } from "lucide-react";

export default function ProductEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        category: "",
        price: "",
        image: "",
        description: "",
        dimensions: "",
        weight: "",
        depth: "",
        material: "Makrana Marble",
        type: "ready",
        stock: 10,
        tag: "",
        is_featured: false,
    });

    useEffect(() => {
        if (id && id !== "new") {
            fetchProduct();
        }
    }, [id]);

    const fetchProduct = async () => {
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq("id", id)
            .single();

        if (!error && data) {
            setFormData(data);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (id && id !== "new") {
            // Update
            const { error } = await supabase
                .from("products")
                .update(formData)
                .eq("id", id);

            if (!error) {
                navigate("/products");
            }
        } else {
            // Create
            const { error } = await supabase.from("products").insert([formData]);

            if (!error) {
                navigate("/products");
            }
        }

        setLoading(false);
    };

    return (
        <div>
            <Button variant="ghost" onClick={() => navigate("/products")} className="mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
            </Button>

            <h1 className="text-3xl font-serif font-bold mb-8">
                {id && id !== "new" ? "Edit Product" : "Add New Product"}
            </h1>

            <form onSubmit={handleSubmit} className="bg-background border border-border rounded-xl p-8 max-w-2xl">
                <div className="space-y-6">
                    <div>
                        <label className="text-sm font-medium mb-2 block">Product Name</label>
                        <Input
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-2 block">Slug (URL-friendly)</label>
                        <Input
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-2 block">Category</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-3 py-2 border border-border rounded-md"
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="Ghar Mandir">Ghar Mandir</option>
                            <option value="Idols">Idols</option>
                            <option value="Wall Panels">Wall Panels</option>
                            <option value="Decor Items">Decor Items</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-2 block">Product Type</label>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            className="w-full px-3 py-2 border border-border rounded-md"
                            required
                        >
                            <option value="ready">Ready to Sell (Shop)</option>
                            <option value="custom">Custom/Enquiry (Collection)</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-2 block">Price</label>
                        <Input
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            placeholder="₹25,000"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-2 block">Image URL</label>
                        <Input
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            placeholder="https://..."
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-2 block">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-3 py-2 border border-border rounded-md min-h-[100px]"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="text-sm font-medium mb-2 block">Dimensions</label>
                            <Input
                                value={formData.dimensions}
                                onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                                placeholder='12" x 8"'
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-2 block">Weight</label>
                            <Input
                                value={formData.weight}
                                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                placeholder="5 kg"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-2 block">Depth</label>
                            <Input
                                value={formData.depth}
                                onChange={(e) => setFormData({ ...formData, depth: e.target.value })}
                                placeholder='4"'
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="featured"
                            checked={formData.is_featured}
                            onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                            className="w-4 h-4"
                        />
                        <label htmlFor="featured" className="text-sm font-medium">
                            Mark as Featured
                        </label>
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            "Save Product"
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
