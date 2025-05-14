"use client";
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#22c55e", "#16a34a", "#bbf7d0", "#4ade80", "#166534", "#a7f3d0"];

interface TopTripData { trip: string; count: number }

export default function UserTopTripsDoughnut({ data }: { data: TopTripData[] }) {
  return (
    <Card className="relative rounded-2xl shadow-xl bg-white/40 dark:bg-green-900/30 backdrop-blur-md border border-green-100/30 dark:border-green-900/30 p-4 overflow-hidden">
      <svg className="absolute -top-10 -right-10 w-64 h-64 opacity-10 text-green-300 pointer-events-none z-0" fill="none" viewBox="0 0 200 200"><circle cx="100" cy="100" r="100" fill="currentColor" /></svg>
      <div className="relative z-10">
        <h4 className="text-lg font-semibold mb-2">Most Booked Trips</h4>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="trip"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              fill="#22c55e"
              paddingAngle={3}
              label={({ name }) => name}
            >
              {data.map((entry: TopTripData, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
