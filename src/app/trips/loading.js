import { Plane, MapPin } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-between h-screen bg-gray-100 dark:bg-green-900/20 animate-pulse">
      {/* Header Skeleton */}
      <div className="w-full h-16 bg-gray-300 dark:bg-green-800/50"></div>

      {/* Flying Plane Icon */}
      <div className="relative w-full h-24 flex items-center justify-center">
        <Plane className="w-12 h-12 text-gray-400 dark:text-green-300 animate-fly" />
      </div>

      {/* Trips Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl px-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-40 bg-gray-300 dark:bg-green-800/50 rounded-lg"
          ></div>
        ))}
      </div>

      {/* Footer Skeleton */}
      <div className="w-full h-16 bg-gray-300 dark:bg-green-800/50"></div>
    </div>
  );
}