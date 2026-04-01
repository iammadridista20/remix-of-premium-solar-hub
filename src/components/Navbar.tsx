import { ShoppingCart, Sun, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  cartCount: number;
  onCartOpen: () => void;
}

const Navbar = ({ cartCount, onCartOpen }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Sun className="h-7 w-7 text-secondary" />
          <span className="font-heading text-lg font-bold text-foreground leading-tight">
            Premium Solar
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Home</Link>
          <Link to="/products" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Products</Link>
          <a href="/#about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">About</a>
          <Link to="/contact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Contact</Link>
          <Link to="/login" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Login</Link>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onCartOpen}
            className="relative rounded-full p-2 text-muted-foreground hover:bg-muted transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full gradient-accent text-[10px] font-bold text-accent-foreground">
                {cartCount}
              </span>
            )}
          </button>
          <button
            className="md:hidden rounded-full p-2 text-muted-foreground hover:bg-muted"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden border-t bg-card p-4 space-y-3">
          <Link to="/" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-muted-foreground hover:text-foreground">Home</Link>
          <Link to="/products" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-muted-foreground hover:text-foreground">Products</Link>
          <a href="/#about" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-muted-foreground hover:text-foreground">About</a>
          <a href="/#contact" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-muted-foreground hover:text-foreground">Contact</a>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
