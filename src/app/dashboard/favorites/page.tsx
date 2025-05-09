import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import { DashboardSidebar } from "../components/sidebar/DashboardSideBar";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PlusIcon } from "lucide-react";
import FavoriteTrips from "./components/FavoriteTrips";

export const metadata: Metadata = {
  title: "Your Favorite Trips",
  description: "Manage your favorite trips",
};

export default async function FavoritesTripsPage() {
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
    .select("id, name, main_featured_image_url")
    .eq("is_favorite", true)
    .eq("user_id", user.id);

  if (tripsError) {
    console.error("Error fetching favorite trips:", tripsError.message);
  }

  //Check for user role
  const { data: userRole } = await supabase
  .from("users")
  .select("role, first_name, last_name")
  .eq("id", user.id)
  .single();

  const isAdmin = userRole?.role === "admin";

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
                    Here are your favorite trips. Which one would you like to
                    cross off your bucket list?
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
              <div className="">
                <FavoriteTrips />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
