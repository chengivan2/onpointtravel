import { createClient } from "@/utils/supabase/server";
import { SearchBar } from "./components/SearchBar";
import TripCard from "./components/TripCard";
import Header from "../rootcomponents/header/Header";
import FooterBefore from "../rootcomponents/footerbefore/FooterBefore";
import Footer from "../rootcomponents/footer/Footer";

export const metadata = {
  title: "Trips - OnPoint Travel",
  description: "Explore and book your next adventure with OnPoint Travel",
  openGraph: {
    title: "Terms & Conditions - OnPoint Travel",
    description: "Read the terms and conditions for using OnPoint Travel services.",
    url: "https://onpointtravel.com/trips",
    images: [
      {
        url: "https://res.cloudinary.com/doqbnfais/image/upload/v1760291599/onPoint%20website%20concept/OnPoint_logo_multi-use_mh0fmr.png",
      },
    ],
  },
};

export default async function TripsPage({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string }>;
}) {
  const supabase = await createClient();
  const searchTerm = (await searchParams)?.query || "";

  let query = supabase.from("trips").select("*");

  if (searchTerm) {
    query = query
      .ilike("name", `%${searchTerm}%`)
      .ilike("short_description", `%${searchTerm}%`);
  }

  const { data: trips } = await query;

  return (
    <>
      <Header />
      <main className="mt-16 min-h-screen bg-green-50/20 dark:bg-green-900/10">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
            Where to?
          </h1>
      </div>
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-12">
            <SearchBar placeholder="Search trips..." />
          </div>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trips?.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </section>
        </div>
      </main>
      <FooterBefore />
      <Footer />
    </>
  );
}
