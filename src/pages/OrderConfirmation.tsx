import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatNaira } from "@/hooks/useProducts";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { total, form } = location.state || {};

  if (!total) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full rounded-lg border bg-card p-8 shadow-card text-center space-y-5">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
        <h1 className="font-heading text-2xl font-bold text-card-foreground">Order Confirmed!</h1>
        <p className="text-muted-foreground text-sm">
          Thank you, {form?.firstName}! Your order of <span className="font-semibold text-secondary">{formatNaira(total)}</span> has been placed successfully.
        </p>
        <p className="text-muted-foreground text-xs">A confirmation email has been sent to {form?.email}</p>
        <Button onClick={() => navigate("/")} className="gradient-accent text-accent-foreground font-semibold shadow-accent border-0 hover:opacity-90">
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
