export default function LoadingMyBookings() {
  return (
    <div className="flex flex-1 flex-col gap-2 px-3 py-6">
      <div className="rounded-2xl shadow-xl bg-white/40 dark:bg-green-900/30 backdrop-blur-md border border-green-100/30 dark:border-green-900/30 min-h-[220px] w-full max-w-4xl mx-auto">
        <div className="flex flex-col divide-y divide-green-100/40 dark:divide-green-900/40">
          <div className="flex px-6 py-3 gap-4">
            <div className="h-6 w-32 bg-green-200/60 rounded animate-pulse" />
            <div className="h-6 w-24 bg-green-100/60 rounded animate-pulse" />
            <div className="h-6 w-24 bg-green-100/60 rounded animate-pulse" />
            <div className="h-6 w-20 bg-green-100/60 rounded animate-pulse" />
            <div className="h-6 w-16 bg-green-200/60 rounded animate-pulse" />
          </div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex px-6 py-4 gap-4 items-center">
              <div className="h-5 w-32 bg-green-200/60 rounded animate-pulse" />
              <div className="h-5 w-24 bg-green-100/60 rounded animate-pulse" />
              <div className="h-5 w-24 bg-green-100/60 rounded animate-pulse" />
              <div className="h-5 w-20 bg-green-100/60 rounded animate-pulse" />
              <div className="h-5 w-16 bg-green-200/60 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
