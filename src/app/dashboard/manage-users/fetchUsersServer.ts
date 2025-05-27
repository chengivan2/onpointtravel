import { supabaseService } from "@/utils/supabase/srk";

export async function fetchUsersServer() {
  // Use the service role to fetch all users with metadata
  const { data, error } = await supabaseService.from("users").select("id, email, role, created_at, first_name, last_name");
  if (error) {
    return { error: error.message, users: [] };
  }
  return {
    users: (data || []).map((u) => ({
      id: u.id,
      email: u.email,
      role: u.role,
      created_at: u.created_at,
      name: `${u.first_name || ''} ${u.last_name || ''}`.trim() || u.email,
    })),
    error: null,
  };
}
