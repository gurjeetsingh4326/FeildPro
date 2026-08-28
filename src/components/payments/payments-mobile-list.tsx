import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { PAYMENT_METHOD_META, PAYMENT_STATUS_META, type Payment } from "@/lib/dummy-data/payments";

function formatDate(iso: string) {
  const [, m, d] = iso.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[Number(m) - 1]} ${Number(d)}`;
}

export function PaymentsMobileList({ payments }: { payments: Payment[] }) {
  if (payments.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border-strong bg-surface p-6 text-center text-sm text-text-muted">
        No payments match your filters.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {payments.map((payment) => {
        const statusMeta = PAYMENT_STATUS_META[payment.status];
        return (
          <li key={payment.id} className="rounded-lg border border-border bg-surface p-3">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[13px] text-text-secondary">{payment.id}</span>
              <Badge variant={statusMeta.badge} dot>
                {statusMeta.label}
              </Badge>
            </div>
            <p className="mt-1.5 text-sm font-semibold text-text-primary">{payment.customerName}</p>
            <p className="text-[13px] text-text-secondary">{PAYMENT_METHOD_META[payment.method].label}</p>
            <div className="mt-2 flex items-center justify-between gap-2 border-t border-border pt-2 text-[12px] text-text-muted">
              <Link href={`/invoices/${payment.invoiceId}`} className="font-mono text-primary-text hover:underline">
                {payment.invoiceId}
              </Link>
              <span>{formatDate(payment.date)}</span>
              <span className="tabular-nums text-sm font-medium text-text-primary">${payment.amount.toLocaleString()}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
