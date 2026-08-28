import Link from "next/link";
import { Calendar, ClipboardList, CreditCard } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getCustomerByName } from "@/lib/dummy-data/customers";
import { getPaymentsForInvoice, PAYMENT_METHOD_META, PAYMENT_STATUS_META } from "@/lib/dummy-data/payments";
import type { Invoice } from "@/lib/dummy-data/invoices";
import { formatMoney } from "@/lib/utils";

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[Number(m) - 1]} ${Number(d)}, ${y}`;
}

export function InvoiceRightRail({ invoice }: { invoice: Invoice }) {
  const customer = getCustomerByName(invoice.customerName);
  const payments = getPaymentsForInvoice(invoice.id);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Customer</CardTitle>
          {customer ? (
            <Link href={`/customers/${customer.id}`} className="text-[13px] font-medium text-primary-text hover:underline">
              View profile
            </Link>
          ) : null}
        </CardHeader>
        <p className="text-sm font-semibold text-text-primary">{invoice.customerName}</p>
      </Card>

      {invoice.workOrderId ? (
        <Card>
          <CardHeader>
            <CardTitle>Source</CardTitle>
          </CardHeader>
          <Link
            href={`/work-orders/${invoice.workOrderId}`}
            className="flex items-center gap-2 text-sm font-medium text-primary-text hover:underline"
          >
            <ClipboardList className="size-4 shrink-0" />
            {invoice.workOrderId}
          </Link>
        </Card>
      ) : null}

      {payments.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Payments</CardTitle>
            <Link href="/payments" className="text-[13px] font-medium text-primary-text hover:underline">
              View all
            </Link>
          </CardHeader>
          <ul className="space-y-2.5">
            {payments.map((p) => {
              const statusMeta = PAYMENT_STATUS_META[p.status];
              return (
                <li key={p.id} className="flex items-center justify-between gap-2 text-[13px]">
                  <span className="flex items-center gap-1.5 text-text-secondary">
                    <CreditCard className="size-3.5 shrink-0 text-text-muted" />
                    {PAYMENT_METHOD_META[p.method].label}
                  </span>
                  <span className="tabular-nums font-medium text-text-primary">${formatMoney(p.amount)}</span>
                  <Badge variant={statusMeta.badge} dot>
                    {statusMeta.label}
                  </Badge>
                </li>
              );
            })}
          </ul>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>Quick Facts</CardTitle>
        </CardHeader>
        <dl className="space-y-2 text-[13px]">
          <div className="flex justify-between gap-2">
            <dt className="flex items-center gap-1.5 text-text-muted">
              <Calendar className="size-3.5" />
              Issued
            </dt>
            <dd className="text-text-primary">{formatDate(invoice.issueDate)}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="flex items-center gap-1.5 text-text-muted">
              <Calendar className="size-3.5" />
              Due
            </dt>
            <dd className="text-text-primary">{formatDate(invoice.dueDate)}</dd>
          </div>
          {invoice.paidDate ? (
            <div className="flex justify-between gap-2">
              <dt className="flex items-center gap-1.5 text-text-muted">
                <Calendar className="size-3.5" />
                Paid
              </dt>
              <dd className="text-text-primary">{formatDate(invoice.paidDate)}</dd>
            </div>
          ) : null}
        </dl>
      </Card>

      {invoice.notes ? (
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <p className="text-[13px] text-text-secondary">{invoice.notes}</p>
        </Card>
      ) : null}
    </div>
  );
}
