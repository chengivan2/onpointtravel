import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Image from "next/image";
import TripCard from "../components/TripCard";
import { Database } from "@/types/supabase";
import Header from "@/app/rootcomponents/header/Header";
import FooterBefore from "@/app/rootcomponents/footerbefore/FooterBefore";
import Footer from "@/app/rootcomponents/footer/Footer";

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
      <main className="mt-16">
        <section className="relative flex flex-col lg:flex-row items-center justify-between bg-cover bg-center rounded-lg min-h-[100vh] px-[0.8rem] lg:px-[1rem] py-[0.8rem] lg:py-[2rem]" style={{ backgroundImage: `url(${destination.main_image_url})` }}>
          {/* Title and Description */}
          <div className="flex-1 flex flex-col justify-center items-start text-center lg:text-left bg-white/70 dark:bg-green-900/70 p-6 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-green-800 dark:text-green-100">
              {destination.name}
            </h1>
            <p className="text-xl text-green-600 dark:text-green-300 mt-2">
              {destination.location}
            </p>
            <p className="mt-4 text-green-700 dark:text-green-300">
              {destination.description}
            </p>
          </div>

          {/* Image */}
          <div className="flex-1 relative aspect-video lg:aspect-auto rounded-lg overflow-hidden shadow-lg lg:ml-8 mt-8 lg:mt-0">
            <Image
              src={destination.main_image_url}
              alt={destination.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
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
