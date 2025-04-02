import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import TripCard from '../components/TripCard'
import { Database } from '@/types/supabase'

export async function generateStaticParams() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: destinations } = await supabase
    .from("destinations")
    .select("slug")

  return (destinations ?? []).map(({ slug }) => ({ slug }))
}

export default async function DestinationPage({
  params,
}: {
  params: { slug: string }
}) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: destination } = await supabase
    .from("destinations")
    .select("*")
    .eq("slug", params.slug)
    .single()

  if (!destination) return notFound()

  const { data: trips } = await supabase
    .from("trips")
    .select("*")
    .eq("destination_id", destination.id)

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-green-800 dark:text-green-100">
          {destination.name}
        </h1>
        <p className="text-xl text-green-600 dark:text-green-300 mt-2">
          {destination.location}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <div className="relative aspect-video rounded-xl overflow-hidden border border-green-100/30 dark:border-green-900/30">
            <Image
              src={destination.main_image_url}
              alt={destination.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 70vw"
            />
          </div>
        </div>
        
        <article className="prose dark:prose-invert max-w-none text-green-700 dark:text-green-300">
          {destination.description}
        </article>
      </div>

      {trips?.length ? (
        <section>
          <h2 className="text-3xl font-bold text-green-800 dark:text-green-100 mb-8">
            Available Trips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </section>
      ) : (
        <div className="text-center py-12 text-green-600">
          No trips available for this destination
        </div>
      )}
    </div>
  )
}