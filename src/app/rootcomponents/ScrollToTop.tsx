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
          className="fixed z-[998] hover:cursor-pointer bottom-4 right-4 p-3 rounded-full bg-lightmode-scrolltotop-bg-color hover:bg-primary/90 dark:bg-darkmode-scrolltotop-bg-color hover:dark:bg-secondary/90 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110"
        >
          <svg
            className="w-6 h-6 bg:lightmode-scrolltotop-bg-color dark:bg:darkmode-scrolltotop-bg-color text-lightmode-scrolltotop-color dark:text-darkmode-scrolltotop-color"
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
