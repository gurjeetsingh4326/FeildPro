import type { InvoiceStatus } from "@/lib/types";
import { formatMoney } from "@/lib/utils";

/** Same fictional "today" used throughout the dummy data (schedule.ts). */
const TODAY_ISO = "2026-08-26";

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface InvoiceTimelineEntry {
  id: string;
  actorName: string;
  description: string;
  timestamp: string;
}

export interface Invoice {
  id: string;
  customerName: string;
  workOrderId: string | null;
  status: InvoiceStatus;
  issueDate: string; // ISO
  dueDate: string; // ISO
  paidDate: string | null;
  lineItems: InvoiceLineItem[];
  taxRate: number;
  discount: number;
  notes: string;
}

/* Matches the badge mapping already established on the Dashboard's
   Outstanding Invoices widget (src/components/dashboard/outstanding-invoices-card.tsx)
   so the same status never renders two different colors across the app. */
export const INVOICE_STATUS_META: Record<InvoiceStatus, { label: string; badge: "success" | "warning" | "error" | "neutral" }> = {
  draft: { label: "Draft", badge: "neutral" },
  sent: { label: "Sent", badge: "neutral" },
  overdue: { label: "Overdue", badge: "error" },
  paid: { label: "Paid", badge: "success" },
};

/* Matches src/lib/dummy-data/dashboard.ts's OUTSTANDING_INVOICES exactly (id,
   customer, amount, status) so the Dashboard widget and this module never
   disagree about the same 4 invoices — kept standalone (no workOrderId) since
   the source work orders those reference aren't actually in an invoiced
   state in work-orders.ts. */
export const INVOICES: Invoice[] = [
  {
    id: "INV-4471",
    customerName: "Acme Facilities Inc.",
    workOrderId: null,
    status: "sent",
    issueDate: "2026-08-20",
    dueDate: "2026-09-19",
    paidDate: null,
    lineItems: [{ id: "li-1", description: "HVAC Preventive Maintenance", quantity: 1, unitPrice: 1240 }],
    taxRate: 0,
    discount: 0,
    notes: "",
  },
  {
    id: "INV-4468",
    customerName: "Riverside Clinic",
    workOrderId: null,
    status: "paid",
    issueDate: "2026-08-11",
    dueDate: "2026-09-10",
    paidDate: "2026-08-26",
    lineItems: [{ id: "li-1", description: "Emergency Plumbing Repair", quantity: 1, unitPrice: 2100 }],
    taxRate: 0,
    discount: 0,
    notes: "",
  },
  {
    id: "INV-4460",
    customerName: "Union Coffee Co.",
    workOrderId: null,
    status: "overdue",
    issueDate: "2026-07-24",
    dueDate: "2026-08-23",
    paidDate: null,
    lineItems: [{ id: "li-1", description: "Refrigeration Unit Service", quantity: 1, unitPrice: 640 }],
    taxRate: 0,
    discount: 0,
    notes: "",
  },
  {
    id: "INV-4452",
    customerName: "Downtown Office Tower",
    workOrderId: null,
    status: "overdue",
    issueDate: "2026-07-15",
    dueDate: "2026-08-14",
    paidDate: null,
    lineItems: [{ id: "li-1", description: "Elevator Electrical Fault Repair", quantity: 1, unitPrice: 4200 }],
    taxRate: 0,
    discount: 0,
    notes: "",
  },
  {
    id: "INV-4448",
    customerName: "Green Valley School",
    workOrderId: null,
    status: "overdue",
    issueDate: "2026-07-06",
    dueDate: "2026-08-05",
    paidDate: null,
    lineItems: [{ id: "li-1", description: "HVAC Duct Cleaning", quantity: 1, unitPrice: 980 }],
    taxRate: 0,
    discount: 0,
    notes: "Second reminder sent — see notes on customer account.",
  },
  {
    id: "INV-5001",
    customerName: "Union Coffee Co.",
    workOrderId: "WO-2024-00315",
    status: "sent",
    issueDate: "2026-08-24",
    dueDate: "2026-09-23",
    paidDate: null,
    lineItems: [{ id: "li-1", description: "Refrigeration Unit Service", quantity: 1, unitPrice: 150 }],
    taxRate: 0,
    discount: 0,
    notes: "",
  },
  {
    id: "INV-5002",
    customerName: "Acme Facilities Inc.",
    workOrderId: "WO-2024-00312",
    status: "paid",
    issueDate: "2026-08-18",
    dueDate: "2026-09-17",
    paidDate: "2026-08-20",
    lineItems: [{ id: "li-1", description: "Quarterly HVAC Filter Swap", quantity: 1, unitPrice: 280 }],
    taxRate: 0,
    discount: 0,
    notes: "",
  },
  {
    id: "INV-5003",
    customerName: "Northgate Mall",
    workOrderId: "WO-2024-00308",
    status: "paid",
    issueDate: "2026-08-14",
    dueDate: "2026-09-13",
    paidDate: "2026-08-16",
    lineItems: [{ id: "li-1", description: "Emergency Lighting Test", quantity: 1, unitPrice: 560 }],
    taxRate: 0,
    discount: 0,
    notes: "",
  },
  {
    id: "INV-5004",
    customerName: "Lakeside Apartments",
    workOrderId: "WO-2024-00334",
    status: "sent",
    issueDate: "2026-08-22",
    dueDate: "2026-09-21",
    paidDate: null,
    lineItems: [{ id: "li-1", description: "Common Area Electrical Repair", quantity: 1, unitPrice: 720 }],
    taxRate: 0,
    discount: 0,
    notes: "",
  },
  {
    id: "INV-5005",
    customerName: "Harbor View Hotel",
    workOrderId: "WO-2024-00323",
    status: "draft",
    issueDate: "2026-08-26",
    dueDate: "2026-09-25",
    paidDate: null,
    lineItems: [{ id: "li-1", description: "Boiler Maintenance", quantity: 1, unitPrice: 2600 }],
    taxRate: 0,
    discount: 0,
    notes: "Awaiting sign-off from the hotel's chief engineer before sending.",
  },
  {
    id: "INV-5006",
    customerName: "Pinecrest Offices",
    workOrderId: null,
    status: "paid",
    issueDate: "2026-07-20",
    dueDate: "2026-08-19",
    paidDate: "2026-08-05",
    lineItems: [{ id: "li-1", description: "Electrical Rewiring", quantity: 1, unitPrice: 1850 }],
    taxRate: 0,
    discount: 0,
    notes: "",
  },
  {
    id: "INV-5007",
    customerName: "Sunrise Senior Living",
    workOrderId: null,
    status: "sent",
    issueDate: "2026-08-21",
    dueDate: "2026-09-20",
    paidDate: null,
    lineItems: [
      { id: "li-1", description: "Backup Generator Service — Labor (4 hrs)", quantity: 4, unitPrice: 75 },
      { id: "li-2", description: "Generator Battery Replacement", quantity: 1, unitPrice: 100 },
    ],
    taxRate: 0.08,
    discount: 20,
    notes: "10% loyalty discount applied.",
  },
];

