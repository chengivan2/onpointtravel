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
  // State to keep track of the currently selected animal
  // Initialize with the first animal from the props
  const [selectedTrip, setSelectedTrip] = useState<Trip>(initialTrips[0]);

  const handleThumbnailClick = (trip: Trip) => {
    setSelectedTrip(trip);
  };

  // --- The rest of the JSX is very similar to the Pages Router example ---
  return (
    <div className="relative flex flex-col min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* --- Background Image Section --- */}
      {/* Key is still important for triggering transitions */}
      <div
        key={selectedTrip.id}
        className="absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out"
      >
        {selectedTrip.main_featured_image_url && ( // Add check for url existence
          <Image
            src={selectedTrip.main_featured_image_url}
            alt={`${selectedTrip.name} background`}
            fill
            style={{ objectFit: "cover" }}
            quality={85}
            className="opacity-40" // Adjust opacity
            unoptimized={selectedTrip.main_featured_image_url.endsWith(".gif")} // Example: prevent optimization for gifs
          />
        )}
        {/* <div className="absolute inset-0 bg-black/60"></div> */}
      </div>

      {/* --- Content Section (Positioned above background) --- */}
      <div className="relative z-10 flex flex-col justify-between flex-grow p-8 md:p-16 lg:p-24">
        {/* Top Navigation Placeholder (Optional) */}
        <nav className="flex justify-between items-center mb-8 opacity-80">
          {/* ... nav content ... */}
        </nav>

        {/* Main Text Content */}
        <div className="max-w-3xl mb-12">
          <p className="text-sm uppercase tracking-widest text-gray-300 mb-2">
            Book Our Most Popular Trips
          </p>
          {/* Animate presence or key can help text transitions if desired */}
          <h1
            key={`${selectedTrip.id}-title`}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 transition-all duration-300 animate-fade-in"
          >
            {selectedTrip.name}
          </h1>
          <p
            key={`${selectedTrip.id}-desc`}
            className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 max-w-2xl leading-relaxed transition-all duration-300 animate-fade-in"
          >
            {selectedTrip.short_description}
          </p>
          <div className="flex space-x-4">
            <Link href={`/trips/${selectedTrip.slug}`}>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded transition-colors duration-300">
                Read More
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
                className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                  selectedTrip.id === trip.id
                    ? "ring-2 ring-yellow-400 opacity-100 scale-105" // Highlight selected
                    : "opacity-70 hover:opacity-100 hover:scale-105" // Style for non-selected
                }`}
                aria-label={`View details for ${trip.name}`}
              >
                {trip.main_featured_image_url && ( // Add check for url existence
                  <Image
                    src={trip.main_featured_image_url}
                    alt={trip.name}
                    fill
                    style={{ objectFit: "cover" }}
                    quality={75}
                    sizes="(max-width: 640px) 33vw, 20vw" // Help optimizer choose correct size
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                )}
                {/* Optional Name Overlay on Thumbnail */}
                <div className="absolute bottom-0 left-0 right-0 p-1 bg-gradient-to-t from-black/70 via-black/40 to-transparent text-center">
                  <span className="text-xs font-medium text-white truncate block">
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