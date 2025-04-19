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
    <div className="relative flex flex-col">
      {/* --- Background Image Section --- */}

      <div
        key={selectedTrip.id}
        className="absolute inset-0 z-0 ease-in-out rounded-[0.7rem]"
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
        <div className="absolute inset-0 bg-[#181818] opacity-30 dark:opacity-40 rounded-[0.7rem]"></div>
      </div>

      <div className="relative z-10 flex flex-col justify-between gap-[3rem] flex-grow px-3 py-8 md:px-5 md:pt-12 md:pb-10 lg:px-10 lg:pt-22 lg:pb-20 rounded-[0.7rem] shadow-lg transition-all duration-300">
        {/* Main Text Content */}
        <div className="min-w-full min-h-full flex flex-col items-start pt-[2rem] md:pt-[2rem] px-[2rem] lg:px-[3rem]">
          <p className="text-sm tracking-widest text-[#F5F5F5] mb-2">
            Today's Featured Trips
          </p>

          <h1
            key={`${selectedTrip.id}-title`}
            className="text-green-100 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 transition-all duration-300"
          >
            {selectedTrip.name}
          </h1>
          <p
            key={`${selectedTrip.id}-desc`}
            className="text-sm md:text-md lg:text-lg text-green-200/90 mb-6 max-w-2xl leading-relaxed transition-all duration-300"
          >
            {selectedTrip.short_description}
          </p>
        </div>

        {/* Trips thumbnails */}
        <div className="mt-auto">
          <div className="w-full flex flex-wrap flex-end justify-end gap-5">
            {initialTrips.map((trip) => (
              <button
                key={trip.id}
                onClick={() => handleThumbnailClick(trip)}
                className={`relative aspect-2/3 h-25 md:h-35 lg:h-60 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-950 ${
                  selectedTrip.id === trip.id
                    ? "ring-2 ring-green-400 dark:ring-green-900 opacity-100 scale-105" // Highlight selected
                    : "opacity-80 hover:opacity-100 hover:scale-105" // Style for non-selected
                }`}
                aria-label={`View details for ${trip.name}`}
              >
                <div className="absolute inset-0 bg-[#181818] opacity-30 dark:opacity-40 rounded-[0.7rem]"></div>

                {trip.main_featured_image_url && (
                  <Image
                    src={trip.main_featured_image_url}
                    alt={trip.name}
                    fill
                    style={{ objectFit: "cover" }}
                    quality={100}
                    sizes="32vw 25vw"
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                )}
                {/* Optional Name Overlay on Thumbnail */}
                <div className="absolute bottom-0 left-0 right-0 p-1 bg-gradient-to-t from-blacik/700 via-black/400 to-transparent">
                  <span className="text-xs font-medium text-[#F8F8F8] block">
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
