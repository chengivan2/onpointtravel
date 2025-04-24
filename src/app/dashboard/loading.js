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
          <div className="h-12 bg-gray-300 dark:bg-green-800/50 rounded mb-6"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-300 dark:bg-green-800/50 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-green-800/50 rounded w-1/2"></div>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="h-40 bg-gray-300 dark:bg-green-800/50 rounded"></div>
            <div className="h-40 bg-gray-300 dark:bg-green-800/50 rounded"></div>
            <div className="h-40 bg-gray-300 dark:bg-green-800/50 rounded"></div>
          </div>
        </div>
      </div>
    );
  }