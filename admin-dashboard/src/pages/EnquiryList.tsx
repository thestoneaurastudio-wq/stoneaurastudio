import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
    Search,
    MoreHorizontal,
    Mail,
    MessageSquare,
    Eye,
    CheckCircle,
    XCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

// Types
interface Enquiry {
    id: number;
    name: string;
    email: string;
    message: string;
    status: 'new' | 'read' | 'replied';
    created_at: string;
    product_id?: number;
    // We will join this manually or fetch it
    product_name?: string;
    product_image?: string;
}

export default function EnquiryList() {
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const fetchEnquiries = async () => {
        setLoading(true);
        // Fetch Enquiries
        const { data, error } = await supabase
            .from('enquiries')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching enquiries:', error);
        } else {
            // For now, assume shop_products for the join, showing how we'd get product info
            // In a real scenario with mixed tables, we might store product_name in enquiry directly
            // or do separate fetches. For this MVP, we will try to fetch product details if product_id exists.

            const enrichedData = await Promise.all((data || []).map(async (enq) => {
                let productDetails = {};
                if (enq.product_id) {
                    const { data: prod } = await supabase
                        .from('shop_products')
                        .select('name, image')
                        .eq('id', enq.product_id)
                        .single();
                    if (prod) productDetails = { product_name: prod.name, product_image: prod.image };
                }
                return { ...enq, ...productDetails };
            }));

            setEnquiries(enrichedData);
        }
        setLoading(false);
    };

    const markAsRead = async (id: number) => {
        await supabase.from('enquiries').update({ status: 'read' }).eq('id', id);
        fetchEnquiries();
    };

    const filteredEnquiries = enquiries.filter(e =>
        (e.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (e.email || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-foreground">Enquiries</h1>
                    <p className="text-muted-foreground mt-1">Manage customer questions and product requests</p>
                </div>
            </div>

            {/* Toolbar */}
            <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                        placeholder="Search by Name or Email..."
                        className="pl-9 bg-background"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-secondary/30">
                        <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead>Message</TableHead>
                            <TableHead>Product Interest</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">Loading enquiries...</TableCell>
                            </TableRow>
                        ) : filteredEnquiries.length > 0 ? (
                            filteredEnquiries.map((enq) => (
                                <TableRow key={enq.id} className="group hover:bg-secondary/10">
                                    <TableCell>
                                        <div className="space-y-1">
                                            <p className="font-medium">{enq.name}</p>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <Mail className="w-3 h-3" /> {enq.email}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="max-w-xs truncate text-muted-foreground" title={enq.message}>
                                        {enq.message}
                                    </TableCell>
                                    <TableCell>
                                        {enq.product_name ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded bg-secondary flex-shrink-0 overflow-hidden">
                                                    {enq.product_image && <img src={enq.product_image} alt="" className="w-full h-full object-cover" />}
                                                </div>
                                                <span className="text-sm font-medium">{enq.product_name}</span>
                                            </div>
                                        ) : (
                                            <span className="text-muted-foreground text-xs italic">General Enquiry</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-sm">
                                        {format(new Date(enq.created_at), 'MMM dd')}
                                    </TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${enq.status === 'new' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                                enq.status === 'replied' ? 'bg-green-50 text-green-700 border-green-200' :
                                                    'bg-gray-100 text-gray-700 border-gray-200'
                                            }`}>
                                            {enq.status?.toUpperCase()}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {/* Dropdown disabled temporarily to avoid crashes if radix-ui issues persist */}
                                        <Button size="sm" variant="ghost" onClick={() => markAsRead(enq.id)}>
                                            <CheckCircle className="w-4 h-4 text-muted-foreground hover:text-green-600" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                                    No enquiries found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
