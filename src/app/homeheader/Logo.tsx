"use client";

import Image from "next/image";

export default function FooterLogo() {
  return (
    <div className="flex justify-between items-center">
      <Image
        width={100}
        height={50}
        alt="OnPoint header logo"
        src="/logos/onpointhflightmodelogo.png"
        className="flex duration-300 dark:hidden"
      />

      <Image
        width={100}
        height={50}
        alt="OnPoint header logo"
        src="/logos/onpointhfdarkmodelogo.png"
        className="hidden duration-300 dark:flex"
      />
    </div>
  );
}
