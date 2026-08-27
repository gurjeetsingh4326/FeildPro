import { TECHNICIANS } from "@/lib/dummy-data/schedule";
import { WORK_ORDERS, type WorkOrder } from "@/lib/dummy-data/work-orders";
import type { ActivityEventType } from "@/lib/types";

export interface LaborLine {
  id: string;
  technicianName: string;
  description: string;
  hours: number;
  rate: number;
}

export interface PartLine {
  id: string;
  partName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
}

export interface NoteEntry {
  id: string;
  authorName: string;
  timestamp: string;
  text: string;
}

export interface AttachmentEntry {
  id: string;
  label: string;
  uploadedBy: string;
  timestamp: string;
}

export interface TimelineEntry {
  id: string;
  type: ActivityEventType;
  actorName: string;
  description: string;
  timestamp: string;
}

export interface CustomerContact {
  name: string;
  phone: string;
  email: string;
  address: string;
  openWorkOrders: number;
  totalSpend: number;
}

export interface WorkOrderDetail {
  workOrder: WorkOrder;
  description: string;
  appointmentWindow: string;
  source: string;
  createdDate: string;
  customer: CustomerContact;
  labor: LaborLine[];
  parts: PartLine[];
  notes: NoteEntry[];
  attachments: AttachmentEntry[];
  timeline: TimelineEntry[];
}

/** Real addresses already established in the Schedule module, reused here so
    the same customer reads consistently across the app. */
const CUSTOMER_ADDRESSES: Record<string, string> = {
  "Acme Facilities Inc.": "1204 Industrial Pkwy",
  "Union Coffee Co.": "22 Union Sq",
  "Northgate Mall": "500 Northgate Dr",
  "Downtown Office Tower": "1 Downtown Plz",
  "Riverside Clinic": "88 Riverside Ave",
  "Bright Start Daycare": "77 Maple St",
  "Lakeside Apartments": "45 Lakeside Dr",
  "Green Valley School": "12 Green Valley Rd",
  "Harbor View Hotel": "300 Harbor View Rd",
  "Pinecrest Offices": "9 Pinecrest Ave",
  "Cedar Ridge Apartments": "14 Cedar Ridge Ln",
  "Metro Bank Branch": "200 Main St",
  "Sunrise Senior Living": "55 Sunrise Blvd",
};

function emailFor(customerName: string) {
  const slug = customerName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 12);
  return `ops@${slug}.com`;
}

function phoneFor(id: string) {
  const digits = id.replace(/\D/g, "").slice(-4).padStart(4, "0");
  return `(555) 010-${digits}`;
}

const RATE = 95;

/** One fully hand-curated, richly-detailed work order for the portfolio hero
    screenshot — everything else derives a plausible-but-simpler detail view
    from its own fields so every row in the table/board leads somewhere real. */
const HERO_DETAIL: WorkOrderDetail = {
  workOrder: WORK_ORDERS.find((w) => w.id === "WO-2024-00318")!,
  description:
    "Quarterly HVAC preventive maintenance for the main rooftop unit serving the east wing. Includes filter replacement, coil cleaning, refrigerant level check, and belt inspection per the service contract.",
  appointmentWindow: "Aug 26, 9:00 AM – 11:00 AM",
  source: "Service contract (recurring)",
  createdDate: "Aug 20, 2026",
  customer: {
    name: "Acme Facilities Inc.",
    phone: "(555) 010-2291",
    email: "facilities@acme.com",
    address: "1204 Industrial Pkwy",
    openWorkOrders: 2,
    totalSpend: 8420,
  },
  labor: [
    { id: "lab-1", technicianName: "Maria Chen", description: "HVAC inspection & filter replacement", hours: 1.5, rate: RATE },
    { id: "lab-2", technicianName: "Maria Chen", description: "Coil cleaning & refrigerant check", hours: 1, rate: RATE },
  ],
  parts: [
    { id: "part-1", partName: "HVAC Air Filter 20x25x1", sku: "FLT-2025-1", quantity: 2, unitPrice: 18 },
    { id: "part-2", partName: "R-410A Refrigerant (lb)", sku: "REF-410A", quantity: 2, unitPrice: 32 },
  ],
  notes: [
    {
      id: "note-1",
      authorName: "Maria Chen",
      timestamp: "Aug 26, 9:42 AM",
      text: "Filters were more clogged than expected — recommend switching this unit to quarterly instead of semi-annual service.",
    },
    {
      id: "note-2",
      authorName: "Jordan Park (Dispatcher)",
      timestamp: "Aug 26, 9:50 AM",
      text: "Noted — I'll flag the contract for review with the account owner.",
    },
  ],
  attachments: [
    { id: "att-1", label: "Rooftop unit before service", uploadedBy: "Maria Chen", timestamp: "Aug 26, 9:15 AM" },
    { id: "att-2", label: "Replaced filter", uploadedBy: "Maria Chen", timestamp: "Aug 26, 9:40 AM" },
  ],
  timeline: [
    { id: "tl-1", type: "created", actorName: "Priya Patel (Admin)", description: "created this work order from the service contract", timestamp: "Aug 20, 8:00 AM" },
    { id: "tl-2", type: "assigned", actorName: "Jordan Park (Dispatcher)", description: "assigned Maria Chen and scheduled for Aug 26, 9:00 AM", timestamp: "Aug 21, 10:12 AM" },
    { id: "tl-3", type: "note", actorName: "Maria Chen", description: "started the job and began HVAC inspection", timestamp: "Aug 26, 9:00 AM" },
  ],
};

