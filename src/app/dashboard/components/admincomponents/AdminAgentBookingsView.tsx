"use client";

import { useState } from "react";

export default function AdminAgentBookingsView({
  initialBookings,
  showAll = true,
}: {
  initialBookings: any[];
  showAll?: boolean;
}) {
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
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: value } : b))
      );
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
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, payment_status: value } : b))
      );
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
          title="Filter by Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border border-green-200 bg-white/60 dark:bg-green-900/30 text-green-900 dark:text-green-100 shadow"
        >
          <option value="">All Statuses</option>
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
      </div>
      <div className="relative rounded-2xl shadow-xl bg-white/40 dark:bg-green-900/30 backdrop-blur-md border border-green-100/30 dark:border-green-900/30 overflow-x-auto">
        {/* SVG backgrounds with pointer-events-none and z-index */}
        <svg
          className="absolute -top-10 -right-10 w-64 h-64 opacity-10 text-green-300 pointer-events-none z-0"
          fill="none"
          viewBox="0 0 200 200"
        >
          <circle cx="100" cy="100" r="100" fill="currentColor" />
        </svg>
        <svg
          className="absolute bottom-0 left-0 w-40 h-40 opacity-10 text-green-200 pointer-events-none z-0"
          fill="none"
          viewBox="0 0 160 160"
        >
          <circle cx="80" cy="80" r="80" fill="currentColor" />
        </svg>
        <div className="relative z-10">
          <table className="min-w-full bg-transparent">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                  Trip Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                  People
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                  Payment Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <>
                  <tr
                    key={booking.id}
                    className="group hover:bg-green-50/40 dark:hover:bg-green-900/40 transition-all duration-200 cursor-pointer border-b border-green-100/20 dark:border-green-800/20 last:border-0"
                    onClick={() => toggleRow(booking.id)}
                  >
                    <td className="px-6 py-4 text-sm text-green-900 dark:text-green-100 font-semibold group-hover:text-green-600 dark:group-hover:text-green-400">
                      {booking.trip_name}
                    </td>
                    <td className="px-6 py-4 text-sm text-green-800/80 dark:text-green-200/80">
                      {booking.client}
                    </td>
                    <td className="px-6 py-4 text-sm text-green-900 dark:text-green-100">
                      <span className="bg-green-100/50 dark:bg-green-900/50 px-2 py-1 rounded-md text-xs font-medium">
                        {booking.number_of_people} {booking.number_of_people === 1 ? 'Person' : 'People'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <select
                        title="Trip Status"
                        value={booking.status}
                        onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                        className={`w-full px-3 py-1.5 border rounded-lg bg-white/50 dark:bg-green-900/50 text-sm font-medium shadow-sm focus:ring-2 focus:ring-green-500 transition-all ${booking.status === 'confirmed' ? 'border-green-200 text-green-700' :
                            booking.status === 'pending' ? 'border-yellow-200 text-yellow-700' :
                              booking.status === 'cancelled' ? 'border-red-200 text-red-700' : 'border-gray-200'
                          }`}
                        onClick={(e) => e.stopPropagation()}
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
                    <td className="px-6 py-4 text-sm">
                      <select
                        title="Payment Status"
                        value={booking.payment_status}
                        onChange={(e) => handlePaymentStatusChange(booking.id, e.target.value)}
                        className={`w-full px-3 py-1.5 border rounded-lg bg-white/50 dark:bg-green-900/50 text-sm font-medium shadow-sm focus:ring-2 focus:ring-green-500 transition-all ${booking.payment_status === 'paid' ? 'border-green-200 text-green-700' :
                            booking.payment_status === 'unpaid' ? 'border-red-200 text-red-700' : 'border-yellow-200 text-yellow-700'
                          }`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <option value="unpaid">Unpaid</option>
                        <option value="partially_paid">Partially Paid</option>
                        <option value="paid">Paid</option>
                        <option value="refund_pending">Refund Pending</option>
                        <option value="refunded">Refunded</option>
                        <option value="failed">Failed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm text-green-800/60 dark:text-green-200/60">
                      {new Date(booking.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                  </tr>
                  {expandedRows.includes(booking.id) && (
                    <tr>
                      <td colSpan={6} className="px-6 py-0">
                        <div className="my-2 p-6 rounded-2xl bg-white/60 dark:bg-green-950/40 border border-green-100/30 dark:border-green-900/30 shadow-inner animate-in fade-in slide-in-from-top-2 duration-300">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                              <h4 className="text-xs font-bold uppercase tracking-wider text-green-600 dark:text-green-400 mb-3">Client Info</h4>
                              <div className="space-y-1">
                                <p className="text-sm font-semibold">{booking.client}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">ID: {booking.user_id}</p>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-xs font-bold uppercase tracking-wider text-green-600 dark:text-green-400 mb-3">Trip Details</h4>
                              <div className="space-y-1">
                                <p className="text-sm font-semibold">{booking.trip_name}</p>
                                <p className="text-xs text-gray-600 dark:text-gray-300">
                                  {new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-xs font-bold uppercase tracking-wider text-green-600 dark:text-green-400 mb-3">Finance</h4>
                              <div className="space-y-1">
                                <p className="text-sm font-bold text-green-700 dark:text-green-300">${booking.total_price?.toLocaleString()}</p>
                                <p className="text-xs capitalize flex items-center gap-1">
                                  <span className={`w-2 h-2 rounded-full ${booking.payment_status === 'paid' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                  {booking.payment_status.replace('_', ' ')}
                                </p>
                              </div>
                            </div>
                          </div>

                          {booking.special_requests && (
                            <div className="mt-6 pt-4 border-t border-green-100/20 dark:border-green-800/20">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-green-600 dark:text-green-400 mb-2">Special Requests</h4>
                              <p className="text-sm italic text-gray-700 dark:text-gray-300 leading-relaxed">
                                "{booking.special_requests}"
                              </p>
                            </div>
                          )}
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
