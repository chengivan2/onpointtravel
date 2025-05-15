"use client";

import Image from "next/image";

export default function FooterLogo() {
  return (
    <div className="flex justify-start items-start">
      <Image
        width={100}
        height={50}
        alt="OnPoint footer logo"
        src="/logos/onpointhfdarkmodelogo.png"
      />
    </div>
  );
}
