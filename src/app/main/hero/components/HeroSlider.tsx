import { createClient } from "@/utils/supabase/server";
import { Database } from "@/types/supabase";
import TripHeroSection from "./TripHeroSection";

type Trip = Database["public"]["Tables"]["trips"]["Row"];

const supabase = await createClient();

async function getTrip(): Promise<{ trips: Trip[]; error: string | null }> {
  try {
    // Fetch data directly on the server
    const { data, error } = await supabase
      .from("trips") // Your table name
      .select("*")
      .order("order", { ascending: true }); // Optional ordering

    if (error) {
      console.error("Supabase error:", error.message);
      return { trips: [], error: `Failed to load animals: ${error.message}` };
    }

    if (!data) {
      return { trips: [], error: "No animal data found." };
    }

    // Basic validation (optional but recommended)
    const validatedData = data.filter(
      (trip) =>
        trip.id &&
        trip.name &&
        trip.title &&
        trip.description &&
        trip.main_image_url &&
        trip.thumbnail_image_url
    ) as Trip[];

    return { trips: validatedData, error: null };
  } catch (error: any) {
    console.error("Error fetching animals:", error.message);
    return {
      trips: [],
      error: `Unexpected error fetching animals: ${error.message}`,
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
        No animal data available.
      </div>
    );
  }

  // Render the Client Component responsible for interactivity, passing data as props
  return <TripHeroSection initialTrips={trips} />;
}
