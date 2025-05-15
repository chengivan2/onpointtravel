"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ExtraTripOffer() {
  return (
    <section className="relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed bg-no-repeat opacity-20"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/doqbnfais/image/upload/v1745260620/onPoint%20website%20concept/website%20assets/website%20images/website%20design%20and%20stock%20photos/three-impalas_kwx3j6.jpg')",
        }}
      ></div>
      <div className="relative bg-transparent py-12 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto max-w-md px-6 [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,#0F0_70%,transparent_100%)] relative">
            {/* SVG background shapes behind card */}
            <svg
              className="absolute -z-10 left-0 top-0 w-full h-full pointer-events-none"
              viewBox="0 0 600 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse
                cx="120"
                cy="80"
                rx="80"
                ry="30"
                fill="#bbf7d0"
                fillOpacity="0.18"
              />
              <ellipse
                cx="500"
                cy="180"
                rx="60"
                ry="20"
                fill="#34d399"
                fillOpacity="0.12"
              />
              {/* Example animal silhouette (giraffe) */}
              <path
                d="M300 180 Q310 160 340 170 Q350 150 380 160 Q390 170 400 180 Q390 190 380 185 Q370 200 350 190 Q330 200 320 185 Q310 190 300 180 Z"
                fill="#047857"
                fillOpacity="0.08"
              />
            </svg>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.7, type: "spring" }}
              className="bg-white/60 dark:bg-green-900/50 rounded-xl backdrop-blur-md border p-3 shadow-xl"
            >
              <Image
                src="https://res.cloudinary.com/doqbnfais/image/upload/v1745260620/onPoint%20website%20concept/website%20assets/website%20images/website%20design%20and%20stock%20photos/three-impalas_kwx3j6.jpg"
                alt="Three gazelles staring"
                width={600}
                height={600}
                className="rounded-lg"
              />
            </motion.div>
          </div>
          <div className="mx-auto mt-6 max-w-lg space-y-6 text-center">
            <h2 className="text-balance text-lightmode-heading-color dark:text-darkmode-heading-color text-3xl font-semibold md:text-4xl lg:text-5xl">
              Play even harder
            </h2>
            <p className="md:text-md text-lightmode-text-color dark:text-darkmode-text-color">
              Book three trips in a year and get a 27% discount on the next one.
            </p>

            <Button
              className="bg-lightmode-btn-bg-color hover:bg-lightmode-btn-bg-hover-color dark:bg-darkmode-btn-bg-color hover:dark:bg-darkmode-btn-bg-hover-color shadow-2xl"
              size="lg"
              asChild
            >
              <Link
                className="text-lightmode-text-color dark:text-darkmode-text-color md:text-md"
                href="/trips"
              >
                Book a Trip
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

const Integration = ({
  icon,
  name,
  description,
}: {
  icon: React.ReactNode;
  name: string;
  description: string;
}) => {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-dashed py-3 last:border-b-0">
      <div className="bg-muted border-foreground/5 flex size-12 items-center justify-center rounded-lg border">
        {icon}
      </div>
      <div className="space-y-0.5">
        <h3 className="text-sm font-medium">{name}</h3>
        <p className="text-muted-foreground line-clamp-1 text-sm">
          {description}
        </p>
      </div>
      <Button variant="outline" size="icon" aria-label="Add integration">
        <Plus className="size-4" />
      </Button>
    </div>
  );
};
