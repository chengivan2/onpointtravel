import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Image from "next/image";
import { RatingDisplay } from "../components/RatingDisplay";
import { Database } from "@/types/supabase";
import Header from "@/app/rootcomponents/header/Header";
import FooterBefore from "@/app/rootcomponents/footerbefore/FooterBefore";
import Footer from "@/app/rootcomponents/footer/Footer";

export async function generateStaticParams() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data: trips } = await supabase.from("trips").select("slug");

  return (trips ?? []).map((trip) => ({
    slug: trip.slug,
  }));
}

export default async function TripPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: trip } = await supabase
    .from("trips")
    .select("*")
    .eq("slug", (await params).slug)
    .single();

  const mainImage = (await trip).main_featured_image_url;

  if (!trip) return notFound();

  const getRatingWord = (rating: number) => {
    if (rating >= 4.8) return "Excellent";
    if (rating >= 4.5) return "Very Good";
    if (rating >= 4.0) return "Good";
    return "Good";
  };

  return (
    <>
      <Header />
      <main className="max-w-7xl mt-16 mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-green-800 dark:text-green-100 mb-4">
            {trip.name}
          </h1>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-green-600 dark:text-green-300">
              {trip.location}
            </span>
            <RatingDisplay rating={trip.rating} />
            <span className="text-green-600 dark:text-green-300">
              ({trip.review_count} Reviews)
            </span>
          </div>

          <div className="bg-white/60 dark:bg-green-900/20 p-6 rounded-xl border border-green-100/30 dark:border-green-900/30">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-3xl font-bold text-green-800 dark:text-green-100">
                  ${trip.price}
                </span>
                <span className="text-green-600 dark:text-green-300 ml-2">
                  / person
                </span>
              </div>
              <div className="space-x-4">
                <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors">
                  Buy Now
                </button>
                <button className="border-2 border-green-600 text-green-600 dark:text-green-300 px-8 py-3 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div
          className={`relative min-w-full min-h-[100vh] bg-cover bg-center bg-[url(${mainImage})] rounded-xl overflow-hidden mb-12`}
        ></div>

        {/* Overview Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-green-800 dark:text-green-100 mb-6">
            Overview
          </h2>
          <p className="text-green-700 dark:text-green-300 leading-relaxed">
            {trip.description}
            <button className="text-green-600 dark:text-green-300 ml-2 hover:underline">
              Read More
            </button>
          </p>
        </div>

        {/* Facilities Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-green-800 dark:text-green-100 mb-6">
            Our Best Facilities
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {trip.facilities?.map((facility: string) => (
              <div
                key={facility}
                className="p-4 text-center bg-white/60 dark:bg-green-900/20 rounded-lg border border-green-100/30 dark:border-green-900/30"
              >
                <span className="text-green-700 dark:text-green-300">
                  {facility}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Location Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-green-800 dark:text-green-100 mb-6">
            The Location You're Going To
          </h2>
          <div className="aspect-video rounded-xl overflow-hidden">
            <iframe
              src={`https://maps.google.com/maps?q=${trip.location}&output=embed`}
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        </div>
      </main>
      <FooterBefore />
      <Footer />
    </>
  );
}
