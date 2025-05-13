"use client";

import * as React from "react";
import { Pie, PieChart, Cell, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

const COLORS = ["#34D399", "#60A5FA", "#FBBF24", "#F87171", "#A78BFA"];

export default function TopTripsPieChart() {
  const supabase = createClient();
  const [chartData, setChartData] = React.useState<any[]>([]);
  const [timeRange, setTimeRange] = React.useState<"all_time" | "this_month">(
    "all_time"
  );

  React.useEffect(() => {
    const fetchChartData = async () => {
      try {
        const currentMonth = new Date().getMonth() + 1; // Get current month (1-based)
        const currentYear = new Date().getFullYear();

        // Fetch confirmed bookings
        let query = supabase
          .from("bookings")
          .select(
            `
            trip_id,
            trips (
              id,
              name
            )
          `
          )
          .eq("status", "completed");

        if (timeRange === "this_month") {
          query = query
            .gte(
              "booked_at",
              `${currentYear}-${String(currentMonth).padStart(2, "0")}-01`
            )
            .lte(
              "booked_at",
              `${currentYear}-${String(currentMonth).padStart(2, "0")}-31`
            );
        }

        const { data, error } = await query;

        if (error) {
          toast.error("Failed to fetch chart data. Please try again.");
          setChartData([]);
        }

        if (data && data.length > 0) {
          // Count bookings per trip
          const tripCounts: Record<string, { count: number; name: string }> =
            {};

          data.forEach((booking: any) => {
            const tripId = booking.trip_id;
            const tripName = booking.trips?.name || "Unknown";

            if (!tripCounts[tripId]) {
              tripCounts[tripId] = { count: 0, name: tripName };
            }

            tripCounts[tripId].count += 1;
          });

          // Convert to array, sort by count, and take top 5
          const formattedData = Object.values(tripCounts)
            .sort((a, b) => b.count - a.count)
            .slice(0, 5)
            .map((trip) => ({
              name: trip.name,
              value: trip.count,
            }));

          setChartData(formattedData);
        } else {
          setChartData([]);
        }
      } catch (error: any) {
        toast.error("Failed to fetch chart data. Please try again.");
        setChartData([]);
      }
    };

    fetchChartData();
  }, [timeRange, supabase]);

  return (
    <Card className="bg-white/80 dark:bg-green-900/40 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100 dark:border-green-900/50 shadow-xl">
      <CardHeader>
        <CardTitle>Top 5 Most Booked Trips</CardTitle>
        <Select
          value={timeRange}
          onValueChange={(value) =>
            setTimeRange(value as "all_time" | "this_month")
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all_time">All Time</SelectItem>
            <SelectItem value="this_month">This Month</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        {chartData.length > 0 ? (
          <PieChart width={400} height={400}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              innerRadius={80} // Add this to create the hollow center
              fill="#8884d8"
              label
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        ) : (
          <p className="text-center text-gray-500">No data available</p>
        )}
      </CardContent>
    </Card>
  );
}
