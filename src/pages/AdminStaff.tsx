import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2, LogOut, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

type StaffMember = Tables<"staff_members">;

const emptyForm: TablesInsert<"staff_members"> = {
  name: "",
  phone: "",
  role_title: "",
  experience_area: "",
  years_experience: 0,
  bio: "",
  display_order: 0,
  is_active: true,
};

const AdminStaff = () => {
  const navigate = useNavigate();
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<TablesInsert<"staff_members">>(emptyForm);

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/login");
      return;
    }
    const { data } = await supabase.rpc("has_role", { _user_id: user.id, _role: "admin" });
    if (!data) {
      toast.error("Access denied. Admin privileges required.");
      navigate("/");
      return;
    }
    setIsAdmin(true);
    fetchStaff();
  };

  const fetchStaff = async () => {
    const { data } = await supabase
      .from("staff_members")
      .select("*")
      .order("display_order", { ascending: true });
    if (data) setStaff(data);
    setLoading(false);
  };

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (member: StaffMember) => {
    setEditingId(member.id);
    setForm({
      name: member.name,
      phone: member.phone,
      role_title: member.role_title,
      experience_area: member.experience_area,
      years_experience: member.years_experience ?? 0,
      bio: member.bio ?? "",
      display_order: member.display_order ?? 0,
      is_active: member.is_active ?? true,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.phone || !form.role_title || !form.experience_area) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (editingId) {
      const { error } = await supabase
        .from("staff_members")
        .update(form)
        .eq("id", editingId);
      if (error) {
        toast.error("Failed to update: " + error.message);
        return;
      }
      toast.success("Staff member updated");
    } else {
      const { error } = await supabase
        .from("staff_members")
        .insert(form);
      if (error) {
        toast.error("Failed to add: " + error.message);
        return;
      }
      toast.success("Staff member added");
    }
    setDialogOpen(false);
    fetchStaff();
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Remove ${name} from the team?`)) return;
    const { error } = await supabase.from("staff_members").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete: " + error.message);
      return;
    }
    toast.success("Staff member removed");
    fetchStaff();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Checking access...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-card/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-heading text-lg font-bold">Staff Management</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={openNew} size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" /> Add Staff
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => <div key={i} className="h-16 bg-muted/50 rounded-lg animate-pulse" />)}
          </div>
        ) : staff.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">No staff members yet.</p>
            <Button onClick={openNew}>Add your first staff member</Button>
          </div>
        ) : (
          <div className="space-y-3">
            {staff.map((member) => (
              <div
                key={member.id}
                className={`flex items-center justify-between rounded-lg border p-4 ${!member.is_active ? "opacity-50" : ""}`}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-sm text-card-foreground">{member.name}</h3>
                    {!member.is_active && (
                      <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded">Inactive</span>
                    )}
                  </div>
                  <p className="text-xs text-secondary">{member.role_title}</p>
                  <p className="text-xs text-muted-foreground">{member.experience_area} · {member.years_experience} yrs</p>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(member)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(member.id, member.name)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Staff Member" : "Add Staff Member"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Full Name *</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Ibrahim Suleiman" />
            </div>
            <div className="space-y-2">
              <Label>Phone Number *</Label>
              <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+234..." />
            </div>
            <div className="space-y-2">
              <Label>Role / Title *</Label>
              <Select value={form.role_title} onValueChange={(v) => setForm({ ...form, role_title: v })}>
                <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="CEO / Founder">CEO / Founder</SelectItem>
                  <SelectItem value="Operations Manager">Operations Manager</SelectItem>
                  <SelectItem value="Lead Solar Engineer">Lead Solar Engineer</SelectItem>
                  <SelectItem value="Senior CCTV Engineer">Senior CCTV Engineer</SelectItem>
                  <SelectItem value="Electrical Engineer">Electrical Engineer</SelectItem>
                  <SelectItem value="Installation Technician">Installation Technician</SelectItem>
                  <SelectItem value="CCTV Installer">CCTV Installer</SelectItem>
                  <SelectItem value="Field Instructor">Field Instructor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Experience Area *</Label>
              <Input value={form.experience_area} onChange={(e) => setForm({ ...form, experience_area: e.target.value })} placeholder="e.g. Solar Panel & Inverter Installation" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Years Experience</Label>
                <Input type="number" value={form.years_experience ?? 0} onChange={(e) => setForm({ ...form, years_experience: parseInt(e.target.value) || 0 })} />
              </div>
              <div className="space-y-2">
                <Label>Display Order</Label>
                <Input type="number" value={form.display_order ?? 0} onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Bio</Label>
              <Textarea value={form.bio ?? ""} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="Brief description..." rows={3} />
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={form.is_active ?? true} onCheckedChange={(v) => setForm({ ...form, is_active: v })} />
              <Label>Active</Label>
            </div>
            <Button onClick={handleSave} className="w-full">
              {editingId ? "Save Changes" : "Add Staff Member"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminStaff;
