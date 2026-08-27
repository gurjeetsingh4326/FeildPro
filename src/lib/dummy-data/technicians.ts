import { TECHNICIANS as SCHEDULE_TECHNICIANS, APPOINTMENTS, TODAY_DAY_OFFSET } from "@/lib/dummy-data/schedule";
import { WORK_ORDERS } from "@/lib/dummy-data/work-orders";

export type TechnicianStatus = "active" | "on_leave" | "inactive";

export const TECHNICIAN_STATUS_META: Record<TechnicianStatus, { label: string; badge: "success" | "warning" | "neutral" }> = {
  active: { label: "Active", badge: "success" },
  on_leave: { label: "On Leave", badge: "warning" },
  inactive: { label: "Inactive", badge: "neutral" },
};

export type DayOfWeek = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
export const DAYS_OF_WEEK: DayOfWeek[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
export const DAY_LABELS: Record<DayOfWeek, string> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

export interface AvailabilityWindow {
  start: string;
  end: string;
}

export interface TechnicianProfile {
  id: string;
  name: string;
  color: string;
  status: TechnicianStatus;
  role: string;
  phone: string;
  email: string;
  hireDate: string; // ISO date
  skills: string[];
  availability: Record<DayOfWeek, AvailabilityWindow | null>;
}

const STANDARD_WEEK: Record<DayOfWeek, AvailabilityWindow | null> = {
  mon: { start: "8:00 AM", end: "5:00 PM" },
  tue: { start: "8:00 AM", end: "5:00 PM" },
  wed: { start: "8:00 AM", end: "5:00 PM" },
  thu: { start: "8:00 AM", end: "5:00 PM" },
  fri: { start: "8:00 AM", end: "5:00 PM" },
  sat: null,
  sun: null,
};

const PART_TIME_WEEK: Record<DayOfWeek, AvailabilityWindow | null> = {
  mon: { start: "9:00 AM", end: "2:00 PM" },
  tue: null,
  wed: { start: "9:00 AM", end: "2:00 PM" },
  thu: null,
  fri: { start: "9:00 AM", end: "2:00 PM" },
  sat: null,
  sun: null,
};

const PROFILE_SEEDS: Record<string, Omit<TechnicianProfile, "id" | "name" | "color">> = {
  "tech-1": {
    status: "active",
    role: "Senior HVAC Technician",
    phone: "(555) 030-0101",
    email: "maria@fieldpro.dev",
    hireDate: "2021-04-12",
    skills: ["HVAC Systems", "Refrigeration", "Water Heaters"],
    availability: STANDARD_WEEK,
  },
  "tech-2": {
    status: "active",
    role: "Electrical Technician",
    phone: "(555) 030-0102",
    email: "sam@fieldpro.dev",
    hireDate: "2022-01-24",
    skills: ["Electrical Systems", "Elevator Maintenance"],
    availability: STANDARD_WEEK,
  },
  "tech-3": {
    status: "active",
    role: "Plumbing Technician",
    phone: "(555) 030-0103",
    email: "dana@fieldpro.dev",
    hireDate: "2020-09-08",
    skills: ["Plumbing", "HVAC Duct Cleaning"],
    availability: STANDARD_WEEK,
  },
  "tech-4": {
    status: "active",
    role: "Fire & Safety Technician",
    phone: "(555) 030-0104",
    email: "jordan.p@fieldpro.dev",
    hireDate: "2023-03-15",
    skills: ["Fire Suppression", "Refrigeration"],
    availability: PART_TIME_WEEK,
  },
  "tech-5": {
    status: "active",
    role: "HVAC Technician",
    phone: "(555) 030-0105",
    email: "alex@fieldpro.dev",
    hireDate: "2019-11-02",
    skills: ["HVAC Systems", "Boiler Maintenance"],
    availability: STANDARD_WEEK,
  },
  "tech-6": {
    status: "on_leave",
    role: "Electrical Technician",
    phone: "(555) 030-0106",
    email: "chris@fieldpro.dev",
    hireDate: "2023-07-19",
    skills: ["Electrical Rewiring", "HVAC Duct Cleaning"],
    availability: STANDARD_WEEK,
  },
};

export const TECHNICIANS: TechnicianProfile[] = SCHEDULE_TECHNICIANS.map((t) => ({
  id: t.id,
  name: t.name,
  color: t.color,
  ...PROFILE_SEEDS[t.id],
}));

export function getTechnician(id: string): TechnicianProfile | null {
  return TECHNICIANS.find((t) => t.id === id) ?? null;
}

export function getTechnicianByName(name: string): TechnicianProfile | null {
  return TECHNICIANS.find((t) => t.name === name) ?? null;
}

export interface TechnicianStats {
  jobsToday: number;
  utilizationPct: number;
  jobsCompleted: number;
  totalRevenue: number;
  avgJobValue: number;
  onTimeRatePct: number;
  rating: number;
}

/** 6 jobs/day treated as full capacity for the utilization meter. */
const FULL_CAPACITY_JOBS_PER_DAY = 6;

/** On-time rate and customer rating have no underlying tracked data yet
    (no due-date/CSAT model exists) — hand-picked per technician rather than
    a formula, since a generated sequence for only 6 people reads as an
    obviously artificial pattern. */
const PERFORMANCE_SEEDS: Record<string, { onTimeRatePct: number; rating: number }> = {
  "tech-1": { onTimeRatePct: 97, rating: 4.9 },
  "tech-2": { onTimeRatePct: 94, rating: 4.7 },
  "tech-3": { onTimeRatePct: 91, rating: 4.6 },
  "tech-4": { onTimeRatePct: 96, rating: 4.8 },
  "tech-5": { onTimeRatePct: 89, rating: 4.4 },
  "tech-6": { onTimeRatePct: 93, rating: 4.5 },
};

export function getTechnicianStats(technicianId: string, technicianName: string): TechnicianStats {
  const jobsToday = APPOINTMENTS.filter(
    (a) => a.technicianId === technicianId && a.dayOffset === TODAY_DAY_OFFSET
  ).length;
  const utilizationPct = Math.min(100, Math.round((jobsToday / FULL_CAPACITY_JOBS_PER_DAY) * 100));

  const jobs = WORK_ORDERS.filter((w) => w.technicianName === technicianName);
  const completedJobs = jobs.filter((w) => ["completed", "invoiced", "paid"].includes(w.status));
  const totalRevenue = completedJobs.reduce((sum, w) => sum + w.total, 0);
  const avgJobValue = completedJobs.length > 0 ? Math.round(totalRevenue / completedJobs.length) : 0;

  const performance = PERFORMANCE_SEEDS[technicianId] ?? { onTimeRatePct: 90, rating: 4.5 };

  return {
    jobsToday,
    utilizationPct,
    jobsCompleted: completedJobs.length,
    totalRevenue,
    avgJobValue,
    ...performance,
  };
}

export function getTechnicianJobs(technicianName: string) {
  return WORK_ORDERS.filter((w) => w.technicianName === technicianName).sort((a, b) =>
    b.scheduledDate.localeCompare(a.scheduledDate)
  );
}
