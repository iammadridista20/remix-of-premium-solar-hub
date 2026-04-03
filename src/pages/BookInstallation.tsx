import { useState } from "react";
import { CalendarDays, Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const serviceTypes = [
  "Solar Panel Installation",
  "Inverter Installation",
  "Battery Setup",
  "CCTV Installation",
  "Electrical Wiring",
  "Full Solar System Setup",
  "Maintenance & Repair",
];

const BookInstallation = () => {
  const [form, setForm] = useState({
    customer_name: "",
    email: "",
    phone: "",
    address: "",
    service_type: "",
    preferred_date: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const { error } = await supabase.from("installation_bookings").insert({
      customer_name: form.customer_name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      service_type: form.service_type,
      preferred_date: form.preferred_date || null,
      message: form.message || null,
    });

    setSubmitting(false);

    if (error) {
      toast.error("Failed to submit booking. Please try again.");
      return;
    }

    setSubmitted(true);
    toast.success("Booking submitted successfully!");
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar cartCount={0} onCartOpen={() => {}} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-8">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="font-heading text-2xl font-bold text-foreground mb-2">Booking Received!</h1>
            <p className="text-muted-foreground mb-6">
              Thank you for your installation request. Our team will contact you within 24 hours to confirm the details.
            </p>
            <Button onClick={() => { setSubmitted(false); setForm({ customer_name: "", email: "", phone: "", address: "", service_type: "", preferred_date: "", message: "" }); }}>
              Submit Another Booking
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartCount={0} onCartOpen={() => {}} />

      <section className="container py-16">
        <div className="text-center mb-12">
          <h1 className="font-heading text-2xl font-bold text-foreground md:text-3xl mb-2">
            Book an Installation
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Schedule a professional installation with our experienced team. Fill out the form below and we'll get back to you promptly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4 rounded-lg bg-card p-6 shadow-card border">
          <div className="flex items-center gap-2 mb-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            <h2 className="font-heading text-lg font-semibold text-card-foreground">Installation Details</h2>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input id="name" required value={form.customer_name} onChange={(e) => setForm({ ...form, customer_name: e.target.value })} placeholder="Your full name" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input id="phone" type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+234..." />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Installation Address *</Label>
            <Input id="address" required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Full address for installation" />
          </div>

          <div className="space-y-2">
            <Label>Service Type *</Label>
            <Select required value={form.service_type} onValueChange={(v) => setForm({ ...form, service_type: v })}>
              <SelectTrigger><SelectValue placeholder="Select a service" /></SelectTrigger>
              <SelectContent>
                {serviceTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Preferred Date</Label>
            <Input id="date" type="date" value={form.preferred_date} onChange={(e) => setForm({ ...form, preferred_date: e.target.value })} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Additional Notes</Label>
            <Textarea id="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Any special requirements..." rows={3} />
          </div>

          <Button type="submit" className="w-full gap-2" disabled={submitting || !form.service_type}>
            <Send className="h-4 w-4" /> {submitting ? "Submitting..." : "Book Installation"}
          </Button>
        </form>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default BookInstallation;
