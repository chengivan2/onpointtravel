import { supabaseService } from "@/utils/supabase/srk";

export async function FetchOngoingTrips(userId: string) {
  const { data, error } = await supabaseService
    .from("bookings")
    .select(
      `
      id,
      start_date,
      end_date,
      trips (
        name,
        featured_image
      )
      `
    )
    .eq("user_id", userId)
    .eq("status", "ongoing");

  if (error) {
    console.error("Error fetching ongoing trips:", error.message);
    return null;
  }

  return data?.[0] || null; // Return the first ongoing trip or null
}