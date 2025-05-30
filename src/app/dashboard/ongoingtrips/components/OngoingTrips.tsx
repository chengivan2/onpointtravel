"use client";

import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

export default function OngoingTrips({
  ongoingTrips,
}: {
  ongoingTrips: any[];
}) {
  const [trips, setTrips] = useState(ongoingTrips);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/bookings/update-status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      setTrips((prev) =>
        prev.map((trip) =>
          trip.id === id ? { ...trip, status: newStatus } : trip
        )
      );
    } catch (err) {
      toast.error("Failed to update trip status. Please try again.");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {trips.map((trip) => (
        <div key={trip.id} className="flex-1 w-full max-w-xl">
          <div className="relative rounded-2xl shadow-xl p-8 border bg-white/30 dark:bg-green-900/30 backdrop-blur-sm backdrop-saturate-150">
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-green-800 dark:text-green-100">
                    {trip.trip_name}
                  </h3>
                  <p className="text-green-600 dark:text-green-300">
                    {new Date(trip.start_date).toLocaleDateString()} -{" "}
                    {new Date(trip.end_date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Booked by: {trip.booked_by}
                  </p>
                </div>
                <select
                  title="Trip Status"
                  value={trip.status}
                  onChange={(e) => handleStatusChange(trip.id, e.target.value)}
                  className="bg-green-300/50 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-3 py-2 rounded-full text-sm"
                >
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="on_hold">On Hold</option>
                </select>
              </div>

              <div>
                <Progress
                  value={
                    ((new Date().getTime() -
                      new Date(trip.start_date).getTime()) /
                      (new Date(trip.end_date).getTime() -
                        new Date(trip.start_date).getTime())) *
                    100
                  }
                  className="h-[0.8rem] bg-green-200/50 dark:bg-green-200/80 rounded-full *:bg-green-700 *:dark:bg-green-900"
                />
              </div>

              <div
                className={`bg-cover bg-center bg-[url(${trip.featured_image})] h-[40vh] lg:h-[50vh] rounded-xl`}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
