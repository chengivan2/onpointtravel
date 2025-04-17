"use client";

import * as React from "react";
import { Pie, PieChart, Cell, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createClient } from "@/utils/supabase/client";

const COLORS = ["#34D399", "#60A5FA", "#FBBF24", "#F87171", "#A78BFA"];

export default function TopTripsPieChart() {
  const supabase = createClient();
  const [chartData, setChartData] = React.useState<any[]>([]);
  const [timeRange, setTimeRange] = React.useState<"all_time" | "this_month">("all_time");

  React.useEffect(() => {
    const fetchChartData = async () => {
      const currentMonth = new Date().getMonth() + 1; // Get current month (1-based)
      const currentYear = new Date().getFullYear();

      let query = supabase
        .from("bookings")
        .select("trips(name), count:trip_id") // Aggregate count of trip_id and group by trips.name
        .eq("status", "confirmed")
        .order("count", { ascending: false })
        .limit(5);

      if (timeRange === "this_month") {
        query = query
          .gte("booked_at", `${currentYear}-${String(currentMonth).padStart(2, "0")}-01`)
          .lte("booked_at", `${currentYear}-${String(currentMonth).padStart(2, "0")}-31`);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching chart data:", error.message);
      } else {
        const formattedData = data?.map((item) => ({
          name: item.trips[0]?.name || "Unknown", // Access trips.name
          value: item.count,
        }));
        setChartData(formattedData || []);
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
          onValueChange={(value) => setTimeRange(value as "all_time" | "this_month")}
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
              fill="#8884d8"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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