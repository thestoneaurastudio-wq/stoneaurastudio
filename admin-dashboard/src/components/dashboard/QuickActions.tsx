import { Link } from "react-router-dom";
import { Plus, Tag, Package, FileText, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickAction {
    title: string;
    description: string;
    icon: LucideIcon;
    href: string;
    color: string;
}

const actions: QuickAction[] = [
    {
        title: "Add New Product",
        description: "Create a new product listing",
        icon: Plus,
        href: "/products/new",
        color: "bg-purple-500/10 text-purple-500 group-hover:bg-purple-500 group-hover:text-white",
    },
    {
        title: "Manage Categories",
        description: "Organize product categories",
        icon: Tag,
        href: "/categories",
        color: "bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white",
    },
    {
        title: "View Products",
        description: "Browse all products",
        icon: Package,
        href: "/products",
        color: "bg-green-500/10 text-green-500 group-hover:bg-green-500 group-hover:text-white",
    },
    {
        title: "View Enquiries",
        description: "Check customer enquiries",
        icon: FileText,
        href: "/enquiries",
        color: "bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white",
    },
];

export function QuickActions() {
    return (
        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
                {actions.map((action) => {
                    const Icon = action.icon;
                    return (
                        <Link
                            key={action.title}
                            to={action.href}
                            className="group flex items-center gap-4 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-all duration-200"
                        >
                            <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200",
                                action.color
                            )}>
                                <Icon className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-medium text-sm">{action.title}</p>
                                <p className="text-xs text-muted-foreground">
                                    {action.description}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
