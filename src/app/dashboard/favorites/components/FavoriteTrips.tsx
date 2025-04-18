"use client";

import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export default async function FavoriteTrips() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  const { data: favoriteTrips } = await supabase
    .from("trips")
    .select("id, name, main_featured_image_url")
    .eq("is_favorite", true)
    .eq("user_id", user.id);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Favorite Trips</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteTrips?.map((trip) => (
          <div
            key={trip.id}
            className="rounded-lg shadow-lg bg-white/30 dark:bg-green-900/30 backdrop-blur-sm p-4"
          >
            <div
              className="h-40 bg-cover bg-center rounded-lg"
              style={{ backgroundImage: `url(${trip.main_featured_image_url})` }}
            ></div>
            <h2 className="text-lg font-semibold mt-2">{trip.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}