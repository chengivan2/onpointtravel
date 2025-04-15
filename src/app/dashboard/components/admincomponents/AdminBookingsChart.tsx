"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/client";

export default function AdminBookingsChart() {
  const supabase = createClient();
  const [chartData, setChartData] = React.useState<any[]>([]);
  const [userRole, setUserRole] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("users")
          .select("role")
          .eq("id", user.id)
          .single();

        if (profile) {
          setUserRole(profile.role);
        }
      }
    };

    const fetchChartData = async () => {
      const { data: bookings } = await supabase
        .from("bookings")
        .select("id, status, booked_at");

      if (bookings) {
        const monthlyData = Array(12)
          .fill(0)
          .map((_, index) => ({
            month: new Date(0, index).toLocaleString("en-US", {
              month: "short",
            }),
            total: 0,
            pending: 0,
            completed: 0,
          }));

        bookings.forEach((booking) => {
          const date = new Date(booking.booked_at);
          const monthIndex = date.getMonth();
          monthlyData[monthIndex].total += 1;

          if (booking.status === "pending") {
            monthlyData[monthIndex].pending += 1;
          } else if (booking.status === "completed") {
            monthlyData[monthIndex].completed += 1;
          }
        });

        setChartData(monthlyData);
      }
    };

    fetchUserData();
    fetchChartData();
  }, [supabase]);

  if (userRole !== "admin") {
    return null; // Do not render the chart if the user is not an admin
  }

  return (
    <Card className="bg-white/80 dark:bg-green-900/40 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100 dark:border-green-900/50 shadow-xl">
      <CardHeader>
        <CardTitle>Monthly Bookings</CardTitle>
        <CardDescription>
          Number of bookings categorized by status over the last 12 months.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <AreaChart
          width={800}
          height={400}
          data={chartData}
          className="w-full h-auto"
        >
          <defs>
            <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="rgba(34, 197, 94, 1)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="rgba(34, 197, 94, 1)"
                stopOpacity={0.1}
              />
            </linearGradient>
            <linearGradient id="pendingGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="rgba(255, 193, 7, 1)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="rgba(255, 193, 7, 1)"
                stopOpacity={0.1}
              />
            </linearGradient>
            <linearGradient id="completedGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="rgba(34, 197, 94, 1)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="rgba(34, 197, 94, 1)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(34, 197, 94, 0.5)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(34, 197, 94, 0.5)",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="total"
            stroke="rgba(34, 197, 94, 1)"
            fill="url(#totalGradient)"
          />
          <Area
            type="monotone"
            dataKey="pending"
            stroke="rgba(255, 193, 7, 1)"
            fill="url(#pendingGradient)"
          />
          <Area
            type="monotone"
            dataKey="completed"
            stroke="rgba(34, 197, 94, 1)"
            fill="url(#completedGradient)"
          />
        </AreaChart>
      </CardContent>
    </Card>
  );
}
