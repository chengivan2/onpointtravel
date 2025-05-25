import type { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import DestinationCard from "./components/DestinationCard";
import TripCard from "./components/TripCard";
import { SearchBar } from "./components/SearchBar";
import Header from "../rootcomponents/header/Header";
import FooterBefore from "../rootcomponents/footerbefore/FooterBefore";
import Footer from "../rootcomponents/footer/Footer";
import FeaturedDestination from "./components/FeaturedDestination";

export const metadata: Metadata = {
  title: "OnPoint Travel Destinations",
  description: "Discover different destinations",
};

export default async function DestinationsPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const supabase = await createClient();
  const query = ((await searchParams)?.query as string || "").toLowerCase();

  // Fetch destinations with all required fields
  const { data: destinations } = await supabase
    .from("destinations")
    .select("*");

  // Filter destinations based on search query
  const filteredDestinations = destinations?.filter((destination) => {
    if (!query) return true;
    return (
      destination.name.toLowerCase().includes(query) ||
      destination.location.toLowerCase().includes(query) ||
      destination.description.toLowerCase().includes(query)
    );
  });

  // Fetch trips with all required fields
  const { data: featuredTrips } = await supabase
    .from("trips")
    .select("*")
    .eq("is_featured", true);

  return (
    <>
      <Header />
      <main className="min-h-[100vh] w-full mt-16">
        {/* Featured Destination - Full width */}
        <section className="h-[98vh] p-4 mt-8">
          <FeaturedDestination />
        </section>

        {/* Destinations Grid - Contained width */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">          <h2 className="text-3xl text-center font-bold text-green-800 dark:text-green-100 mb-8">
            Explore Destinations
          </h2>
          <div className="mb-8">
            <SearchBar placeholder="Search destinations by name or location..." />
          </div>          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDestinations?.length ? (
              filteredDestinations.map((destination) => (
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

        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-green-800 dark:text-green-100 my-8">
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
      </main>
      <FooterBefore />
      <Footer />
    </>
  );
}
