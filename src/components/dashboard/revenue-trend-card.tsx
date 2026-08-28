"use client";

import * as React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsPillList, TabsPillTrigger } from "@/components/ui/tabs";
import { REVENUE_TREND } from "@/lib/dummy-data/dashboard";
import { formatMoney } from "@/lib/utils";

type Range = "7d" | "30d" | "90d";

function formatCurrency(value: number) {
  return `$${formatMoney(value)}`;
}

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-border bg-surface-elevated px-3 py-2 shadow-md">
      <p className="text-[13px] text-text-muted">{label}</p>
      <p className="text-sm font-semibold tabular-nums text-text-primary">{formatCurrency(payload[0].value)}</p>
    </div>
  );
}

export function RevenueTrendCard() {
  const [range, setRange] = React.useState<Range>("7d");
  const data = REVENUE_TREND[range];

  return (
    <Card className="flex flex-col lg:col-span-2">
      <CardHeader className="flex-col items-start gap-3 sm:flex-row sm:items-center">
        <CardTitle>Revenue Trend</CardTitle>
        <Tabs value={range} onValueChange={(v) => setRange(v as Range)}>
          <TabsPillList>
            <TabsPillTrigger value="7d">7d</TabsPillTrigger>
            <TabsPillTrigger value="30d">30d</TabsPillTrigger>
            <TabsPillTrigger value="90d">90d</TabsPillTrigger>
          </TabsPillList>
        </Tabs>
      </CardHeader>
      <div className="h-[240px] w-full sm:h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.18} />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="var(--border)" />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--text-muted)", fontSize: 12 }}
              dy={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--text-muted)", fontSize: 12 }}
              tickFormatter={(v) => `$${Math.round(v / 1000)}k`}
              width={44}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: "var(--border-strong)" }} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="var(--primary)"
              strokeWidth={2}
              fill="url(#revenueFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
