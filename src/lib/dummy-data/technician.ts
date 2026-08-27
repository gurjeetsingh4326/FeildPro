import { WORK_ORDERS, type WorkOrder } from "@/lib/dummy-data/work-orders";
import { getWorkOrderDetail } from "@/lib/dummy-data/work-order-detail";

/** Matches the fixed "today" used throughout the dummy data (Dashboard, Schedule). */
export const TECHNICIAN_TODAY_ISO = "2026-08-26";

export interface TechnicianJob {
  workOrder: WorkOrder;
  address: string;
  /** Fabricated (id-hash-derived) — there's no real geolocation in this dummy build. */
  distanceMiles: number;
}

function distanceFor(id: string): number {
  const digits = id.replace(/\D/g, "").slice(-2);
  const seed = Number(digits) || 0;
  return Math.round(((seed % 15) + 1.5) * 10) / 10;
}

function toTechnicianJob(wo: WorkOrder): TechnicianJob {
  return {
    workOrder: wo,
    address: getWorkOrderDetail(wo.id)?.customer.address ?? "Address on file",
    distanceMiles: distanceFor(wo.id),
  };
}

function timeToMinutes(time: string): number {
  const match = time.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return 0;
  let hours = Number(match[1]) % 12;
  if (match[3].toUpperCase() === "PM") hours += 12;
  return hours * 60 + Number(match[2]);
}

/** Today's agenda for the given technician, chronological. */
export function getTechnicianTodayJobs(technicianName: string): TechnicianJob[] {
  return WORK_ORDERS.filter(
    (wo) => wo.technicianName === technicianName && wo.scheduledDate === TECHNICIAN_TODAY_ISO
  )
    .sort((a, b) => timeToMinutes(a.scheduledTime) - timeToMinutes(b.scheduledTime))
    .map(toTechnicianJob);
}

/** Full active pipeline for the given technician (today + upcoming), for the Jobs tab. */
export function getTechnicianJobs(technicianName: string): TechnicianJob[] {
  return WORK_ORDERS.filter(
    (wo) =>
      wo.technicianName === technicianName &&
      wo.scheduledDate >= TECHNICIAN_TODAY_ISO &&
      !["cancelled", "paid"].includes(wo.status)
  )
    .sort((a, b) => (a.scheduledDate === b.scheduledDate ? timeToMinutes(a.scheduledTime) - timeToMinutes(b.scheduledTime) : a.scheduledDate.localeCompare(b.scheduledDate)))
    .map(toTechnicianJob);
}

export interface TechnicianStats {
  completedThisWeek: number;
  jobsToday: number;
  avgJobDurationHours: number;
}

export function getTechnicianStats(technicianName: string): TechnicianStats {
  const allJobs = WORK_ORDERS.filter((wo) => wo.technicianName === technicianName);
  const completedThisWeek = allJobs.filter(
    (wo) => wo.status === "completed" || wo.status === "invoiced" || wo.status === "paid"
  ).length;
  return {
    completedThisWeek,
    jobsToday: getTechnicianTodayJobs(technicianName).length,
    avgJobDurationHours: 1.6,
  };
}
