// app/destinations/[slug]/page.tsx
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import TripCard from './components/TripCard';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const supabase = await createClient();
  
  const { data: destinations } = await supabase
    .from('destinations')
    .select('slug');

  return destinations?.map(({ slug }) => ({ slug })) || [];
}

export default async function DestinationPage({ params }: PageProps) {
  const supabase = await createClient();

  // Fetch destination
  const { data: destination, error } = await supabase
    .from('destinations')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (error || !destination) {
    return notFound();
  }

  // Fetch related trips
  const { data: trips } = await supabase
    .from('trips')
    .select('id, name, short_description, main_featured_image_url, price, rating')
    .eq('destination_id', destination.id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Destination Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          {destination.name}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mt-2">
          {destination.location}
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <div className="relative aspect-video rounded-xl overflow-hidden">
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
        
        <div className="prose dark:prose-invert max-w-none">
          {destination.description}
        </div>
      </div>

      {/* Related Trips */}
      {trips && trips.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
            Available Trips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}