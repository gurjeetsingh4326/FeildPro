import type { WorkOrderStatus } from "@/lib/types";

export interface Technician {
  id: string;
  name: string;
  /** Fixed per technician, used consistently for every appointment block and
      the filter rail's swatch (docs/DASHBOARD_DESIGN.md → Dispatcher/Schedule). */
  color: string;
}

export interface ScheduleAppointment {
  id: string;
  technicianId: string | null;
  /** 0 = Monday of the displayed week ... 6 = Sunday. */
  dayOffset: number;
  /** 24h decimal, e.g. 9.5 = 9:30 AM. */
  startHour: number;
  durationHours: number;
  customerName: string;
  service: string;
  address: string;
  status: WorkOrderStatus;
}

export const TECHNICIANS: Technician[] = [
  { id: "tech-1", name: "Maria Chen", color: "#8B5CF6" },
  { id: "tech-2", name: "Sam Torres", color: "#2563EB" },
  { id: "tech-3", name: "Dana Lee", color: "#0D9488" },
  { id: "tech-4", name: "Jordan Park", color: "#EA580C" },
  { id: "tech-5", name: "Alex Kim", color: "#C026D3" },
  { id: "tech-6", name: "Chris Nguyen", color: "#65A30D" },
];

/** Displayed week: Mon Aug 24 – Sun Aug 30, 2026. "Today" (session date) is
    Wed Aug 26 → dayOffset 2. */
export const WEEK_START_LABEL = "Aug 24";
export const TODAY_DAY_OFFSET = 2;

export const DAY_LABELS = [
  { label: "Mon", date: "Aug 24" },
  { label: "Tue", date: "Aug 25" },
  { label: "Wed", date: "Aug 26" },
  { label: "Thu", date: "Aug 27" },
  { label: "Fri", date: "Aug 28" },
  { label: "Sat", date: "Aug 29" },
  { label: "Sun", date: "Aug 30" },
];

export const DAY_START_HOUR = 7;
export const DAY_END_HOUR = 18;

