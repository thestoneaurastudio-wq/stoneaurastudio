import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Workshop",
      details: ["Kishangarh, Rajasthan", "India - 305801"],
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 99295 46645", "+91 98765 43210"],
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@stoneaurastudio.com", "sales@stoneaurastudio.com"],
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Mon - Sat: 9:00 AM - 7:00 PM", "Sunday: By Appointment"],
    },
  ];

  return (
    <section id="contact" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <span className="text-xs font-medium tracking-widest text-primary uppercase">
                Get in Touch
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mt-4 mb-6">
                Let's Create{" "}
                <span className="text-gradient-gold">Something Beautiful</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Have a vision for your sacred space? Our design experts are ready 
                to help you bring it to life. Reach out for custom designs, 
                pricing, or any questions.
              </p>
            </div>

            {/* Contact Info Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    {item.details.map((detail, i) => (
                      <p key={i} className="text-sm text-muted-foreground">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919929546645"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-medium hover:bg-[#20bd5a] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="w-6 h-6" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Right Form */}
          <div className="bg-card p-8 md:p-10 rounded-2xl border border-border shadow-soft">
            <h3 className="text-2xl font-serif mb-6">Send Us a Message</h3>
            <form className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    placeholder="+91"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Interested In
                </label>
                <select className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all">
                  <option>Select a category</option>
                  <option>Home Mandirs</option>
                  <option>Marble Idols</option>
                  <option>Custom Design</option>
                  <option>Decor Items</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your requirements..."
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-gold text-primary-foreground py-4 rounded-full font-medium hover:shadow-gold transition-all duration-300"
              >
                Send Enquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
