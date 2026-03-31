import { Sun, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="gradient-hero text-primary-foreground">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sun className="h-6 w-6 text-secondary" />
              <span className="font-heading text-lg font-bold">Premium Solar</span>
            </div>
            <p className="text-sm text-primary-foreground/70 max-w-xs">
              Your trusted partner for solar energy, power backup, and security solutions across Nigeria.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-heading font-semibold">Quick Links</h4>
            <div className="flex flex-col gap-2 text-sm text-primary-foreground/70">
              <a href="#home" className="hover:text-primary-foreground transition-colors">Home</a>
              <a href="#products" className="hover:text-primary-foreground transition-colors">Products</a>
              <a href="#about" className="hover:text-primary-foreground transition-colors">About Us</a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-heading font-semibold">Contact Us</h4>
            <div className="flex flex-col gap-2 text-sm text-primary-foreground/70">
              <span className="flex items-center gap-2"><Phone className="h-4 w-4" /> +234 801 234 5678</span>
              <span className="flex items-center gap-2"><Mail className="h-4 w-4" /> info@premiumsolar.ng</span>
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Lagos, Nigeria</span>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-primary-foreground/10 pt-6 text-center text-xs text-primary-foreground/50">
          © 2026 Premium Solar, Inverter & CCTV Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
