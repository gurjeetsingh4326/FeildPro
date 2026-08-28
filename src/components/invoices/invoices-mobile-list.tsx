import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { INVOICE_STATUS_META, invoiceTotal, daysOverdue, type Invoice } from "@/lib/dummy-data/invoices";
import { formatMoney } from "@/lib/utils";

function formatDate(iso: string) {
  const [, m, d] = iso.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[Number(m) - 1]} ${Number(d)}`;
}

export function InvoicesMobileList({ invoices }: { invoices: Invoice[] }) {
  if (invoices.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border-strong bg-surface p-6 text-center text-sm text-text-muted">
        No invoices match your filters.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {invoices.map((invoice) => {
        const meta = INVOICE_STATUS_META[invoice.status];
        const overdue = daysOverdue(invoice);
        return (
          <li key={invoice.id}>
            <Link href={`/invoices/${invoice.id}`} className="block rounded-lg border border-border bg-surface p-3">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[13px] text-primary-text">{invoice.id}</span>
                <Badge variant={meta.badge} dot>
                  {meta.label}
                </Badge>
              </div>
              <p className="mt-1.5 text-sm font-semibold text-text-primary">{invoice.customerName}</p>
              <div className="mt-2 flex items-center justify-between gap-2 border-t border-border pt-2 text-[12px] text-text-muted">
                <span>Due {formatDate(invoice.dueDate)}</span>
                <span className="tabular-nums text-sm font-medium text-text-primary">
                  ${formatMoney(invoiceTotal(invoice))}
                </span>
              </div>
              {overdue > 0 ? <p className="mt-1 text-[12px] text-error">{overdue} days overdue</p> : null}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
