"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 50) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed flex items-center justify-center z-[998] hover:cursor-pointer bottom-4 right-4 p-3 rounded-full bg-lightmode-scrolltotop-bg-color hover:bg-primary/90 dark:bg-darkmode-scrolltotop-bg-color hover:dark:bg-secondary/90 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110"
          style={{ width: 48, height: 48 }}
        >
          {/* Circular progress stroke */}
          <ScrollProgressCircle />
          <svg
            className="w-4 h-4 text-lightmode-scrolltotop-color dark:text-darkmode-scrolltotop-color relative z-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </>
  );
}

function ScrollProgressCircle() {
  const [progress, setProgress] = useState(0);
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
  const strokeWidth = 3;
  const r = 20;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - progress);
  return (
    <svg
      width={44}
      height={44}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0"
      style={{ zIndex: 0 }}
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
  );
}
