
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import { DashboardSidebar } from "../components/sidebar/DashboardSideBar";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PlusIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Your Favorite Trips",
  description: "Manage your favorite trips",
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

  // Fetch user profile
  const { data: profile } = await supabase
    .from("users")
    .select("first_name, last_name")
    .eq("id", user.id)
    .single();

  const firstName = `${profile?.first_name || ""}`;

  // Fetch the user's favorite trips
  const { data: favoriteTrips, error: tripsError } = await supabase
    .from("trips")
    .select("id, name, featured_image")
    .eq("is_favorite", true)
    .eq("user_id", user.id);

  if (tripsError) {
    console.error("Error fetching favorite trips:", tripsError.message);
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
              <div className="relative min-w-full px-4 lg:px-6 gap-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">
                    Hello, 👋 {firstName}
                  </h2>
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    Here are your favorite trips. Which one would you like to cross of your bucket list?
                  </p>
                </div>

                <Link
                  href="/dashboard/trips/create"
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white hover:bg-green-600 shadow-lg"
                  aria-label="Create Trip"
                >
                  <PlusIcon className="w-6 h-6" />
                </Link>
              </div>
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Your Favorite Trips</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteTrips?.map((trip) => (
                    <div
                      key={trip.id}
                      className="rounded-lg shadow-lg bg-white/30 dark:bg-green-900/30 backdrop-blur-sm p-4"
                    >
                      <div
                        className="h-40 bg-cover bg-center rounded-lg"
                        style={{ backgroundImage: `url(${trip.featured_image})` }}
                      ></div>
                      <h2 className="text-lg font-semibold mt-2">{trip.name}</h2>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
