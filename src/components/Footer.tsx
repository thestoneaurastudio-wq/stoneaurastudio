import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail, Shield, Truck, CreditCard, ChevronDown } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Collections", href: "/collections" },
    { name: "Shop", href: "/shop" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const categories = [
    { name: "Statue Gods", href: "/shop?category=Statue%20Gods" },
    { name: "Statue Goddess", href: "/shop?category=Statue%20Goddess" },
    { name: "Temple & Mandir", href: "/shop?category=Temple%20%26%20Mandir" },
    { name: "Decor Items", href: "/shop?category=Decor%20Items" },
  ];

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="bg-charcoal text-primary-foreground">
      {/* Trust Badges Bar */}
      <div className="border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
          <div className="grid grid-cols-3 gap-2 md:flex md:flex-wrap md:justify-center md:gap-12">
            <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-center">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-primary-foreground/70 text-xs md:text-sm">Secure Payments</span>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-center">
              <Truck className="w-5 h-5 text-primary" />
              <span className="text-primary-foreground/70 text-xs md:text-sm">Insured Delivery</span>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-center">
              <CreditCard className="w-5 h-5 text-primary" />
              <span className="text-primary-foreground/70 text-xs md:text-sm">Easy EMI</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-10 md:py-16">
        {/* Mobile: Accordion Style | Desktop: Grid */}
        <div className="md:hidden space-y-0">
          {/* Brand - Always visible on mobile */}
          <div className="text-center pb-6 border-b border-primary-foreground/10">
            <img src={logo} alt="StoneAura Studio" className="h-12 w-auto brightness-0 invert mx-auto mb-4" />
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-xs mx-auto">
              Handcrafting luxury marble masterpieces since 1978. From Kishangarh to homes worldwide.
            </p>
            <div className="flex items-center justify-center gap-3 mt-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-all"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links Accordion */}
          <div className="border-b border-primary-foreground/10">
            <button
              onClick={() => toggleSection('quick')}
              className="flex items-center justify-between w-full py-4 text-left"
            >
              <span className="font-serif text-base">Quick Links</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${openSection === 'quick' ? 'rotate-180' : ''}`} />
            </button>
            {openSection === 'quick' && (
              <div className="pb-4 grid grid-cols-2 gap-2 animate-fade-in">
                {quickLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-primary transition-colors text-sm py-1"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Categories Accordion */}
          <div className="border-b border-primary-foreground/10">
            <button
              onClick={() => toggleSection('categories')}
              className="flex items-center justify-between w-full py-4 text-left"
            >
              <span className="font-serif text-base">Categories</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${openSection === 'categories' ? 'rotate-180' : ''}`} />
            </button>
            {openSection === 'categories' && (
              <div className="pb-4 grid grid-cols-2 gap-2 animate-fade-in">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    to={category.href}
                    className="text-primary-foreground/70 hover:text-primary transition-colors text-sm py-1"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Contact Accordion */}
          <div className="border-b border-primary-foreground/10">
            <button
              onClick={() => toggleSection('contact')}
              className="flex items-center justify-between w-full py-4 text-left"
            >
              <span className="font-serif text-base">Contact Us</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${openSection === 'contact' ? 'rotate-180' : ''}`} />
            </button>
            {openSection === 'contact' && (
              <div className="pb-4 space-y-3 animate-fade-in">
                <div className="flex gap-3 text-primary-foreground/70 text-sm">
                  <MapPin className="w-5 h-5 flex-shrink-0 text-primary" />
                  <span>Kishangarh, Rajasthan - 305801</span>
                </div>
                <div className="flex gap-3 text-primary-foreground/70 text-sm">
                  <Phone className="w-5 h-5 flex-shrink-0 text-primary" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex gap-3 text-primary-foreground/70 text-sm">
                  <Mail className="w-5 h-5 flex-shrink-0 text-primary" />
                  <span>info@stoneaurastudio.com</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <img src={logo} alt="StoneAura Studio" className="h-14 w-auto brightness-0 invert" />
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Handcrafting luxury marble masterpieces since 1978.
              From Kishangarh to homes worldwide. <strong className="text-white ml-1">Made in India.</strong>
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-serif text-lg mb-6">Categories</h4>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    to={category.href}
                    className="text-primary-foreground/70 hover:text-primary transition-colors text-sm"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Location */}
          <div>
            <h4 className="font-serif text-lg mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex gap-3 text-primary-foreground/70 text-sm">
                <MapPin className="w-5 h-5 flex-shrink-0 text-primary" />
                <div>
                  <p>StoneAura Studio</p>
                  <p>Kishangarh, Rajasthan</p>
                  <p>India - 305801</p>
                </div>
              </div>
              <div className="flex gap-3 text-primary-foreground/70 text-sm">
                <Phone className="w-5 h-5 flex-shrink-0 text-primary" />
                <div>
                  <p>+91 98765 43210</p>
                  <p className="text-xs text-primary-foreground/50">WhatsApp Available</p>
                </div>
              </div>
              <div className="flex gap-3 text-primary-foreground/70 text-sm">
                <Mail className="w-5 h-5 flex-shrink-0 text-primary" />
                <p>info@stoneaurastudio.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Business Info */}
        <div className="border-t border-primary-foreground/10 mt-8 md:mt-12 pt-6 md:pt-8">
          <div className="text-center md:text-left md:grid md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8 space-y-2 md:space-y-0">
            <div className="text-xs md:text-sm text-primary-foreground/50">
              <p><strong className="text-primary-foreground/70">GST:</strong> 08AABCS1234A1Z5</p>
            </div>
            <div className="text-xs md:text-sm text-primary-foreground/50 md:text-right">
              <p><strong className="text-primary-foreground/70">Hours:</strong> Mon - Sat, 10 AM - 7 PM</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10 pt-6 md:pt-8">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <p className="text-xs md:text-sm text-primary-foreground/50 text-center">
              © {new Date().getFullYear()} StoneAura Studio. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm text-primary-foreground/50">
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Shipping</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
