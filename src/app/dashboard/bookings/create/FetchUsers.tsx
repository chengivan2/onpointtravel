import { supabaseService } from "@/utils/supabase/srk";

export async function FetchUsers() {
  const { data, error } = await supabaseService.auth.admin.listUsers();

  if (error) {
    // Do not use toast in server components. Return error for UI to handle.
    return { error: "Failed to fetch users. Please try again.", users: [] };
  }

  return {
    users: data.users.map((user) => ({
      id: user.id,
      email: user.email || "",
      name: `${user.user_metadata?.first_name || ""} ${user.user_metadata?.last_name || ""}`.trim() || user.email || "",
    })),
    error: null,
  };
}