"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BookingsPage() {
  const supabase = createClient();
  const router = useRouter();

  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0); // Tracks the current page (0-based)
  const [isAuthorized, setIsAuthorized] = useState(false);

  const LIMIT = 15; // Number of bookings to load per page

  // Check user role and restrict access
  useEffect(() => {
    const checkAccess = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/signin");
        return;
      }

      const { data: profile, error } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single();

      if (error || (profile?.role !== "admin" && profile?.role !== "agent")) {
        router.push("/dashboard");
        return;
      }

      setIsAuthorized(true);
    };

    checkAccess();
  }, [supabase, router]);

  // Fetch bookings
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select(
          `
          id,
          number_of_people,
          status,
          payment_status,
          booked_at,
          trips (name),
          users (first_name, last_name, email)
        `
        )
        .order("booked_at", { ascending: false })
        .range(page * LIMIT, page * LIMIT + LIMIT - 1); // Fetch the next batch

      if (error) {
        console.error("Error fetching bookings:", error.message);
        return;
      }

      if (data.length < LIMIT) {
        setHasMore(false); // No more bookings to load
      }

      setBookings((prev) => [...prev, ...data]); // Append new bookings to the existing list
    } catch (err) {
      console.error("Error loading bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load bookings on page load and when the page number changes
  useEffect(() => {
    if (isAuthorized) {
      fetchBookings();
    }
  }, [page, isAuthorized]);

  if (!isAuthorized) {
    return null; // Prevent rendering until access is verified
  }

  return (
    <div className="p-6">
      {/* Add Booking Button */}
      <div className="flex justify-end mb-6">
        <Link href="/dashboard/bookings/create">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg animate-pulse">
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
                <td className="px-4 py-2">{booking.trips?.name || "N/A"}</td>
                <td className="px-4 py-2">
                  {booking.users?.first_name && booking.users?.last_name
                    ? `${booking.users.first_name} ${booking.users.last_name}`
                    : booking.users?.email || "N/A"}
                </td>
                <td className="px-4 py-2">{booking.number_of_people}</td>
                <td className="px-4 py-2 capitalize">{booking.status}</td>
                <td className="px-4 py-2 capitalize">{booking.payment_status}</td>
                <td className="px-4 py-2">{new Date(booking.booked_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setPage((prev) => prev + 1)}
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