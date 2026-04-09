import { createClient } from "npm:@supabase/supabase-js@2";

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

Deno.serve(async (req) => {
  try {
    const { data: user, error } = await supabaseAdmin.auth.admin.createUser({
      email: "admin@premiumsolar.com",
      password: "Admin@123456",
      email_confirm: true,
    });

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });

    // Assign admin role
    await supabaseAdmin.from("user_roles").insert({
      user_id: user.user.id,
      role: "admin",
    });

    return new Response(JSON.stringify({ success: true, userId: user.user.id }));
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
});
