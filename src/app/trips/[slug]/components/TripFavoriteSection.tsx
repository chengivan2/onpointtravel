"use client";
import FavoriteButton from "@/app/rootcomponents/trips/FavoriteButton";
import { toast } from "sonner";

export default function TripFavoriteSection({ tripId }: { tripId: string }) {
  return (
    <div>
      <h2>I like this trip</h2>
      <FavoriteButton
        tripId={tripId}
        heartIconSize={120}
        onToggle={isFav => {
          toast.success(isFav ? "Added to favorites!" : "Removed from favorites.");
        }}
      />
    </div>
  );
}
