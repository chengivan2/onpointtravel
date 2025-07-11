"use client";

import { motion } from "framer-motion";

export default function BookingStepsInfo() {
  const steps = [
    {
      icon: (
        <svg
          className="w-6 h-6 text-green-600 dark:text-green-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      title: "1. Book a Trip",
      description:
        "Book a trip from our curated list of amazing trip locations and destinations",
    },
    {
      icon: (
        <svg
          className="w-6 h-6 text-green-600 dark:text-green-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      title: "2. Make Payment",
      description:
        "Secure and easy payment process with multiple options available",
    },
    {
      icon: (
        <svg
          className="w-6 h-6 text-green-600 dark:text-green-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "3. Reach Airport",
      description:
        "Prepare for your adventure and arrive at the airport on your selected date",
    },
  ];
  return (
    <div className="flex-1 bg-[url('/images/giraffes-blob-neck-crossing-image')] space-y-8">
      <div className="text-center md:text-left animate-fade-in-down">
        <h2 className="text-4xl font-bold text-lightmode-heading-color dark:text-darkmode-heading-color mb-4">
          Easy and Fast
        </h2>
        <p className="text-lg text-lightmode-text-color dark:text-darkmode-text-color">
          Book your next trip in 3 easy steps
        </p>
      </div>

      <div className="relative space-y-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{
              delay: index * 0.15,
              duration: 0.6,
              type: "spring",
            }}
            className="relative z-10 p-6 rounded-xl transition-all duration-300 bg-white/60 dark:bg-green-900/30 backdrop-blur-lg border border-green-100/40 dark:border-green-900/30 shadow-lg"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                {step.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-800 dark:text-green-100 mb-2">
                  {step.title}
                </h3>
                <p className="text-lightmode-text-color dark:text-darkmode-text-color">
                  {step.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
