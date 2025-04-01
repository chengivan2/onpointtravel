import { createClient } from '@/utils/supabase/server';
import DestinationCard from './components/DestinationCard';
import TripCard from './components/TripCard';

export default async function DestinationsPage() {
  const supabase = await createClient();

  // Fetch all destinations
  const { data: destinations } = await supabase
    .from('destinations')
    .select('id, name, slug, location, main_image_url');

  // Fetch featured trips (without destination relationship)
  const { data: featuredTrips } = await supabase
    .from('trips')
    .select('id, name, slug, short_description, main_featured_image_url, price, rating')
    .eq('is_featured', true);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Featured Trips Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
            Featured Travel Packages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTrips?.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
              />
            ))}
          </div>
        </section>

        {/* All Destinations Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
            Explore Destinations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {destinations?.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={{
                  id: destination.id,
                  name: destination.name,
                  slug: destination.slug,
                  location: destination.location,
                  main_image_url: destination.main_image_url
                }}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}