// destinations/page.tsx
import { createClient } from "@/utils/supabase/server";
import DestinationCard from "./components/DestinationCard";
import TripCard from "./components/TripCard";

export default async function DestinationsPage() {
  const supabase = await createClient();

  // Fetch all destinations with error handling
  const { data: destinations, error: destinationsError } = await supabase
    .from("destinations")
    .select("id, name, description, location, main_image_url, slug");

  // Fetch featured trips with error handling
  const { data: featuredTrips, error: tripsError } = await supabase
    .from("trips")
    .select("id, name, slug, short_description, main_featured_image_url, price, rating")
    .eq("is_featured", true);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Featured Trips Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
            Featured Travel Packages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTrips?.length ? (
              featuredTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">
                No featured trips available
              </p>
            )}
          </div>
        </section>

        {/* All Destinations Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
            Explore Destinations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {destinations?.length ? (
              destinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={{
                    id: destination.id,
                    name: destination.name,
                    description: destination.description,
                    location: destination.location,
                    main_image_url: destination.main_image_url,
                    slug: destination.slug
                  }}
                />
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">
                No destinations found
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}