"use client";

import Image from "next/image";

export default function LogoSeparator() {
  return (
    <div className="flex items-center justify-center w-full my-8">
      {/* Left Line */}
      <div className="flex-1 h-[1px] bg-lightmode-text-color dark:bg-darkmode-text-color opacity-50"></div>

      {/* Glowing Logo */}
      <div className="mx-4 relative">
        <div className="relative z-10">
          <Image
            src="/logos/onpointhflightmodelogo.png"
            alt="Logo"
            width={40}
            height={40}
            className="flexdark:hidden"
          />

          <Image
            src="/logos/onpointhfdarkmodelogo.png"
            alt="Logo"
            width={40}
            height={40}
            className="hidden dark:flex"
          />
        </div>
        <div className="absolute inset-0 blur-md bg-green-500 rounded-full opacity-50"></div>
      </div>

      {/* Right Line */}
      <div className="flex-1 h-[1px] bg-lightmode-text-color dark:bg-darkmode-text-color opacity-50"></div>
    </div>
  );
}
