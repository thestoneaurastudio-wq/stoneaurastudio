import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowLeft, Upload, X } from "lucide-react";
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

export default function CollectionEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        category: "",
        description: "",
        is_featured: false,
        image: "", // Main image
        images: [] as string[], // Gallery
    });

    useEffect(() => {
        if (id) {
            fetchItem(Number(id));
        }
    }, [id]);

    const fetchItem = async (itemId: number) => {
        setLoading(true);
        const { data, error } = await supabase
            .from("collection_items")
            .select("*")
            .eq("id", itemId)
            .single();

        if (error) {
            console.error("Error fetching collection item:", error);
            navigate("/collections");
        } else if (data) {
            setFormData({
                name: data.name,
                slug: data.slug,
                category: data.category,
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
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleDescriptionChange = (value: string) => {
        setFormData(prev => ({ ...prev, description: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
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
            images: formData.image && !formData.images.includes(formData.image)
                ? [formData.image, ...formData.images]
                : formData.images
        };

        if (id) {
            const { error } = await supabase
                .from("collection_items")
                .update(payload)
                .eq("id", id);
            if (!error) navigate("/collections");
            else alert("Error updating item");
        } else {
            const { error } = await supabase
                .from("collection_items")
                .insert([payload]);
            if (!error) navigate("/collections");
            else alert("Error creating item");
        }
        setSaving(false);
    };

    if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="max-w-4xl mx-auto pb-10">
            <Button onClick={() => navigate("/collections")} variant="ghost" className="mb-6 pl-0 hover:pl-2 transition-all">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Collections
            </Button>

            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-serif font-bold">{id ? "Edit Portfolio Item" : "New Collection Item"}</h1>
                <Button onClick={handleSubmit} disabled={saving} className="bg-primary hover:bg-primary/90">
                    {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {id ? "Update Item" : "Create Item"}
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
                                <Label htmlFor="name">Item Name</Label>
                                <Input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Ex: Custom Temple Project" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="slug">Slug (URL)</Label>
                                <Input id="slug" name="slug" value={formData.slug} onChange={handleChange} placeholder="Auto-generated if empty" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
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
                                    <optgroup label="Portfolio Extras">
                                        <option value="Flooring">Flooring</option>
                                        <option value="InlayWork">Inlay Work</option>
                                        <option value="Architectural">Architectural</option>
                                    </optgroup>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Description Card with Rich Text */}
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
                        <h2 className="text-lg font-semibold border-b border-border pb-2">Description & Details</h2>
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
                        <h2 className="text-lg font-semibold border-b border-border pb-2">Showcase Image</h2>

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
                            <Label htmlFor="is_featured" className="cursor-pointer">Featured Project</Label>
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
