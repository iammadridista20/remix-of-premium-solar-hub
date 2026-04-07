import { useState, useCallback, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Shield, Truck, Headphones } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import CartSheet, { type CartItem } from "@/components/CartSheet";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import { products, formatNaira, type Product } from "@/data/products";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const addToCart = useCallback((p: Product) => {
    if (!user) {
      toast.error("Please sign in to add items to cart");
      navigate(`/login?redirectTo=/product/${id}`);
      return;
    }
    setCart((prev) => {
      const existing = prev.find((i) => i.id === p.id);
      if (existing) return prev.map((i) => i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...p, quantity: 1 }];
    });
    toast.success(`${p.name} added to cart`);
  }, [user, navigate, id]);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + delta } : i)).filter((i) => i.quantity > 0));
  }, []);

  const removeItem = useCallback((id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar cartCount={0} onCartOpen={() => {}} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
            <Link to="/products"><Button>Back to Products</Button></Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />

      <section className="container py-8">
        <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Link>

        <div className="grid gap-10 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            {product.badge && (
              <Badge className="absolute left-4 top-4 gradient-accent border-0 text-accent-foreground font-semibold">{product.badge}</Badge>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{product.category}</span>
            <h1 className="font-heading text-2xl font-bold text-foreground md:text-3xl">{product.name}</h1>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            <span className="font-heading text-3xl font-bold text-secondary">{formatNaira(product.price)}</span>

            <Button size="lg" className="gap-2 mt-2 w-full sm:w-auto" onClick={() => addToCart(product)}>
              <ShoppingCart className="h-5 w-5" /> Add to Cart
            </Button>

            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
              {[
                { icon: Shield, label: "Warranty Guaranteed" },
                { icon: Truck, label: "Nationwide Delivery" },
                { icon: Headphones, label: "24/7 Support" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-1 text-center">
                  <item.icon className="h-5 w-5 text-secondary" />
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container py-12">
          <h2 className="font-heading text-xl font-bold text-foreground mb-6">Related Products</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <Link key={p.id} to={`/product/${p.id}`}>
                <ProductCard product={p} showPrice={true} />
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
      <WhatsAppButton />
      <CartSheet open={cartOpen} onClose={() => setCartOpen(false)} items={cart} onUpdateQuantity={updateQuantity} onRemove={removeItem} />
    </div>
  );
};

export default ProductDetail;
