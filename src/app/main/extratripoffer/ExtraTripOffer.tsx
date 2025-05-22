"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
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
                className="md:text-md"
                href="/trips"
              >
                <span className="text-[#F5F5F5]">Book a Trip</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
