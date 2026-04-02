import { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import StaffDirectory from "@/components/StaffDirectory";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartCount={0} onCartOpen={() => {}} />

      <section className="container py-16">
        <div className="text-center mb-12">
          <h1 className="font-heading text-2xl font-bold text-foreground md:text-3xl mb-2">Contact Us</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Have a question or need a quote? Reach out to us and we'll respond as quickly as possible.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 max-w-4xl mx-auto">
          <div className="space-y-6">
            <h2 className="font-heading text-lg font-semibold text-foreground">Get in Touch</h2>
            {[
              { icon: Phone, label: "Phone", value: "+234 913 250 2303", href: "tel:+2349132502303" },
              { icon: Mail, label: "Email", value: "info@premiumsolar.ng", href: "mailto:info@premiumsolar.ng" },
              { icon: MapPin, label: "Location", value: "Kaduna, Nigeria" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-sm text-muted-foreground hover:text-secondary transition-colors">{item.value}</a>
                  ) : (
                    <p className="text-sm text-muted-foreground">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="mt-6 rounded-lg bg-muted/50 p-4">
              <h3 className="font-heading text-sm font-semibold text-foreground mb-1">Business Hours</h3>
              <p className="text-sm text-muted-foreground">Monday - Saturday: 8:00 AM - 6:00 PM</p>
              <p className="text-sm text-muted-foreground">Sunday: Closed</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 rounded-lg bg-card p-6 shadow-card">
            <h2 className="font-heading text-lg font-semibold text-card-foreground">Send a Message</h2>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+234..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us what you need..." rows={4} />
            </div>
            <Button type="submit" className="w-full gap-2">
              <Send className="h-4 w-4" /> Send Message
            </Button>
          </form>
        </div>
      </section>

      <div className="container pb-16">
        <StaffDirectory />
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Contact;
