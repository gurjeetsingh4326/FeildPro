/* Shared domain types — dummy-data modules and future API DTOs both conform to
   these, so wiring up the real backend later is a data-source swap, not a
   reshape. Mirrors the entities in the project brief Section 11. */

export type WorkOrderStatus =
  | "draft"
  | "scheduled"
  | "in_progress"
  | "on_hold"
  | "completed"
  | "invoiced"
  | "paid"
  | "cancelled";

export type WorkOrderPriority = "low" | "medium" | "high" | "urgent";

export interface WorkOrderSummary {
  id: string;
  customerName: string;
  service: string;
  priority: WorkOrderPriority;
  status: WorkOrderStatus;
  technicianName: string | null;
  scheduledAt: string | null;
  total: number;
}

export interface AppointmentSummary {
  id: string;
  time: string;
  customerName: string;
  service: string;
  technicianName: string;
  address: string;
}

export interface TechnicianUtilization {
  id: string;
  name: string;
  utilizationPct: number;
  jobsToday: number;
}

export type ActivityEventType = "created" | "assigned" | "completed" | "invoiced" | "paid" | "note";

export interface ActivityEvent {
  id: string;
  type: ActivityEventType;
  actorName: string;
  description: string;
  timestamp: string;
}

export type InvoiceStatus = "sent" | "overdue" | "paid" | "draft";

export interface InvoiceSummary {
  id: string;
  customerName: string;
  amount: number;
  daysOverdue: number;
  status: InvoiceStatus;
}

export interface RevenuePoint {
  label: string;
  revenue: number;
}
