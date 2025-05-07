import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import { DashboardSidebar } from "../components/sidebar/DashboardSideBar";
import { redirect } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";

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
    .select("id, trip_id, start_date, end_date, number_of_people, total_price, status")
    .eq("user_id", user.id);

  if (error) {
    console.error("Error fetching bookings:", error);
    return <p>Error loading bookings.</p>;
  }

  // Fetch trip details for each booking
  const tripIds = bookings.map((booking) => booking.trip_id);
  const { data: trips } = await supabase
    .from("trips")
    .select("id, name, destination, description")
    .in("id", tripIds);

  const bookingsWithTripDetails = bookings.map((booking) => ({
    ...booking,
    trip: trips?.find((trip) => trip.id === booking.trip_id),
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
                <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                        Trip Name
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                        Start Date
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                        End Date
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookingsWithTripDetails?.map((booking) => (
                      <BookingRow key={booking.id} booking={booking} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

function BookingRow({ booking }: { booking: any }) {
  return (
    <tr>
      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
        {booking.trip?.name || "Unknown Trip"}
      </td>
      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
        {booking.start_date}
      </td>
      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
        {booking.end_date}
      </td>
      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
        {booking.status}
      </td>
      <td className="px-6 py-4 text-sm">
        <Dialog>
          <DialogTrigger asChild>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              View Trip
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{booking.trip?.name || "Unknown Trip"}</DialogTitle>
              <DialogDescription>
                {booking.trip?.description || "No description available."}
              </DialogDescription>
            </DialogHeader>
            <button
              onClick={() => alert("Booking trip again!")}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 mt-4"
            >
              Go Again
            </button>
          </DialogContent>
        </Dialog>
      </td>
    </tr>
  );
}