"use client";

import { useState } from "react";

export default function AdminAgentBookingsView({ initialBookings, showAll = true }: { initialBookings: any[]; showAll?: boolean }) {
  const [bookings, setBookings] = useState(initialBookings);
  // Remove paging logic

  // Add state for search/filter
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  // Add state for expanded rows
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  // Filter bookings based on search and status
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.trip_name.toLowerCase().includes(search.toLowerCase()) ||
      b.client.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? b.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  // Toggle row expansion
  const toggleRow = (id: string) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  // Status and payment status change handlers (unchanged)
  const handleStatusChange = async (id: string, value: string) => {
    try {
      const res = await fetch(`/api/bookings/update-status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: value }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: value } : b)));
    } catch (err) {
      // Show error in UI (could add error state if needed)
    }
  };
  const handlePaymentStatusChange = async (id: string, value: string) => {
    try {
      const res = await fetch(`/api/bookings/update-payment-status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, payment_status: value }),
      });
      if (!res.ok) throw new Error("Failed to update payment status");
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, payment_status: value } : b)));
    } catch (err) {
      // Show error in UI (could add error state if needed)
    }
  };

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
        {/* SVG backgrounds with pointer-events-none and z-index */}
        <svg className="absolute -top-10 -right-10 w-64 h-64 opacity-10 text-green-300 pointer-events-none z-0" fill="none" viewBox="0 0 200 200" style={{zIndex:0}}>
          <circle cx="100" cy="100" r="100" fill="currentColor" />
        </svg>
        <svg className="absolute bottom-0 left-0 w-40 h-40 opacity-10 text-green-200 pointer-events-none z-0" fill="none" viewBox="0 0 160 160" style={{zIndex:0}}>
          <circle cx="80" cy="80" r="80" fill="currentColor" />
        </svg>
        <div className="relative z-10">
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
                <>
                  <tr
                    key={booking.id}
                    className="hover:bg-green-50/30 dark:hover:bg-green-900/40 transition-colors cursor-pointer"
                    onClick={() => toggleRow(booking.id)}
                  >
                    <td className="px-6 py-4 text-sm text-green-900 dark:text-green-100 font-semibold">{booking.trip_name}</td>
                    <td className="px-6 py-4 text-sm text-green-900 dark:text-green-100">{booking.client}</td>
                    <td className="px-6 py-4 text-sm text-green-900 dark:text-green-100">{booking.number_of_people}</td>
                    <td className="px-6 py-4 text-sm text-green-900 dark:text-green-100">
                      <select
                        value={booking.status}
                        onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                        className="w-full px-2 py-1 border rounded bg-white/30 dark:bg-green-900/30 text-green-800 dark:text-green-100 shadow-md"
                        onClick={e => e.stopPropagation()}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="completed">Completed</option>
                        <option value="refunded">Refunded</option>
                        <option value="on_hold">On Hold</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm text-green-900 dark:text-green-100">
                      <select
                        value={booking.payment_status}
                        onChange={(e) => handlePaymentStatusChange(booking.id, e.target.value)}
                        className="w-full px-2 py-1 border rounded bg-white/30 dark:bg-green-900/30 text-green-800 dark:text-green-100 shadow-md"
                        onClick={e => e.stopPropagation()}
                      >
                        <option value="unpaid">Unpaid</option>
                        <option value="partially_paid">Partially Paid</option>
                        <option value="paid">Paid</option>
                        <option value="refund_pending">Refund Pending</option>
                        <option value="refunded">Refunded</option>
                        <option value="failed">Failed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm text-green-900 dark:text-green-100">
                      {new Date(booking.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                  {expandedRows.includes(booking.id) && (
                    <tr className="bg-green-50/40 dark:bg-green-900/40">
                      <td colSpan={6} className="px-6 py-4 text-green-900 dark:text-green-100 border-t border-green-100/30 dark:border-green-900/30">
                        {/* Booking details here, customize as needed */}
                        <div className="flex flex-col md:flex-row gap-4">
                          <div>
                            <div className="font-semibold">Email:</div>
                            <div>{booking.email || "-"}</div>
                          </div>
                          <div>
                            <div className="font-semibold">Phone:</div>
                            <div>{booking.phone || "-"}</div>
                          </div>
                          <div>
                            <div className="font-semibold">Notes:</div>
                            <div>{booking.notes || "-"}</div>
                          </div>
                          {/* Add more details as needed */}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}