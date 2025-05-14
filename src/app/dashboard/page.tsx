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

export const metadata: Metadata = {
  title: "OnPoint Dashboard",
  description: "Manage your OnPoint account",
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
              <h2 className="text-2xl font-semibold mb-2 text-red-700 dark:text-red-300">Error</h2>
              <p className="text-gray-700 dark:text-gray-200">{latestBookingsResult.error}</p>
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
                  <h3 className="text-xl font-semibold mb-2">Recent Bookings</h3>
                  <AdminAgentBookingsView initialBookings={latestBookings} showAll={false} />
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
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
