"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function FavoriteButton({ tripId }: { tripId: string }) {
  const supabase = createClient();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchFavorites = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("users")
          .select("favorite_trips")
          .eq("id", user.id)
          .single();

        if (!error && data?.favorite_trips?.includes(tripId)) {
          setIsFavorite(true);
        }
      }
    };

    fetchFavorites();
  }, [supabase, tripId]);

  const toggleFavorite = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      router.push("/signin?next=/trips");
      return;
    }

    const { data, error } = await supabase
      .from("users")
      .select("favorite_trips")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Error fetching favorites:", error);
      setLoading(false);
      return;
    }

    const favoriteTrips = data?.favorite_trips || [];
    const updatedFavorites = isFavorite
      ? favoriteTrips.filter((id: string) => id !== tripId)
      : [...favoriteTrips, tripId];

    const { error: updateError } = await supabase
      .from("users")
      .update({ favorite_trips: updatedFavorites })
      .eq("id", user.id);

    if (updateError) {
      console.error("Error updating favorites:", updateError);
    } else {
      setIsFavorite(!isFavorite);
    }

    setLoading(false);
  };

  return (
    <button
      onClick={toggleFavorite}
      disabled={loading}
      className="text-red-500 hover:text-red-700 transition-colors"
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
    </button>
  );
}
