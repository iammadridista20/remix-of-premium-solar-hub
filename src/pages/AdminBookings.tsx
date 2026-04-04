import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, LogOut, Bell, CheckCircle, Clock, XCircle, Calendar } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Booking = Tables<"installation_bookings">;

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
  confirmed: "bg-blue-100 text-blue-800 border-blue-300",
  completed: "bg-green-100 text-green-800 border-green-300",
  cancelled: "bg-red-100 text-red-800 border-red-300",
};

const AdminBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [newCount, setNewCount] = useState(0);

  useEffect(() => {
    checkAdmin();
  }, []);

  useEffect(() => {
    if (!isAdmin) return;

    const channel = supabase
      .channel("bookings-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "installation_bookings" },
        (payload) => {
          const newBooking = payload.new as Booking;
          setBookings((prev) => [newBooking, ...prev]);
          setNewCount((c) => c + 1);
          toast.info(`New booking from ${newBooking.customer_name}!`, {
            description: newBooking.service_type,
            icon: <Bell className="h-4 w-4" />,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAdmin]);

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { navigate("/login"); return; }
    const { data } = await supabase.rpc("has_role", { _user_id: user.id, _role: "admin" });
    if (!data) { toast.error("Access denied."); navigate("/"); return; }
    setIsAdmin(true);
    fetchBookings();
  };

  const fetchBookings = async () => {
    const { data } = await supabase
      .from("installation_bookings")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) {
      setBookings(data);
      setNewCount(data.filter((b) => b.status === "pending").length);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("installation_bookings")
      .update({ status })
      .eq("id", id);
    if (error) { toast.error("Failed to update status"); return; }
    toast.success(`Booking ${status}`);
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (isAdmin === null) {
    return <div className="min-h-screen flex items-center justify-center"><p className="text-muted-foreground">Checking access...</p></div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-card/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-heading text-lg font-bold">Bookings Dashboard</h1>
            {newCount > 0 && (
              <Badge variant="destructive" className="gap-1">
                <Bell className="h-3 w-3" /> {newCount} new
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="container py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total", count: bookings.length, icon: Calendar, color: "text-foreground" },
            { label: "Pending", count: bookings.filter((b) => b.status === "pending").length, icon: Clock, color: "text-yellow-600" },
            { label: "Confirmed", count: bookings.filter((b) => b.status === "confirmed").length, icon: CheckCircle, color: "text-blue-600" },
            { label: "Completed", count: bookings.filter((b) => b.status === "completed").length, icon: CheckCircle, color: "text-green-600" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg border bg-card p-4">
              <div className="flex items-center gap-2 mb-1">
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.count}</p>
            </div>
          ))}
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => <div key={i} className="h-24 bg-muted/50 rounded-lg animate-pulse" />)}
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No bookings yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.map((booking) => (
              <div key={booking.id} className="rounded-lg border bg-card p-4 md:p-5">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-medium text-card-foreground">{booking.customer_name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColors[booking.status] || statusColors.pending}`}>
                        {booking.status}
                      </span>
                    </div>
                    <p className="text-sm text-secondary font-medium">{booking.service_type}</p>
                    <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
                      <p>📧 {booking.email} · 📞 {booking.phone}</p>
                      <p>📍 {booking.address}</p>
                      {booking.preferred_date && <p>📅 Preferred: {new Date(booking.preferred_date).toLocaleDateString()}</p>}
                      {booking.message && <p>💬 {booking.message}</p>}
                      <p className="text-muted-foreground/60">Submitted: {new Date(booking.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={booking.status} onValueChange={(v) => updateStatus(booking.id, v)}>
                      <SelectTrigger className="w-[130px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminBookings;
