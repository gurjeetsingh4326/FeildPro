import Link from "next/link";
import { Calendar, ClipboardList } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getCustomerByName } from "@/lib/dummy-data/customers";
import type { Invoice } from "@/lib/dummy-data/invoices";

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[Number(m) - 1]} ${Number(d)}, ${y}`;
}

export function InvoiceRightRail({ invoice }: { invoice: Invoice }) {
  const customer = getCustomerByName(invoice.customerName);

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
