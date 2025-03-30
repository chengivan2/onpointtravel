"use client";

import Link from "next/link";

export default function Menu() {
  return (
    <div className="text-[0.85rem] lg:flex space-y-3 lg:space-y-0 lg:space-x-8">
      <Link href="/" className="text-lightmode-headertext-color dark:text-darkmode-headertext-color hover:text-lightmode-headertext-hover-color dark:hover:text-darkmode-headertext-hover-color active:text-lightmode-headertext-active-color dark:active:text-darkmode-headertext-active-color block">
        Home
      </Link>
      <Link href="#" className="text-lightmode-headertext-color dark:text-darkmode-headertext-color hover:text-lightmode-headertext-hover-color dark:hover:text-darkmode-headertext-hover-color active:text-lightmode-headertext-active-color dark:active:text-darkmode-headertext-active-color block">
        About
      </Link>
      <Link href="#" className="text-lightmode-headertext-color dark:text-darkmode-headertext-color hover:text-lightmode-headertext-hover-color dark:hover:text-darkmode-headertext-hover-color active:text-lightmode-headertext-active-color dark:active:text-darkmode-headertext-active-color block">
        Services
      </Link>
      <Link href="#" className="text-lightmode-headertext-color dark:text-darkmode-headertext-color hover:text-lightmode-headertext-hover-color dark:hover:text-darkmode-headertext-hover-color active:text-lightmode-headertext-active-color dark:active:text-darkmode-headertext-active-color block">
        Contact
      </Link>
    </div>
  );
}
