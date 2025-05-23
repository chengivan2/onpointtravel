import Link from "next/link";
import Image from "next/image";
import { Database } from "@/types/supabase";

type Trip = Database["public"]["Tables"]["trips"]["Row"];

export default function TripCard({ trip }: { trip: Trip }) {
  return (
    <Link
      href={`/trips/${trip.slug}`}
      className="z-20 group block rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/50 dark:bg-green-900/50 backdrop-blur-md border border-green-100/30 dark:border-green-900/30"
    >
      <div className="relative aspect-[1.2]">
        <Image
          src={trip.main_featured_image_url}
          alt={trip.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent" />
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-xl font-bold text-green-800 dark:text-green-100">
            {trip.name}
          </h3>
          <p className="text-sm text-lightmode-text-color dark:text-darkmode-text-color line-clamp-2 mt-1">
            {trip.short_description}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-lightmode-text-color/90 dark:text-darkmode-text-color/90">
            ${trip.price?.toFixed(2)}
          </span>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-green-500 ${
                  i < Math.floor(trip.rating || 0) ? "" : "opacity-50"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>
      
    </Link>
  );
}
