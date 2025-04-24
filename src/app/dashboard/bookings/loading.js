import { Calendar, CheckCircle, Car, XCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-screen">
      {/* Sidebar Skeleton */}
      <div className="w-64 bg-gray-200 dark:bg-green-900/30 animate-pulse m-2 rounded-lg">
        <div className="h-16 bg-gray-300 dark:bg-green-800/50"></div>
        <div className="space-y-4 p-4">
          <div className="h-4 bg-gray-300 dark:bg-green-800/50 rounded"></div>
          <div className="h-4 bg-gray-300 dark:bg-green-800/50 rounded"></div>
          <div className="h-4 bg-gray-300 dark:bg-green-800/50 rounded"></div>
          <div className="h-4 bg-gray-300 dark:bg-green-800/50 rounded"></div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 bg-gray-100 dark:bg-green-900/20 p-6 animate-pulse flex flex-col items-center justify-center">
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
          {/* Calendar Icon */}
          <div className="flex flex-col items-center justify-center h-40 bg-gray-300 dark:bg-green-800/50 rounded">
            <Calendar className="w-12 h-12 text-gray-400 dark:text-green-300" />
          </div>
          {/* Tick Icon */}
          <div className="flex flex-col items-center justify-center h-40 bg-gray-300 dark:bg-green-800/50 rounded">
            <CheckCircle className="w-12 h-12 text-gray-400 dark:text-green-300" />
          </div>
          {/* Car Icon */}
          <div className="flex flex-col items-center justify-center h-40 bg-gray-300 dark:bg-green-800/50 rounded">
            <Car className="w-12 h-12 text-gray-400 dark:text-green-300" />
          </div>
          {/* X Icon */}
          <div className="flex flex-col items-center justify-center h-40 bg-gray-300 dark:bg-green-800/50 rounded">
            <XCircle className="w-12 h-12 text-gray-400 dark:text-green-300" />
          </div>
        </div>
      </div>
    </div>
  );
}