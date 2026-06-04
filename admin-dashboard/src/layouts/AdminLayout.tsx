import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useTheme } from "@/context/ThemeProvider";
import {
    LayoutDashboard,
    Package,
    MessageSquare,
    LogOut,
    Menu,
    ChevronLeft,
    ChevronRight,
    Search,
    Bell,
    User,
    Settings,
    Sun,
    Moon,
    Home,
    X,
    ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const { theme, setTheme, actualTheme } = useTheme();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) {
                navigate("/login");
            }
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!session) {
                navigate("/login");
            }
        });

        return () => subscription.unsubscribe();
    }, [navigate]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/login");
    };

    const navItems = [
        { icon: LayoutDashboard, label: "Dashboard", path: "/" },
        { icon: ShoppingBag, label: "Orders", path: "/orders" },
        { icon: Package, label: "Products", path: "/shop" },
        { icon: MessageSquare, label: "Customers", path: "/customers" },
        { icon: Bell, label: "Marketing", path: "/banners" },
        { icon: LogOut, label: "Enquiries", path: "/enquiries" },
        { icon: Settings, label: "Settings", path: "/settings" },
    ];

    // Get current page name for breadcrumb
    const getCurrentPageName = () => {
        const path = location.pathname;
        if (path === "/") return "Dashboard";
        if (path === "/products") return "Products";
        if (path === "/products/new") return "New Product";
        if (path.startsWith("/products/edit")) return "Edit Product";
        if (path === "/enquiries") return "Enquiries";
        if (path === "/settings") return "Settings";
        return "Page";
    };

    const toggleTheme = () => {
        setTheme(actualTheme === "dark" ? "light" : "dark");
    };

    return (
        <div className="min-h-screen bg-background flex">
            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Primary Sidebar - Icon Only */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-[70px] bg-sidebar border-r border-sidebar-border flex-col hidden md:flex transition-all duration-300",
                )}
            >
                {/* Logo */}
                <div className="h-16 flex items-center justify-center border-b border-sidebar-border">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        SA
                    </div>
                </div>

                {/* Icon Navigation */}
                <nav className="flex-1 py-4 px-2 space-y-1">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path ||
                            (item.path !== "/" && location.pathname.startsWith(item.path));
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    "flex items-center justify-center w-12 h-12 rounded-xl mx-auto transition-all duration-200 group relative",
                                    isActive
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                                        : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                )}
                                title={item.label}
                            >
                                <Icon className="h-5 w-5" />

                                {/* Tooltip */}
                                <span className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-lg">
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Actions */}
                <div className="p-2 border-t border-sidebar-border space-y-1">
                    <button
                        onClick={toggleTheme}
                        className="flex items-center justify-center w-12 h-12 rounded-xl mx-auto text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200 group relative"
                        title={actualTheme === "dark" ? "Light Mode" : "Dark Mode"}
                    >
                        {actualTheme === "dark" ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                        <span className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-lg">
                            {actualTheme === "dark" ? "Light Mode" : "Dark Mode"}
                        </span>
                    </button>
                    <button
                        onClick={handleLogout}
                        className="flex items-center justify-center w-12 h-12 rounded-xl mx-auto text-red-500 hover:bg-red-500/10 transition-all duration-200 group relative"
                        title="Logout"
                    >
                        <LogOut className="h-5 w-5" />
                        <span className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-lg">
                            Logout
                        </span>
                    </button>
                </div>
            </aside>

            {/* Secondary Sidebar - Expanded Menu */}
            <aside
                className={cn(
                    "fixed inset-y-0 z-40 bg-sidebar border-r border-sidebar-border flex-col transition-all duration-300 ease-in-out",
                    sidebarOpen ? "w-64 left-[70px]" : "w-0 left-[70px] overflow-hidden",
                    "hidden md:flex"
                )}
            >
                {/* Header */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
                    <div>
                        <h1 className="font-semibold text-foreground">StoneAura</h1>
                        <p className="text-xs text-muted-foreground">Admin v1.0.0</p>
                    </div>
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setSidebarOpen(false)}
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                    <p className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                        Main Menu
                    </p>
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path ||
                            (item.path !== "/" && location.pathname.startsWith(item.path));
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                                    isActive
                                        ? "bg-primary/10 text-primary font-medium"
                                        : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                )}
                            >
                                <Icon className="h-5 w-5" />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Mobile Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-72 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300 ease-in-out md:hidden",
                    mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Header */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            SA
                        </div>
                        <div>
                            <h1 className="font-semibold text-foreground">StoneAura</h1>
                            <p className="text-xs text-muted-foreground">Admin Dashboard</p>
                        </div>
                    </div>
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setMobileMenuOpen(false)}
                        className="h-8 w-8"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path ||
                            (item.path !== "/" && location.pathname.startsWith(item.path));
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                                    isActive
                                        ? "bg-primary/10 text-primary font-medium"
                                        : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                )}
                            >
                                <Icon className="h-5 w-5" />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Actions */}
                <div className="p-4 border-t border-sidebar-border space-y-2">
                    <button
                        onClick={toggleTheme}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-sidebar-accent transition-all duration-200"
                    >
                        {actualTheme === "dark" ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                        <span>{actualTheme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                    </button>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-500/10 transition-all duration-200"
                    >
                        <LogOut className="h-5 w-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className={cn(
                "flex-1 flex flex-col min-h-screen transition-all duration-300",
                sidebarOpen ? "md:ml-[calc(70px+256px)]" : "md:ml-[70px]"
            )}>
                {/* Top Header */}
                <header className="h-16 bg-card/80 backdrop-blur-xl border-b border-border sticky top-0 z-30 px-4 md:px-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {/* Mobile menu button */}
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => setMobileMenuOpen(true)}
                            className="md:hidden"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>

                        {/* Expand sidebar button (desktop) */}
                        {!sidebarOpen && (
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => setSidebarOpen(true)}
                                className="hidden md:flex hover:bg-secondary"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </Button>
                        )}

                        {/* Breadcrumb */}
                        <nav className="flex items-center gap-2 text-sm">
                            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Home className="h-4 w-4" />
                            </Link>
                            <span className="text-muted-foreground">/</span>
                            <span className="font-medium">{getCurrentPageName()}</span>
                        </nav>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4">
                        {/* Search */}
                        <div className="relative hidden sm:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-9 pr-4 py-2 bg-secondary/50 border border-transparent rounded-xl text-sm focus:border-primary/30 focus:bg-card transition-all w-48 lg:w-64 outline-none placeholder:text-muted-foreground"
                            />
                        </div>

                        {/* Theme toggle (desktop) */}
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={toggleTheme}
                            className="hidden md:flex text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl"
                        >
                            {actualTheme === "dark" ? (
                                <Sun className="h-5 w-5" />
                            ) : (
                                <Moon className="h-5 w-5" />
                            )}
                        </Button>

                        {/* Notifications */}
                        <Button
                            size="icon"
                            variant="ghost"
                            className="relative text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl"
                        >
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-card" />
                        </Button>

                        {/* User */}
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-primary font-medium border border-primary/10 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200">
                            <User className="h-5 w-5" />
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto animate-fade-in">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
