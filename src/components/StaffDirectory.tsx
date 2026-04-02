import { useEffect, useState } from "react";
import { Phone, Wrench, Shield, Award } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

const roleIcon = (role: string) => {
  if (role.toLowerCase().includes("ceo") || role.toLowerCase().includes("manager")) return Shield;
  if (role.toLowerCase().includes("instructor") || role.toLowerCase().includes("training")) return Award;
  return Wrench;
};

const StaffDirectory = () => {
  const [staff, setStaff] = useState<Tables<"staff_members">[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      const { data } = await supabase
        .from("staff_members")
        .select("*")
        .order("display_order", { ascending: true });
      if (data) setStaff(data);
      setLoading(false);
    };
    fetchStaff();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 rounded-lg bg-muted/50 animate-pulse" />
        ))}
      </div>
    );
  }

  if (staff.length === 0) return null;

  return (
    <section className="mt-16">
      <div className="text-center mb-8">
        <h2 className="font-heading text-xl font-bold text-foreground md:text-2xl mb-2">
          Our Installation Team
        </h2>
        <p className="text-muted-foreground text-sm max-w-lg mx-auto">
          We provide professional installation services when you purchase products.
          Our experienced team will be assigned to your project for on-site setup.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {staff.map((member) => {
          const Icon = roleIcon(member.role_title);
          return (
            <div
              key={member.id}
              className="rounded-lg border bg-card p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-heading text-sm font-semibold text-card-foreground truncate">
                    {member.name}
                  </h3>
                  <p className="text-xs font-medium text-secondary">{member.role_title}</p>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 shrink-0" />
                  <a href={`tel:${member.phone.replace(/\s/g, "")}`} className="hover:text-secondary transition-colors">
                    {member.phone}
                  </a>
                </div>
                <p>
                  <span className="font-medium text-foreground">Expertise:</span>{" "}
                  {member.experience_area}
                </p>
                {member.years_experience && member.years_experience > 0 && (
                  <p>
                    <span className="font-medium text-foreground">Experience:</span>{" "}
                    {member.years_experience} years
                  </p>
                )}
                {member.bio && (
                  <p className="mt-2 leading-relaxed">{member.bio}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-lg bg-primary/5 border border-primary/20 p-4 text-center">
        <p className="text-sm text-foreground font-medium">
          🔧 Installation services are included with product purchases.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          When you buy a product through our website, our team will be automatically assigned for professional on-site installation.
        </p>
      </div>
    </section>
  );
};

export default StaffDirectory;
