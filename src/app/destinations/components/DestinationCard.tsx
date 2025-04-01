import Link from 'next/link';
import Image from 'next/image';

interface Destination {
  id: string;
  name: string;
  slug: string;
  location: string;
  main_image_url: string;
}

export default function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="block group rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800"
    >
      <div className="relative aspect-[1.2]">
        <Image
          src={destination.main_image_url}
          alt={destination.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
      
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          {destination.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {destination.location}
        </p>
      </div>
    </Link>
  );
}