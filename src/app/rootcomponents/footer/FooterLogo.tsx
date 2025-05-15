"use client";

import Image from "next/image";

export default function FooterLogo() {
  return (
    <div className="flex justify-between items-center">
      <Image
        width={100}
        height={50}
        alt="OnPoint footer logo"
        src="/logos/onpointhfdarkmodelogo.png"
        className="flex"
      />
    </div>
  );
}
