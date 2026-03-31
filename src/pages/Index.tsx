import { useState, useCallback } from "react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoryFilter from "@/components/CategoryFilter";
import ProductCard from "@/components/ProductCard";
import CartSheet, { type CartItem } from "@/components/CartSheet";
import Footer from "@/components/Footer";
import { products, type Category, type Product } from "@/data/products";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const filtered = activeCategory === "All"
    ? products
    : products.filter((p) => p.category === activeCategory);

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success(`${product.name} added to cart`);
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      <HeroSection />

      <section id="products" className="container py-16">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
              Our Products
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Browse our range of premium solar, inverter and CCTV products
            </p>
          </div>
          <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product, i) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms`, opacity: 0 }}
            >
              <ProductCard product={product} onAddToCart={addToCart} />
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="bg-muted/50">
        <div className="container py-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl mb-4">
              About Premium Solar
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">PREMIUM SOLAR</span> is a green energy company dedicated to the sales and professional installation of solar panels, inverters, batteries, and CCTV security systems. We are committed to providing affordable, reliable, and sustainable energy and security solutions across Nigeria.
            </p>
          </div>
          <h3 className="font-heading text-xl font-bold text-foreground text-center mb-6">Why Choose Us?</h3>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { title: "Quality Guaranteed", desc: "All products come with manufacturer warranty and our satisfaction guarantee." },
              { title: "Expert Installation", desc: "Our certified engineers handle professional installation of solar, inverter, and CCTV systems across Nigeria." },
              { title: "24/7 Support", desc: "Round-the-clock customer support and after-sales service." },
            ].map((item) => (
              <div key={item.title} className="rounded-lg bg-card p-6 shadow-card">
                <h4 className="font-heading text-lg font-semibold text-card-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <CartSheet
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
      />
    </div>
  );
};

export default Index;
