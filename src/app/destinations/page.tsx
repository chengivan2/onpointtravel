import { createClient } from "@/utils/supabase/server"
import DestinationCard from "./components/DestinationCard"
import TripCard from "./components/TripCard"
import { Database } from '@/types/supabase'
import Header from "../rootcomponents/header/HomeHeader"
import FooterBefore from "../rootcomponents/footerbefore/FooterBefore"
import Footer from "../rootcomponents/footer/Footer"

export default async function DestinationsPage() {
  const supabase = await createClient()

  // Fetch destinations with all required fields
  const { data: destinations } = await supabase
    .from("destinations")
    .select("id, name, description, location, main_image_url, slug, created_at, updated_at, created_by")

  // Fetch trips with all required fields
  const { data: featuredTrips } = await supabase
    .from("trips")
    .select("id, name, short_description, main_featured_image_url, price, rating, created_at, created_by, destination_id, extra_featured_images, is_featured, description, updated_at")
    .eq("is_featured", true)

  return (
    <>
    <Header />
      <main className="min-h-screen max-w-7xl mx-auto mt-16 px-4 py-12 sm:px-6 lg:px-8">
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-green-800 dark:text-green-100 mb-8">
            Featured Travel Packages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTrips?.length ? (
              featuredTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))
            ) : (
              <p className="text-green-600 col-span-full text-center">
                No featured trips available
              </p>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-green-800 dark:text-green-100 mb-8">
            Explore Destinations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {destinations?.length ? (
              destinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                />
              ))
            ) : (
              <p className="text-green-600 col-span-full text-center">
                No destinations found
              </p>
            )}
          </div>
        </section>
      </main>
      <FooterBefore />
      <Footer />
    </>
  )
}