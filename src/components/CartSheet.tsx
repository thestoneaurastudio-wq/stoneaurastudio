import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";

const CartSheet = () => {
    const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleCheckout = () => {
        setIsOpen(false);
        navigate("/checkout");
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <div className="relative cursor-pointer group">
                    <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-full transition-all duration-300">
                        <ShoppingBag className="w-5 h-5" />
                    </button>
                    {cart.length > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-primary text-primary-foreground text-[10px] font-bold rounded-full animate-in zoom-in">
                            {cart.length}
                        </span>
                    )}
                </div>
            </SheetTrigger>
            <SheetContent className="w-full sm:w-[400px] flex flex-col">
                <SheetHeader className="pb-4 border-b">
                    <SheetTitle className="font-serif text-2xl">Shopping Cart</SheetTitle>
                </SheetHeader>

                {cart.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
                        <ShoppingBag className="w-12 h-12 mb-4 opacity-20" />
                        <p>Your cart is empty</p>
                        <Button variant="link" onClick={() => setIsOpen(false)} className="mt-2 text-primary">
                            Continue Shopping
                        </Button>
                    </div>
                ) : (
                    <>
                        <ScrollArea className="flex-1 -mx-6 px-6">
                            <div className="space-y-6 py-6">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-20 h-20 rounded-lg overflow-hidden border border-border shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                                            <div>
                                                <h4 className="font-medium text-sm truncate pr-4">{item.name}</h4>
                                                <p className="text-sm text-primary font-semibold">{item.price}</p>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center border border-border rounded-md">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-7 h-7 flex items-center justify-center hover:bg-secondary text-muted-foreground"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-7 h-7 flex items-center justify-center hover:bg-secondary text-muted-foreground"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-muted-foreground hover:text-destructive transition-colors p-1"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>

                        <div className="border-t pt-4 space-y-4">
                            <div className="flex items-center justify-between text-lg font-semibold">
                                <span>Total</span>
                                <span className="text-primary font-serif">₹{totalPrice.toLocaleString()}</span>
                            </div>
                            <Button
                                onClick={handleCheckout}
                                className="w-full bg-gradient-gold hover:shadow-gold rounded-full h-11 text-base"
                            >
                                Proceed to Checkout
                            </Button>
                        </div>
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
};

export default CartSheet;
