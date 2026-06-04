import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SalesChartProps {
    title?: string;
    className?: string;
}

// Sample data - in production, this would come from Supabase
const monthlyData = [
    { name: "Jan", sales: 4000, visits: 2400 },
    { name: "Feb", sales: 3000, visits: 1398 },
    { name: "Mar", sales: 2000, visits: 9800 },
    { name: "Apr", sales: 2780, visits: 3908 },
    { name: "May", sales: 1890, visits: 4800 },
    { name: "Jun", sales: 2390, visits: 3800 },
    { name: "Jul", sales: 3490, visits: 4300 },
    { name: "Aug", sales: 4000, visits: 4500 },
    { name: "Sep", sales: 3200, visits: 3800 },
    { name: "Oct", sales: 2800, visits: 4200 },
    { name: "Nov", sales: 3600, visits: 4800 },
    { name: "Dec", sales: 4200, visits: 5200 },
];

const weeklyData = [
    { name: "Mon", sales: 1200, visits: 800 },
    { name: "Tue", sales: 1800, visits: 1200 },
    { name: "Wed", sales: 2200, visits: 1600 },
    { name: "Thu", sales: 1600, visits: 1400 },
    { name: "Fri", sales: 2400, visits: 1800 },
    { name: "Sat", sales: 2800, visits: 2200 },
    { name: "Sun", sales: 2000, visits: 1600 },
];

type TimeRange = "weekly" | "monthly";

export function SalesChart({ title = "Sales Overview", className }: SalesChartProps) {
    const [timeRange, setTimeRange] = useState<TimeRange>("monthly");

    const data = timeRange === "weekly" ? weeklyData : monthlyData;

    return (
        <div className={cn(
            "bg-card rounded-2xl p-6 border border-border shadow-sm",
            className
        )}>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">{title}</h3>
                <div className="flex gap-1 bg-secondary rounded-lg p-1">
                    <button
                        onClick={() => setTimeRange("weekly")}
                        className={cn(
                            "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                            timeRange === "weekly"
                                ? "bg-card text-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        Week
                    </button>
                    <button
                        onClick={() => setTimeRange("monthly")}
                        className={cn(
                            "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                            timeRange === "monthly"
                                ? "bg-card text-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        Month
                    </button>
                </div>
            </div>

            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                        <defs>
                            <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="visitsGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                                <stop offset="100%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="hsl(var(--border))"
                            vertical={false}
                        />
                        <XAxis
                            dataKey="name"
                            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `₹${value / 1000}k`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "hsl(var(--card))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "12px",
                                boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                            }}
                            labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
                            itemStyle={{ color: "hsl(var(--muted-foreground))" }}
                            formatter={(value: any) => [`₹${(value ?? 0).toLocaleString()}`, ""]}
                        />
                        <Area
                            type="monotone"
                            dataKey="sales"
                            stroke="hsl(var(--primary))"
                            strokeWidth={2}
                            fill="url(#salesGradient)"
                            name="Sales"
                        />
                        <Area
                            type="monotone"
                            dataKey="visits"
                            stroke="hsl(var(--chart-2))"
                            strokeWidth={2}
                            fill="url(#visitsGradient)"
                            name="Visits"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-sm text-muted-foreground">Sales</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-chart-2" />
                    <span className="text-sm text-muted-foreground">Visits</span>
                </div>
            </div>
        </div>
    );
}
