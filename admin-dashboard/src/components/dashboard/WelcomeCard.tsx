import { Sparkles, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export function WelcomeCard() {
    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/90 via-primary to-purple-700 rounded-2xl p-6 text-white shadow-lg">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Sparkles className="w-6 h-6" />
                    </div>
                </div>

                <h3 className="text-xl font-semibold mb-2">
                    Welcome to StoneAura Admin
                </h3>
                <p className="text-white/80 text-sm mb-6 max-w-sm">
                    Manage your products, view enquiries, and customize your store from this dashboard.
                </p>

                <Link
                    to="/settings"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl text-sm font-medium transition-all duration-200"
                >
                    <Settings className="w-4 h-4" />
                    Configure Settings
                </Link>
            </div>
        </div>
    );
}
