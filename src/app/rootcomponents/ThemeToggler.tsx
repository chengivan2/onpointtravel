"use client";

import { useTheme } from "next-themes";
import { FaMoon } from "react-icons/fa6";
import { IoSunny } from "react-icons/io5";

export default function ThemeToggler() {
  const { theme, setTheme } = useTheme();
  return (
    <div
      className="flex items-center gap-1 p-1 rounded-full bg-black/30 backdrop-blur-md shadow-inner border border-white/30 w-[90px]"
      role="radiogroup"
      aria-label="Theme selector"
    >
      <button
        className={`flex-1 flex items-center justify-center rounded-full transition-all p-2 focus:outline-none ${
          theme === "light"
            ? "bg-white text-green-700 shadow"
            : "bg-transparent text-white/90 hover:bg-white/20"
        }`}
        aria-label="Light mode"
        aria-checked={theme === "light" ? "true" : "false"}
        role="radio"
        tabIndex={0}
        onClick={() => setTheme("light")}
        type="button"
      >
        <IoSunny className="w-4 h-4" />
      </button>
      <button
        className={`flex-1 flex items-center justify-center rounded-full transition-all p-2 focus:outline-none ${
          theme === "dark"
            ? "bg-white text-green-700 shadow"
            : "bg-transparent text-white/90 hover:bg-white/20"
        }`}
        aria-label="Dark mode"
        aria-checked={theme === "dark" ? "true" : "false"}
        role="radio"
        tabIndex={0}
        onClick={() => setTheme("dark")}
        type="button"
      >
        <FaMoon className="w-4 h-4" />
      </button>
    </div>
  );
}
