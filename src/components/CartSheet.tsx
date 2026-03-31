import { Minus, Plus, Trash2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data/products";
import { formatNaira } from "@/data/products";

export interface CartItem extends Product {
  quantity: number;
}

interface CartSheetProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const CartSheet = ({ open, onClose, items, onUpdateQuantity, onRemove }: CartSheetProps) => {
  const navigate = useNavigate();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm" onClick={onClose} />
      )}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-card shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="font-heading text-lg font-bold text-card-foreground">Your Cart ({items.length})</h2>
          <button onClick={onClose} className="rounded-full p-1.5 text-muted-foreground hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">Your cart is empty</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3 rounded-lg bg-muted/50 p-3">
                <img src={item.image} alt={item.name} className="h-16 w-16 rounded-md object-cover" />
                <div className="flex flex-1 flex-col gap-1">
                  <h4 className="text-sm font-semibold text-card-foreground line-clamp-1">{item.name}</h4>
                  <span className="text-sm font-bold text-secondary">{formatNaira(item.price)}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="rounded bg-muted p-1 text-muted-foreground hover:bg-border"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="rounded bg-muted p-1 text-muted-foreground hover:bg-border"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="ml-auto rounded p-1 text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-4 space-y-3">
            <div className="flex justify-between text-base font-heading font-bold text-card-foreground">
              <span>Total</span>
              <span className="text-secondary">{formatNaira(total)}</span>
            </div>
            <Button
              className="w-full gradient-accent text-accent-foreground font-semibold shadow-accent border-0 hover:opacity-90"
              size="lg"
              onClick={() => {
                onClose();
                navigate("/checkout", { state: { items } });
              }}
            >
              Checkout
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSheet;
