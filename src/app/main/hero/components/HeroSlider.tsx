import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import TripHeroSection from "./TripHeroSection";

type Trip = Database["public"]["Tables"]["trips"]["Row"];

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getTrip(): Promise<{ trips: Trip[]; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from("trips")
      .select("*")
      .eq("is_featured", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error.message);
      return { trips: [], error: `Failed to load trips: ${error.message}` };
    }

    if (!data) {
      return { trips: [], error: "No trips data found." };
    }
    const validatedData = data.filter(
      (trip) =>
        trip.id &&
        trip.name &&
        trip.short_description &&
        trip.main_featured_image_url &&
        trip.slug
    ) as Trip[];

    return { trips: validatedData, error: null };
  } catch (error: any) {
    console.error("Error fetching trips:", error.message);
    return {
      trips: [],
      error: `Unexpected error fetching trips: ${error.message}`,
    };
  }
}

export default async function HeroSlider() {
  const { trips, error } = await getTrip();

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!trips || trips.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        No trip data available.
      </div>
    );
  }

  // Client Component responsible for interactivity
  return <TripHeroSection initialTrips={trips} />;
}
