"use client";

import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Destination {
  id: string;
  name: string;
  slug: string;
  description: string;
  location: string;
  main_image_url?: string | null;
}

export default function DestinationCards() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDestinations() {
      setLoading(true);
      setError(null);
      try {
        const supabase = await createClient();
        const { data, error } = await supabase
          .from("destinations")
          .select("id, name, slug, description, location, main_image_url");
        if (error) {
          setError(error.message);
        } else {
          setDestinations(data || []);
        }
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    }
    fetchDestinations();
  }, []);

  if (loading) {
    return <div className="text-green-600 p-4">Loading destinations...</div>;
  }
  if (error) {
    return (
      <div className="text-red-500 p-4">
        Error loading destinations: {error}
      </div>
    );
  }
  if (!destinations || destinations.length === 0) {
    return (
      <div className="text-green-600 p-4">
        No destinations were found. Check back later.
      </div>
    );
  }

  return (
    <div className="bg-[url(/images/green-elephant-blob-no-bg.png)] bg-contain bg-center bg-repeat-y md:bg-no-repeat grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 py-[4rem] min-h-[100vh] relative">
      {destinations.map((destination, index) => {
        const imageUrl = destination.main_image_url;
        return (
          <motion.div
            key={destination.id}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ delay: index * 0.15, duration: 0.6, type: "spring" }}
            className="group flex flex-col justify-items-start relative cursor-pointer overflow-hidden rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
            style={{
              animation:
                "slit-in-diagonal-2 0.7s cubic-bezier(.23,1.01,.32,1) both",
              animationDelay: `${index * 0.08}s`,
            }}
          >
            <Link href={`/destinations/${destination.slug}`}>
              <div className="relative z-10 h-full flex flex-col bg-white/50 dark:bg-green-900/50 backdrop-blur-xl border border-gray-200/40 dark:border-green-900/30 rounded-xl p-6 transition-all duration-300 hover:bg-white/40 dark:hover:bg-green-900/30 shadow-sm hover:shadow-md">
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={destination.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={false}
                    />
                  ) : (
                    <div className="w-full h-full bg-green-100 dark:bg-green-800" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent" />
                </div>
                <h3 className="text-xl font-bold text-green-800 dark:text-green-100 mb-2">
                  {destination.name}
                </h3>
                <p className="text-lightmode-text-color/90 dark:text-green-200 text-sm mb-4">
                  {destination.location}
                </p>
                <p className="text-lightmode-text-color dark:text-darkmode-text-color text-base line-clamp-3">
                  {destination.description}
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
