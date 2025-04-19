import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";

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

export default async function TripCards() {
  const supabase = await createClient();

  const { data: trips, error } = await supabase
    .from("trips")
    .select(
      `
      id,
      name,
      short_description,
      main_featured_image_url,
      price,
      destination:destinations!inner(name),
      slug
    `
    )
    .order("created_at", { ascending: false })
    .limit(6)
    .returns<Trip[]>();

  if (error) {
    return (
      <div className="text-red-500 p-4">
        Error loading trips: {error.message}
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
    <div className="py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 cursor-pointer">
          {trips.map((trip) => (
            <Link
              key={trip.id}
              href={`/trips/${trip.slug}`}
              className="group relative"
            >
              <div
                key={trip.id}
                className="group relative backdrop-blur-2xl bg-white/30 dark:bg-green-900/30 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100/30 dark:border-green-900/30 overflow-hidden"
              >
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

                  <p className="text-green-700/80 dark:text-green-200/80 text-sm mb-4 line-clamp-3">
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
          ))}
        </div>
      </div>
    </div>
  );
}
