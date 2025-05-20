"use client";
import BookingsTable from "../../mybookings/components/BookingsTable";
import type { FC } from "react";

// Redefine Booking type here since it's not exported from BookingsTable
interface Booking {
  id: string;
  trip_id: string;
  start_date: string;
  end_date: string;
  number_of_people: number;
  total_price: number;
  status: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  trip: {
    id: string;
    name: string;
    destination_id: string;
    description: string;
  } | null;
}

interface UserDashboardBookingsTableProps {
  bookings: Booking[];
}

const UserDashboardBookingsTable: FC<UserDashboardBookingsTableProps> = ({ bookings }) => {
  // Filter out bookings with missing or invalid trip names
  const filteredBookings = bookings.filter(
    (b) => b.trip && typeof b.trip.name === "string" && b.trip.name.trim() !== "" && b.trip.name !== "Unknown Trip"
  );
  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-2">Your Recent Bookings</h3>
      <BookingsTable bookings={filteredBookings} />
    </div>
  );
};

export default UserDashboardBookingsTable;
