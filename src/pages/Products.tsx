import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import CategoryFilter from "@/components/CategoryFilter";
import ProductCard from "@/components/ProductCard";
import CartSheet, { type CartItem } from "@/components/CartSheet";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { products, type Category, type Product } from "@/data/products";

const Products = () => {
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

      <section className="container py-16">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
              Our Products
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Browse and shop our full range of products with prices
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
              <Link to={`/product/${product.id}`}>
                <ProductCard product={product} onAddToCart={addToCart} showPrice={true} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
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

export default Products;
