import Link from 'next/link'
import Image from 'next/image'
import { Database } from '@/types/supabase'

type Trip = Database['public']['Tables']['trips']['Row']

const renderRatingStars = (rating: number | null) => {
  const normalizedRating = rating || 0
  const fullStars = Math.floor(normalizedRating)
  const halfStar = normalizedRating % 1 >= 0.5 ? 1 : 0
  const emptyStars = 5 - fullStars - halfStar

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} className="text-green-500">★</span>
      ))}
      {halfStar > 0 && <span className="text-green-500">⯨</span>}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="text-green-200 dark:text-green-700">★</span>
      ))}
    </div>
  )
}

export default function TripCard({ trip }: { trip: Trip }) {
  return (
    <Link
      href={`/trips/${trip.id}`}
      className="group block rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/60 dark:bg-green-900/20 backdrop-blur-md border border-green-100/30 dark:border-green-900/30"
    >
      <div className="relative aspect-[1.2]">
        <Image
          src={trip.main_featured_image_url}
          alt={trip.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent" />
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-xl font-bold text-green-800 dark:text-green-100">
            {trip.name}
          </h3>
          <p className="text-sm text-green-600/80 dark:text-green-300/80 line-clamp-2 mt-1">
            {trip.short_description}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-green-700 dark:text-green-300">
            ${trip.price?.toFixed(2)}
          </span>
          <div className="flex items-center gap-1">
            {renderRatingStars(trip.rating)}
            <span className="text-sm text-green-600/80 dark:text-green-300/80 ml-2">
              {(trip.rating || 0).toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}