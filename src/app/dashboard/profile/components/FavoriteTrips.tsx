"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

interface Trip {
  id: string;
  destination: string;
  description: string;
}

export default function FavoriteTrips({ userId }: { userId: string }) {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteTrips = async () => {
      const supabase = createClient();

      // 1. Get the favorite trip IDs from the user profile
      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("favorite_trips")
        .eq("id", userId)
        .single();

      if (profileError) {
        toast.error("Failed to load favorite trips. Please try again.");
        setLoading(false);
        return;
      }

      const favoriteTripIds = profile?.favorite_trips || [];

      if (favoriteTripIds.length === 0) {
        setTrips([]);
        setLoading(false);
        return;
      }

      // 2. Fetch the trip details for those IDs
      const { data: tripsData, error: tripsError } = await supabase
        .from("trips")
        .select("id, name, description")
        .in("id", favoriteTripIds);

      if (tripsError) {
        toast.error("Failed to load trip details. Please try again.");
      } else {
        // Map 'name' to 'destination' if the interface requires 'destination'
        const mappedTrips = (tripsData || []).map(t => ({
          id: t.id,
          destination: t.name,
          description: t.description || ""
        }));
        setTrips(mappedTrips);
      }
      setLoading(false);
    };

    fetchFavoriteTrips();
  }, [userId]);

  if (loading) {
    return <p>Loading favorite trips...</p>;
  }

  if (trips.length === 0) {
    return <p>No favorite trips found.</p>;
  }

  return (
    <div>
      <h2>Your Favorite Trips</h2>
      <ul>
        {trips.map((trip) => (
          <li key={trip.id}>
            <h3>{trip.destination}</h3>
            <p>{trip.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}