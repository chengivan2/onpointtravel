import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import { DashboardSidebar } from "./components/sidebar/DashboardSideBar";
import AdminDataSlotCards from "./components/admincomponents/AdminDataSlotCards";
import Link from "next/link";
import { redirect } from "next/navigation";
import AdminBookingsChart from "./components/admincomponents/AdminBookingsChart";
import { FetchBookings } from "./components/admincomponents/FetchBookings";
import TopTripsPieChart from "./components/admincomponents/TopTripsPieChart";
import { PlusIcon } from "lucide-react";
import AdminAgentBookingsView from "./components/admincomponents/AdminAgentBookingsView";
import UserDashboardBookingsTable from "./components/usercomponents/UserDashboardBookingsTable";
import UserBookingsAreaChart from "./components/usercomponents/UserBookingsAreaChart";
import UserTopTripsDoughnut from "./components/usercomponents/UserTopTripsDoughnut";

export const metadata: Metadata = {
  title: "OnPoint Dashboard",
  description: "Manage your OnPoint account",
  openGraph: {
    title: "Dashboard - OnPoint Travel",
    description: "Manage your OnPoint account",
    url: "https://onpointtravel.vercel.app/dashboard",
    siteName: "OnPoint Travel",
    images: [
      {
        url: "https://res.cloudinary.com/doqbnfais/image/upload/v1760291599/onPoint%20website%20concept/OnPoint_logo_multi-use_mh0fmr.png",
      },
    ],
    type: "website",
  },
};

export default async function OnPointDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  const { data: profile } = await supabase
    .from("users")
    .select("role, first_name, last_name")
    .eq("id", user.id)
    .single();

  const firstName = `${profile?.first_name || ""}`;
  const isAdmin = profile?.role === "admin";

  const latestBookingsResult = await FetchBookings(0, 10); // Fetch only the last 10 bookings for dashboard home
  let latestBookings: any[] = [];
  if (latestBookingsResult && !latestBookingsResult.error) {
    latestBookings = latestBookingsResult.data;
  }

  const bookingsWithTripDetails = latestBookings.map((booking) => ({
    ...booking,
    trip: booking.trip
      ? booking.trip
      : booking.trip_name
      ? {
          id: booking.trip_id || "",
          name: booking.trip_name,
          destination_id: "",
          description: "",
        }
      : null,
    start_date: booking.start_date,
    end_date: booking.end_date,
  }));

  // User: Prepare data for last 5 bookings, bookings per month, and most booked trips
  type BookingsPerMonth = { month: string; count: number }[];
  type TopTrip = { trip: string; count: number }[];
  let userLast5Bookings: typeof bookingsWithTripDetails = [];
  let userBookingsPerMonth: BookingsPerMonth = [];
  let userTopTrips: TopTrip = [];
  if (!isAdmin && bookingsWithTripDetails.length > 0) {
    userLast5Bookings = bookingsWithTripDetails.slice(-5).reverse();
    // Bookings per month (last 5 months)
    const now = new Date();
    const months = [] as { month: string; key: string }[];
    for (let i = 4; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        month: d.toLocaleString("default", { month: "short", year: "2-digit" }),
        key: `${d.getFullYear()}-${d.getMonth()}`,
      });
    }
    userBookingsPerMonth = months.map(({ month, key }) => ({
      month,
      count: bookingsWithTripDetails.filter((b) => {
        const d = new Date(b.start_date);
        return `${d.getFullYear()}-${d.getMonth()}` === key;
      }).length,
    }));
    // Most booked trips (doughnut)
    const tripCounts: Record<string, number> = {};
    bookingsWithTripDetails.forEach((b) => {
      if (
        b.trip &&
        typeof b.trip.name === "string" &&
        b.trip.name.trim() !== ""
      ) {
        tripCounts[b.trip.name] = (tripCounts[b.trip.name] ?? 0) + 1;
      }
    });
    userTopTrips = Object.entries(tripCounts).map(([trip, count]) => ({
      trip,
      count: Number(count),
    }));
    userTopTrips.sort((a, b) => b.count - a.count);
  }

  if (latestBookingsResult.error) {
    return (
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <DashboardSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col items-center justify-center min-h-[40vh]">
            <div className="bg-white/40 dark:bg-green-900/30 rounded-xl p-8 shadow-lg text-center">
              <h2 className="text-2xl font-semibold mb-2 text-red-700 dark:text-red-300">
                Error
              </h2>
              <p className="text-gray-700 dark:text-gray-200">
                {latestBookingsResult.error}
              </p>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <DashboardSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col px-3 gap-4 py-4 md:gap-6 md:py-6">
              <div className="relative min-w-full gap-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">
                    Hello, {firstName} 👋
                  </h2>
                  <p className="text-sm md:text-md lg:text-lg text-gray-800 dark:text-gray-200">
                    Welcome back.
                  </p>
                </div>
                {isAdmin && (
                  <Link
                    href="/dashboard/bookings/create"
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white hover:bg-green-600 shadow-lg"
                    aria-label="Create Trip"
                  >
                    <PlusIcon className="w-6 h-6" />
                  </Link>
                )}
              </div>
              {/* Admin: Show latest bookings table with a button to all bookings */}
              {isAdmin && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-2">
                    Recent Bookings
                  </h3>
                  <AdminAgentBookingsView
                    initialBookings={latestBookings}
                    showAll={false}
                  />
                  <div className="flex justify-end mt-2">
                    <Link href="/dashboard/bookings">
                      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md">
                        View All Bookings
                      </button>
                    </Link>
                  </div>
                </div>
              )}
              {isAdmin && (
                <>
                  <AdminDataSlotCards />
                  <AdminBookingsChart />
                  <TopTripsPieChart />
                </>
              )}
              {/* User: Show last 5 bookings, area chart, and doughnut chart */}
              {!isAdmin && (
                <>
                  <UserDashboardBookingsTable bookings={userLast5Bookings} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <UserBookingsAreaChart data={userBookingsPerMonth} />
                    <UserTopTripsDoughnut data={userTopTrips} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
