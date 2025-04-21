import { supabaseService } from "@/utils/supabase/srk";

export async function FetchUsers() {
  const { data, error } = await supabaseService.auth.admin.listUsers();

  if (error) {
    console.error("Error fetching users:", error.message);
    return [];
  }

  return data.users.map((user) => ({
    id: user.id,
    email: user.email || "",
    name: `${user.user_metadata?.first_name || ""} ${user.user_metadata?.last_name || ""}`.trim() || user.email || "",
  }));
}