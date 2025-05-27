export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center min-h-[40vh]">
      <div className="bg-white/40 dark:bg-green-900/30 rounded-xl p-8 shadow-lg text-center">
        <h2 className="text-2xl font-semibold mb-2 text-green-700 dark:text-green-200">Loading users...</h2>
      </div>
    </div>
  );
}
