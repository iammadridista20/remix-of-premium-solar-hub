import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sun, KeyRound, Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setSent(true);
    toast.success("Password reset link sent to your email");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <Sun className="h-8 w-8 text-secondary" />
            <span className="font-heading text-xl font-bold text-foreground">Premium Solar</span>
          </Link>
          <h1 className="font-heading text-2xl font-bold text-foreground">Forgot Password</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Enter your email and we'll send you a reset link
          </p>
        </div>

        {sent ? (
          <div className="rounded-lg bg-card p-6 shadow-card text-center space-y-4">
            <KeyRound className="h-12 w-12 text-secondary mx-auto" />
            <p className="text-card-foreground font-medium">Check your email</p>
            <p className="text-sm text-muted-foreground">
              We've sent a password reset link to <strong>{email}</strong>. Click the link in the email to reset your password.
            </p>
            <Button variant="outline" onClick={() => setSent(false)} className="w-full">Send another link</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 rounded-lg bg-card p-6 shadow-card">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
            <Button type="submit" className="w-full gap-2" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />} Send Reset Link
            </Button>
          </form>
        )}

        <p className="text-center">
          <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground flex items-center justify-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
