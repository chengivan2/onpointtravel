"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

interface Booking {
  id: string;
  trip_id: string;
  start_date: string;
  end_date: string;
  number_of_people: number;
  total_price: number;
  status: string;
  trip: {
    id: string;
    name: string;
    destination: string;
    description: string;
  } | null; // Allow trip to be null
}

export default function BookingsTable({ bookings }: { bookings: Booking[] }) {
  return (
    <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <thead>
        <tr>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
            Trip Name
          </th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
            Start Date
          </th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
            End Date
          </th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
            Status
          </th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking) => (
          <BookingRow key={booking.id} booking={booking} />
        ))}
      </tbody>
    </table>
  );
}

function BookingRow({ booking }: { booking: Booking }) {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <tr>
        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
          {booking.trip?.name || "Unknown Trip"}
        </td>
        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
          {booking.start_date}
        </td>
        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
          {booking.end_date}
        </td>
        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
          {booking.status}
        </td>
        <td className="px-6 py-4 text-sm">
          <Dialog>
            <DialogTrigger asChild>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                View Trip
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{booking.trip?.name || "Unknown Trip"}</DialogTitle>
                <DialogDescription>
                  {booking.trip?.description || "No description available."}
                </DialogDescription>
              </DialogHeader>
              <button
                onClick={() => alert("Booking trip again!")}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 mt-4"
              >
                Go Again
              </button>
            </DialogContent>
          </Dialog>
        </td>
      </tr>
    </>
  );
}