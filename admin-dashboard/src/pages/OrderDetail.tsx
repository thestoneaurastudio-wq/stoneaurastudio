import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import {
    Clock,
    CheckCircle,
    Truck,
    XCircle,
    ArrowLeft,
    Printer,
    Mail,
    MapPin,
    User,
    CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner"; // Assuming sonner is installed, if not will use alert

// Types
interface OrderItem {
    id: number;
    product_name: string;
    quantity: number;
    price: number;
    product_id: number;
}

interface Order {
    id: number;
    created_at: string;
    customer_name: string;
    customer_email: string;
    total_amount: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    payment_status: 'paid' | 'pending' | 'failed';
    payment_method: 'cod' | 'online';
    shipping_address: any;
    order_items?: OrderItem[];
}

const statusColors = {
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    processing: "bg-blue-100 text-blue-700 border-blue-200",
    shipped: "bg-purple-100 text-purple-700 border-purple-200",
    delivered: "bg-green-100 text-green-700 border-green-200",
    cancelled: "bg-red-100 text-red-700 border-red-200",
};

export default function OrderDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        if (id) fetchOrder();
    }, [id]);

    const fetchOrder = async () => {
        setLoading(true);
        // Supabase join query to get items
        const { data, error } = await supabase
            .from('orders')
            .select(`
                *,
                order_items (*)
            `)
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching order:', error);
            // navigate('/orders');
        } else {
            setOrder(data);
        }
        setLoading(false);
    };

    const updateStatus = async (newStatus: string) => {
        setUpdating(true);
        const { error } = await supabase
            .from('orders')
            .update({ status: newStatus })
            .eq('id', id);

        if (error) {
            alert("Failed to update status");
        } else {
            fetchOrder(); // Refresh
        }
        setUpdating(false);
    };

    if (loading) return <div className="p-8 text-center text-muted-foreground">Loading order details...</div>;
    if (!order) return <div className="p-8 text-center text-red-500">Order not found</div>;

    const steps = ['pending', 'processing', 'shipped', 'delivered'];
    const currentStepIndex = steps.indexOf(order.status);

    return (
        <div className="max-w-5xl mx-auto pb-10 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate('/orders')}>
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold font-serif">Order #{order.id}</h1>
                        <p className="text-muted-foreground text-sm">
                            Placed on {format(new Date(order.created_at), 'PPP p')}
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                        <Printer className="w-4 h-4" /> Print Invoice
                    </Button>
                    {order.status !== 'cancelled' && order.status !== 'delivered' && (
                        <Button variant="destructive" onClick={() => updateStatus('cancelled')}>
                            Cancel Order
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Details */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Status Card */}
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                        <h3 className="font-semibold mb-6">Order Status</h3>

                        {/* Progress Bar */}
                        <div className="relative flex justify-between mb-8 px-2">
                            {/* Line */}
                            <div className="absolute top-4 left-0 right-0 h-1 bg-secondary -z-10" />
                            <div
                                className="absolute top-4 left-0 h-1 bg-primary transition-all duration-500 -z-10"
                                style={{ width: `${Math.max(0, currentStepIndex / (steps.length - 1)) * 100}%` }}
                            />

                            {steps.map((step, index) => {
                                const isCompleted = index <= currentStepIndex;
                                const isCurrent = index === currentStepIndex;
                                return (
                                    <div key={step} className="flex flex-col items-center gap-2">
                                        <div className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all border-2",
                                            isCompleted ? "bg-primary border-primary text-primary-foreground" : "bg-card border-secondary text-muted-foreground"
                                        )}>
                                            {isCompleted ? <CheckCircle className="w-4 h-4" /> : index + 1}
                                        </div>
                                        <span className={cn(
                                            "text-xs font-medium capitalize",
                                            isCurrent ? "text-primary" : "text-muted-foreground"
                                        )}>{step}</span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex items-center gap-4 bg-secondary/20 p-4 rounded-lg">
                            <div className="flex-1">
                                <label className="text-xs text-muted-foreground mb-1 block">Change Status</label>
                                <Select
                                    disabled={updating}
                                    value={order.status}
                                    onValueChange={updateStatus}
                                >
                                    <SelectTrigger className="w-full bg-background">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="processing">Processing</SelectItem>
                                        <SelectItem value="shipped">Shipped</SelectItem>
                                        <SelectItem value="delivered">Delivered</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex-1">
                                <label className="text-xs text-muted-foreground mb-1 block">Payment</label>
                                <div className={cn(
                                    "inline-flex items-center px-2.5 py-1.5 rounded-md text-xs font-medium border w-full",
                                    order.payment_status === 'paid' ? "bg-green-50 text-green-700 border-green-200" : "bg-yellow-50 text-yellow-700 border-yellow-200"
                                )}>
                                    {order.payment_status === 'paid' ? 'Amount Paid' : 'Pending Payment'}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Items */}
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                        <h3 className="font-semibold mb-4">Order Items</h3>
                        <div className="space-y-4">
                            {order.order_items?.map((item) => (
                                <div key={item.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center text-muted-foreground text-xs">
                                            Img
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">{item.product_name || "Unknown Product"}</p>
                                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</p>
                                </div>
                            )) || <p className="text-muted-foreground text-sm italic">No items found.</p>}

                            <div className="pt-4 flex justify-between items-center text-lg font-bold border-t border-border mt-4">
                                <span>Total</span>
                                <span>₹{Number(order.total_amount).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Customer Info */}
                <div className="space-y-6">
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                            <User className="w-4 h-4 text-primary" /> Customer
                        </h3>
                        <div className="space-y-3 text-sm">
                            <p className="font-medium">{order.customer_name}</p>
                            <p className="text-muted-foreground flex items-center gap-2">
                                <Mail className="w-3 h-3" /> {order.customer_email || 'No email provided'}
                            </p>
                            <p className="text-muted-foreground flex items-center gap-2">
                                <CreditCard className="w-3 h-3" /> Method: <span className="uppercase">{order.payment_method}</span>
                            </p>
                        </div>
                    </div>

                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" /> Delivery Address
                        </h3>
                        <div className="text-sm text-muted-foreground leading-relaxed">
                            {/* Assuming address is stored as text or simple JSON for now */}
                            {JSON.stringify(order.shipping_address) || "No shipping address provided."}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
