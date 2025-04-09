"use client";

import { useState } from "react";
import Image from "next/image";
import { Database } from "@/types/supabase";
import Link from "next/link";

type Trip = Database["public"]["Tables"]["trips"]["Row"];

interface TripHeroSectionProps {
  initialTrips: Trip[];
}

export default function TripHeroSection({
  initialTrips,
}: TripHeroSectionProps) {
  // State to keep track of the currently selected trip
  // Initialize with the first trip from the props
  const [selectedTrip, setSelectedTrip] = useState<Trip>(initialTrips[0]);

  const handleThumbnailClick = (trip: Trip) => {
    setSelectedTrip(trip);
  };

  return (
    <div className="relative flex flex-col h-[98vh]">
      {/* --- Background Image Section --- */}

      <div
        key={selectedTrip.id}
        className="absolute inset-0 z-0 ease-in-out rounded-[0.7rem] h-[98vh]"
      >
        {selectedTrip.main_featured_image_url && (
          <Image
            src={selectedTrip.main_featured_image_url}
            alt={`${selectedTrip.name} background`}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-[0.7rem]"
            unoptimized={selectedTrip.main_featured_image_url.endsWith(".gif")}
          />
        )}
        <div className="absolute inset-0 bg-darkmode-bg-color opacity-30 dark:opacity-40 rounded-[0.7rem]"></div>
      </div>

      <div className="relative z-10 flex flex-col justify-between flex-grow px-2 py-4 md:px-4 md:py-8 lg:px-8 lg:py-16 rounded-[0.7rem] shadow-lg transition-all duration-300">
        {/* Main Text Content */}
        <div className="min-w-full flex flex-col items-start justify-center">
          <p className="text-sm uppercase tracking-widest text-[#F5F5F5] mb-2">
            Book Our Most Popular Trips
          </p>

          <h1
            key={`${selectedTrip.id}-title`}
            className="text-green-800 dark:text-green-100 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 transition-all duration-300"
          >
            {selectedTrip.name}
          </h1>
          <p
            key={`${selectedTrip.id}-desc`}
            className="text-sm text-green-700/80 dark:text-green-200/80 mb-6 max-w-2xl leading-relaxed transition-all duration-300"
          >
            {selectedTrip.short_description}
          </p>
          <div className="flex space-x-4">
            <Link href={`/trips/${selectedTrip.slug}`}>
              <button className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors duration-300">
                Book Now
              </button>
            </Link>
          </div>
        </div>

        {/* Bento Grid Section */}
        <div className="mt-auto">
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 md:gap-4 max-w-xl lg:max-w-2xl">
            {initialTrips.map((trip) => (
              <button
                key={trip.id}
                onClick={() => handleThumbnailClick(trip)}
                className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-950 ${
                  selectedTrip.id === trip.id
                    ? "ring-2 ring-green-400 dark:ring-green-900 opacity-100 scale-105" // Highlight selected
                    : "opacity-70 hover:opacity-100 hover:scale-105" // Style for non-selected
                }`}
                aria-label={`View details for ${trip.name}`}
              >
                {trip.main_featured_image_url && (
                  <Image
                    src={trip.main_featured_image_url}
                    alt={trip.name}
                    fill
                    style={{ objectFit: "cover" }}
                    quality={75}
                    sizes="(max-width: 640px) 33vw, 20vw"
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                )}
                {/* Optional Name Overlay on Thumbnail */}
                <div className="absolute bottom-0 left-0 right-0 p-1 bg-gradient-to-t from-black/70 via-black/40 to-transparent text-center">
                  <span className="text-xs font-medium text-white block">
                    {trip.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
