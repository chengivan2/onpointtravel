import Image from "next/image";
import { createClient } from "@/utils/supabase/server";

interface Destination {
  id: string;
  name: string;
  description: string;
  location: string;
  main_image_url?: string | null;
}

export default async function Destinations() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("destinations")
    .select("id, name, description, location, main_image_url");

  if (error) {
    return <div className="text-red-500 p-4">Error loading destinations</div>;
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-green-600 p-4">
        No destinations were found. Check back later.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 py-[4rem] min-h-[100vh]">
      {(data as Destination[]).map((destination) => {
        const imageUrl = destination.main_image_url;

        return (
          <div
            key={destination.id}
            className="group relative cursor-pointer overflow-hidden rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            <div className="motion-preset-slide-right relative z-10 h-full flex flex-col bg-lightmode-header-bg-color/50 dark:bg-green-900/20 backdrop-blur-md border border-gray-200/40 dark:border-green-900/30 rounded-xl p-6 transition-all duration-300 hover:bg-white/40 dark:hover:bg-green-900/30 shadow-sm hover:shadow-md">
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
              <p className="text-green-600 dark:text-green-200 text-sm mb-4">
                {destination.location}
              </p>
              <p className="text-green-700 dark:text-green-300 text-base line-clamp-3">
                {destination.description}
              </p>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
          </div>
        );
      })}
    </div>
  );
}