export function getInvoice(id: string): Invoice | null {
  return INVOICES.find((i) => i.id === id) ?? null;
}

export function invoiceSubtotal(invoice: Invoice): number {
  return invoice.lineItems.reduce((sum, li) => sum + li.quantity * li.unitPrice, 0);
}

export function invoiceTax(invoice: Invoice): number {
  return invoiceSubtotal(invoice) * invoice.taxRate;
}

export function invoiceTotal(invoice: Invoice): number {
  return invoiceSubtotal(invoice) + invoiceTax(invoice) - invoice.discount;
}

/** Overdue day count is derived from the due date, not hand-typed, so it can
    never drift from the date actually shown on the invoice. */
export function daysOverdue(invoice: Invoice): number {
  if (invoice.status !== "overdue") return 0;
  const due = new Date(invoice.dueDate).getTime();
  const today = new Date(TODAY_ISO).getTime();
  return Math.max(0, Math.round((today - due) / 86_400_000));
}

export function getInvoiceTimeline(invoice: Invoice): InvoiceTimelineEntry[] {
  const entries: InvoiceTimelineEntry[] = [
    {
      id: `${invoice.id}-tl-1`,
      actorName: "System",
      description: invoice.workOrderId
        ? `generated this invoice from ${invoice.workOrderId}`
        : "created this invoice",
      timestamp: invoice.issueDate,
    },
  ];
  if (invoice.status !== "draft") {
    entries.push({
      id: `${invoice.id}-tl-2`,
      actorName: "System",
      description: `sent this invoice to ${invoice.customerName}`,
      timestamp: invoice.issueDate,
    });
  }
  if (invoice.status === "paid" && invoice.paidDate) {
    entries.push({
      id: `${invoice.id}-tl-3`,
      actorName: invoice.customerName,
      description: `paid this invoice ($${formatMoney(invoiceTotal(invoice))})`,
      timestamp: invoice.paidDate,
    });
  }
  return entries;
}
