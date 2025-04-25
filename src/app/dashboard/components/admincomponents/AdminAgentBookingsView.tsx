"use client";

import { useState } from "react";

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

  const handleStatusChange = async (id: string, value: string) => {
    try {
      const res = await fetch(`/api/bookings/update-status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: value }),
      });

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: value } : b))
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handlePaymentStatusChange = async (id: string, value: string) => {
    try {
      const res = await fetch(`/api/bookings/update-payment-status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, payment_status: value }),
      });

      if (!res.ok) {
        throw new Error("Failed to update payment status");
      }

      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, payment_status: value } : b))
      );
    } catch (err) {
      console.error("Error updating payment status:", err);
    }
  };

  return (
    <div>

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
                <td className="px-4 py-2">
                  <select
                    value={booking.status}
                    onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                    className="w-full px-2 py-1 border rounded bg-white/30 dark:bg-green-900/30 text-green-800 dark:text-green-100 shadow-md"
                  >
                    <option
                      value="pending"
                      className="bg-yellow-100 text-yellow-800 rounded-full px-2 py-1"
                    >
                      Pending
                    </option>
                    <option
                      value="confirmed"
                      className="bg-green-100 text-green-800 rounded-full px-2 py-1"
                    >
                      Confirmed
                    </option>
                    <option
                      value="ongoing"
                      className="bg-blue-100 text-blue-800 rounded-full px-2 py-1"
                    >
                      Ongoing
                    </option>
                    <option
                      value="cancelled"
                      className="bg-red-100 text-red-800 rounded-full px-2 py-1"
                    >
                      Cancelled
                    </option>
                    <option
                      value="completed"
                      className="bg-purple-100 text-purple-800 rounded-full px-2 py-1"
                    >
                      Completed
                    </option>
                    <option
                      value="refunded"
                      className="bg-pink-100 text-pink-800 rounded-full px-2 py-1"
                    >
                      Refunded
                    </option>
                    <option
                      value="on_hold"
                      className="bg-gray-100 text-gray-800 rounded-full px-2 py-1"
                    >
                      On Hold
                    </option>
                  </select>
                </td>
                <td className="px-4 py-2">
                  <select
                    value={booking.payment_status}
                    onChange={(e) =>
                      handlePaymentStatusChange(booking.id, e.target.value)
                    }
                    className="w-full px-2 py-1 border rounded bg-white/30 dark:bg-green-900/30 text-green-800 dark:text-green-100 shadow-md"
                  >
                    <option
                      value="unpaid"
                      className="bg-red-100 text-red-800 rounded-full px-2 py-1"
                    >
                      Unpaid
                    </option>
                    <option
                      value="partially_paid"
                      className="bg-yellow-100 text-yellow-800 rounded-full px-2 py-1"
                    >
                      Partially Paid
                    </option>
                    <option
                      value="paid"
                      className="bg-green-100 text-green-800 rounded-full px-2 py-1"
                    >
                      Paid
                    </option>
                    <option
                      value="refund_pending"
                      className="bg-orange-100 text-orange-800 rounded-full px-2 py-1"
                    >
                      Refund Pending
                    </option>
                    <option
                      value="refunded"
                      className="bg-blue-100 text-blue-800 rounded-full px-2 py-1"
                    >
                      Refunded
                    </option>
                    <option
                      value="failed"
                      className="bg-gray-100 text-gray-800 rounded-full px-2 py-1"
                    >
                      Failed
                    </option>
                  </select>
                </td>
                <td className="px-4 py-2">
                  {new Date(booking.created_at).toLocaleDateString()}
                </td>
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