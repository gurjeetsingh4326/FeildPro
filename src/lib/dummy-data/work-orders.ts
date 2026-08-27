import type { WorkOrderPriority, WorkOrderStatus } from "@/lib/types";

export interface WorkOrder {
  id: string;
  customerName: string;
  service: string;
  priority: WorkOrderPriority;
  status: WorkOrderStatus;
  technicianName: string | null;
  scheduledDate: string; // ISO yyyy-mm-dd
  scheduledTime: string;
  total: number;
}

/** Kanban swim lanes cover the pre-invoice execution workflow — Invoiced/Paid/
    Cancelled are terminal/financial states surfaced in the table and in the
    Invoices module instead of as day-to-day dispatch columns. */
export const KANBAN_STATUSES: WorkOrderStatus[] = [
  "draft",
  "scheduled",
  "in_progress",
  "on_hold",
  "completed",
];

export const WORK_ORDERS: WorkOrder[] = [
  { id: "WO-2024-00318", customerName: "Acme Facilities Inc.", service: "HVAC Preventive Maintenance", priority: "high", status: "in_progress", technicianName: "Maria Chen", scheduledDate: "2026-08-26", scheduledTime: "9:00 AM", total: 1240 },
  { id: "WO-2024-00317", customerName: "Northgate Mall", service: "Electrical Panel Inspection", priority: "medium", status: "scheduled", technicianName: "Sam Torres", scheduledDate: "2026-08-26", scheduledTime: "10:30 AM", total: 480 },
  { id: "WO-2024-00316", customerName: "Riverside Clinic", service: "Emergency Plumbing Repair", priority: "urgent", status: "completed", technicianName: "Dana Lee", scheduledDate: "2026-08-25", scheduledTime: "1:00 PM", total: 2100 },
  { id: "WO-2024-00315", customerName: "Union Coffee Co.", service: "Refrigeration Unit Service", priority: "low", status: "invoiced", technicianName: "Maria Chen", scheduledDate: "2026-08-24", scheduledTime: "2:30 PM", total: 150 },
  { id: "WO-2024-00322", customerName: "Lakeside Apartments", service: "Water Heater Replacement", priority: "high", status: "scheduled", technicianName: null, scheduledDate: "2026-08-27", scheduledTime: "9:00 AM", total: 1850 },
  { id: "WO-2024-00321", customerName: "Downtown Office Tower", service: "Elevator Electrical Fault", priority: "urgent", status: "scheduled", technicianName: null, scheduledDate: "2026-08-26", scheduledTime: "5:00 PM", total: 0 },
  { id: "WO-2024-00319", customerName: "Green Valley School", service: "HVAC Duct Cleaning", priority: "medium", status: "draft", technicianName: null, scheduledDate: "2026-08-28", scheduledTime: "8:00 AM", total: 640 },
  { id: "WO-2024-00320", customerName: "Bright Start Daycare", service: "Fire Suppression Inspection", priority: "medium", status: "on_hold", technicianName: "Jordan Park", scheduledDate: "2026-08-26", scheduledTime: "4:00 PM", total: 320 },
  { id: "WO-2024-00323", customerName: "Harbor View Hotel", service: "Boiler Maintenance", priority: "high", status: "completed", technicianName: "Alex Kim", scheduledDate: "2026-08-26", scheduledTime: "8:00 AM", total: 2600 },
  { id: "WO-2024-00324", customerName: "Pinecrest Offices", service: "Electrical Rewiring", priority: "medium", status: "in_progress", technicianName: "Chris Nguyen", scheduledDate: "2026-08-25", scheduledTime: "11:00 AM", total: 3200 },
  { id: "WO-2024-00325", customerName: "Cedar Ridge Apartments", service: "AC Unit Not Cooling", priority: "high", status: "draft", technicianName: null, scheduledDate: "2026-08-27", scheduledTime: "3:00 PM", total: 0 },
  { id: "WO-2024-00326", customerName: "Metro Bank Branch", service: "Alarm System Fault", priority: "urgent", status: "scheduled", technicianName: "Chris Nguyen", scheduledDate: "2026-08-26", scheduledTime: "9:00 AM", total: 410 },
  { id: "WO-2024-00327", customerName: "Sunrise Senior Living", service: "Backup Generator Service", priority: "high", status: "scheduled", technicianName: null, scheduledDate: "2026-08-27", scheduledTime: "11:00 AM", total: 1900 },
  { id: "WO-2024-00312", customerName: "Acme Facilities Inc.", service: "Quarterly HVAC Filter Swap", priority: "low", status: "paid", technicianName: "Maria Chen", scheduledDate: "2026-08-18", scheduledTime: "9:00 AM", total: 280 },
  { id: "WO-2024-00308", customerName: "Northgate Mall", service: "Emergency Lighting Test", priority: "medium", status: "paid", technicianName: "Sam Torres", scheduledDate: "2026-08-14", scheduledTime: "10:00 AM", total: 560 },
  { id: "WO-2024-00301", customerName: "Riverside Clinic", service: "Backflow Preventer Test", priority: "low", status: "cancelled", technicianName: null, scheduledDate: "2026-08-10", scheduledTime: "1:00 PM", total: 0 },
  { id: "WO-2024-00328", customerName: "Green Valley School", service: "Playground Lighting Repair", priority: "low", status: "on_hold", technicianName: "Dana Lee", scheduledDate: "2026-08-28", scheduledTime: "1:30 PM", total: 210 },
  { id: "WO-2024-00329", customerName: "Harbor View Hotel", service: "HVAC Filter Replacement", priority: "low", status: "scheduled", technicianName: "Alex Kim", scheduledDate: "2026-08-28", scheduledTime: "10:00 AM", total: 340 },
  { id: "WO-2024-00330", customerName: "Downtown Office Tower", service: "Fire Alarm Annual Inspection", priority: "medium", status: "draft", technicianName: null, scheduledDate: "2026-08-29", scheduledTime: "9:00 AM", total: 0 },
  { id: "WO-2024-00331", customerName: "Union Coffee Co.", service: "Walk-in Freezer Repair", priority: "urgent", status: "in_progress", technicianName: "Jordan Park", scheduledDate: "2026-08-26", scheduledTime: "12:00 PM", total: 1420 },
  { id: "WO-2024-00332", customerName: "Bright Start Daycare", service: "Playground Equipment Safety Check", priority: "low", status: "completed", technicianName: "Chris Nguyen", scheduledDate: "2026-08-24", scheduledTime: "9:00 AM", total: 180 },
  { id: "WO-2024-00333", customerName: "Pinecrest Offices", service: "Server Room Cooling Upgrade", priority: "high", status: "scheduled", technicianName: "Sam Torres", scheduledDate: "2026-08-29", scheduledTime: "8:00 AM", total: 4800 },
  { id: "WO-2024-00334", customerName: "Lakeside Apartments", service: "Common Area Electrical Repair", priority: "medium", status: "invoiced", technicianName: "Maria Chen", scheduledDate: "2026-08-22", scheduledTime: "2:00 PM", total: 720 },
  { id: "WO-2024-00335", customerName: "Sunrise Senior Living", service: "Emergency Call Button System Test", priority: "urgent", status: "completed", technicianName: "Dana Lee", scheduledDate: "2026-08-25", scheduledTime: "9:00 AM", total: 950 },

  // Maria Chen's day, for the Technician Mobile View hero screen (docs/DASHBOARD_DESIGN.md
  // section 5) — a realistic full day: one already done, one in progress (WO-2024-00318
  // above), two still ahead — plus a couple of upcoming days for the Jobs tab.
  { id: "WO-2024-00336", customerName: "Sunrise Senior Living", service: "Fire Extinguisher Inspection", priority: "low", status: "completed", technicianName: "Maria Chen", scheduledDate: "2026-08-26", scheduledTime: "7:30 AM", total: 95 },
  { id: "WO-2024-00337", customerName: "Metro Bank Branch", service: "Backup Battery Replacement", priority: "medium", status: "scheduled", technicianName: "Maria Chen", scheduledDate: "2026-08-26", scheduledTime: "1:30 PM", total: 340 },
  { id: "WO-2024-00338", customerName: "Green Valley School", service: "HVAC Filter Check", priority: "low", status: "scheduled", technicianName: "Maria Chen", scheduledDate: "2026-08-26", scheduledTime: "4:30 PM", total: 150 },
  { id: "WO-2024-00339", customerName: "Lakeside Apartments", service: "Water Heater Follow-up Check", priority: "medium", status: "scheduled", technicianName: "Maria Chen", scheduledDate: "2026-08-27", scheduledTime: "10:00 AM", total: 180 },
  { id: "WO-2024-00340", customerName: "Union Coffee Co.", service: "Ice Machine Repair", priority: "medium", status: "scheduled", technicianName: "Maria Chen", scheduledDate: "2026-08-28", scheduledTime: "9:30 AM", total: 260 },
];
