"use client";

import Link from "next/link";

export default function Menu() {
  return (
    <div className="text-[0.85rem] lg:flex space-y-3 lg:space-y-0 lg:space-x-8">
      <Link
        href="/"
        className="text-lightmode-headertext-color dark:text-darkmode-headertext-color hover:text-lightmode-headertext-hover-color dark:hover:text-darkmode-headertext-hover-color active:text-lightmode-headertext-active-color dark:active:text-darkmode-headertext-active-color block"
      >
        Home
      </Link>
      <Link
        href="/destinations"
        className="text-lightmode-headertext-color dark:text-darkmode-headertext-color hover:text-lightmode-headertext-hover-color dark:hover:text-darkmode-headertext-hover-color active:text-lightmode-headertext-active-color dark:active:text-darkmode-headertext-active-color block"
      >
        Destinations
      </Link>
      <Link
        href="/trips"
        className="text-lightmode-headertext-color dark:text-darkmode-headertext-color hover:text-lightmode-headertext-hover-color dark:hover:text-darkmode-headertext-hover-color active:text-lightmode-headertext-active-color dark:active:text-darkmode-headertext-active-color block"
      >
        Trips
      </Link>
      <Link
        href="/about"
        className="text-lightmode-headertext-color dark:text-darkmode-headertext-color hover:text-lightmode-headertext-hover-color dark:hover:text-darkmode-headertext-hover-color active:text-lightmode-headertext-active-color dark:active:text-darkmode-headertext-active-color block"
      >
        About
      </Link>
      <Link
        href="/contact"
        className="text-lightmode-headertext-color dark:text-darkmode-headertext-color hover:text-lightmode-headertext-hover-color dark:hover:text-darkmode-headertext-hover-color active:text-lightmode-headertext-active-color dark:active:text-darkmode-headertext-active-color block"
      >
        Contact
      </Link>
    </div>
  );
}
