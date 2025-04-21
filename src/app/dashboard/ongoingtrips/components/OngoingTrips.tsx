"use client";

import { Progress } from "@/components/ui/progress";

export default function OngoingTrips({ ongoingTrip }: { ongoingTrip: any }) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      {ongoingTrip ? (
        <div className="flex-1 w-full max-w-xl">
          <div className="relative rounded-2xl shadow-xl p-8 border bg-white/30 dark:bg-green-900/30 backdrop-blur-sm backdrop-saturate-150">
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-green-800 dark:text-green-100">
                    {ongoingTrip.trips.name}
                  </h3>
                  <p className="text-green-600 dark:text-green-300">
                    {new Date(ongoingTrip.start_date).toLocaleDateString()} -{" "}
                    {new Date(ongoingTrip.end_date).toLocaleDateString()}
                  </p>
                </div>
                <span className="relative flex items-center bg-green-300/50 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm">
                  Ongoing
                </span>
              </div>

              <div>
                <Progress
                  value={
                    ((new Date().getTime() - new Date(ongoingTrip.start_date).getTime()) /
                      (new Date(ongoingTrip.end_date).getTime() -
                        new Date(ongoingTrip.start_date).getTime())) *
                    100
                  }
                  className="h-[0.8rem] bg-green-200/50 dark:bg-green-100/80 rounded-full"
                />
              </div>

              <div
                className="bg-cover bg-center h-[40vh] lg:h-[50vh] rounded-xl"
                style={{
                  backgroundImage: `url(${ongoingTrip.trips.main_featured_image_url})`,
                }}
              ></div>
            </div>
          </div>
        </div>
      ) : null}

    </div>
  );
}