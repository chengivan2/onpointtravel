import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { createClient } from "@/utils/supabase/server";
import { supabaseService } from "@/utils/supabase/srk";
import { FetchOngoingTrips } from "./components/FetchOngoingTrips";
import OngoingTrips from "./components/OngoingTrips";

import { Metadata } from "next";
import { DashboardSidebar } from "../components/sidebar/DashboardSideBar";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PlusIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Ongoing Trips",
  description: "Manage your ongoing trips",
};

export default async function OnPointDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.error("Error fetching user:", userError.message);
  }

  if (!user) {
    redirect("/signin");
  }

  // Check user role
  const { data: userRole } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  const isAdmin = userRole?.role === "admin";

  if (!isAdmin) {
    redirect("/dashboard");
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from("users")
    .select("first_name, last_name")
    .eq("id", user.id)
    .single();

  const firstName = `${profile?.first_name || ""}`;

  const ongoingTrip = await FetchOngoingTrips();

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
            <div className="flex flex-col px-3 lg:px-6 gap-4 py-4 md:gap-6 md:py-6">
              <div className="relative min-w-full px-4 lg:px-6 gap-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">
                    Hello, {firstName} 👋
                  </h2>
                  <p className="text-sm md:text-md text-gray-800 dark:text-gray-200">
                    Here are all the ongoing trips. You can mnage them from here.
                  </p>
                </div>

                <Link
                  href="/dashboard/bookings/create"
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white hover:bg-green-600 shadow-lg"
                  aria-label="Create Trip"
                >
                  <PlusIcon className="w-6 h-6" />
                </Link>
              </div>
              <div className="">
                <OngoingTrips ongoingTrips={ongoingTrip} />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
