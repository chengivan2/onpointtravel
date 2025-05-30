"use client";

import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaLocationArrow } from "react-icons/fa6";

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
            destination: Array.isArray(trip.destination)
              ? trip.destination[0]
              : trip.destination,
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
    return <div className="text-red-500 p-4">Error loading trips: {error}</div>;
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
              style={{
                animation:
                  "slit-in-diagonal-2 0.7s cubic-bezier(.23,1.01,.32,1) both",
                animationDelay: `${index * 0.08}s`,
              }}
            >
              <Link href={`/trips/${trip.slug}`}>
                <div className="group relative bg-white/50 dark:bg-green-900/50 backdrop-blur-2xl rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100/30 dark:border-green-900/30 overflow-hidden">
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
                      <FaLocationArrow className="text-lightmode-text-color dark:text-darkmode-text-color text-sm" />
                      <h5>{trip.destination?.name || "Unknown Destination"}</h5>
                    </div>
                    <p className="text-lightmode-text-color dark:text-darkmode-text-color text-sm mb-4 line-clamp-3">
                      {trip.short_description}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="space-y-1">
                        <span className="text-3xl font-bold text-lightmode-text-color dark:text-darkmode-text-color font-heading">
                          {trip.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                            maximumFractionDigits: 0,
                          })}
                        </span>
                        <span className="block text-sm text-lightmode-text-color/90 dark:text-darkmode-text-color/90">
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
