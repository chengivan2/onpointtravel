"use client";

import { TypeAnimation } from "react-type-animation";
import { Progress } from "@/components/ui/progress";

export default function BookingStepsImage() {
  return (
    <div className="flex-1 w-full max-w-xl">
      <div className="relative rounded-2xl shadow-xl sm:border-green-100/30 md:border-green-100/30 lg:border-green-100/30 dark:border-green-900/30 hover:shadow-xl p-8 border">
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold text-green-800 dark:text-green-100">
                Trip To Paris
              </h3>

              <TypeAnimation
                sequence={["14-29 June 2025 | Booked by Sifa Joy", 900]}
                wrapper="span"
                speed={20}
                repeat={100}
                cursor={false}
                className="text-green-600 dark:text-green-300"
              />
            </div>
            <span className="relative flex items-center bg-green-300/50 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm">
              <div className="relative mr-2">
                <div className="absolute animate-pulse-up -inset-1 bg-gradient-to-r from-green-400/60 to-green-600/60 rounded-full blur-[2px]"></div>
                <div className="relative w-2 h-2 rounded-full bg-green-700 dark:bg-green-300"></div>
              </div>
              Ongoing
            </span>
          </div>

          <div>
            <Progress
              value={50}
              className="h-2 bg-green-100/70 dark:bg-green-900/70 rounded-full animte-pulse"
            />
          </div>

          <div className="bg-[url(https://res.cloudinary.com/doqbnfais/image/upload/v1743186817/onPoint%20website%20concept/website%20assets/website%20images/website%20design%20and%20stock%20photos/friends-eiffel-tower_evy9gv.jpg)] bg-cover bg-center h-[40vh] lg:h-[50vh] rounded-xl"></div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-3">
                <div className="w-8 h-8 rounded-full bg-cover bg-[url(https://res.cloudinary.com/doqbnfais/image/upload/v1743234421/onPoint%20website%20concept/website%20assets/website%20images/website%20design%20and%20stock%20photos/booking%20steps%20faces/booking-steps-face-image-1_lsbrim.jpg)] border-2 border-white dark:border-green-900"></div>
                <div className="w-8 h-8 rounded-full bg-cover bg-[url(https://res.cloudinary.com/doqbnfais/image/upload/v1743234420/onPoint%20website%20concept/website%20assets/website%20images/website%20design%20and%20stock%20photos/booking%20steps%20faces/booking-steps-face-image-2_x5heop.jpg)] border-2 border-white dark:border-green-900"></div>
                <div className="w-8 h-8 rounded-full bg-cover bg-[url(https://res.cloudinary.com/doqbnfais/image/upload/v1743234420/onPoint%20website%20concept/website%20assets/website%20images/website%20design%20and%20stock%20photos/booking%20steps%20faces/booking-steps-face-image-3_qhng3y.jpg)] border-2 border-white dark:border-green-900"></div>
              </div>
              <span className="text-green-600 dark:text-green-300 text-sm">
                5 people going
              </span>
            </div>

            <button className="flex items-center text-green-600 dark:text-green-300 hover:text-green-700 dark:hover:text-green-200 transition-colors">
              <span className="mr-2">View Details</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
