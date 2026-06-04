import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
    Search,
    MoreHorizontal,
    Mail,
    Phone,
    MapPin,
    User as UserIcon,
    Shield
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
interface Profile {
    id: string;
    full_name: string;
    email: string; // Note: 'email' is in the profiles table creation query
    phone: string;
    role: string;
    created_at: string;
    is_blocked: boolean;
}

export default function CustomerList() {
    const [customers, setCustomers] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching customers:', error);
        } else {
            setCustomers(data || []);
        }
        setLoading(false);
    };

    const toggleBlock = async (id: string, currentStatus: boolean) => {
        const { error } = await supabase
            .from('profiles')
            .update({ is_blocked: !currentStatus })
            .eq('id', id);

        if (!error) fetchCustomers();
    };

    const filteredCustomers = customers.filter(c =>
        (c.full_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.email || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-foreground">Customers</h1>
                    <p className="text-muted-foreground mt-1">Manage registered users and their accounts</p>
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
                            <TableHead>Contact</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">Loading customers...</TableCell>
                            </TableRow>
                        ) : filteredCustomers.length > 0 ? (
                            filteredCustomers.map((customer) => (
                                <TableRow key={customer.id} className="group hover:bg-secondary/10">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                {(customer.full_name || 'U').charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-medium">{customer.full_name || 'Unknown User'}</p>
                                                <p className="text-xs text-muted-foreground">ID: {customer.id.slice(0, 8)}...</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1 text-sm">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Mail className="w-3 h-3" /> {customer.email || '-'}
                                            </div>
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Phone className="w-3 h-3" /> {customer.phone || '-'}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium w-fit bg-secondary border border-border">
                                            <Shield className="w-3 h-3" />
                                            <span className="capitalize">{customer.role}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {format(new Date(customer.created_at), 'MMM dd, yyyy')}
                                    </TableCell>
                                    <TableCell>
                                        {customer.is_blocked ? (
                                            <span className="text-red-600 bg-red-50 px-2 py-1 rounded-full text-xs border border-red-100 font-medium">Blocked</span>
                                        ) : (
                                            <span className="text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs border border-green-100 font-medium">Active</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-secondary rounded-lg">
                                                    <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => toggleBlock(customer.id, customer.is_blocked)}>
                                                    {customer.is_blocked ? "Unblock User" : "Block User"}
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                                    No customers found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
