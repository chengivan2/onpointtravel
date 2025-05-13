import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import { DashboardSidebar } from "../components/sidebar/DashboardSideBar";
import { redirect } from "next/navigation";
import { FetchBookings } from "./components/FetchBookings";
import AdminAgentBookingsView from "./components/AdminAgentBookingsView";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "OnPoint Bookings",
  description: "View bookings",
};

export default async function AdminBookingsPage() {
  const supabase = await createClient();

  // Check session and user
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session) {
    redirect("/signin");
  }

  const { user } = session;

  // Fetch user profile
  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("role, first_name, last_name")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    redirect("/signin");
  }

  const firstName = `${profile?.first_name || ""}`;
  const isAdmin = profile?.role === "admin";
  const isAgent = profile?.role === "agent";

  if (!isAdmin && !isAgent) {
    redirect("/dashboard");
  }

  const initialBookingsResult = await FetchBookings(0, 15); // Fetch the first page of bookings

  let initialBookings: any[] = [];
  if (initialBookingsResult && !initialBookingsResult.error) {
    initialBookings = initialBookingsResult.data;
  }

  if (initialBookingsResult.error) {
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
              <p className="text-gray-700 dark:text-gray-200">{initialBookingsResult.error}</p>
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
            <div className="flex flex-col px-3 lg:px-6 gap-4 py-4 md:gap-6 md:py-6">
              <div className="relative min-w-full gap-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">
                    Hello, {firstName} 👋
                  </h2>
                  <p className="text-sm md:text-md lg:text-lg text-gray-800 dark:text-gray-200">
                    Here are all your bookings below.
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

              <AdminAgentBookingsView initialBookings={initialBookings} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
