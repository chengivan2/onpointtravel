import type { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import DestinationCard from "./components/DestinationCard";
import TripCard from "./components/TripCard";
import Header from "../rootcomponents/header/Header";
import FooterBefore from "../rootcomponents/footerbefore/FooterBefore";
import Footer from "../rootcomponents/footer/Footer";

export const metadata: Metadata = {
  title: "OnPoint Travel Destinations",
  description: "Discover different destinations",
};

export default async function DestinationsPage() {
  const supabase = await createClient();

  // Fetch destinations with all required fields
  const { data: destinations } = await supabase
    .from("destinations")
    .select("*");

  // Fetch trips with all required fields
  const { data: featuredTrips } = await supabase
    .from("trips")
    .select("*")
    .eq("is_featured", true);

  return (
    <>
      <Header />
      <main className="min-h-screen max-w-7xl mx-auto mt-16 px-4 py-12 sm:px-6 lg:px-8">
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
