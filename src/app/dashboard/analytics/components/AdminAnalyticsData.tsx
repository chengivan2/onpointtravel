import { supabaseService } from "@/utils/supabase/srk";
import { format, subDays } from "date-fns";

export default async function AdminAnalyticsData({
  startDate,
  endDate,
  compareStartDate,
  compareEndDate,
}: {
  startDate: string;
  endDate: string;
  compareStartDate: string;
  compareEndDate: string;
}) {
  // 1. User Growth & Trends
  const { count: totalUsers } = await supabaseService
    .from("users")
    .select("id", { count: "exact" });
  const { count: newUsers } = await supabaseService
    .from("users")
    .select("id", { count: "exact" })
    .gte("created_at", startDate)
    .lte("created_at", endDate);
  const { count: prevNewUsers } = await supabaseService
    .from("users")
    .select("id", { count: "exact" })
    .gte("created_at", compareStartDate)
    .lte("created_at", compareEndDate);

  // 2. Booking Analytics
  const { count: totalBookings } = await supabaseService
    .from("bookings")
    .select("id", { count: "exact" });
  const { count: newBookings } = await supabaseService
    .from("bookings")
    .select("id", { count: "exact" })
    .gte("booked_at", startDate)
    .lte("booked_at", endDate);
  const { count: prevNewBookings } = await supabaseService
    .from("bookings")
    .select("id", { count: "exact" })
    .gte("booked_at", compareStartDate)
    .lte("booked_at", compareEndDate);
  const { count: pendingBookings } = await supabaseService
    .from("bookings")
    .select("id", { count: "exact" })
    .eq("status", "pending");
  const { count: confirmedBookings } = await supabaseService
    .from("bookings")
    .select("id", { count: "exact" })
    .eq("status", "confirmed");
  const { count: completedBookings } = await supabaseService
    .from("bookings")
    .select("id", { count: "exact" })
    .eq("status", "completed");

  // 3. Revenue Analytics
  const { data: revenueData } = await supabaseService
    .from("payments")
    .select("amount, processed_at")
    .gte("processed_at", startDate)
    .lte("processed_at", endDate);
  const totalRevenue = (revenueData || []).reduce((sum, p) => sum + (p.amount || 0), 0);
  const { data: prevRevenueData } = await supabaseService
    .from("payments")
    .select("amount, processed_at")
    .gte("processed_at", compareStartDate)
    .lte("processed_at", compareEndDate);
  const prevTotalRevenue = (prevRevenueData || []).reduce((sum, p) => sum + (p.amount || 0), 0);

  // 4. Top Trips
  const { data: topTrips } = await supabaseService
    .from("bookings")
    .select("trip_id, trips(name), count:id")
    .gte("booked_at", startDate)
    .lte("booked_at", endDate)
    .order("count", { ascending: false })
    .limit(5);


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* User Growth */}
      <div className="bg-white/80 dark:bg-green-900/40 rounded-lg shadow-xl p-6">
        <h3 className="text-lg font-semibold mb-2">User Growth</h3>
        <div>Total Users: {totalUsers}</div>
        <div>New Users: {newUsers} ({prevNewUsers} previous period)</div>
      </div>
      {/* Booking Analytics */}
      <div className="bg-white/80 dark:bg-green-900/40 rounded-lg shadow-xl p-6">
        <h3 className="text-lg font-semibold mb-2">Bookings</h3>
        <div>Total Bookings: {totalBookings}</div>
        <div>New Bookings: {newBookings} ({prevNewBookings} previous period)</div>
        <div>Pending: {pendingBookings}, Confirmed: {confirmedBookings}, Completed: {completedBookings}</div>
      </div>
      {/* Revenue */}
      <div className="bg-white/80 dark:bg-green-900/40 rounded-lg shadow-xl p-6">
        <h3 className="text-lg font-semibold mb-2">Revenue</h3>
        <div>Total Revenue: ${totalRevenue.toLocaleString()}</div>
        <div>Previous Period: ${prevTotalRevenue.toLocaleString()}</div>
      </div>
      {/* Top Trips */}
      <div className="bg-white/80 dark:bg-green-900/40 rounded-lg shadow-xl p-6">
        <h3 className="text-lg font-semibold mb-2">Top Trips</h3>
        <ul>
          {(topTrips || []).map((t: any) => (
            <li key={t.trip_id}>{t.trips?.name || t.trip_id}: {t.count}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
