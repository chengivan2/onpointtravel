import { supabaseService } from "@/utils/supabase/srk";

interface Booking {
  id: string;
  number_of_people: number;
  status: string;
  payment_status: string;
  booked_at: string;
  trips: {
    name: string;
  };
  users: {
    first_name: string | null;
    last_name: string | null;
    email: string;
  };
  start_date: string;
  end_date: string;
  total_price: number;
}

export async function FetchBookings(page: number, limit: number) {
  const { data, error } = await supabaseService
    .from("bookings")
    .select(
      `
      id,
      number_of_people,
      status,
      payment_status,
      booked_at,
      trips (name),
      users (first_name, last_name, email),
      start_date,
      end_date,
      total_price
      `
    )
    .order("booked_at", { ascending: false })
    .range(page * limit, page * limit + limit - 1)
    .returns<Booking[]>();

  if (error) {
    // Do not use toast in server components. Return a special error result for the UI to handle.
    return { error: "Failed to fetch bookings. Please try again.", data: [] };
  }

  return {
    data:
      data?.map((booking) => ({
        id: booking.id,
        trip_name: booking.trips?.name || "N/A",
        client:
          booking.users?.first_name && booking.users?.last_name
            ? `${booking.users.first_name} ${booking.users.last_name}`
            : booking.users?.email || "N/A",
        number_of_people: booking.number_of_people,
        status: booking.status,
        payment_status: booking.payment_status,
        created_at: booking.booked_at,
        start_date: booking.start_date,
        end_date: booking.end_date,
        total_price: booking.total_price,
      })) || [],
    error: null,
  };
}
