"use client";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function AddUserButtonClient() {
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) setExpanded(false);
      else setExpanded(true);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Add user"
      onClick={() => window.dispatchEvent(new Event("openAddUserDialog"))}
      className={`fixed z-50 bottom-6 left-1/2 md:left-10 transform md:translate-x-0 -translate-x-1/2 flex items-center gap-2 px-6 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-2xl transition-all duration-300 ease-in-out ${expanded ? "w-auto" : "w-14 justify-center px-0"}`}
      style={{ minWidth: expanded ? 140 : 56 }}
    >
      <PlusIcon className="w-6 h-6" />
      <span className={`ml-2 font-semibold text-lg transition-all duration-300 ${expanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>Add user</span>
    </button>
  );
}
