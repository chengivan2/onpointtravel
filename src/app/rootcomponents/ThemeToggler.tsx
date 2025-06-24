"use client";

import { useTheme } from "next-themes";
import { FaMoon } from "react-icons/fa6";
import { IoSunny } from "react-icons/io5";
import { MdDesktopWindows } from "react-icons/md";
import { useEffect, useRef, useState } from "react";

export default function ThemeToggler() {
  const { theme, setTheme } = useTheme();
  const [progress, setProgress] = useState(0);
  const pillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      setProgress(percent);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // SVG circle for animated stroke
  const strokeWidth = 3;
  const r = 18;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - progress);

  return (
    <div className="relative inline-block">
      <svg
        width={44}
        height={44}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{ zIndex: 1 }}
      >
        <circle
          cx={22}
          cy={22}
          r={r}
          fill="none"
          stroke="#22c55e"
          strokeWidth={strokeWidth}
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.2s linear" }}
        />
      </svg>
      <div
        ref={pillRef}
        className="flex items-center gap-1 p-1 rounded-full bg-black/30 backdrop-blur-md shadow-inner border border-white/30 w-[max-content] relative z-10"
        role="radiogroup"
        aria-label="Theme selector"
        style={{ minHeight: 36, minWidth: 120 }}
      >
        <button
          className={`cursor-pointer flex-1 flex items-center justify-center rounded-full transition-all p-1 focus:outline-none ${
            theme === "system"
              ? "bg-white text-green-700 shadow"
              : "bg-transparent text-white/90 hover:bg-white/20"
          }`}
          aria-label="System default"
          aria-checked={theme === "system" ? "true" : "false"}
          role="radio"
          tabIndex={0}
          onClick={() => setTheme("system")}
          type="button"
        >
          <MdDesktopWindows className="w-3 h-3" />
        </button>
        <button
          className={`cursor-pointer flex-1 flex items-center justify-center rounded-full transition-all p-1 focus:outline-none ${
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
          <IoSunny className="w-3 h-3" />
        </button>
        <button
          className={`cursor-pointer flex-1 flex items-center justify-center rounded-full transition-all p-1 focus:outline-none ${
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
          <FaMoon className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
