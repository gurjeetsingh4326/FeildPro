import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  /** Switches fill color at thresholds — e.g. utilization/capacity meters. */
  tone?: "primary" | "auto";
}

function toneColor(value: number, tone: ProgressProps["tone"]) {
  if (tone !== "auto") return "bg-primary";
  if (value >= 85) return "bg-error";
  if (value >= 65) return "bg-warning";
  return "bg-success";
}

function Progress({ value, tone = "primary", className, ...props }: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("h-1.5 w-full overflow-hidden rounded-full bg-surface-sunken", className)}
      {...props}
    >
      <div
        className={cn("h-full rounded-full transition-[width]", toneColor(clamped, tone))}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

export { Progress };
