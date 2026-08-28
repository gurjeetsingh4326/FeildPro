import Link from "next/link";
import { Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { getCustomerStats, getPrimaryContact, type Customer } from "@/lib/dummy-data/customers";
import { formatMoney } from "@/lib/utils";

/** Below `md`, a stacked card list instead of the full table — same pattern
    already established for Work Orders (docs/RESPONSIVE_DESIGN.md). */
export function CustomersMobileList({ customers }: { customers: Customer[] }) {
  if (customers.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border-strong bg-surface p-6 text-center text-sm text-text-muted">
        No customers match your filters.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {customers.map((customer) => {
        const contact = getPrimaryContact(customer);
        const stats = getCustomerStats(customer.name);
        return (
          <li key={customer.id}>
            <Link href={`/customers/${customer.id}`} className="block rounded-lg border border-border bg-surface p-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2.5">
                  <Avatar name={customer.name} size="sm" />
                  <span className="truncate text-sm font-semibold text-text-primary">{customer.name}</span>
                </div>
                <Badge variant={customer.status === "active" ? "success" : "neutral"} dot className="shrink-0">
                  {customer.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </div>
              {contact ? (
                <p className="mt-2 flex items-center gap-1.5 text-[13px] text-text-secondary">
                  <Phone className="size-3.5 shrink-0 text-text-muted" />
                  {contact.name} · {contact.phone}
                </p>
              ) : null}
              <div className="mt-2 flex items-center justify-between gap-2 border-t border-border pt-2 text-[12px] text-text-muted">
                <span>{stats.openWorkOrders} open work orders</span>
                <span className="tabular-nums font-medium text-text-primary">${formatMoney(stats.totalSpend)}</span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
