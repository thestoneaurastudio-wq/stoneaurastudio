// Load Razorpay SDK
export const initializeRazorpay = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

// Get Razorpay Key from environment variables
const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_YOUR_KEY_HERE";

// Razorpay Payment Function
export const makePayment = async (
    amount: number, // in INR
    onSuccess: (response: any) => void,
    onFailure: (error: any) => void
) => {
    const res = await initializeRazorpay();

    if (!res) {
        alert("Razorpay SDK failed to load. Please check your internet connection.");
        return;
    }

    const options = {
        key: RAZORPAY_KEY_ID,
        amount: amount * 100, // Razorpay accepts amount in paise
        currency: "INR",
        name: "StoneAura Studio",
        description: "Purchase Order",
        image: "/logo.png",
        handler: function (response: any) {
            onSuccess(response);
        },
        prefill: {
            name: "",
            email: "",
            contact: "",
        },
        theme: {
            color: "#D4AF37", // Gold color matching your brand
        },
        modal: {
            ondismiss: function () {
                onFailure({ error: "Payment cancelled by user" });
            },
        },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
};
