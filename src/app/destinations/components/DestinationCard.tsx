import Link from 'next/link'
import Image from 'next/image'
import { Database } from '@/types/supabase'

type Destination = Database['public']['Tables']['destinations']['Row']

export default function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="block group rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white/60 dark:bg-green-900/20 backdrop-blur-md border border-green-100/30 dark:border-green-900/30"
    >
      <div className="relative aspect-[1.2]">
        <Image
          src={destination.main_image_url}
          alt={destination.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent" />
      </div>
      
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-bold text-green-800 dark:text-green-100">
          {destination.name}
        </h3>
        <p className="text-sm text-green-600 dark:text-green-300">
          {destination.location}
        </p>
      </div>
    </Link>
  )
}