import { supabaseService } from "@/utils/supabase/srk";

interface Booking {
  id: string;
  trip_id: string;
  number_of_people: number;
  status: string;
  payment_status: string;
  trip_name: {
    name: string;
  };
  user: {
    first_name: string | null;
    last_name: string | null;
    email: string;
  };
}

export async function FetchBookings() {
  const { data, error } = await supabaseService
    .from("bookings")
    .select(
      `
      id,
      trip_id,
      number_of_people,
      status,
      payment_status,
      trip_name:trips(name),
      user:users(first_name, last_name, email)
      `
    )
    .limit(10)
    .returns<Booking[]>();

  if (error) {
    console.error("Error fetching bookings:", error.message);
    return [];
  }

  return (
    data?.map((booking) => ({
      id: booking.id,
      trip_name: booking.trip_name?.name || "N/A",
      people: booking.number_of_people,
      status: booking.status,
      payment_status: booking.payment_status,
      booked_by:
        booking.user?.first_name && booking.user?.last_name
          ? `${booking.user.first_name} ${booking.user.last_name}`
          : booking.user?.email || "N/A", // Fallback to email or "N/A"
    })) || []
  );
}
