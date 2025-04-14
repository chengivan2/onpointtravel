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

  let totalUsers = 0;
  let totalBookings = 0;
  let pendingBookings = 0;
  let confirmedBookings = 0;
  let completedBookings = 0;
  let currentPeriodBookings = 0;
  let previousPeriodBookings = 0;
  let isTrendingUp = false;
  let trend = 0;

  if (profile?.role === "admin") {
    // Fetch total number of users
    const { count: totalUsersCount } = await supabase
      .from("users")
      .select("id", { count: "exact" });
    totalUsers = totalUsersCount || 0;

    // Fetch total number of bookings
    const { count: totalBookingsCount } = await supabase
      .from("bookings")
      .select("id", { count: "exact" });
    totalBookings = totalBookingsCount || 0;

    // Fetch number of bookings with status 'pending'
    const { count: pendingCount } = await supabase
      .from("bookings")
      .select("id", { count: "exact" })
      .eq("status", "pending");
    pendingBookings = pendingCount || 0;

    // Fetch number of bookings with status 'confirmed'
    const { count: confirmedCount } = await supabase
      .from("bookings")
      .select("id", { count: "exact" })
      .eq("status", "confirmed");
    confirmedBookings = confirmedCount || 0;

    // Fetch number of bookings with status 'completed'
    const { count: completedCount } = await supabase
      .from("bookings")
      .select("id", { count: "exact" })
      .eq("status", "completed");
    completedBookings = completedCount || 0;

    // Fetch bookings for the current 28-day period
    const currentDate = new Date();
    const startOfCurrentPeriod = new Date();
    startOfCurrentPeriod.setDate(currentDate.getDate() - 28);

    const { count: currentPeriodCount } = await supabase
      .from("bookings")
      .select("id", { count: "exact" })
      .gte("booked_at", startOfCurrentPeriod.toISOString());
    currentPeriodBookings = currentPeriodCount || 0;

    // Fetch bookings for the previous 28-day period
    const startOfPreviousPeriod = new Date(startOfCurrentPeriod);
    startOfPreviousPeriod.setDate(startOfCurrentPeriod.getDate() - 28);

    const { count: previousPeriodCount } = await supabase
      .from("bookings")
      .select("id", { count: "exact" })
      .gte("booked_at", startOfPreviousPeriod.toISOString())
      .lt("booked_at", startOfCurrentPeriod.toISOString());
    previousPeriodBookings = previousPeriodCount || 0;

    trend =
      previousPeriodBookings > 0
        ? ((currentPeriodBookings - previousPeriodBookings) /
            previousPeriodBookings) *
          100
        : 0;

    isTrendingUp = trend >= 0;
  }

  return (
    <div className="bg-transparent grid grid-cols-1 gap-4 px-4 *:bg-white/60 dark:*:bg-green-900/20 *:backdrop-blur-md *:border *:border-gray-200 dark:*:border-green-400 *:rounded-lg shadow-sm lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {profile?.role === "admin" && (
        <>
          {/* Total Users Card */}
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Total Users</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {totalUsers}
              </CardTitle>
            </CardHeader>
          </Card>

          {/* Total Bookings Card */}
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Total Bookings</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {totalBookings}
              </CardTitle>
            </CardHeader>
          </Card>

           <Card className="@container/card">
                  <CardHeader>
                  <CardDescription className="text-[#0D0D0D]">Total Bookings</CardDescription>
                  <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                    {totalBookings || 0}
                  </CardTitle>
                  <CardAction>
                    <Badge variant="outline">
                    {isTrendingUp ? (
                      <IconTrendingUp className="text-green-400" />
                    ) : (
                      <IconTrendingDown className="text-red-400" />
                    )}
                    {isTrendingUp
                      ? `+${trend.toFixed(2)}%`
                      : `${trend.toFixed(2)}%`}
                    </Badge>
                  </CardAction>
                  </CardHeader>
                  <CardFooter className="flex-col items-start gap-1.5 text-sm">
                  <div className="line-clamp-1 flex gap-2 font-medium">
                    {isTrendingUp ? (
                    <span>Trending up this month</span>
                    ) : (
                    <span>Trending down this month</span>
                    )}
                    {isTrendingUp ? (
                    <IconTrendingUp className="size-4 text-green-400" />
                    ) : (
                    <IconTrendingDown className="size-4 text-red-400" />
                    )}
                  </div>
                  <div className="text-muted-foreground">
                    Bookings for the last 28 days
                  </div>
                  </CardFooter>
                </Card>

          {/* Pending Bookings Card */}
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Pending Bookings</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {pendingBookings}
              </CardTitle>
            </CardHeader>
          </Card>

          {/* Confirmed Bookings Card */}
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Confirmed Bookings</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {confirmedBookings}
              </CardTitle>
            </CardHeader>
          </Card>

          {/* Completed Bookings Card */}
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Completed Bookings</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {completedBookings}
              </CardTitle>
            </CardHeader>
          </Card>

          {/* Trend Card */}
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Booking Trend</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {isTrendingUp ? "+" : ""}
                {trend.toFixed(2)}%
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  {isTrendingUp ? (
                    <IconTrendingUp className="text-green-400" />
                  ) : (
                    <IconTrendingDown className="text-red-400" />
                  )}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                {isTrendingUp ? "Trending up" : "Trending down"} this period
              </div>
              <div className="text-muted-foreground">
                Compared to the previous 28 days
              </div>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  );
}
