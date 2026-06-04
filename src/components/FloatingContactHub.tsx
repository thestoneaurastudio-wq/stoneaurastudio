import { MessageCircle, Phone, Mail, ChevronUp, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const FloatingContactHub = () => {
    const [isOpen, setIsOpen] = useState(false);
    const phoneNumber = "919876543210";
    const email = "info@stoneaurastudio.com";
    const message = "Hi! I'm interested in your marble products. Can you help me?";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            {/* Action Menu */}
            <div className={cn(
                "flex flex-col gap-3 transition-all duration-300 transform",
                isOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-75 pointer-events-none"
            )}>
                {/* Email */}
                <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-3 group"
                >
                    <span className="px-3 py-1.5 bg-charcoal text-white text-xs font-medium rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Email Us
                    </span>
                    <div className="w-12 h-12 bg-white text-charcoal rounded-full flex items-center justify-center shadow-lg hover:bg-secondary transition-colors">
                        <Mail className="w-5 h-5" />
                    </div>
                </a>

                {/* Call */}
                <a
                    href={`tel:+${phoneNumber}`}
                    className="flex items-center gap-3 group"
                >
                    <span className="px-3 py-1.5 bg-charcoal text-white text-xs font-medium rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Call Now
                    </span>
                    <div className="w-12 h-12 bg-white text-charcoal rounded-full flex items-center justify-center shadow-lg hover:bg-secondary transition-colors">
                        <Phone className="w-5 h-5" />
                    </div>
                </a>

                {/* WhatsApp */}
                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                >
                    <span className="px-3 py-1.5 bg-charcoal text-white text-xs font-medium rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        WhatsApp
                    </span>
                    <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors">
                        <MessageCircle className="w-6 h-6" />
                    </div>
                </a>
            </div>

            {/* Main Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center shadow-elevated transition-all duration-500 group relative overflow-hidden",
                    isOpen ? "bg-charcoal text-white rotate-180" : "bg-primary text-white hover:scale-110"
                )}
                aria-label="Contact options"
            >
                <div className="absolute inset-0 bg-gradient-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                    {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7" />}
                </div>

                {!isOpen && (
                    <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-25" />
                )}
            </button>

            {/* Helper Tooltip */}
            {!isOpen && (
                <div className="absolute right-20 top-1/2 -translate-y-1/2 px-4 py-2 bg-charcoal text-white text-sm font-medium rounded-xl shadow-xl animate-fade-in whitespace-nowrap hidden md:block group-hover:block">
                    Questions? Talk to us!
                    <div className="absolute left-full top-1/2 -translate-y-1/2 border-8 border-transparent border-l-charcoal" />
                </div>
            )}
        </div>
    );
};

export default FloatingContactHub;
