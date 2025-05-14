"use client";
import { Card } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { FC } from "react";

interface BookingsPerMonth {
  month: string;
  count: number;
}

const UserBookingsAreaChart: FC<{ data: BookingsPerMonth[] }> = ({ data }) => {
  return (
    <Card className="relative rounded-2xl shadow-xl bg-white/40 dark:bg-green-900/30 backdrop-blur-md border border-green-100/30 dark:border-green-900/30 p-4 overflow-hidden">
      <svg className="absolute -top-10 -right-10 w-64 h-64 opacity-10 text-green-300 pointer-events-none z-0" fill="none" viewBox="0 0 200 200"><circle cx="100" cy="100" r="100" fill="currentColor" /></svg>
      <div className="relative z-10">
        <h4 className="text-lg font-semibold mb-2">Bookings in Last 5 Months</h4>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="month" stroke="#166534" fontSize={12} />
            <YAxis allowDecimals={false} stroke="#166534" fontSize={12} />
            <CartesianGrid strokeDasharray="3 3" stroke="#bbf7d0" />
            <Tooltip />
            <Area type="monotone" dataKey="count" stroke="#22c55e" fillOpacity={1} fill="url(#colorBookings)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default UserBookingsAreaChart;
