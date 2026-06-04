import { ReactNode } from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
    title: string;
    value: string | number;
    change?: number;
    changeLabel?: string;
    icon: ReactNode;
    iconBg?: string;
    chartData?: { value: number }[];
    chartColor?: string;
    className?: string;
}

export function StatsCard({
    title,
    value,
    change,
    changeLabel = "vs last month",
    icon,
    iconBg = "bg-primary/10",
    chartData,
    chartColor = "hsl(var(--primary))",
    className,
}: StatsCardProps) {
    const isPositive = change && change >= 0;

    // Generate sample data if not provided
    const data = chartData || [
        { value: 30 },
        { value: 45 },
        { value: 38 },
        { value: 52 },
        { value: 48 },
        { value: 60 },
        { value: 55 },
    ];

    return (
        <div className={cn(
            "stats-card bg-card rounded-2xl p-6 border border-border shadow-sm",
            className
        )}>
            <div className="flex items-start justify-between mb-4">
                <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                        {title}
                    </p>
                    <h3 className="text-3xl font-bold tracking-tight">
                        {value}
                    </h3>
                </div>
                <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center",
                    iconBg
                )}>
                    {icon}
                </div>
            </div>

            <div className="flex items-center justify-between">
                {change !== undefined && (
                    <div className="flex items-center gap-1">
                        <span className={cn(
                            "flex items-center text-sm font-medium",
                            isPositive ? "text-green-500" : "text-red-500"
                        )}>
                            {isPositive ? (
                                <ArrowUp className="w-4 h-4" />
                            ) : (
                                <ArrowDown className="w-4 h-4" />
                            )}
                            {Math.abs(change)}%
                        </span>
                        <span className="text-xs text-muted-foreground">
                            {changeLabel}
                        </span>
                    </div>
                )}

                {/* Sparkline Chart */}
                <div className="w-24 h-12 ml-auto">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id={`gradient-${title.replace(/\s/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={chartColor} stopOpacity={0.3} />
                                    <stop offset="100%" stopColor={chartColor} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke={chartColor}
                                strokeWidth={2}
                                fill={`url(#gradient-${title.replace(/\s/g, '')})`}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
