import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function FavoriteTrips() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    return (
      <p className="text-red-600 dark:text-red-300">
        Failed to fetch user. Please try again.
      </p>
    );
  }

  if (!user) {
    redirect("/signin");
  }

  const { data: userProfile, error: userErrorProfile } = await supabase
    .from("users")
    .select("favorite_trips")
    .eq("id", user.id)
    .single();

  if (userErrorProfile) {
    return (
      <p className="text-red-600 dark:text-red-300">
        Failed to load favorite trips. Please try again.
      </p>
    );
  }

  const favoriteTripIds = userProfile?.favorite_trips || [];

  if (favoriteTripIds.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 rounded-2xl shadow-xl bg-white/30 dark:bg-green-900/30 backdrop-blur-md max-w-md mx-auto mt-12">
        <div className="mb-4">
          <svg
            className="w-16 h-16 text-green-400 mx-auto"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 3.75a5.25 5.25 0 00-4.5 2.472A5.25 5.25 0 007.5 3.75C4.462 3.75 2 6.214 2 9.25c0 5.25 9.25 11 9.25 11s9.25-5.75 9.25-11c0-3.036-2.462-5.5-5.5-5.5z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-2 text-center">
          No Favorite Trips Yet
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
          You haven’t added any trips to your favorites. Start exploring and add
          your dream destinations!
        </p>
        <a
          href="/trips"
          className="inline-block px-6 py-2 rounded-full bg-green-500 text-white font-semibold shadow hover:bg-green-600 transition"
        >
          Browse Trips
        </a>
      </div>
    );
  }

  const { data: favoriteTrips, error: tripsError } = await supabase
    .from("trips")
    .select("id, name, main_featured_image_url, slug")
    .in("id", favoriteTripIds);

  if (tripsError) {
    console.error("Error loading favorite trips:", tripsError);
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Your Favorite Trips</h1>
        <p className="text-red-600 dark:text-red-300">
          Error loading favorite trips:{" "}
          {tripsError.message || JSON.stringify(tripsError)}
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Favorite Trips</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteTrips?.map((trip) => (
          <Link target="_blank" href={`/trips/${trip.slug}`} key={trip.id}>
            <div className="rounded-lg shadow-lg bg-white/30 dark:bg-green-900/30 backdrop-blur-sm p-4">
              <div
                className={`h-40 bg-cover bg-center rounded-lg`}
                style={{
                  backgroundImage: `url(${trip.main_featured_image_url})`,
                }}
                
              ></div>
              <h2 className="text-lg font-semibold mt-2">{trip.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
