import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Package, MessageSquare, TrendingUp, DollarSign, AlertTriangle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
    StatsCard,
    QuickActions,
    RecentProducts,
    ActivityTimeline,
    SalesChart,
    WelcomeCard
} from "@/components/dashboard";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        totalEnquiries: 0,
        totalRevenue: 0,
    });
    const [lowStockProducts, setLowStockProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            // 1. Total Products (Shop + Collection)
            const { count: shopCount } = await supabase
                .from("shop_products")
                .select("*", { count: "exact", head: true });

            const { count: collectionCount } = await supabase
                .from("collection_items")
                .select("*", { count: "exact", head: true });

            // 2. Total Orders
            const { count: orderCount, data: ordersData } = await supabase
                .from("orders")
                .select("total_amount, status");

            // 3. Total Enquiries
            const { count: enquiryCount } = await supabase
                .from("enquiries")
                .select("*", { count: "exact", head: true });

            // 4. Calculate Revenue (Only active orders)
            const revenue = ordersData
                ?.filter(o => o.status !== 'cancelled' && o.status !== 'failed')
                .reduce((sum, order) => sum + (Number(order.total_amount) || 0), 0) || 0;

            // 5. Low Stock Products (Stock < 5)
            const { data: lowStock } = await supabase
                .from("shop_products")
                .select("id, name, stock, image")
                .lt("stock", 5)
                .limit(3);

            setStats({
                totalProducts: (shopCount || 0) + (collectionCount || 0),
                totalOrders: orderCount || 0,
                totalEnquiries: enquiryCount || 0,
                totalRevenue: revenue,
            });
            setLowStockProducts(lowStock || []);

        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 pb-10">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                        Dashboard
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Overview of your store performance.
                    </p>
                </div>
            </div>

            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <StatsCard
                    title="Total Products"
                    value={loading ? "..." : stats.totalProducts}
                    change={0}
                    changeLabel="updates live"
                    icon={<Package className="w-6 h-6 text-primary" />}
                    iconBg="bg-primary/10"
                    chartColor="hsl(var(--primary))"
                    chartData={[{ value: stats.totalProducts }]}
                />
                <StatsCard
                    title="Total Orders"
                    value={loading ? "..." : stats.totalOrders}
                    change={0}
                    changeLabel="fresh orders"
                    icon={<TrendingUp className="w-6 h-6 text-orange-500" />}
                    iconBg="bg-orange-500/10"
                    chartColor="hsl(39, 100%, 50%)"
                    chartData={[{ value: stats.totalOrders }]}
                />
                <StatsCard
                    title="Total Revenue"
                    value={loading ? "..." : `₹${(stats.totalRevenue / 1000).toFixed(1)}k`}
                    change={0}
                    changeLabel="revenue generated"
                    icon={<DollarSign className="w-6 h-6 text-green-500" />}
                    iconBg="bg-green-500/10"
                    chartColor="hsl(142, 76%, 36%)"
                    chartData={[{ value: stats.totalRevenue }]}
                />
                <StatsCard
                    title="Enquiries"
                    value={loading ? "..." : stats.totalEnquiries}
                    change={0}
                    changeLabel="messages"
                    icon={<MessageSquare className="w-6 h-6 text-blue-500" />}
                    iconBg="bg-blue-500/10"
                    chartColor="hsl(201, 96%, 52%)"
                    chartData={[{ value: stats.totalEnquiries }]}
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - 2/3 width */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Low Stock Alert Section */}
                    {lowStockProducts.length > 0 && (
                        <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <AlertTriangle className="w-5 h-5 text-red-600" />
                                <h3 className="font-semibold text-red-900 dark:text-red-200">Low Stock Alerts</h3>
                            </div>
                            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                                {lowStockProducts.map(product => (
                                    <div key={product.id} className="bg-background rounded-lg p-3 flex items-center gap-3 border border-red-100 dark:border-red-900/20 shadow-sm">
                                        <div className="w-10 h-10 bg-secondary rounded-md overflow-hidden flex-shrink-0">
                                            {product.image ? (
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full bg-secondary flex items-center justify-center text-xs">IMG</div>
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-medium text-sm truncate">{product.name}</p>
                                            <p className="text-xs text-red-600 font-bold">Only {product.stock} left!</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Sales Chart */}
                    <SalesChart title="Sales Overview" />

                    {/* Recent Products Table */}
                    <RecentProducts />
                </div>

                {/* Right Column - 1/3 width */}
                <div className="space-y-6">
                    {/* Welcome Card replaced by Quick Stats logic if needed, keeping generic for now */}
                    <WelcomeCard />

                    {/* Quick Actions */}
                    <QuickActions />

                    {/* Activity Timeline */}
                    <ActivityTimeline />
                </div>
            </div>
        </div>
    );
}
