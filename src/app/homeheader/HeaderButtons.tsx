// components/Header/HeaderButtons.tsx
import React from 'react';
import Link from 'next/link';
import HeaderAuthButton from './HeaderAuthButton';



export default function HeaderButtons () {
  return (
    // Hidden on small screens, shown on medium and up
    <div className="hidden md:flex items-center space-x-3">
      {/* Button 1: Make your own trip (Primary Style) */}
      <Link href="/">
        <a className="px-4 py-2 rounded-md text-sm font-medium
                     bg-lightmode-btn-bg-color text-lightmode-btn-text-color
                     hover:bg-lightmode-btn-bg-hover-color
                     dark:bg-darkmode-btn-bg-color dark:text-darkmode-btn-text-color
                     dark:hover:bg-darkmode-btn-bg-hover-color
                     transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lightmode-heading-color dark:focus:ring-darkmode-heading-color focus:ring-offset-lightmode-header-bg-color dark:focus:ring-offset-darkmode-header-bg-color">
          Make your own trip
        </a>
      </Link>

      <HeaderAuthButton />

      
    </div>
  );
};