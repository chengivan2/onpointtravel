import { BarChart, LineChart, PieChart } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-screen">
      {/* Sidebar Skeleton */}
      <div className="w-64 bg-gray-200 dark:bg-green-900/30 animate-pulse">
        <div className="h-16 bg-gray-300 dark:bg-green-800/50"></div>
        <div className="space-y-4 p-4">
          <div className="h-4 bg-gray-300 dark:bg-green-800/50 rounded"></div>
          <div className="h-4 bg-gray-300 dark:bg-green-800/50 rounded"></div>
          <div className="h-4 bg-gray-300 dark:bg-green-800/50 rounded"></div>
          <div className="h-4 bg-gray-300 dark:bg-green-800/50 rounded"></div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 bg-gray-100 dark:bg-green-900/20 p-6 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Bookings Over Months Skeleton */}
          <div className="relative bg-white/30 dark:bg-green-900/30 rounded-xl p-6 shadow-lg backdrop-blur-md">
            <div className="h-6 bg-gray-300 dark:bg-green-800/50 rounded w-3/4 mb-4"></div>
            <LineChart className="w-16 h-16 text-gray-400 dark:text-green-300 mx-auto" />
            <div className="h-32 bg-gray-300 dark:bg-green-800/50 rounded mt-4"></div>
          </div>

          {/* Top 5 Booked Trips Skeleton */}
          <div className="relative bg-white/30 dark:bg-green-900/30 rounded-xl p-6 shadow-lg backdrop-blur-md">
            <div className="h-6 bg-gray-300 dark:bg-green-800/50 rounded w-3/4 mb-4"></div>
            <PieChart className="w-16 h-16 text-gray-400 dark:text-green-300 mx-auto" />
            <div className="h-32 bg-gray-300 dark:bg-green-800/50 rounded mt-4"></div>
          </div>

          {/* Confirmed vs Cancelled Bookings Skeleton */}
          <div className="relative bg-white/30 dark:bg-green-900/30 rounded-xl p-6 shadow-lg backdrop-blur-md">
            <div className="h-6 bg-gray-300 dark:bg-green-800/50 rounded w-3/4 mb-4"></div>
            <BarChart className="w-16 h-16 text-gray-400 dark:text-green-300 mx-auto" />
            <div className="h-32 bg-gray-300 dark:bg-green-800/50 rounded mt-4"></div>
          </div>

          {/* Revenue Over Months Skeleton */}
          <div className="relative bg-white/30 dark:bg-green-900/30 rounded-xl p-6 shadow-lg backdrop-blur-md">
            <div className="h-6 bg-gray-300 dark:bg-green-800/50 rounded w-3/4 mb-4"></div>
            <LineChart className="w-16 h-16 text-gray-400 dark:text-green-300 mx-auto" />
            <div className="h-32 bg-gray-300 dark:bg-green-800/50 rounded mt-4"></div>
          </div>

          {/* Users Over Months Skeleton */}
          <div className="relative bg-white/30 dark:bg-green-900/30 rounded-xl p-6 shadow-lg backdrop-blur-md">
            <div className="h-6 bg-gray-300 dark:bg-green-800/50 rounded w-3/4 mb-4"></div>
            <LineChart className="w-16 h-16 text-gray-400 dark:text-green-300 mx-auto" />
            <div className="h-32 bg-gray-300 dark:bg-green-800/50 rounded mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}