import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Package, ArrowLeft, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { formatNaira } from "@/hooks/useProducts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface OrderItem {
  id: string;
  product_name: string;
  product_price: number;
  quantity: number;
}

interface Order {
  id: string;
  customer_name: string;
  total: number;
  subtotal: number;
  delivery_fee: number;
  status: string;
  shipping_address: string;
  created_at: string;
  order_items: OrderItem[];
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  processing: "bg-blue-100 text-blue-800 border-blue-200",
  shipped: "bg-purple-100 text-purple-800 border-purple-200",
  delivered: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

const OrderHistory = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/login?redirectTo=/orders"); return; }

      const { data } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (data) setOrders(data as unknown as Order[]);
      setLoading(false);
    };
    load();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartCount={0} onCartOpen={() => {}} />

      <main className="container py-8 flex-1">
        <div className="flex items-center gap-3 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">Order History</h1>
            <p className="text-sm text-muted-foreground">View your past orders and their status</p>
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => <div key={i} className="h-32 bg-muted/50 rounded-lg animate-pulse" />)}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">You haven't placed any orders yet.</p>
            <Button onClick={() => navigate("/products")}>Browse Products</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="rounded-lg border bg-card p-5 shadow-card">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(order.created_at).toLocaleDateString("en-NG", {
                        year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
                      })}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Order #{order.id.slice(0, 8).toUpperCase()}
                    </p>
                  </div>
                  <Badge className={statusColors[order.status] || "bg-muted text-muted-foreground"}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>

                <div className="space-y-2 mb-4">
                  {order.order_items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-card-foreground">
                        {item.product_name} <span className="text-muted-foreground">× {item.quantity}</span>
                      </span>
                      <span className="font-medium text-secondary">{formatNaira(item.product_price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-3 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {order.shipping_address}
                  </span>
                  <span className="font-heading font-bold text-foreground">
                    {formatNaira(order.total)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default OrderHistory;
