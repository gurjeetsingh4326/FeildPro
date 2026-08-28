"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { RESOLUTION_TIME_TREND } from "@/lib/dummy-data/reports";

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-border bg-surface-elevated px-3 py-2 shadow-md">
      <p className="text-[13px] text-text-muted">{label}</p>
      <p className="text-sm font-semibold tabular-nums text-text-primary">{payload[0].value} hrs avg</p>
    </div>
  );
}

export function ResolutionTimeChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Avg. Resolution Time</CardTitle>
      </CardHeader>
      <div className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={RESOLUTION_TIME_TREND} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--border)" />
            <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "var(--text-muted)", fontSize: 12 }} dy={8} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--text-muted)", fontSize: 12 }}
              tickFormatter={(v) => `${Number(v).toFixed(1)}h`}
              width={40}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--surface-sunken)" }} />
            <Bar dataKey="hours" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
