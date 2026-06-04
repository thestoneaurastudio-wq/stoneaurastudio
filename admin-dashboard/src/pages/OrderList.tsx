import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import {
    Search,
    Filter,
    MoreHorizontal,
    ArrowUpDown,
    Download,
    Eye,
    CheckCircle,
    XCircle,
    Clock,
    Truck
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
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// Types
interface Order {
    id: number;
    created_at: string;
    customer_name: string;
    total_amount: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    payment_status: 'paid' | 'pending' | 'failed';
}

const statusColors = {
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    processing: "bg-blue-100 text-blue-700 border-blue-200",
    shipped: "bg-purple-100 text-purple-700 border-purple-200",
    delivered: "bg-green-100 text-green-700 border-green-200",
    cancelled: "bg-red-100 text-red-700 border-red-200",
};

const statusIcons = {
    pending: Clock,
    processing: CheckCircle,
    shipped: Truck,
    delivered: CheckCircle,
    cancelled: XCircle,
};

export default function OrderList() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState<string>("all");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        // Replace with real Supabase fetch once generic 'orders' functionality is populated
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching orders:', error);
        } else {
            // Mapping for compatibility if fields differ
            setOrders(data || []);
        }
        setLoading(false);
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            (order.customer_name || 'Guest').toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.id.toString().includes(searchQuery);
        const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-foreground">Orders</h1>
                    <p className="text-muted-foreground mt-1">Manage and track customer orders</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                        <Download className="w-4 h-4" /> Export
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-card border border-border rounded-xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center shadow-sm">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                        placeholder="Search by Order ID or Customer..."
                        className="pl-9 bg-background"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={cn(
                                "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors whitespace-nowrap capitalize",
                                filterStatus === status
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "bg-background border-border text-muted-foreground hover:bg-secondary"
                            )}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-secondary/30">
                        <TableRow>
                            <TableHead className="w-[100px]">Order ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Payment</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">
                                    <div className="flex justify-center"><Clock className="animate-spin mr-2" /> Loading orders...</div>
                                </TableCell>
                            </TableRow>
                        ) : filteredOrders.length > 0 ? (
                            filteredOrders.map((order) => (
                                <TableRow key={order.id} className="group hover:bg-secondary/10 transition-colors">
                                    <TableCell className="font-medium">#{order.id}</TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {format(new Date(order.created_at), 'MMM dd, yyyy')}
                                    </TableCell>
                                    <TableCell className="font-medium">{order.customer_name || 'Guest Checkout'}</TableCell>
                                    <TableCell>₹{Number(order.total_amount).toLocaleString()}</TableCell>
                                    <TableCell>
                                        <span className={cn(
                                            "px-2 py-1 rounded-full text-[10px] font-semibold border uppercase",
                                            order.payment_status === 'paid' ? "bg-green-50 text-green-600 border-green-100" :
                                                order.payment_status === 'pending' ? "bg-yellow-50 text-yellow-600 border-yellow-100" :
                                                    "bg-red-50 text-red-600 border-red-100"
                                        )}>
                                            {order.payment_status}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div className={cn(
                                            "flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full text-xs font-medium border",
                                            statusColors[order.status]
                                        )}>
                                            {/* Icon Logic would go here if needed */}
                                            <span className="capitalize">{order.status}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link to={`/orders/${order.id}`}>
                                                <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-secondary rounded-lg">
                                                    <Eye className="w-4 h-4 text-muted-foreground" />
                                                </Button>
                                            </Link>
                                            {/* <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-secondary rounded-lg">
                                                        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>Mark as Paid</DropdownMenuItem>
                                                    <DropdownMenuItem>Mark as Shipped</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-red-600">Cancel Order</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu> */}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="h-32 text-center">
                                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                        <div className="h-10 w-10 bg-secondary/50 rounded-full flex items-center justify-center">
                                            <Search className="w-5 h-5" />
                                        </div>
                                        <p>No orders found matching your criteria.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div >
        </div >
    );
}