export const APPOINTMENTS: ScheduleAppointment[] = [
  // Monday
  { id: "sch-1", technicianId: "tech-1", dayOffset: 0, startHour: 8, durationHours: 1.5, customerName: "Acme Facilities Inc.", service: "HVAC Preventive Maintenance", address: "1204 Industrial Pkwy", status: "scheduled" },
  { id: "sch-2", technicianId: "tech-1", dayOffset: 0, startHour: 11, durationHours: 2, customerName: "Union Coffee Co.", service: "Refrigeration Service", address: "22 Union Sq", status: "scheduled" },
  { id: "sch-3", technicianId: "tech-2", dayOffset: 0, startHour: 9, durationHours: 1, customerName: "Northgate Mall", service: "Electrical Panel Inspection", address: "500 Northgate Dr", status: "scheduled" },
  { id: "sch-4", technicianId: "tech-2", dayOffset: 0, startHour: 13, durationHours: 2.5, customerName: "Downtown Office Tower", service: "Elevator Electrical Fault", address: "1 Downtown Plz", status: "in_progress" },
  { id: "sch-5", technicianId: "tech-3", dayOffset: 0, startHour: 8.5, durationHours: 1.5, customerName: "Riverside Clinic", service: "Emergency Plumbing Repair", address: "88 Riverside Ave", status: "completed" },
  { id: "sch-6", technicianId: "tech-4", dayOffset: 0, startHour: 10, durationHours: 1, customerName: "Bright Start Daycare", service: "Fire Suppression Inspection", address: "77 Maple St", status: "scheduled" },

  // Tuesday
  { id: "sch-7", technicianId: "tech-1", dayOffset: 1, startHour: 9, durationHours: 2, customerName: "Lakeside Apartments", service: "Water Heater Replacement", address: "45 Lakeside Dr", status: "scheduled" },
  { id: "sch-8", technicianId: "tech-3", dayOffset: 1, startHour: 8, durationHours: 1, customerName: "Green Valley School", service: "HVAC Duct Cleaning", address: "12 Green Valley Rd", status: "scheduled" },
  { id: "sch-9", technicianId: "tech-4", dayOffset: 1, startHour: 13.5, durationHours: 1.5, customerName: "Union Coffee Co.", service: "Refrigeration Follow-up", address: "22 Union Sq", status: "scheduled" },
  { id: "sch-10", technicianId: "tech-5", dayOffset: 1, startHour: 9, durationHours: 3, customerName: "Harbor View Hotel", service: "Full HVAC System Inspection", address: "300 Harbor View Rd", status: "scheduled" },
  { id: "sch-11", technicianId: "tech-6", dayOffset: 1, startHour: 11, durationHours: 1.5, customerName: "Pinecrest Offices", service: "Electrical Rewiring", address: "9 Pinecrest Ave", status: "scheduled" },

  // Wednesday (today)
  { id: "sch-12", technicianId: "tech-1", dayOffset: 2, startHour: 9, durationHours: 1.5, customerName: "Acme Facilities Inc.", service: "HVAC Preventive Maintenance", address: "1204 Industrial Pkwy", status: "in_progress" },
  { id: "sch-13", technicianId: "tech-2", dayOffset: 2, startHour: 10.5, durationHours: 1, customerName: "Northgate Mall", service: "Electrical Panel Inspection", address: "500 Northgate Dr", status: "scheduled" },
  { id: "sch-14", technicianId: "tech-3", dayOffset: 2, startHour: 13, durationHours: 1.5, customerName: "Riverside Clinic", service: "Emergency Plumbing Repair", address: "88 Riverside Ave", status: "scheduled" },
  { id: "sch-15", technicianId: "tech-1", dayOffset: 2, startHour: 14.5, durationHours: 1.5, customerName: "Union Coffee Co.", service: "Refrigeration Unit Service", address: "22 Union Sq", status: "scheduled" },
  { id: "sch-16", technicianId: "tech-4", dayOffset: 2, startHour: 16, durationHours: 1, customerName: "Bright Start Daycare", service: "Fire Suppression Inspection", address: "77 Maple St", status: "scheduled" },
  { id: "sch-17", technicianId: "tech-5", dayOffset: 2, startHour: 8, durationHours: 2, customerName: "Harbor View Hotel", service: "Boiler Maintenance", address: "300 Harbor View Rd", status: "completed" },

  // Thursday
  { id: "sch-18", technicianId: "tech-2", dayOffset: 3, startHour: 8, durationHours: 2, customerName: "Downtown Office Tower", service: "Elevator Electrical Fault", address: "1 Downtown Plz", status: "scheduled" },
  { id: "sch-19", technicianId: "tech-6", dayOffset: 3, startHour: 9, durationHours: 1.5, customerName: "Green Valley School", service: "HVAC Duct Cleaning", address: "12 Green Valley Rd", status: "scheduled" },
  { id: "sch-20", technicianId: "tech-3", dayOffset: 3, startHour: 11, durationHours: 1, customerName: "Pinecrest Offices", service: "Plumbing Fixture Repair", address: "9 Pinecrest Ave", status: "scheduled" },
  { id: "sch-21", technicianId: "tech-4", dayOffset: 3, startHour: 14, durationHours: 2, customerName: "Lakeside Apartments", service: "Water Heater Replacement", address: "45 Lakeside Dr", status: "scheduled" },

  // Friday
  { id: "sch-22", technicianId: "tech-1", dayOffset: 4, startHour: 9, durationHours: 1, customerName: "Bright Start Daycare", service: "Fire Suppression Inspection", address: "77 Maple St", status: "scheduled" },
  { id: "sch-23", technicianId: "tech-5", dayOffset: 4, startHour: 10, durationHours: 1.5, customerName: "Harbor View Hotel", service: "HVAC Filter Replacement", address: "300 Harbor View Rd", status: "scheduled" },
  { id: "sch-24", technicianId: "tech-2", dayOffset: 4, startHour: 13, durationHours: 1.5, customerName: "Northgate Mall", service: "Electrical Panel Inspection", address: "500 Northgate Dr", status: "scheduled" },
  { id: "sch-25", technicianId: "tech-6", dayOffset: 4, startHour: 8.5, durationHours: 2, customerName: "Pinecrest Offices", service: "Electrical Rewiring", address: "9 Pinecrest Ave", status: "scheduled" },

  // Unassigned (technicianId: null) — draggable onto any technician row
  { id: "sch-26", technicianId: null, dayOffset: 2, startHour: 15, durationHours: 1.5, customerName: "Cedar Ridge Apartments", service: "AC Unit Not Cooling", address: "14 Cedar Ridge Ln", status: "scheduled" },
  { id: "sch-27", technicianId: null, dayOffset: 2, startHour: 9, durationHours: 1, customerName: "Metro Bank Branch", service: "Alarm System Fault", address: "200 Main St", status: "scheduled" },
  { id: "sch-28", technicianId: null, dayOffset: 3, startHour: 11, durationHours: 2, customerName: "Sunrise Senior Living", service: "Backup Generator Service", address: "55 Sunrise Blvd", status: "scheduled" },
];

/** Deterministic appointment counts for the month grid (Aug 2026), keyed by
    day-of-month. Density only — month view doesn't need per-appointment
    detail (docs/RESPONSIVE_DESIGN.md → Calendar). */
export const MONTH_COUNTS: Record<number, number> = {
  3: 4, 4: 6, 5: 3, 6: 5, 7: 2,
  10: 5, 11: 7, 12: 4, 13: 6, 14: 3,
  17: 3, 18: 5, 19: 8, 20: 4, 21: 2,
  24: 6, 25: 5, 26: 6, 27: 4, 28: 4,
  31: 3,
};
