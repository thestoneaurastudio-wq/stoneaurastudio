import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { makePayment } from "@/lib/payment";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, MapPin, Truck, CreditCard, MessageCircle, Lock, Loader2, Minus, Plus, Trash2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link, useNavigate } from "react-router-dom";

const Checkout = () => {
    const { cart, totalPrice, clearCart, updateQuantity, removeFromCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1); // 1: Address, 2: Payment

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        pincode: "",
        address: "",
        city: "",
        state: "",
    });

    const [paymentMethod, setPaymentMethod] = useState<"online" | "whatsapp">("online");

    const handleAddressSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.phone || !formData.address || !formData.pincode) {
            toast.error("Please fill all required fields");
            return;
        }
        setStep(2);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handlePlaceOrder = () => {
        if (paymentMethod === "whatsapp") {
            const itemsList = cart.map(item => `- ${item.name} x ${item.quantity} (₹${item.price})`).join("\n");
            const message = `*New Order Request*\n\n*Customer Details:*\nName: ${formData.name}\nPhone: ${formData.phone}\nAddress: ${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}\n\n*Order Items:*\n${itemsList}\n\n*Total Amount: ₹${totalPrice.toLocaleString()}*`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/919876543210?text=${encodedMessage}`;

            window.open(whatsappUrl, "_blank");
            clearCart();
            navigate("/");
            toast.success("Order request sent via WhatsApp!");
        } else {
            setLoading(true);
            makePayment(
                totalPrice,
                (response) => {
                    setLoading(false);
                    toast.success("Payment Successful! Order Placed.");
                    clearCart();
                    navigate("/");
                },
                (error) => {
                    setLoading(false);
                    toast.error("Payment Failed or Cancelled");
                }
            );
        }
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-secondary/30">
                <Header />
                <div className="container mx-auto px-4 pt-32 pb-20 text-center">
                    <div className="max-w-md mx-auto bg-background p-8 rounded-2xl shadow-sm border border-border">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Truck className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="text-2xl font-serif mb-2">Your Cart is Empty</h2>
                        <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
                        <Link to="/shop">
                            <Button className="bg-gradient-gold hover:shadow-gold rounded-full px-8">
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-secondary/30">
            <Header />
            <main className="container mx-auto px-4 pt-28 pb-20">
                <h1 className="text-2xl md:text-3xl font-serif mb-8">Checkout</h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Steps */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Step 1: Address */}
                        <div className={`bg-background rounded-xl shadow-sm border border-border overflow-hidden transition-all duration-300 ${step === 1 ? 'ring-2 ring-primary/20' : ''}`}>
                            <div className="p-4 bg-secondary/20 border-b border-border flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step > 1 ? 'bg-green-500 text-white' : 'bg-primary text-primary-foreground'}`}>
                                    {step > 1 ? <CheckCircle2 className="w-5 h-5" /> : "1"}
                                </div>
                                <h2 className="font-semibold text-lg">Delivery Address</h2>
                                {step > 1 && (
                                    <Button variant="ghost" size="sm" onClick={() => setStep(1)} className="ml-auto text-primary">Change</Button>
                                )}
                            </div>

                            {step === 1 && (
                                <div className="p-6">
                                    <form onSubmit={handleAddressSubmit} className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name *</Label>
                                            <Input id="name" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number *</Label>
                                            <Input id="phone" required type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="pincode">Pincode *</Label>
                                            <Input id="pincode" required value={formData.pincode} onChange={e => setFormData({ ...formData, pincode: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="city">City</Label>
                                            <Input id="city" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} />
                                        </div>
                                        <div className="md:col-span-2 space-y-2">
                                            <Label htmlFor="address">Address (House No, Building, Street) *</Label>
                                            <Input id="address" required value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="state">State</Label>
                                            <Input id="state" value={formData.state} onChange={e => setFormData({ ...formData, state: e.target.value })} />
                                        </div>

                                        <div className="md:col-span-2 mt-4">
                                            <Button type="submit" className="w-full md:w-auto bg-primary text-primary-foreground px-8 rounded-full">
                                                Save & Continue
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            )}
                            {step > 1 && (
                                <div className="p-4 text-sm text-muted-foreground">
                                    <p className="font-medium text-foreground">{formData.name}, {formData.phone}</p>
                                    <p>{formData.address}, {formData.city}, {formData.pincode}</p>
                                </div>
                            )}
                        </div>

                        {/* Step 2: Order Summary */}
                        <div className="bg-background rounded-xl shadow-sm border border-border overflow-hidden">
                            <div className="p-4 bg-secondary/20 border-b border-border flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-bold border border-border">2</div>
                                <h2 className="font-semibold text-lg text-muted-foreground">Order Summary</h2>
                            </div>
                            <div className="p-6 space-y-4">
                                {cart.map(item => (
                                    <div key={item.id} className="flex gap-4 border-b border-border pb-4 last:border-0 last:pb-0">
                                        <div className="w-20 h-20 rounded-md overflow-hidden bg-secondary/30 shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium text-sm md:text-base line-clamp-2">{item.name}</h3>
                                            <p className="text-sm text-muted-foreground mt-1">{item.category}</p>
                                            <p className="font-semibold text-primary mt-1">{item.price}</p>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <div className="flex items-center border border-border rounded-md bg-background">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-muted"><Minus className="w-3 h-3" /></button>
                                                <span className="w-6 text-center text-xs font-medium">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-muted"><Plus className="w-3 h-3" /></button>
                                            </div>
                                            <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive text-xs flex items-center gap-1">
                                                <Trash2 className="w-3 h-3" /> Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Step 3: Payment Options */}
                        <div className={`bg-background rounded-xl shadow-sm border border-border overflow-hidden transition-all duration-300 ${step === 2 ? 'ring-2 ring-primary/20' : 'opacity-70 grayscale'}`}>
                            <div className="p-4 bg-secondary/20 border-b border-border flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === 2 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground border border-border'}`}>
                                    3
                                </div>
                                <h2 className="font-semibold text-lg">Payment Options</h2>
                            </div>

                            {step === 2 && (
                                <div className="p-6">
                                    <RadioGroup value={paymentMethod} onValueChange={(val: "online" | "whatsapp") => setPaymentMethod(val)} className="space-y-4">
                                        <div className={`flex items-start space-x-3 p-4 rounded-lg border cursor-pointer hover:bg-secondary/10 transition-colors ${paymentMethod === 'online' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                                            <RadioGroupItem value="online" id="online" className="mt-1" />
                                            <Label htmlFor="online" className="flex-1 cursor-pointer">
                                                <div className="flex items-center gap-2 font-semibold">
                                                    Online Payment <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Recommended</span>
                                                </div>
                                                <p className="text-sm text-muted-foreground mt-1">Pay via UPI, Cards, NetBanking provided by Razorpay.</p>
                                                <div className="flex gap-2 mt-2">
                                                    <CreditCard className="w-4 h-4 text-muted-foreground" />
                                                    <Lock className="w-4 h-4 text-muted-foreground" />
                                                </div>
                                            </Label>
                                        </div>

                                        <div className={`flex items-start space-x-3 p-4 rounded-lg border cursor-pointer hover:bg-secondary/10 transition-colors ${paymentMethod === 'whatsapp' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                                            <RadioGroupItem value="whatsapp" id="whatsapp" className="mt-1" />
                                            <Label htmlFor="whatsapp" className="flex-1 cursor-pointer">
                                                <div className="flex items-center gap-2 font-semibold">
                                                    Order via WhatsApp
                                                </div>
                                                <p className="text-sm text-muted-foreground mt-1">Send your order details directly to our team. We will contact you for confirmation and payment.</p>
                                                <div className="flex gap-2 mt-2">
                                                    <MessageCircle className="w-4 h-4 text-muted-foreground" />
                                                </div>
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            )}
                        </div>

                    </div>

                    {/* Right Column - Price Details */}
                    <div className="lg:col-span-1">
                        <div className="bg-background p-6 rounded-xl shadow-sm border border-border sticky top-28">
                            <h3 className="font-semibold text-lg mb-4 text-muted-foreground uppercase tracking-wide text-xs">Price Details</h3>
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Price ({cart.reduce((a, c) => a + c.quantity, 0)} items)</span>
                                    <span>₹{totalPrice.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Delivery Charges</span>
                                    <span className="text-green-600">Free</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-bold text-lg text-foreground">
                                    <span>Total Payable</span>
                                    <span>₹{totalPrice.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-2 text-xs text-muted-foreground bg-secondary/30 p-3 rounded-lg mb-6">
                                <Lock className="w-4 h-4 mt-0.5 shrink-0" />
                                <p>Your personal details are safe with us.</p>
                            </div>

                            <Button
                                onClick={handlePlaceOrder}
                                disabled={step < 2 || loading}
                                className="w-full h-12 text-base rounded-full bg-gradient-gold hover:shadow-gold disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (paymentMethod === 'online' ? "Pay Now" : "Place Order")}
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Checkout;
