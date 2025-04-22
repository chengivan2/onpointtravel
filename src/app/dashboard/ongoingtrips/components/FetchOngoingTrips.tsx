import { supabaseService } from "@/utils/supabase/srk";

export async function FetchOngoingTrips() {
  const { data, error } = await supabaseService
    .from("bookings")
    .select(
      `
      id,
      start_date,
      end_date,
      status,
      trips (
        name,
        main_featured_image_url
      ),
      users (
        first_name,
        last_name,
        email
      )
      `
    )
    .eq("status", "ongoing");

  if (error) {
    console.error("Error fetching ongoing trips:", error.message);
    return [];
  }

  return (
    data?.map((trip) => ({
      id: trip.id,
      trip_name: trip.trips?.[0]?.name || "N/A",
      start_date: trip.start_date,
      end_date: trip.end_date,
      status: trip.status,
      booked_by:
        trip.users?.[0]?.first_name && trip.users?.[0]?.last_name
          ? `${trip.users[0].first_name} ${trip.users[0].last_name}`
          : trip.users?.[0]?.email || "N/A",
      featured_image: trip.trips?.[0]?.main_featured_image_url || "N/A",
    })) || []
  );
}