function deriveDetail(wo: WorkOrder): WorkOrderDetail {
  const address = CUSTOMER_ADDRESSES[wo.customerName] ?? "Address on file";
  const hours = wo.priority === "urgent" ? 3 : wo.priority === "high" ? 2 : wo.priority === "medium" ? 1.5 : 1;
  const technicianName = wo.technicianName ?? TECHNICIANS[0].name;

  const timeline: TimelineEntry[] = [
    { id: `${wo.id}-tl-1`, type: "created", actorName: "Priya Patel (Admin)", description: "created this work order", timestamp: `${wo.scheduledDate} (created)` },
  ];
  if (wo.technicianName) {
    timeline.push({
      id: `${wo.id}-tl-2`,
      type: "assigned",
      actorName: "Jordan Park (Dispatcher)",
      description: `assigned ${wo.technicianName}`,
      timestamp: `${wo.scheduledDate}, ${wo.scheduledTime}`,
    });
  }
  if (["completed", "invoiced", "paid"].includes(wo.status)) {
    timeline.push({
      id: `${wo.id}-tl-3`,
      type: "completed",
      actorName: technicianName,
      description: "marked this work order complete",
      timestamp: `${wo.scheduledDate} (completed)`,
    });
  }
  if (["invoiced", "paid"].includes(wo.status)) {
    timeline.push({
      id: `${wo.id}-tl-4`,
      type: "invoiced",
      actorName: "System",
      description: "generated an invoice from this work order",
      timestamp: `${wo.scheduledDate} (invoiced)`,
    });
  }
  if (wo.status === "paid") {
    timeline.push({
      id: `${wo.id}-tl-5`,
      type: "paid",
      actorName: wo.customerName,
      description: `paid the invoice ($${wo.total.toLocaleString()})`,
      timestamp: `${wo.scheduledDate} (paid)`,
    });
  }

  return {
    workOrder: wo,
    description: `${wo.service} for ${wo.customerName}.`,
    appointmentWindow: `${wo.scheduledDate}, ${wo.scheduledTime}`,
    source: "Phone call",
    createdDate: wo.scheduledDate,
    customer: {
      name: wo.customerName,
      phone: phoneFor(wo.id),
      email: emailFor(wo.customerName),
      address,
      openWorkOrders: WORK_ORDERS.filter(
        (w) => w.customerName === wo.customerName && !["paid", "cancelled"].includes(w.status)
      ).length,
      totalSpend: WORK_ORDERS.filter((w) => w.customerName === wo.customerName).reduce((sum, w) => sum + w.total, 0),
    },
    labor:
      wo.status === "draft"
        ? []
        : [{ id: `${wo.id}-lab-1`, technicianName, description: wo.service, hours, rate: RATE }],
    parts: [],
    notes: [],
    attachments: [],
    timeline,
  };
}

export function getWorkOrderDetail(id: string): WorkOrderDetail | null {
  if (id === "WO-2024-00318") return HERO_DETAIL;
  const wo = WORK_ORDERS.find((w) => w.id === id);
  if (!wo) return null;
  return deriveDetail(wo);
}
