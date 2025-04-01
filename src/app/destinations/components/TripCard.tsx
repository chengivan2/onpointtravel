import Link from 'next/link';
import Image from 'next/image';

interface Trip {
  id: string;
  name: string;
  short_description: string;
  main_featured_image_url: string;
  price: number;
  rating: number;
}

const renderRatingStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} className="text-yellow-400">★</span>
      ))}
      {halfStar > 0 && <span className="text-yellow-400">⯨</span>}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="text-gray-300">★</span>
      ))}
    </div>
  );
};

export default function TripCard({ trip }: { trip: Trip }) {
  return (
    <Link
      href={`/trips/${trip.id}`}
      className="group block rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800"
    >
      <div className="relative aspect-[1.2]">
        <Image
          src={trip.main_featured_image_url}
          alt={trip.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            {trip.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mt-1">
            {trip.short_description}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-green-600">
            ${trip.price.toFixed(2)}
          </span>
          <div className="flex items-center gap-1">
            {renderRatingStars(trip.rating)}
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
              {trip.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}