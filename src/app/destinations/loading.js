import { MapPin } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-green-900/20 animate-pulse">
      {/* Header Skeleton */}
      <div className="h-12 bg-gray-300 dark:bg-green-800/50 rounded w-3/4 max-w-xl mb-8"></div>

      {/* Location Pin Icon */}
      <div className="flex flex-col items-center mb-8">
        <MapPin className="w-16 h-16 text-gray-400 dark:text-green-300 animate-bounce" />
        <div className="h-4 bg-gray-300 dark:bg-green-800/50 rounded w-24 mt-2"></div>
      </div>

      {/* Destinations Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-7xl px-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-40 bg-gray-300 dark:bg-green-800/50 rounded-lg"
          ></div>
        ))}
      </div>
    </div>
  );
}