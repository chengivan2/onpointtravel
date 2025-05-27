"use client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import EmptyUserPaymentsCard from "./EmptyUserPaymentsCard";
import { FC } from "react";

interface PaymentsPerMonth {
  month: string;
  total: number;
}

const UserPaymentsAreaChart: FC<{ data: PaymentsPerMonth[] }> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <EmptyUserPaymentsCard />
    );
  }
  return (
    <div className="rounded-2xl shadow-xl bg-white/40 dark:bg-green-900/30 p-6">
      <h3 className="text-xl font-semibold mb-4">Payments Over Time</h3>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPay" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
          <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="total" stroke="#16a34a" fillOpacity={1} fill="url(#colorPay)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserPaymentsAreaChart;
