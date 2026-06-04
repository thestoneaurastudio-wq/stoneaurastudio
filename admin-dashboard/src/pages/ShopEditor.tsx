import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowLeft } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Quill modules configuration
const modules = {
    toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["clean"],
    ],
};

export default function ShopEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        category: "",
        price: "",
        stock: 0,
        description: "",
        is_featured: false,
        image: "", // Main image
        images: [] as string[], // Gallery
    });

    useEffect(() => {
        if (id) {
            fetchProduct(Number(id));
        }
    }, [id]);

    const fetchProduct = async (productId: number) => {
        setLoading(true);
        const { data, error } = await supabase
            .from("shop_products")
            .select("*")
            .eq("id", productId)
            .single();

        if (error) {
            console.error("Error fetching product:", error);
            navigate("/shop");
        } else if (data) {
            setFormData({
                name: data.name,
                slug: data.slug,
                category: data.category,
                price: data.price,
                stock: data.stock || 0,
                description: data.description || "",
                is_featured: data.is_featured,
                image: data.image,
                images: data.images || [],
            });
        }
        setLoading(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData((prev) => ({ ...prev, [name]: checked }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: name === 'stock' ? Number(value) : value }));
        }
    };

    const handleDescriptionChange = (value: string) => {
        setFormData(prev => ({ ...prev, description: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Basic check to set main image if empty
        if (!formData.image && value) {
            setFormData(prev => ({ ...prev, image: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        // Auto-generate slug if empty
        let slugToUse = formData.slug;
        if (!slugToUse && formData.name) {
            slugToUse = formData.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        }

        const payload = {
            ...formData,
            slug: slugToUse,
            // Ensure images array contains main image if not present
            images: formData.image && !formData.images.includes(formData.image)
                ? [formData.image, ...formData.images]
                : formData.images
        };

        if (id) {
            const { error } = await supabase
                .from("shop_products")
                .update(payload)
                .eq("id", id);
            if (!error) navigate("/shop");
            else alert("Error updating product");
        } else {
            const { error } = await supabase
                .from("shop_products")
                .insert([payload]);
            if (!error) navigate("/shop");
            else alert("Error creating product");
        }
        setSaving(false);
    };

    if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="max-w-4xl mx-auto pb-10">
            <Button onClick={() => navigate("/shop")} variant="ghost" className="mb-6 pl-0 hover:pl-2 transition-all">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
            </Button>

            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-serif font-bold">{id ? "Edit Product" : "New Shop Product"}</h1>
                <Button onClick={handleSubmit} disabled={saving} className="bg-primary hover:bg-primary/90">
                    {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {id ? "Update Product" : "Create Product"}
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Main Info */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Basic Info Card */}
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
                        <h2 className="text-lg font-semibold border-b border-border pb-2">Basic Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Product Name</Label>
                                <Input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Ex: Marble Ganesh Idol" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="slug">Slug (URL)</Label>
                                <Input id="slug" name="slug" value={formData.slug} onChange={handleChange} placeholder="Auto-generated if empty" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="price">Price (₹)</Label>
                                <Input id="price" name="price" value={formData.price} onChange={handleChange} required placeholder="Ex: ₹15,000" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="stock">Stock Quantity</Label>
                                <Input id="stock" name="stock" type="number" value={formData.stock} onChange={handleChange} min="0" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <select
                                name="category"
                                id="category"
                                value={formData.category}
                                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                required
                            >
                                <option value="">Select Category</option>
                                <optgroup label="Statue Gods">
                                    <option value="Lord Ganesh">Lord Ganesh</option>
                                    <option value="Lord Shiva">Lord Shiva</option>
                                    <option value="Lord Vishnu">Lord Vishnu</option>
                                    <option value="Lord Krishna">Lord Krishna</option>
                                    <option value="Lord Hanuman">Lord Hanuman</option>
                                    <option value="Lord Buddha">Lord Buddha</option>
                                </optgroup>
                                <optgroup label="Statue Goddess">
                                    <option value="Goddess Durga">Goddess Durga</option>
                                    <option value="Goddess Lakshmi">Goddess Lakshmi</option>
                                    <option value="Goddess Saraswati">Goddess Saraswati</option>
                                    <option value="Radha Rani">Radha Rani</option>
                                </optgroup>
                                <optgroup label="Temple & Mandir">
                                    <option value="Home Mandir">Home Mandir</option>
                                    <option value="Pooja Mandir">Pooja Mandir</option>
                                    <option value="Wall Mounted Mandir">Wall Mounted Mandir</option>
                                </optgroup>
                                <optgroup label="Decor Items">
                                    <option value="Wall Murals">Wall Murals</option>
                                    <option value="Wall Panels">Wall Panels</option>
                                    <option value="Fountains">Fountains</option>
                                    <option value="Planters">Planters</option>
                                </optgroup>
                            </select>
                        </div>
                    </div>

                    {/* Description Card with Rich Text */}
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
                        <h2 className="text-lg font-semibold border-b border-border pb-2">Product Description</h2>
                        <div className="prose-editor">
                            <ReactQuill
                                theme="snow"
                                value={formData.description}
                                onChange={handleDescriptionChange}
                                modules={modules}
                                className="h-64 mb-12"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column - Media & Settings */}
                <div className="space-y-8">
                    {/* Media Card */}
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
                        <h2 className="text-lg font-semibold border-b border-border pb-2">Media</h2>

                        <div className="space-y-4">
                            <Label>Main Image URL</Label>
                            <Input
                                name="image"
                                value={formData.image}
                                onChange={(e) => {
                                    handleChange(e);
                                    handleImageChange(e);
                                }}
                                placeholder="https://..."
                            />

                            {formData.image && (
                                <div className="mt-4 rounded-lg overflow-hidden border border-border bg-secondary/20 aspect-video flex items-center justify-center">
                                    <img src={formData.image} alt="Preview" className="w-full h-full object-contain" />
                                </div>
                            )}

                            <div className="text-xs text-muted-foreground">
                                * Enter a valid image URL. Support for file upload coming soon.
                            </div>
                        </div>
                    </div>

                    {/* Visibility Card */}
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
                        <h2 className="text-lg font-semibold border-b border-border pb-2">Visibility</h2>

                        <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-secondary/10">
                            <Label htmlFor="is_featured" className="cursor-pointer">Featured Product</Label>
                            <input
                                type="checkbox"
                                id="is_featured"
                                name="is_featured"
                                checked={formData.is_featured}
                                onChange={handleChange}
                                className="w-5 h-5 accent-primary"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
