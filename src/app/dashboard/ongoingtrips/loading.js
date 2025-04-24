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
            {/* Ongoing Trip Card Skeleton */}
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="relative bg-gray-300 dark:bg-green-800/50 rounded-lg p-4 shadow-lg"
              >
                {/* Glowing Dot */}
                <div className="absolute top-4 right-4 w-4 h-4 rounded-full bg-green-500 animate-pulse"></div>
  
                {/* Trip Name Placeholder */}
                <div className="h-6 bg-gray-400 dark:bg-green-700/50 rounded w-3/4 mb-4"></div>
  
                {/* Date Placeholder */}
                <div className="h-4 bg-gray-400 dark:bg-green-700/50 rounded w-1/2 mb-4"></div>
  
                {/* Image Placeholder */}
                <div className="h-32 bg-gray-400 dark:bg-green-700/50 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }