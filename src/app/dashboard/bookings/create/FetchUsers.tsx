import { supabaseService } from "@/utils/supabase/srk";
import { toast } from "sonner";

export async function FetchUsers() {
  const { data, error } = await supabaseService.auth.admin.listUsers();

  if (error) {
    toast.error("Failed to fetch users. Please try again.");
    return [];
  }

  return data.users.map((user) => ({
    id: user.id,
    email: user.email || "",
    name: `${user.user_metadata?.first_name || ""} ${user.user_metadata?.last_name || ""}`.trim() || user.email || "",
  }));
}