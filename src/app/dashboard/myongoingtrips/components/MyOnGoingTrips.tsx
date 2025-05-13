import { createClient } from "@/utils/supabase/server";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface Booking {
  id: string;
  start_date: string;
  end_date: string;
  trips: { name: string; main_featured_image_url: string };
}

export default async function MyOngoingTrips() {
  const supabase = await createClient();

  // Fetch ongoing trips for the logged-in user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <p>Please log in to view your ongoing trips.</p>;
  }

  const { data: ongoingTrips, error } = await supabase
    .from("bookings")
    .select(
      `
      id,
      start_date,
      end_date,
      trips (
        name,
        main_featured_image_url
      )
      `
    )
    .eq("user_id", user.id)
    .eq("status", "ongoing")
    .returns<Booking[]>();

  if (error) {
    toast.error("Failed to load ongoing trips. Please try again.");
    return <p>Failed to load ongoing trips.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-800 dark:text-green-100 mb-6">
        My Ongoing Trips
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ongoingTrips.map((trip) => (
          <div
            key={trip.id}
            className="mb-3 md:mb-[reset] relative rounded-2xl shadow-xl p-6 border bg-white/30 dark:bg-green-900/30 backdrop-blur-sm backdrop-saturate-150"
          >
            {/* Glowing Dot */}
            <span className="absolute top-4 right-4 flex items-center bg-green-300/50 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm">
              <div className="relative mr-2">
                <div className="absolute animate-pulse-up -inset-1 bg-gradient-to-r from-green-400/60 to-green-600/60 rounded-full blur-[2px]"></div>
                <div className="relative w-2 h-2 rounded-full bg-green-700 dark:bg-green-300"></div>
              </div>
              Ongoing
            </span>

            {/* Trip Name and Dates */}
            <div className="mb-4">
              <h3 className="text-xl font-bold text-green-800 dark:text-green-100">
                {trip.trips.name}
              </h3>
              <p className="text-green-600 dark:text-green-300">
                {new Date(trip.start_date).toLocaleDateString()} -{" "}
                {new Date(trip.end_date).toLocaleDateString()}
              </p>
            </div>

            {/* Progress Bar */}
            <Progress
              value={
                ((new Date().getTime() - new Date(trip.start_date).getTime()) /
                  (new Date(trip.end_date).getTime() -
                    new Date(trip.start_date).getTime())) *
                100
              }
              className="h-[0.8rem] bg-green-200/50 dark:bg-green-100/80 rounded-full"
            />

            {/* Trip Image */}
            <div
              className="mt-4 bg-cover bg-center h-[40vh] rounded-xl"
              style={{
                backgroundImage: `url(${trip.trips.main_featured_image_url})`,
              }}
            ></div>

            {/* Green SVG for Glassmorphism */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg
                className="w-32 h-32 opacity-10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 0v10m0 0l3-3m-3 3l-3-3"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
