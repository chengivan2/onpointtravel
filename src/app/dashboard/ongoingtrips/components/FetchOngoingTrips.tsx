import { supabaseService } from "@/utils/supabase/srk";

interface Booking {
  id: string;
  start_date: string;
  end_date: string;
  status: string;
  trips: { name: string; main_featured_image_url: string };
  users: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

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
    .eq("status", "ongoing")
    .returns <Booking[]>();

  if (error) {
    console.error("Error fetching ongoing trips:", error.message);
    return [];
  }

  return (
    data?.map((trip) => ({
      id: trip.id,
      trip_name: trip.trips?.name || "N/A",
      start_date: trip.start_date,
      end_date: trip.end_date,
      status: trip.status,
      booked_by:
        trip.users?.first_name && trip.users?.last_name
          ? `${trip.users.first_name} ${trip.users.last_name}`
          : trip.users?.email || "N/A",
      featured_image: trip.trips?.main_featured_image_url || "N/A",
    })) || []
  );
}
