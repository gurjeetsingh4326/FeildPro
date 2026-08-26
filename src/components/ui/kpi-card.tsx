import * as React from "react";
import { ArrowDown, ArrowUp, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface KpiCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  icon?: LucideIcon;
  delta?: {
    value: string;
    direction: "up" | "down";
    /** Whether an "up" delta is good news — false flips the color (e.g. avg. resolution time). */
    positiveIsGood?: boolean;
  };
}

function KpiCard({ label, value, icon: Icon, delta, className, ...props }: KpiCardProps) {
  const deltaIsGood =
    delta && (delta.positiveIsGood ?? true ? delta.direction === "up" : delta.direction === "down");

  return (
    <div
      className={cn("rounded-lg border border-border bg-surface p-5", className)}
      {...props}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-text-muted">
          {label}
        </span>
        {Icon ? (
          <span className="flex size-8 items-center justify-center rounded-md bg-primary-light text-primary-text">
            <Icon className="size-4" />
          </span>
        ) : null}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="tabular-nums text-[28px] font-bold leading-9 tracking-tight text-text-primary">
          {value}
        </span>
      </div>
      {delta ? (
        <div className="mt-1 flex items-center gap-1 text-[13px] font-medium">
          <span
            className={cn(
              "inline-flex items-center gap-0.5",
              deltaIsGood ? "text-success" : "text-error"
            )}
          >
            {delta.direction === "up" ? (
              <ArrowUp className="size-3.5" />
            ) : (
              <ArrowDown className="size-3.5" />
            )}
            {delta.value}
          </span>
          <span className="text-text-muted">vs last period</span>
        </div>
      ) : null}
    </div>
  );
}

export { KpiCard };
