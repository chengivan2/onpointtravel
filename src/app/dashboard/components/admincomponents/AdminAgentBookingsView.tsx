"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function AdminAgentBookingsView({ initialBookings, showAll = true }: { initialBookings: any[]; showAll?: boolean }) {
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
      toast.error("Failed to load more bookings. Please try again.");
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
      toast.error("Failed to update booking status. Please try again.");
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
      toast.error("Failed to update payment status. Please try again.");
    }
  };

  // Add state for search/filter
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Filter bookings based on search and status
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.trip_name.toLowerCase().includes(search.toLowerCase()) ||
      b.client.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? b.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by trip or client..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-lg border border-green-200 bg-white/60 dark:bg-green-900/30 text-green-900 dark:text-green-100 shadow"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border border-green-200 bg-white/60 dark:bg-green-900/30 text-green-900 dark:text-green-100 shadow"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="ongoing">Ongoing</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
          <option value="refunded">Refunded</option>
          <option value="on_hold">On Hold</option>
        </select>
      </div>
      <div className="relative rounded-2xl shadow-xl bg-white/40 dark:bg-green-900/30 backdrop-blur-md border border-green-100/30 dark:border-green-900/30 overflow-x-auto">
        <svg className="absolute -top-10 -right-10 w-64 h-64 opacity-10 text-green-300" fill="none" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="100" fill="currentColor" />
        </svg>
        <svg className="absolute bottom-0 left-0 w-40 h-40 opacity-10 text-green-200" fill="none" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="80" fill="currentColor" />
        </svg>
        <table className="min-w-full bg-transparent">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Trip Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Client</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">People</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Payment Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Created At</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-green-50/30 dark:hover:bg-green-900/40 transition-colors">
                <td className="px-6 py-4 text-sm text-green-900 dark:text-green-100 font-semibold">{booking.trip_name}</td>
                <td className="px-6 py-4 text-sm text-green-900 dark:text-green-100">{booking.client}</td>
                <td className="px-6 py-4 text-sm text-green-900 dark:text-green-100">{booking.people}</td>
                <td className="px-6 py-4 text-sm text-green-900 dark:text-green-100">
                  <select
                    value={booking.status}
                    onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                    className="w-full px-2 py-1 border rounded bg-white/30 dark:bg-green-900/30 text-green-800 dark:text-green-100 shadow-md"
                  >
                    <option value="pending" className="bg-yellow-100 text-yellow-800 rounded-full px-2 py-1">
                      Pending
                    </option>
                    <option value="confirmed" className="bg-green-100 text-green-800 rounded-full px-2 py-1">
                      Confirmed
                    </option>
                    <option value="ongoing" className="bg-blue-100 text-blue-800 rounded-full px-2 py-1">
                      Ongoing
                    </option>
                    <option value="cancelled" className="bg-red-100 text-red-800 rounded-full px-2 py-1">
                      Cancelled
                    </option>
                    <option value="completed" className="bg-purple-100 text-purple-800 rounded-full px-2 py-1">
                      Completed
                    </option>
                    <option value="refunded" className="bg-pink-100 text-pink-800 rounded-full px-2 py-1">
                      Refunded
                    </option>
                    <option value="on_hold" className="bg-gray-100 text-gray-800 rounded-full px-2 py-1">
                      On Hold
                    </option>
                  </select>
                </td>
                <td className="px-6 py-4 text-sm text-green-900 dark:text-green-100">
                  <select
                    value={booking.payment_status}
                    onChange={(e) => handlePaymentStatusChange(booking.id, e.target.value)}
                    className="w-full px-2 py-1 border rounded bg-white/30 dark:bg-green-900/30 text-green-800 dark:text-green-100 shadow-md"
                  >
                    <option value="unpaid" className="bg-red-100 text-red-800 rounded-full px-2 py-1">
                      Unpaid
                    </option>
                    <option value="partially_paid" className="bg-yellow-100 text-yellow-800 rounded-full px-2 py-1">
                      Partially Paid
                    </option>
                    <option value="paid" className="bg-green-100 text-green-800 rounded-full px-2 py-1">
                      Paid
                    </option>
                    <option value="refund_pending" className="bg-orange-100 text-orange-800 rounded-full px-2 py-1">
                      Refund Pending
                    </option>
                    <option value="refunded" className="bg-blue-100 text-blue-800 rounded-full px-2 py-1">
                      Refunded
                    </option>
                    <option value="failed" className="bg-gray-100 text-gray-800 rounded-full px-2 py-1">
                      Failed
                    </option>
                  </select>
                </td>
                <td className="px-6 py-4 text-sm text-green-900 dark:text-green-100">
                  {new Date(booking.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}