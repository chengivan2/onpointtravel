"use client";
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#22c55e", "#16a34a", "#bbf7d0", "#4ade80", "#166534", "#a7f3d0"];

interface TopTripData { trip: string; count: number }

export default function UserTopTripsDoughnut({ data }: { data: TopTripData[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[220px] bg-white/40 dark:bg-green-900/30 rounded-2xl shadow-xl p-8 relative overflow-hidden">
        <svg className="absolute -top-10 -left-10 w-48 h-48 opacity-10 text-green-400" fill="none" viewBox="0 0 200 200"><circle cx="100" cy="100" r="100" fill="currentColor" /></svg>
        <svg className="w-12 h-12 text-green-500 mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        <p className="text-lg text-green-800 dark:text-green-100 font-semibold mb-2">No top trips yet</p>
        <p className="text-gray-600 dark:text-green-200 mb-4">You haven't booked any trips yet. Book a trip to see your most booked destinations!</p>
        <a
          href="/trips"
          className="mt-2 px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg transition-colors"
        >
          Book an Adventure
        </a>
      </div>
    );
  }

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
