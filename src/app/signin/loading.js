
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white/60 dark:bg-green-900/30 backdrop-blur-lg">
      <div className="flex flex-col items-center gap-4">
        <svg className="animate-spin h-10 w-10 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
        </svg>
        <span className="text-green-700 dark:text-green-200 font-semibold text-lg">Loading OnPoint Sign In...</span>
      </div>
    </div>
  );
}
