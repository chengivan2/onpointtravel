"use client";

import * as React from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function OngoingTrips() {
  const [ongoingTrip, setOngoingTrip] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchOngoingTrip = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data: trips } = await supabase
        .from("bookings")
        .select(
          `
          id,
          start_date,
          end_date,
          trips (
            name,
            featured_image
          )
          `
        )
        .eq("user_id", user.id)
        .eq("status", "confirmed");

      const now = new Date();
      const ongoing = trips?.find((trip) => {
        const startDate = new Date(trip.start_date);
        startDate.setHours(9, 0, 0, 0); // Set to 9 AM
        return now >= startDate && now <= new Date(trip.end_date);
      });

      setOngoingTrip(ongoing || null);
    };

    fetchOngoingTrip();
  }, []);

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
                  backgroundImage: `url(${ongoingTrip.trips.featured_image})`,
                }}
              ></div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Create Trip Button */}
      <Link
        href="/dashboard/trips/create"
        className="flex items-center justify-center w-48 h-48 rounded-full bg-green-500 text-white hover:bg-green-600 shadow-lg text-center"
      >
        <div>
          <PlusIcon className="w-12 h-12 mx-auto" />
          <p className="text-lg font-semibold mt-2">Create a Trip</p>
        </div>
      </Link>
    </div>
  );
}