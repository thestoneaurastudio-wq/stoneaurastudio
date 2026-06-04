import { useState } from "react";
import { Send, Upload, Phone, User, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const CustomOrderForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    size: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Enquiry Submitted!",
      description: "We'll contact you within 24 hours.",
    });
    setFormData({ name: "", phone: "", whatsapp: "", size: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className="py-16 md:py-24 bg-charcoal text-primary-foreground">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <span className="text-xs font-medium tracking-widest text-primary uppercase">
              Custom Orders
            </span>
            <h2 className="text-3xl md:text-4xl font-serif mt-4 mb-6">
              Request a <span className="text-gradient-gold">Custom Design</span>
            </h2>
            <p className="text-primary-foreground/70 mb-8 leading-relaxed">
              Have a specific design in mind? Share your vision with us, and our master craftsmen 
              will bring it to life. Upload reference photos, specify dimensions, and let us 
              create something unique for your sacred space.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/60">Call Us</p>
                  <p className="font-medium">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/60">WhatsApp</p>
                  <p className="font-medium">+91 98765 43210</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-primary-foreground/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-primary-foreground/10">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-primary-foreground/70 mb-2 block">Your Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/40" />
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      className="pl-10 bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-primary-foreground/70 mb-2 block">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/40" />
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="pl-10 bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-primary-foreground/70 mb-2 block">WhatsApp Number</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/40" />
                    <Input
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      placeholder="WhatsApp (if different)"
                      className="pl-10 bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-primary-foreground/70 mb-2 block">Required Size</label>
                  <Input
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    placeholder="e.g., 4ft x 3ft x 2ft"
                    className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-primary-foreground/70 mb-2 block">Reference Photo</label>
                <div className="border-2 border-dashed border-primary-foreground/20 rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto text-primary-foreground/40 mb-2" />
                  <p className="text-sm text-primary-foreground/60">
                    Click to upload or drag & drop
                  </p>
                  <p className="text-xs text-primary-foreground/40 mt-1">PNG, JPG up to 10MB</p>
                </div>
              </div>

              <div>
                <label className="text-sm text-primary-foreground/70 mb-2 block">Your Message</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your requirements..."
                  rows={4}
                  className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-gold text-primary-foreground hover:shadow-gold transition-all duration-300"
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Custom Order Request
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomOrderForm;
