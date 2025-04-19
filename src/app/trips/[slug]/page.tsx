import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { Gallery } from "./components/TripGallery";
import { RatingDisplay } from "../components/RatingDisplay";
import { Database } from "@/types/supabase";
import Header from "@/app/rootcomponents/header/Header";
import FooterBefore from "@/app/rootcomponents/footerbefore/FooterBefore";
import Footer from "@/app/rootcomponents/footer/Footer";
import { ImLocation2 } from "react-icons/im";
import Link from "next/link";
import { BookingForm } from "./components/BookingForm";
import FavoriteButton from "@/app/rootcomponents/trips/FavoriteButton";

export const metadata: Metadata = {
  title: "OnPoint Travel Trips",
  description: "Book your next trip with us",
};

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

interface Trip {
  id: string;
  name: string;
  short_description: string;
  description: string;
  main_featured_image_url: string;
  extra_featured_images: string[];
  price: number;
  destination: {
    name: string;
  };
  rating: number;
  slug: string;
  created_at: string;
  created_by: string | null;
  destination_id: string;
  is_featured: boolean | null;
  updated_at: string;
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
    .select(
      `
      id,
      name,
      short_description,
      description,
      main_featured_image_url,
      extra_featured_images,
      price,
      rating,
      destination:destinations!inner(name),
      slug
    `
    )
    .eq("slug", (await params).slug)
    .single()
    .returns<Trip>();

  const mainImage = (await trip)?.main_featured_image_url;

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
      <main className="mt-16 px-4 py-12 sm:px-6 lg:px-8">
        <section
          style={{ backgroundImage: `url(${mainImage})` }}
          className="flex justify-center lg:justify-start items-start lg:items-start p-[2rem] md:p-[3rem] lg:p-[4rem] relative min-w-full min-h-[100vh] bg-cover bg-center rounded-xl overflow-hidden mb-12"
        >
          <div className="absolute inset-0 bg-darkmode-bg-color opacity-30 dark:opacity-40 rounded-[0.7rem]"></div>
          <div className="relative flex flex-col p-2 md:p-3 lg:p-4 lg:w-[50%] bg-lightmode-header-bg-color/70 dark:bg-darkmode-header-bg-color/70 backdrop-blur-[2px] rounded-lg z-10">
            <div className="p-1 min-w-full">
              <h1 className="text-4xl font-bold text-green-800 dark:text-green-100 mb-4">
                {trip.name}
              </h1>
            </div>

            <div className="flex gap-[0.5rem] p-1 min-w-full">
              <ImLocation2
                size={15}
                className="text-green-600 dark:text-green-300"
              />
              <span>
                <h3 className="text-sm font-bold text-green-800 dark:text-green-100 mb-4">
                  {trip.destination.name}
                </h3>
              </span>
            </div>

            <div className="p-1 min-w-full">
              <p className="text-green-700/80 dark:text-green-200/80 text-sm mb-4">
                {trip.short_description}
              </p>
            </div>

            <div className="p-1 min-w-full flex items-center gap-2 mb-3">
              <RatingDisplay rating={trip.rating} />
            </div>

            <div className="p-1 min-w-full flex items-center gap-2 mb-3">
              <span className="text-3xl font-bold text-green-800 dark:text-green-100">
                ${trip.price}
              </span>
              <span className="text-green-600 dark:text-green-300 ml-2">
                /person/night
              </span>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="mb-12">
          <div className="w-full flex lg:flex-row ">
            <div>
              <h2 className="text-2xl font-bold text-green-800 dark:text-green-100 mb-6">
                Overview
              </h2>
              <p className="text-green-700 dark:text-green-300 leading-relaxed">
                {trip.description}
              </p>
            </div>

            <div>
              <h2>I like this trip</h2>
              <FavoriteButton tripId={trip.id} heartIconSize={100} />
            </div>
          </div>
        </section>

        <section className="mb-12 min-h[60vh]">
          <h2 className="text-2xl font-bold text-green-800 dark:text-green-100 mb-6">
            Trip Gallery
          </h2>
          <Gallery images={trip.extra_featured_images} />
        </section>

        {/* Facilities Section */}
        {/* <div className="mb-12">
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
        </div> */}

        {/* Location Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-green-800 dark:text-green-100 mb-6">
            The Location You're Going To
          </h2>
          <div className="aspect-video rounded-xl overflow-hidden">
            <iframe
              src={`https://maps.google.com/maps?q=${trip.destination.name}&output=embed`}
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        </section>

        <section className="mb-12">
          <BookingForm trip={trip} />
        </section>
      </main>
      <FooterBefore />
      <Footer />
    </>
  );
}
