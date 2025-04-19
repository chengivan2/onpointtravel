import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function FavoriteTrips() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  const { data: userProfile, error: userError } = await supabase
    .from("users")
    .select("favorite_trips")
    .eq("id", user.id)
    .single();

  const favoriteTripIds = userProfile?.favorite_trips || [];

  if (favoriteTripIds.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Your Favorite Trips</h1>
        <p className="text-gray-500">You have no favorite trips yet.</p>
      </div>
    );
  }

  const { data: favoriteTrips, error: tripsError } = await supabase
    .from("trips")
    .select("id, name, main_featured_image_url, slug")
    .in("id", favoriteTripIds);

  if (tripsError) {
    console.error("Error fetching favorite trips:", tripsError.message);
    return <p>Error loading favorite trips.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Favorite Trips</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteTrips?.map((trip) => (
          <Link href={`/trips/${trip.slug}`} key={trip.id}>
            <div className="rounded-lg shadow-lg bg-white/30 dark:bg-green-900/30 backdrop-blur-sm p-4">
              <div
                className="h-40 bg-cover bg-center rounded-lg"
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
