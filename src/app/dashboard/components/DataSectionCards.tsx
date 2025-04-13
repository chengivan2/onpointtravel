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

export default async function DataSectionCards() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("id", user?.id)
    .single();

  let totalBookings = "0";
  let pendingBookings = "0";
  let completedBookings = "0";
  let cancelledBookings = "0";
  let refundedBookings = "0";
  let confirmedBookings = "0";
  let currentPeriodBookings = 0;
  let previousPeriodBookings = 0;
  let isTrendingUp: boolean = false;
  let trend: number = 0;

  if (profile?.role === "admin") {
    // Fetch total number of bookings
    const { data: totalBookings } = await supabase
      .from("bookings")
      .select("id", { count: "exact" });

    // Fetch number of bookings with status 'pending'
    const { data: pendingBookings } = await supabase
      .from("bookings")
      .select("id", { count: "exact" })
      .eq("status", "pending");

    // Fetch number of bookings with status 'confirmed'
    const { data: confirmedBookings } = await supabase
      .from("bookings")
      .select("id", { count: "exact" })
      .eq("status", "confirmed");

    // Fetch number of bookings with status 'completed'
    const { data: completedBookings } = await supabase
      .from("bookings")
      .select("id", { count: "exact" })
      .eq("status", "completed");

    // Fetch number of bookings with status 'cancelled'
    const { data: cancelledBookings } = await supabase
      .from("bookings")
      .select("id", { count: "exact" })
      .eq("status", "cancelled");

    // Fetch number of bookings with status 'refunded'
    const { data: refundedBookings } = await supabase
      .from("bookings")
      .select("id", { count: "exact" })
      .eq("status", "refunded");

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
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {profile?.role === "admin" && (
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Total Bookings</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {totalBookings?.length || 0}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                {isTrendingUp ? <IconTrendingUp /> : <IconTrendingDown />}
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
              Visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>
      )}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>New Customers</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            1,234
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown />
              -20%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Down 20% this period <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Acquisition needs attention
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Active Accounts</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            45,678
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Strong user retention <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Engagement exceed targets</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Growth Rate</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            4.5%
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Steady performance increase <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Meets growth projections</div>
        </CardFooter>
      </Card>
    </div>
  );
}
