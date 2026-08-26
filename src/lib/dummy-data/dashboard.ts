import type {
  AppointmentSummary,
  TechnicianUtilization,
  ActivityEvent,
  InvoiceSummary,
  RevenuePoint,
  WorkOrderSummary,
} from "@/lib/types";

export const REVENUE_TREND: Record<"7d" | "30d" | "90d", RevenuePoint[]> = {
  "7d": [
    { label: "Mon", revenue: 14200 },
    { label: "Tue", revenue: 16800 },
    { label: "Wed", revenue: 15100 },
    { label: "Thu", revenue: 19400 },
    { label: "Fri", revenue: 21300 },
    { label: "Sat", revenue: 12600 },
    { label: "Sun", revenue: 8900 },
  ],
  "30d": [
    { label: "Wk 1", revenue: 78400 },
    { label: "Wk 2", revenue: 91200 },
    { label: "Wk 3", revenue: 84700 },
    { label: "Wk 4", revenue: 102900 },
  ],
  "90d": [
    { label: "Jun", revenue: 298000 },
    { label: "Jul", revenue: 312500 },
    { label: "Aug", revenue: 341200 },
  ],
};

export const TODAY_SCHEDULE: AppointmentSummary[] = [
  {
    id: "apt-1",
    time: "9:00 AM",
    customerName: "Acme Facilities Inc.",
    service: "HVAC Preventive Maintenance",
    technicianName: "Maria Chen",
    address: "1204 Industrial Pkwy",
  },
  {
    id: "apt-2",
    time: "10:30 AM",
    customerName: "Northgate Mall",
    service: "Electrical Panel Inspection",
    technicianName: "Sam Torres",
    address: "500 Northgate Dr",
  },
  {
    id: "apt-3",
    time: "1:00 PM",
    customerName: "Riverside Clinic",
    service: "Emergency Plumbing Repair",
    technicianName: "Dana Lee",
    address: "88 Riverside Ave",
  },
  {
    id: "apt-4",
    time: "2:30 PM",
    customerName: "Union Coffee Co.",
    service: "Refrigeration Unit Service",
    technicianName: "Maria Chen",
    address: "22 Union Sq",
  },
  {
    id: "apt-5",
    time: "4:00 PM",
    customerName: "Bright Start Daycare",
    service: "Fire Suppression Inspection",
    technicianName: "Jordan Park",
    address: "77 Maple St",
  },
];

export const UNASSIGNED_WORK_ORDERS: WorkOrderSummary[] = [
  {
    id: "WO-2024-00322",
    customerName: "Lakeside Apartments",
    service: "Water Heater Replacement",
    priority: "high",
    status: "scheduled",
    technicianName: null,
    scheduledAt: "Tomorrow, 9:00 AM",
    total: 1850,
  },
  {
    id: "WO-2024-00321",
    customerName: "Downtown Office Tower",
    service: "Elevator Electrical Fault",
    priority: "urgent",
    status: "scheduled",
    technicianName: null,
    scheduledAt: "Today, 5:00 PM",
    total: 0,
  },
  {
    id: "WO-2024-00319",
    customerName: "Green Valley School",
    service: "HVAC Duct Cleaning",
    priority: "medium",
    status: "scheduled",
    technicianName: null,
    scheduledAt: "Thu, 8:00 AM",
    total: 640,
  },
];

export const TECHNICIAN_UTILIZATION: TechnicianUtilization[] = [
  { id: "tech-1", name: "Maria Chen", utilizationPct: 92, jobsToday: 4 },
  { id: "tech-2", name: "Sam Torres", utilizationPct: 78, jobsToday: 3 },
  { id: "tech-3", name: "Dana Lee", utilizationPct: 65, jobsToday: 2 },
  { id: "tech-4", name: "Jordan Park", utilizationPct: 41, jobsToday: 1 },
];

export const RECENT_ACTIVITY: ActivityEvent[] = [
  {
    id: "act-1",
    type: "completed",
    actorName: "Maria Chen",
    description: "completed WO-2024-00318 for Acme Facilities Inc.",
    timestamp: "12 minutes ago",
  },
  {
    id: "act-2",
    type: "invoiced",
    actorName: "System",
    description: "generated invoice INV-4471 from WO-2024-00318",
    timestamp: "10 minutes ago",
  },
  {
    id: "act-3",
    type: "assigned",
    actorName: "Jordan Park (Dispatcher)",
    description: "assigned Sam Torres to WO-2024-00317",
    timestamp: "43 minutes ago",
  },
  {
    id: "act-4",
    type: "paid",
    actorName: "Riverside Clinic",
    description: "paid invoice INV-4468 ($2,100.00)",
    timestamp: "1 hour ago",
  },
  {
    id: "act-5",
    type: "created",
    actorName: "Priya Patel (Admin)",
    description: "created WO-2024-00322 for Lakeside Apartments",
    timestamp: "2 hours ago",
  },
];

export const OUTSTANDING_INVOICES: InvoiceSummary[] = [
  { id: "INV-4460", customerName: "Union Coffee Co.", amount: 640, daysOverdue: 3, status: "overdue" },
  { id: "INV-4452", customerName: "Downtown Office Tower", amount: 4200, daysOverdue: 12, status: "overdue" },
  { id: "INV-4471", customerName: "Acme Facilities Inc.", amount: 1240, daysOverdue: 0, status: "sent" },
  { id: "INV-4448", customerName: "Green Valley School", amount: 980, daysOverdue: 21, status: "overdue" },
];
