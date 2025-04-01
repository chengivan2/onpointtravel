import Link from "next/link";
import Image from "next/image";

interface Trip {
  id: string;
  name: string;
  slug: string;
  location: string;
  main_image_url: string;
  rating: number;
}

const renderRatingStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} className="text-yellow-400">
          ★
        </span>
      ))}
      {halfStar > 0 && <span className="text-yellow-400">⯨</span>}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="text-gray-300">
          ★
        </span>
      ))}
    </div>
  );
};

export default function TripCard({
  trip,
  variant,
}: {
  trip: Trip;
  variant: "featured" | "compact";
}) {
  return (
    <Link
      href={`/trips/${trip.slug}`}
      className={`block group rounded-xl overflow-hidden ${
        variant === "featured"
          ? "shadow-lg hover:shadow-xl"
          : "shadow-md hover:shadow-lg"
      } transition-shadow duration-300 bg-white dark:bg-gray-800`}
    >
      <div className="relative aspect-[1.2]">
        <Image
          src={trip.main_image_url}
          alt={trip.name}
          fill
          className="object-cover"
          sizes={
            variant === "featured" ? "(max-width: 768px) 100vw, 50vw" : "33vw"
          }
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      <div
        className={`p-4 ${variant === "featured" ? "space-y-4" : "space-y-2"}`}
      >
        <div>
          <h3
            className={`font-bold ${
              variant === "featured" ? "text-xl" : "text-lg"
            } text-gray-800 dark:text-white`}
          >
            {trip.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {trip.location}
          </p>
        </div>

        <div className="flex items-center justify-between">
          {renderRatingStars(trip.rating)}
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {trip.rating.toFixed(1)}/5
          </span>
        </div>
      </div>
    </Link>
  );
}
