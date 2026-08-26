import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium leading-none w-fit",
  {
    variants: {
      variant: {
        neutral: "bg-surface-sunken text-text-secondary",
        primary: "bg-chip-bg text-chip-text",
        success: "bg-success-bg text-success",
        warning: "bg-warning-bg text-warning",
        error: "bg-error-bg text-error",
        info: "bg-info-bg text-info",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

function Badge({ className, variant, dot = false, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, className }))} {...props}>
      {dot ? (
        <span
          className="size-1.5 rounded-full bg-current"
          aria-hidden
        />
      ) : null}
      {children}
    </span>
  );
}

/* Work-order priority badge — square-ish radius (not pill) to read distinctly
   from status badges, per docs/COMPONENT_GUIDELINES.md. */
const priorityVariants = cva(
  "inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 text-xs font-medium leading-none w-fit border",
  {
    variants: {
      priority: {
        low: "border-priority-low/30 bg-priority-low/10 text-priority-low",
        medium: "border-priority-medium/30 bg-priority-medium/10 text-priority-medium",
        high: "border-priority-high/30 bg-priority-high/10 text-priority-high",
        urgent: "border-priority-urgent/30 bg-priority-urgent/10 text-priority-urgent",
      },
    },
    defaultVariants: {
      priority: "medium",
    },
  }
);

export interface PriorityBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof priorityVariants> {}

function PriorityBadge({ className, priority, children, ...props }: PriorityBadgeProps) {
  return (
    <span className={cn(priorityVariants({ priority, className }))} {...props}>
      {children}
    </span>
  );
}

export { Badge, badgeVariants, PriorityBadge, priorityVariants };
