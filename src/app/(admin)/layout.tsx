import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  // If no user is logged in, or the email is NOT the admin email, deny access
  if (!session || session.user.email !== "shivarajsing13@gmail.com") {
    redirect("/login");
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <main className="flex-1">{children}</main>
    </div>
  );
}
