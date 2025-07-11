"use client";

import { useTheme } from "next-themes";
import { FaMoon } from "react-icons/fa6";
import { IoSunny } from "react-icons/io5";
import { MdDesktopWindows } from "react-icons/md";
import { useEffect, useState } from "react";

export default function ThemeToggler() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine which button should be highlighted
  let selected = theme;
  if (mounted && theme === "system") {
    selected = "system";
  } else if (!mounted) {
    selected = undefined;
  }

  return (
    <div
      className="flex items-center gap-1 p-1 rounded-full bg-black/30 backdrop-blur-md shadow-inner border border-white/30 w-[max-content]"
      role="radiogroup"
      aria-label="Theme selector"
    >
      <button
        className={`cursor-pointer flex-1 flex items-center justify-center rounded-full transition-all p-1 focus:outline-none ${
          selected === "system"
            ? "bg-white text-green-700 shadow"
            : "bg-transparent text-white/90 hover:bg-white/20"
        }`}
        aria-label="System default"
        aria-checked={selected === "system" ? "true" : "false"}
        role="radio"
        tabIndex={0}
        onClick={() => setTheme("system")}
        type="button"
      >
        <MdDesktopWindows className="w-3 h-3" />
      </button>
      <button
        className={`cursor-pointer flex-1 flex items-center justify-center rounded-full transition-all p-1 focus:outline-none ${
          selected === "light"
            ? "bg-white text-green-700 shadow"
            : "bg-transparent text-white/90 hover:bg-white/20"
        }`}
        aria-label="Light mode"
        aria-checked={selected === "light" ? "true" : "false"}
        role="radio"
        tabIndex={0}
        onClick={() => setTheme("light")}
        type="button"
      >
        <IoSunny className="w-3 h-3" />
      </button>
      <button
        className={`cursor-pointer flex-1 flex items-center justify-center rounded-full transition-all p-1 focus:outline-none ${
          selected === "dark"
            ? "bg-white text-green-700 shadow"
            : "bg-transparent text-white/90 hover:bg-white/20"
        }`}
        aria-label="Dark mode"
        aria-checked={selected === "dark" ? "true" : "false"}
        role="radio"
        tabIndex={0}
        onClick={() => setTheme("dark")}
        type="button"
      >
        <FaMoon className="w-3 h-3" />
      </button>
    </div>
  );
}
