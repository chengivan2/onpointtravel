import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import { DashboardSidebar } from "../components/sidebar/DashboardSideBar";
import { redirect } from "next/navigation";
import BookingsTable from "./components/BookingsTable";
import { toast } from "sonner";

export const metadata: Metadata = {
  title: "My Bookings - OnPoint Dashboard",
  description: "View and manage your bookings",
};

export default async function MyBookingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  // Fetch the user's bookings
  const { data: bookings, error } = await supabase
    .from("bookings")
    .select("id, trip_id, start_date, end_date, number_of_people, total_price, status, user_id")
    .eq("user_id", user.id);

  if (error) {
    toast.error("Failed to load your bookings. Please try again.");
    return <p>Error loading bookings.</p>;
  }

  // Only show user bookings, not admin/agent data
  // (No changes needed here, as only the logged-in user's bookings are fetched)

  // Fetch trip details for each booking
  const tripIds = bookings.map((booking) => booking.trip_id);
  const { data: trips } = await supabase
    .from("trips")
    .select("id, name, description, destination_id")
    .in("id", tripIds);

  // Fetch user info for invoice PDF
  const { data: userProfile } = await supabase
    .from("users")
    .select("id, first_name, last_name, email")
    .eq("id", user.id)
    .single();

  const bookingsWithTripDetails = bookings.map((booking) => ({
    ...booking,
    trip: trips?.find((trip) => trip.id === booking.trip_id) || null,
    user: {
      id: userProfile?.id,
      name: `${userProfile?.first_name || ""} ${userProfile?.last_name || ""}`.trim() || userProfile?.email || "",
      email: userProfile?.email || "",
    },
  }));

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
                  <h2 className="text-2xl font-semibold">My Bookings</h2>
                  <p className="text-sm md:text-md lg:text-lg text-gray-800 dark:text-gray-200">
                    View and manage your trips.
                  </p>
                </div>
              </div>
              <div className="overflow-x-auto">
                {/* Pass bookingsWithTripDetails to the client component */}
                <BookingsTable bookings={bookingsWithTripDetails} />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
