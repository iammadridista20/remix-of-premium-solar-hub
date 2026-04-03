import { ShoppingCart, Sun, Menu, X, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface NavbarProps {
  cartCount: number;
  onCartOpen: () => void;
}

const Navbar = ({ cartCount, onCartOpen }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.rpc("has_role", { _user_id: user.id, _role: "admin" });
        setIsAdmin(!!data);
      }
    };
    checkAdmin();
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/book-installation", label: "Book Installation" },
    { to: "/contact", label: "Contact" },
    { to: "/login", label: "Login" },
  ];

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
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link to="/admin/staff" className="text-sm font-medium text-primary transition-colors hover:text-primary/80 flex items-center gap-1">
              <Settings className="h-3.5 w-3.5" /> Admin
            </Link>
          )}
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
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-muted-foreground hover:text-foreground">
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link to="/admin/staff" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-primary hover:text-primary/80">
              ⚙️ Admin Panel
            </Link>
          )}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
