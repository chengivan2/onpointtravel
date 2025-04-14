import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { createClient } from "@/utils/supabase/server";

export default async function AdminDataSlotCards() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("id", user?.id)
    .single();

  let totalUsers = 0,
    totalUsersTrend = 0,
    totalBookings = 0,
    totalBookingsTrend = 0,
    pendingBookings = 0,
    pendingBookingsTrend = 0,
    confirmedBookings = 0,
    confirmedBookingsTrend = 0,
    completedBookings = 0,
    completedBookingsTrend = 0;

  if (profile?.role === "admin") {
    // Fetch total number of users
    const { count: totalUsersCount } = await supabase
      .from("users")
      .select("id", { count: "exact" });
    totalUsers = totalUsersCount || 0;

    // Fetch users for the previous 28-day period
    const currentDate = new Date();
    const startOfCurrentPeriod = new Date();
    startOfCurrentPeriod.setDate(currentDate.getDate() - 28);

    const startOfPreviousPeriod = new Date(startOfCurrentPeriod);
    startOfPreviousPeriod.setDate(startOfCurrentPeriod.getDate() - 28);

    const { count: previousUsersCount } = await supabase
      .from("users")
      .select("id", { count: "exact" })
      .lt("created_at", startOfCurrentPeriod.toISOString())
      .gte("created_at", startOfPreviousPeriod.toISOString());

    totalUsersTrend =
      (previousUsersCount ?? 0) > 0
        ? ((totalUsers - (previousUsersCount ?? 0)) /
            (previousUsersCount ?? 1)) *
          100
        : 0;

    // Fetch total number of bookings
    const { count: totalBookingsCount } = await supabase
      .from("bookings")
      .select("id", { count: "exact" });
    totalBookings = totalBookingsCount || 0;

    // Fetch bookings for the previous 28-day period
    const { count: previousBookingsCount } = await supabase
      .from("bookings")
      .select("id", { count: "exact" })
      .lt("booked_at", startOfCurrentPeriod.toISOString())
      .gte("booked_at", startOfPreviousPeriod.toISOString());

    totalBookingsTrend =
      (previousBookingsCount ?? 0) > 0
        ? ((totalBookings - (previousBookingsCount ?? 0)) /
            (previousBookingsCount ?? 0)) *
          100
        : 0;

    // Fetch number of bookings with status 'pending'
    const { count: pendingCount } = await supabase
      .from("bookings")
      .select("id", { count: "exact" })
      .eq("status", "pending");
    pendingBookings = pendingCount || 0;

    const { count: previousPendingCount } = await supabase
      .from("bookings")
      .select("id", { count: "exact" })
      .eq("status", "pending")
      .lt("booked_at", startOfCurrentPeriod.toISOString())
      .gte("booked_at", startOfPreviousPeriod.toISOString());

    pendingBookingsTrend =
      (previousPendingCount ?? 0) > 0
        ? ((pendingBookings - (previousPendingCount ?? 0)) /
            (previousPendingCount ?? 0)) *
          100
        : 0;

    // Fetch number of bookings with status 'confirmed'
    const { count: confirmedCount } = await supabase
      .from("bookings")
      .select("id", { count: "exact" })
      .eq("status", "confirmed");
    confirmedBookings = confirmedCount || 0;

    const { count: previousConfirmedCount } = await supabase
      .from("bookings")
      .select("id", { count: "exact" })
      .eq("status", "confirmed")
      .lt("booked_at", startOfCurrentPeriod.toISOString())
      .gte("booked_at", startOfPreviousPeriod.toISOString());

    confirmedBookingsTrend =
      (previousConfirmedCount ?? 0) > 0
        ? ((confirmedBookings - (previousConfirmedCount ?? 0)) /
            (previousConfirmedCount ?? 0)) *
          100
        : 0;

    // Fetch number of bookings with status 'completed'
    const { count: completedCount } = await supabase
      .from("bookings")
      .select("id", { count: "exact" })
      .eq("status", "completed");
    completedBookings = completedCount || 0;

    const { count: previousCompletedCount } = await supabase
      .from("bookings")
      .select("id", { count: "exact" })
      .eq("status", "completed")
      .lt("booked_at", startOfCurrentPeriod.toISOString())
      .gte("booked_at", startOfPreviousPeriod.toISOString());

    completedBookingsTrend =
      (previousCompletedCount ?? 0) > 0
        ? ((completedBookings - (previousCompletedCount ?? 0)) /
            (previousCompletedCount ?? 0)) *
          100
        : 0;
  }

  return (
    <div className="bg-transparent grid grid-cols-1 gap-4 px-4 *:bg-white/60 dark:*:bg-green-900/20 *:backdrop-blur-md *:border *:border-gray-200/80 dark:*:border-green-200/80 *:rounded-lg shadow-sm lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {profile?.role === "admin" && (
        <>
          {/* Total Users Card */}
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Total Users</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {totalUsers}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  {totalUsersTrend >= 0 ? (
                    <IconTrendingUp className="text-green-400" />
                  ) : (
                    <IconTrendingDown className="text-red-400" />
                  )}
                  {totalUsersTrend >= 0
                    ? `+${totalUsersTrend.toFixed(2)}%`
                    : `${totalUsersTrend.toFixed(2)}%`}
                </Badge>
              </CardAction>
            </CardHeader>
          </Card>

          {/* Total Bookings Card */}
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Total Bookings</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {totalBookings}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  {totalBookingsTrend >= 0 ? (
                    <IconTrendingUp className="text-green-400" />
                  ) : (
                    <IconTrendingDown className="text-red-400" />
                  )}
                  {totalBookingsTrend >= 0
                    ? `+${totalBookingsTrend.toFixed(2)}%`
                    : `${totalBookingsTrend.toFixed(2)}%`}
                </Badge>
              </CardAction>
            </CardHeader>
          </Card>

          {/* Pending Bookings Card */}
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Pending Bookings</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {pendingBookings}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  {pendingBookingsTrend >= 0 ? (
                    <IconTrendingUp className="text-green-400" />
                  ) : (
                    <IconTrendingDown className="text-red-400" />
                  )}
                  {pendingBookingsTrend >= 0
                    ? `+${pendingBookingsTrend.toFixed(2)}%`
                    : `${pendingBookingsTrend.toFixed(2)}%`}
                </Badge>
              </CardAction>
            </CardHeader>
          </Card>

          {/* Confirmed Bookings Card */}
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Confirmed Bookings</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {confirmedBookings}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  {confirmedBookingsTrend >= 0 ? (
                    <IconTrendingUp className="text-green-400" />
                  ) : (
                    <IconTrendingDown className="text-red-400" />
                  )}
                  {confirmedBookingsTrend >= 0
                    ? `+${confirmedBookingsTrend.toFixed(2)}%`
                    : `${confirmedBookingsTrend.toFixed(2)}%`}
                </Badge>
              </CardAction>
            </CardHeader>
          </Card>

          {/* Completed Bookings Card */}
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Completed Bookings</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {completedBookings}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  {completedBookingsTrend >= 0 ? (
                    <IconTrendingUp className="text-green-400" />
                  ) : (
                    <IconTrendingDown className="text-red-400" />
                  )}
                  {completedBookingsTrend >= 0
                    ? `+${completedBookingsTrend.toFixed(2)}%`
                    : `${completedBookingsTrend.toFixed(2)}%`}
                </Badge>
              </CardAction>
            </CardHeader>
          </Card>
        </>
      )}
    </div>
  );
}
