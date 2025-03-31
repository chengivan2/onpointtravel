"use client";

import SlotCounter from "react-slot-counter";

export default function Stats() {
  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
          <h2 className="text-4xl font-semibold lg:text-5xl">
            Straight to the onPoint Stats
          </h2>
          <p>
            With our reach and contacts all over the world, getting you from
            point A to point B is way easier and much more comfy with onPoint.
            You might think it's a lie but numbers never lie
          </p>
        </div>

        <div className="grid gap-[1rem] *:text-center *:rounded-lg *:bg-white/60 *:dark:bg-green-900/20 *:backdrop-blur-md *:border *:border-green-100/40 *:dark:border-green-900/30 *:shadow-lg *transition-all *:dark:drop-shadow-2xl md:grid-cols-3">
          <div className="rounded-(--radius) space-y-4 py-12">
            <div className="text-5xl font-bold text-green-500 dark:text-green-400 drop-shadow-lg">
              <SlotCounter value={"6,000"} />
            </div>
            <p>Trips Organized</p>
          </div>
          <div className="rounded-(--radius) space-y-4 py-12">
            <div className="text-5xl font-bold text-green-500 dark:text-green-400 drop-shadow-lg">
              <SlotCounter value={"120,000"} />
            </div>
            <p>Customers Served</p>
          </div>
          <div className="rounded-(--radius) space-y-4 py-12">
            <div className="text-5xl font-bold">
              <div className="flex justify-center items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-10 h-10 text-green-500 dark:text-green-400 drop-shadow-lg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <p>Global Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}
