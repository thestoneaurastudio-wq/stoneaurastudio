import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Package, MessageSquare, UserPlus, Settings, Edit } from "lucide-react";
import { cn } from "@/lib/utils";

interface Activity {
    id: string;
    type: "product" | "enquiry" | "user" | "setting";
    title: string;
    time: string;
    description?: string;
}

const getIconAndColor = (type: Activity["type"]) => {
    switch (type) {
        case "product":
            return { icon: Package, color: "bg-purple-500", bgColor: "bg-purple-500/10" };
        case "enquiry":
            return { icon: MessageSquare, color: "bg-blue-500", bgColor: "bg-blue-500/10" };
        case "user":
            return { icon: UserPlus, color: "bg-green-500", bgColor: "bg-green-500/10" };
        case "setting":
            return { icon: Settings, color: "bg-orange-500", bgColor: "bg-orange-500/10" };
        default:
            return { icon: Edit, color: "bg-gray-500", bgColor: "bg-gray-500/10" };
    }
};

export function ActivityTimeline() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecentActivity = async () => {
            // Fetch recent products
            const { data: products } = await supabase
                .from("products")
                .select("id, name, created_at")
                .order("created_at", { ascending: false })
                .limit(3);

            // Fetch recent enquiries
            const { data: enquiries } = await supabase
                .from("enquiries")
                .select("id, name, created_at")
                .order("created_at", { ascending: false })
                .limit(3);

            const allActivities: Activity[] = [];

            products?.forEach((p) => {
                allActivities.push({
                    id: `product-${p.id}`,
                    type: "product",
                    title: "Product Added",
                    description: p.name,
                    time: p.created_at,
                });
            });

            enquiries?.forEach((e) => {
                allActivities.push({
                    id: `enquiry-${e.id}`,
                    type: "enquiry",
                    title: "New Enquiry",
                    description: `From ${e.name}`,
                    time: e.created_at,
                });
            });

            // Sort by time
            allActivities.sort((a, b) =>
                new Date(b.time).getTime() - new Date(a.time).getTime()
            );

            setActivities(allActivities.slice(0, 6));
            setLoading(false);
        };

        fetchRecentActivity();
    }, []);

    const formatRelativeTime = (date: string) => {
        const now = new Date();
        const then = new Date(date);
        const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

        if (diffInSeconds < 60) return "Just now";
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
        return then.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    };

    if (loading) {
        return (
            <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <h3 className="text-lg font-semibold mb-6">Recent Activity</h3>
                <div className="space-y-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex gap-4 animate-pulse">
                            <div className="w-8 h-8 bg-muted rounded-full" />
                            <div className="flex-1">
                                <div className="h-4 bg-muted rounded w-1/2 mb-2" />
                                <div className="h-3 bg-muted rounded w-1/4" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
            <h3 className="text-lg font-semibold mb-6">Recent Activity</h3>

            <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

                <div className="space-y-6">
                    {activities.map((activity, index) => {
                        const { icon: Icon, color, bgColor } = getIconAndColor(activity.type);
                        return (
                            <div
                                key={activity.id}
                                className="relative flex gap-4 animate-fade-in"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Timeline dot */}
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center z-10",
                                    bgColor
                                )}>
                                    <Icon className={cn("w-4 h-4", color.replace("bg-", "text-"))} />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm">{activity.title}</p>
                                    {activity.description && (
                                        <p className="text-sm text-muted-foreground truncate">
                                            {activity.description}
                                        </p>
                                    )}
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {formatRelativeTime(activity.time)}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {activities.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                    No recent activity
                </div>
            )}
        </div>
    );
}
