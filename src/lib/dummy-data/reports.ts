import { WORK_ORDERS } from "@/lib/dummy-data/work-orders";
import { REVENUE_TREND } from "@/lib/dummy-data/dashboard";
import { INVOICES, invoiceTotal } from "@/lib/dummy-data/invoices";
import { TECHNICIANS, getTechnicianStats } from "@/lib/dummy-data/technicians";
import { STATUS_META, STATUS_ORDER } from "@/lib/work-order-status";
import type { WorkOrderStatus } from "@/lib/types";

const REVENUE_STATUSES: WorkOrderStatus[] = ["completed", "invoiced", "paid"];

export function totalRevenue90d(): number {
  return REVENUE_TREND["90d"].reduce((sum, p) => sum + p.revenue, 0);
}

export function workOrdersCompleted(): number {
  return WORK_ORDERS.filter((w) => REVENUE_STATUSES.includes(w.status)).length;
}

export function outstandingInvoicesTotal(): number {
  return INVOICES.filter((inv) => inv.status === "sent" || inv.status === "overdue").reduce(
    (sum, inv) => sum + invoiceTotal(inv),
    0
  );
}

export interface StatusBreakdownEntry {
  status: WorkOrderStatus;
  label: string;
  count: number;
}

export function workOrderStatusBreakdown(): StatusBreakdownEntry[] {
  return STATUS_ORDER.map((status) => ({
    status,
    label: STATUS_META[status].label,
    count: WORK_ORDERS.filter((w) => w.status === status).length,
  })).filter((entry) => entry.count > 0);
}

export interface TechnicianPerformanceRow {
  id: string;
  name: string;
  jobsCompleted: number;
  revenue: number;
  utilizationPct: number;
  onTimeRatePct: number;
  rating: number;
}

export function technicianPerformance(): TechnicianPerformanceRow[] {
  return TECHNICIANS.map((tech) => {
    const stats = getTechnicianStats(tech.id, tech.name);
    return {
      id: tech.id,
      name: tech.name,
      jobsCompleted: stats.jobsCompleted,
      revenue: stats.totalRevenue,
      utilizationPct: stats.utilizationPct,
      onTimeRatePct: stats.onTimeRatePct,
      rating: stats.rating,
    };
  }).sort((a, b) => b.revenue - a.revenue);
}

/** No underlying due-date/resolution tracking exists yet (docs/DESIGN_DECISIONS.md
    known-risks: dummy-data-only phase) — a plausible weekly trend, hand-picked
    rather than computed, same as Technician on-time-rate/rating. Last point
    matches the Dashboard KPI card's "Avg. Resolution: 3.4h" exactly, since
    both are describing the same current figure. */
export const RESOLUTION_TIME_TREND = [
  { label: "Wk 1", hours: 3.8 },
  { label: "Wk 2", hours: 3.6 },
  { label: "Wk 3", hours: 3.6 },
  { label: "Wk 4", hours: 3.4 },
];

export const FIRST_TIME_FIX_RATE_PCT = 87;
export const CSAT_SCORE = 4.6;
