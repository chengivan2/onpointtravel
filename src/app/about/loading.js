export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-green-900/20 animate-pulse">
      {/* Hero Section Skeleton */}
      <section className="relative flex items-center justify-center h-[60vh] bg-gray-300 dark:bg-green-800/50">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center">
          <div className="h-10 bg-gray-400 dark:bg-green-700/50 rounded w-1/2 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-400 dark:bg-green-700/50 rounded w-1/3 mx-auto"></div>
        </div>
      </section>

      {/* Vision and Mission Section Skeleton */}
      <section className="py-12 md:py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision Skeleton */}
          <div className="relative bg-white/30 dark:bg-green-900/30 backdrop-blur-md rounded-xl p-6 shadow-lg">
            <div className="h-6 bg-gray-400 dark:bg-green-700/50 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-400 dark:bg-green-700/50 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-400 dark:bg-green-700/50 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-400 dark:bg-green-700/50 rounded w-2/3"></div>
          </div>

          {/* Mission Skeleton */}
          <div className="relative bg-white/30 dark:bg-green-900/30 backdrop-blur-md rounded-xl p-6 shadow-lg">
            <div className="h-6 bg-gray-400 dark:bg-green-700/50 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-400 dark:bg-green-700/50 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-400 dark:bg-green-700/50 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-400 dark:bg-green-700/50 rounded w-2/3"></div>
          </div>
        </div>
      </section>

      {/* Contact Section Skeleton */}
      <section className="py-12 md:py-24 px-6">
        <div className="max-w-3xl mx-auto bg-white/30 dark:bg-green-900/30 backdrop-blur-md rounded-xl p-6 shadow-lg">
          <div className="h-6 bg-gray-400 dark:bg-green-700/50 rounded w-1/3 mx-auto mb-6"></div>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-6 h-6 bg-gray-400 dark:bg-green-700/50 rounded-full"></div>
              <div className="h-4 bg-gray-400 dark:bg-green-700/50 rounded w-3/4"></div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-6 h-6 bg-gray-400 dark:bg-green-700/50 rounded-full"></div>
              <div className="h-4 bg-gray-400 dark:bg-green-700/50 rounded w-3/4"></div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-6 h-6 bg-gray-400 dark:bg-green-700/50 rounded-full"></div>
              <div className="h-4 bg-gray-400 dark:bg-green-700/50 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}