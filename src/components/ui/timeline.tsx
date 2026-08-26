import * as React from "react";
import { cn } from "@/lib/utils";

function Timeline({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) {
  return <ol className={cn("space-y-4", className)} role="list" {...props} />;
}

export type TimelineDotTone = "primary" | "success" | "warning" | "error" | "muted";

const DOT_TONE: Record<TimelineDotTone, string> = {
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
  muted: "bg-text-muted",
};

export interface TimelineItemProps extends React.HTMLAttributes<HTMLLIElement> {
  tone?: TimelineDotTone;
  /** Hides the connecting line below this item — set on the last item. */
  last?: boolean;
}

function TimelineItem({ tone = "muted", last = false, className, children, ...props }: TimelineItemProps) {
  return (
    <li className={cn("relative flex gap-3 pl-1", className)} {...props}>
      <span className="relative flex w-3 shrink-0 justify-center">
        <span className={cn("mt-1.5 size-2 shrink-0 rounded-full", DOT_TONE[tone])} aria-hidden />
        {!last ? <span className="absolute top-4 bottom-[-1rem] w-px bg-border" aria-hidden /> : null}
      </span>
      <div className="min-w-0 flex-1 pb-1">{children}</div>
    </li>
  );
}

export { Timeline, TimelineItem };
