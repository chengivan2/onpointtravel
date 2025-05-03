"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

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
      const { data, error } = await supabase
        .from("favorite_trips")
        .select("id, destination, description")
        .eq("user_id", userId);

      if (error) {
        console.error("Error fetching favorite trips:", error);
      } else {
        setTrips(data || []);
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