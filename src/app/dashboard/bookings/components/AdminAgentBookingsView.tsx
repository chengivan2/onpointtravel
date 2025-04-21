"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminAgentBookingsView({ initialBookings }: { initialBookings: any[] }) {
  const [bookings, setBookings] = useState(initialBookings);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1); // Start from page 1 since initialBookings is page 0
  const LIMIT = 15; // Number of bookings to load per page

  const loadMoreBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/bookings?page=${page}&limit=${LIMIT}`);
      const newBookings = await res.json();

      if (newBookings.length < LIMIT) {
        setHasMore(false); // No more bookings to load
      }

      setBookings((prev) => [...prev, ...newBookings]); // Append new bookings to the existing list
      setPage((prev) => prev + 1); // Increment the page number
    } catch (err) {
      console.error("Error loading more bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Add Booking Button */}
      <div className="flex justify-end mb-6">
        <Link href="/dashboard/bookings/create">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg">
            Add Booking
          </button>
        </Link>
      </div>

      {/* Bookings Table */}
      <div className="overflow-x-auto bg-white/30 dark:bg-green-900/30 rounded-lg shadow-lg">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Trip Name</th>
              <th className="px-4 py-2 text-left">Client</th>
              <th className="px-4 py-2 text-left">People</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Payment Status</th>
              <th className="px-4 py-2 text-left">Created At</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-t border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2">{booking.trip_name}</td>
                <td className="px-4 py-2">{booking.client}</td>
                <td className="px-4 py-2">{booking.people}</td>
                <td className="px-4 py-2 capitalize">{booking.status}</td>
                <td className="px-4 py-2 capitalize">{booking.payment_status}</td>
                <td className="px-4 py-2">{new Date(booking.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMoreBookings}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}