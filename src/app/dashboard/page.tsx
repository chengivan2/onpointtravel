import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function OnPointDashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login?next=/dashboard");
  }

  return <div>onPoint user dashboard</div>;
}
