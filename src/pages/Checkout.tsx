import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, CreditCard, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { CartItem } from "@/components/CartSheet";
import { formatNaira } from "@/hooks/useProducts";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        toast.error("Please sign in to checkout");
        navigate("/login?redirectTo=/checkout", { replace: true });
      }
    });
  }, [navigate]);

  const items: CartItem[] = location.state?.items || [];
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 500000 ? 0 : 15000;
  const total = subtotal + deliveryFee;

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "",
    cardNumber: "", cardExpiry: "", cardCvv: "", cardName: "",
  });
  const [processing, setProcessing] = useState(false);

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.address || !form.city || !form.state) {
      toast.error("Please fill in all personal details");
      return;
    }
    if (!form.cardNumber || !form.cardExpiry || !form.cardCvv || !form.cardName) {
      toast.error("Please fill in all card details");
      return;
    }
    setProcessing(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { toast.error("Please sign in"); setProcessing(false); return; }

      const { data: order, error: orderErr } = await supabase.from("orders").insert({
        user_id: user.id,
        customer_name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        phone: form.phone,
        shipping_address: `${form.address}, ${form.city}, ${form.state}`,
        subtotal,
        delivery_fee: deliveryFee,
        total,
        status: "pending",
      }).select().single();

      if (orderErr || !order) { toast.error("Order failed: " + (orderErr?.message || "Unknown error")); setProcessing(false); return; }

      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_name: item.name,
        product_price: item.price,
        quantity: item.quantity,
      }));
      await supabase.from("order_items").insert(orderItems);

      toast.success("Payment successful! Your order has been placed.");
      navigate("/order-confirmation", { state: { items, total, form } });
    } catch {
      toast.error("Something went wrong");
    } finally {
      setProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">No items in your cart.</p>
        <Button onClick={() => navigate("/")} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Shop
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-card/80 backdrop-blur-md">
        <div className="container flex h-16 items-center gap-4">
          <button onClick={() => navigate("/")} className="rounded-full p-2 text-muted-foreground hover:bg-muted transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="font-heading text-lg font-bold text-foreground">Checkout</h1>
          <div className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground">
            <Lock className="h-3.5 w-3.5" /> Secure Checkout
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="container py-8">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3 space-y-8">
            <div className="rounded-lg border bg-card p-6 shadow-card">
              <h2 className="font-heading text-lg font-bold text-card-foreground mb-5">Personal Details</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2"><Label htmlFor="firstName">First Name</Label><Input id="firstName" placeholder="John" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} required /></div>
                <div className="space-y-2"><Label htmlFor="lastName">Last Name</Label><Input id="lastName" placeholder="Doe" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} required /></div>
                <div className="space-y-2"><Label htmlFor="email">Email Address</Label><Input id="email" type="email" placeholder="john@example.com" value={form.email} onChange={(e) => update("email", e.target.value)} required /></div>
                <div className="space-y-2"><Label htmlFor="phone">Phone Number</Label><Input id="phone" type="tel" placeholder="+234 XXX XXX XXXX" value={form.phone} onChange={(e) => update("phone", e.target.value)} required /></div>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-6 shadow-card">
              <h2 className="font-heading text-lg font-bold text-card-foreground mb-5">Delivery Address</h2>
              <div className="grid gap-4">
                <div className="space-y-2"><Label htmlFor="address">Street Address</Label><Input id="address" placeholder="123 Main Street" value={form.address} onChange={(e) => update("address", e.target.value)} required /></div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2"><Label htmlFor="city">City</Label><Input id="city" placeholder="Kaduna" value={form.city} onChange={(e) => update("city", e.target.value)} required /></div>
                  <div className="space-y-2"><Label htmlFor="state">State</Label><Input id="state" placeholder="Kaduna State" value={form.state} onChange={(e) => update("state", e.target.value)} required /></div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-6 shadow-card">
              <div className="flex items-center gap-2 mb-5">
                <CreditCard className="h-5 w-5 text-secondary" />
                <h2 className="font-heading text-lg font-bold text-card-foreground">Payment Details</h2>
              </div>
              <div className="grid gap-4">
                <div className="space-y-2"><Label htmlFor="cardName">Name on Card</Label><Input id="cardName" placeholder="JOHN DOE" value={form.cardName} onChange={(e) => update("cardName", e.target.value.toUpperCase())} required /></div>
                <div className="space-y-2"><Label htmlFor="cardNumber">Card Number</Label><Input id="cardNumber" placeholder="1234 5678 9012 3456" value={form.cardNumber} onChange={(e) => update("cardNumber", formatCardNumber(e.target.value))} maxLength={19} required /></div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2"><Label htmlFor="cardExpiry">Expiry Date</Label><Input id="cardExpiry" placeholder="MM/YY" value={form.cardExpiry} onChange={(e) => update("cardExpiry", formatExpiry(e.target.value))} maxLength={5} required /></div>
                  <div className="space-y-2"><Label htmlFor="cardCvv">CVV</Label><Input id="cardCvv" placeholder="123" type="password" value={form.cardCvv} onChange={(e) => update("cardCvv", e.target.value.replace(/\D/g, "").slice(0, 4))} maxLength={4} required /></div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4" /> Your payment details are encrypted and secure.
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-lg border bg-card p-6 shadow-card sticky top-24">
              <h2 className="font-heading text-lg font-bold text-card-foreground mb-4">Order Summary</h2>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img src={item.image} alt={item.name} className="h-14 w-14 rounded-md object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-card-foreground line-clamp-1">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-semibold text-secondary whitespace-nowrap">{formatNaira(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>{formatNaira(subtotal)}</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Delivery</span><span>{deliveryFee === 0 ? "Free" : formatNaira(deliveryFee)}</span></div>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between font-heading text-lg font-bold text-card-foreground">
                <span>Total</span><span className="text-secondary">{formatNaira(total)}</span>
              </div>
              <Button type="submit" size="lg" disabled={processing} className="w-full mt-6 gradient-accent text-accent-foreground font-semibold shadow-accent border-0 hover:opacity-90">
                {processing ? "Processing Payment..." : `Pay ${formatNaira(total)}`}
              </Button>
              {subtotal > 500000 && <p className="text-xs text-center text-muted-foreground mt-2">🎉 Free delivery on orders above ₦500,000</p>}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
