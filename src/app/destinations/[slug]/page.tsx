import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Image from "next/image";
import TripCard from "../components/TripCard";
import { Database } from "@/types/supabase";
import Header from "@/app/rootcomponents/header/Header";
import FooterBefore from "@/app/rootcomponents/footerbefore/FooterBefore";
import Footer from "@/app/rootcomponents/footer/Footer";
import { FaL, FaLocationArrow } from "react-icons/fa6";

export async function generateStaticParams() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: destinations } = await supabase
    .from("destinations")
    .select("slug");

  return (destinations ?? []).map(({ slug }) => ({ slug }));
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: destination } = await supabase
    .from("destinations")
    .select("*")
    .eq("slug", (await params).slug)
    .single();

  if (!destination) return notFound();

  const { data: trips } = await supabase
    .from("trips")
    .select("*")
    .eq("destination_id", destination.id);

  return (
    <>
      <Header />
      <main className="mt-18">
        <section className="relative min-h-[100vh] flex justify-center px-[0.8rem] lg:px-[1rem] py-[0.8rem] lg:py-[2rem]">
          <div className="min-w-full min-h-[98vh] flex gap-0 flex-col md:flex-row items-start justify-start rounded-lg shadow-lg">
            <div className="relative h-full w-full md:w-[40%] flex flex-col justify-center items-start text-center lg:text-left bg-white/70 dark:bg-green-900/70 backdrop-blur-[2px] p-6 rounded-tl-lg rounded-tr-lg md:rounded-tr-none md:rounded-bl-lg">
              <h1 className="text-4xl font-bold text-green-800 dark:text-green-100">
                {destination.name}
              </h1>
              
              <span className="flex flex-row flex-wrap gap-2 mt-4 text-green-700 dark:text-green-300">
                <FaLocationArrow className="inline-block text-green-600 dark:text-green-300 mr-2" />
              <p className="text-xl text-green-600 dark:text-green-300 mt-2">
                {destination.location}
              </p>
              </span>

              <p className="mt-4 text-green-700 dark:text-green-300">
                {destination.description}
              </p>
            </div>

            {/* Image */}
            <div
              className="relative h-full w-full md:w-[60%] rounded-br-lg rounded-bl-lg md:rounded-bl-none md:rounded-tr-lg bg-cover bg-center shadow-lg"
              style={{ backgroundImage: `url(${destination.main_image_url})` }}
            ></div>
          </div>
        </section>

        {trips?.length ? (
          <section className="px-[0.8rem] lg:px-[1rem] py-[0.8rem] lg:py-[2rem] min-w-full min-h-[100vh]">
            <h2 className="text-3xl font-bold text-green-800 dark:text-green-100 mb-8">
              Available Trips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          </section>
        ) : (
          <div className="text-center py-12 text-green-600">
            No trips available for this destination
          </div>
        )}
      </main>
      <FooterBefore />
      <Footer />
    </>
  );
}
