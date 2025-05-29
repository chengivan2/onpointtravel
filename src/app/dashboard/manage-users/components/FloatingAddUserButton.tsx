"use client";
import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FloatingAddUserButton({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      aria-label="Add user"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`fixed bottom-8 left-1/2 md:left-8 z-50 flex items-center gap-2 px-6 py-3 rounded-full bg-green-600 text-white shadow-xl transition-all duration-300 ease-in-out
        ${hovered ? 'md:left-8 w-14 px-0' : 'w-auto'}
        hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400`}
      style={{ transform: hovered ? 'translateX(0)' : 'translateX(-50%)' }}
    >
      <PlusIcon className="w-6 h-6" />
      <span className={`ml-2 font-semibold text-lg transition-all duration-200 ${hovered ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>Add user</span>
    </button>
  );
}
