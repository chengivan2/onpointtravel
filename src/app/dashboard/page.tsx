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

  const initialBookings = await FetchBookings(0, 15); // Fetch the first page of bookings

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
              {isAdmin && (
                <>
                  <AdminDataSlotCards />
                  <AdminBookingsChart />
                  <AdminAgentBookingsView initialBookings={initialBookings} />
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
