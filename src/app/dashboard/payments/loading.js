import { CreditCard } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-screen">
      {/* Sidebar Skeleton */}
      <div className="hidden md:block w-64 bg-gray-200 dark:bg-green-900/30 animate-pulse m-2 rounded-lg">
        <div className="h-16 bg-gray-300 dark:bg-green-800/50 rounded-tl-lg rounded-tr-lg"></div>
        <div className="space-y-4 p-4">
          <div className="h-4 bg-gray-300 dark:bg-green-800/50 rounded"></div>
          <div className="h-4 bg-gray-300 dark:bg-green-800/50 rounded"></div>
          <div className="h-4 bg-gray-300 dark:bg-green-800/50 rounded"></div>
          <div className="h-4 bg-gray-300 dark:bg-green-800/50 rounded"></div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 bg-gray-100 dark:bg-green-900/20 p-6 animate-pulse flex flex-col items-center justify-center">
        <CreditCard className="w-16 h-16 text-gray-300 dark:text-green-800 animate-bounce mb-6" />
        <div className="h-8 bg-gray-300 dark:bg-green-800/50 rounded w-1/2 mb-4"></div>
        <div className="space-y-4 w-full max-w-3xl">
          <div className="h-4 bg-gray-300 dark:bg-green-800/50 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-gray-300 dark:bg-green-800/50 rounded w-1/2 mx-auto"></div>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          <div className="h-40 bg-gray-300 dark:bg-green-800/50 rounded"></div>
          <div className="h-40 bg-gray-300 dark:bg-green-800/50 rounded"></div>
          <div className="h-40 bg-gray-300 dark:bg-green-800/50 rounded"></div>
        </div>
      </div>
    </div>
  );
}
