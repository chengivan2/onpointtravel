"use client";

import { useRouter } from "next/navigation";

export function SearchBar({ placeholder }: { placeholder: string }) {
  const router = useRouter();

  const handleSearch = (term: string) => {
    router.push(`/destinations?query=${term}`);
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full px-6 py-4 rounded-full border border-green-200 dark:border-green-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-green-900/20"
      />
      <svg
        className="absolute right-6 top-4 h-6 w-6 text-green-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
}
