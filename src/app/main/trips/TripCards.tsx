"use client";

import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Trip {
  id: string;
  name: string;
  short_description: string;
  description: string;
  main_featured_image_url: string;
  price: number;
  destination: {
    name: string;
  };
  slug: string;
  created_at: string;
}

export default function TripCards() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTrips() {
      setLoading(true);
      setError(null);
      try {
        const supabase = await createClient();
        const { data, error } = await supabase
          .from("trips")
          .select(
            `id, name, short_description, description, main_featured_image_url, price, destination:destinations!inner(name), slug, created_at`
          )
          .order("created_at", { ascending: false })
          .limit(6);
        if (error) {
          setError(error.message);
        } else {
          const tripsData = (data || []).map((trip: any) => ({
            ...trip,
            destination: Array.isArray(trip.destination) ? trip.destination[0] : trip.destination,
          }));
          setTrips(tripsData);
        }
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    }
    fetchTrips();
  }, []);

  if (loading) {
    return <div className="text-green-600 p-4">Loading trips...</div>;
  }
  if (error) {
    return (
      <div className="text-red-500 p-4">
        Error loading trips: {error}
      </div>
    );
  }
  if (!trips || trips.length === 0) {
    return (
      <div className="text-green-600 p-4">
        No trips available currently. Check back later!
      </div>
    );
  }

  return (
    <div className="py-16 px-4 md:px-8 lg:px-16 bg-contain bg-center bg-repeat-y md:bg-no-repeat bg-[url(https://res.cloudinary.com/doqbnfais/image/upload/v1745310480/onPoint%20website%20concept/website%20assets/website%20images/website%20design%20and%20stock%20photos/green_blob_fztfvo.png)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 cursor-pointer relative">
          {/* SVG background shapes behind cards */}
          <svg
            className="absolute -z-10 left-0 top-0 w-full h-full pointer-events-none"
            viewBox="0 0 900 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse
              cx="250"
              cy="100"
              rx="120"
              ry="40"
              fill="#bbf7d0"
              fillOpacity="0.18"
            />
            <ellipse
              cx="800"
              cy="350"
              rx="100"
              ry="30"
              fill="#34d399"
              fillOpacity="0.12"
            />
            {/* Example animal silhouette (cheetah) */}
            <path
              d="M500 350 Q520 320 560 340 Q570 310 610 330 Q620 340 640 350 Q630 360 610 355 Q600 370 580 360 Q560 370 540 355 Q520 360 500 350 Z"
              fill="#047857"
              fillOpacity="0.08"
            />
          </svg>
          {trips.map((trip, index) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{
                delay: index * 0.15,
                duration: 0.6,
                type: "spring",
              }}
              className="group relative"
            >
              <Link href={`/trips/${trip.slug}`}>
                <div className="group relative backdrop-blur-xl bg-white/50 dark:bg-green-900/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100/30 dark:border-green-900/30 overflow-hidden">
                  {/* Image Section */}
                  <div className="relative h-48">
                    <Image
                      src={trip.main_featured_image_url}
                      alt={trip.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={false}
                    />
                  </div>
                  {/* Content Section */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-green-800 dark:text-green-100 mb-2">
                      {trip.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <svg
                        className="w-5 h-5 text-green-600 dark:text-green-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <h5>{trip.destination?.name || "Unknown Destination"}</h5>
                    </div>
                    <p className="text-lightmode-text-color dark:text-darkmode-text-color text-sm mb-4 line-clamp-3">
                      {trip.short_description}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="space-y-1">
                        <span className="text-3xl font-bold text-green-700 dark:text-green-300 font-heading">
                          {trip.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                            maximumFractionDigits: 0,
                          })}
                        </span>
                        <span className="block text-sm text-green-600/80 dark:text-green-300/80">
                          per person
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-green-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
