import { INVOICES, getInvoice, invoiceTotal } from "@/lib/dummy-data/invoices";

export type PaymentMethod = "credit_card" | "ach" | "check" | "cash";
export type PaymentStatus = "completed" | "pending" | "refunded" | "failed";

export const PAYMENT_METHOD_META: Record<PaymentMethod, { label: string }> = {
  credit_card: { label: "Credit Card" },
  ach: { label: "ACH Transfer" },
  check: { label: "Check" },
  cash: { label: "Cash" },
};

export const PAYMENT_STATUS_META: Record<PaymentStatus, { label: string; badge: "success" | "warning" | "error" | "neutral" }> = {
  completed: { label: "Completed", badge: "success" },
  pending: { label: "Pending", badge: "warning" },
  refunded: { label: "Refunded", badge: "neutral" },
  failed: { label: "Failed", badge: "error" },
};

export interface Payment {
  id: string;
  invoiceId: string;
  customerName: string;
  amount: number;
  method: PaymentMethod;
  date: string; // ISO
  status: PaymentStatus;
}

/** One completed payment per already-paid invoice in invoices.ts, so the two
    modules never disagree about which invoices are actually settled. */
const PAID_INVOICE_PAYMENTS: Payment[] = INVOICES.filter((inv) => inv.status === "paid" && inv.paidDate).map(
  (inv, i) => ({
    id: `PMT-${3000 + i}`,
    invoiceId: inv.id,
    customerName: inv.customerName,
    amount: invoiceTotal(inv),
    method: (["credit_card", "ach", "check", "cash"] as const)[i % 4],
    date: inv.paidDate!,
    status: "completed" as const,
  })
);

export const PAYMENTS: Payment[] = [
  ...PAID_INVOICE_PAYMENTS,
  {
    id: "PMT-3010",
    invoiceId: "INV-4471",
    customerName: "Acme Facilities Inc.",
    amount: 1240,
    method: "ach",
    date: "2026-08-26",
    status: "pending",
  },
  {
    id: "PMT-3011",
    invoiceId: "INV-5003",
    customerName: "Northgate Mall",
    amount: 40,
    method: "credit_card",
    date: "2026-08-18",
    status: "refunded",
  },
  {
    id: "PMT-3012",
    invoiceId: "INV-4460",
    customerName: "Union Coffee Co.",
    amount: 640,
    method: "credit_card",
    date: "2026-08-10",
    status: "failed",
  },
];

export function getPayment(id: string): Payment | null {
  return PAYMENTS.find((p) => p.id === id) ?? null;
}

export function getInvoiceForPayment(payment: Payment) {
  return getInvoice(payment.invoiceId);
}

export function getPaymentsForInvoice(invoiceId: string): Payment[] {
  return PAYMENTS.filter((p) => p.invoiceId === invoiceId);
}
