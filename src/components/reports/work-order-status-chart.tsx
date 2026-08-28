"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { workOrderStatusBreakdown } from "@/lib/dummy-data/reports";

const CHART_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

function ChartTooltip({ active, payload }: { active?: boolean; payload?: { name: string; value: number }[] }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-border bg-surface-elevated px-3 py-2 shadow-md">
      <p className="text-[13px] text-text-muted">{payload[0].name}</p>
      <p className="text-sm font-semibold tabular-nums text-text-primary">{payload[0].value}</p>
    </div>
  );
}

export function WorkOrderStatusChart() {
  const data = workOrderStatusBreakdown();
  const total = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Work Order Status</CardTitle>
      </CardHeader>
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <div className="relative h-[180px] w-[180px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="count" nameKey="label" innerRadius={56} outerRadius={80} paddingAngle={2} strokeWidth={0}>
                {data.map((entry, i) => (
                  <Cell key={entry.status} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold tabular-nums text-text-primary">{total}</span>
            <span className="text-[12px] text-text-muted">Work Orders</span>
          </div>
        </div>
        <ul className="flex-1 space-y-1.5">
          {data.map((entry, i) => (
            <li key={entry.status} className="flex items-center justify-between gap-2 text-[13px]">
              <span className="flex items-center gap-2 text-text-secondary">
                <span
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }}
                  aria-hidden
                />
                {entry.label}
              </span>
              <span className="tabular-nums font-medium text-text-primary">{entry.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
