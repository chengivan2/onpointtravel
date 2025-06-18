import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { Database } from "@/types/supabase";

type Destination = Database["public"]["Tables"]["destinations"]["Row"];

export default async function FeaturedDestination() {
  const supabase = await createClient();
  
  // Fetch the first destination
  const { data: destinations, error } = await supabase
    .from("destinations")
    .select("*")
    .limit(1)
    .order("id", { ascending: true });

  if (error || !destinations || destinations.length === 0) {
    return null;
  }

  const destination = destinations[0];

  return (
    <div className="relative w-full h-full overflow-hidden rounded-3xl">
      {/* Background Image */}
      <Image
        src={destination.main_image_url}
        alt={destination.name}
        fill
        className="object-cover"
        priority
      />
      
      {/* Discount Banner */}
      <div className="z-[998] absolute top-6 right-6 bg-green-600/90 text-white px-6 py-3 rounded-full backdrop-blur-sm font-semibold shadow-lg">
        15% OFF on all trips for this destination
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-8 md:p-12">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-br from-white via-gray-300 to-gray-300 bg-clip-text text-transparent">
            {destination.name}
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-6">
            {destination.description}
          </p>
          
          <Link href={`/trips?destination=${destination.slug}`}>
            <Button size="lg" className="cursor-pointer bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-6 text-lg rounded-full">
              See available trips
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
