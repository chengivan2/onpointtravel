import { Globe, Plane, MapPin } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-between h-screen bg-gray-100 dark:bg-green-900/20 animate-pulse">
      {/* Header Skeleton */}
      <div className="w-full h-16 bg-gray-300 dark:bg-green-800/50"></div>

      {/* Spinning Globe Icon */}
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="relative">
          <Globe className="w-20 h-20 text-gray-400 dark:text-green-300 animate-spin-slow" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Plane className="w-8 h-8 text-gray-500 dark:text-green-400 animate-bounce" />
          </div>
        </div>
        <div className="mt-4 h-4 bg-gray-300 dark:bg-green-800/50 rounded w-32"></div>
      </div>

      {/* Main Content Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl px-4 mb-8">
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