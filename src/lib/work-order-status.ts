import type { WorkOrderStatus } from "@/lib/types";

export const STATUS_META: Record<
  WorkOrderStatus,
  { label: string; badge: "neutral" | "info" | "primary" | "warning" | "success" | "error" }
> = {
  draft: { label: "Draft", badge: "neutral" },
  scheduled: { label: "Scheduled", badge: "info" },
  in_progress: { label: "In Progress", badge: "primary" },
  on_hold: { label: "On Hold", badge: "warning" },
  completed: { label: "Completed", badge: "success" },
  invoiced: { label: "Invoiced", badge: "info" },
  paid: { label: "Paid", badge: "success" },
  cancelled: { label: "Cancelled", badge: "error" },
};

export const STATUS_ORDER: WorkOrderStatus[] = [
  "draft",
  "scheduled",
  "in_progress",
  "on_hold",
  "completed",
  "invoiced",
  "paid",
  "cancelled",
];
