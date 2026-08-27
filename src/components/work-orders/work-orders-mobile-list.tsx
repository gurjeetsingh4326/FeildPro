import Link from "next/link";
import { Calendar } from "lucide-react";
import { Badge, PriorityBadge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { STATUS_META } from "@/lib/work-order-status";
import type { WorkOrder } from "@/lib/dummy-data/work-orders";

function formatDate(iso: string) {
  const [, m, d] = iso.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[Number(m) - 1]} ${Number(d)}`;
}

/** Below `md`, a wide multi-column table is worse than a stacked card list —
    per docs/RESPONSIVE_DESIGN.md's documented table pattern (same approach
    already used for the Dashboard's Outstanding Invoices widget). */
export function WorkOrdersMobileList({ workOrders }: { workOrders: WorkOrder[] }) {
  if (workOrders.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border-strong bg-surface p-6 text-center text-sm text-text-muted">
        No work orders match your filters.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {workOrders.map((wo) => {
        const meta = STATUS_META[wo.status];
        return (
          <li key={wo.id} className="rounded-lg border border-border bg-surface p-3">
            <div className="flex items-center justify-between gap-2">
              <Link href={`/work-orders/${wo.id}`} className="font-mono text-[13px] text-primary-text hover:underline">
                {wo.id}
              </Link>
              <PriorityBadge priority={wo.priority}>{wo.priority}</PriorityBadge>
            </div>
            <p className="mt-1.5 text-sm font-semibold text-text-primary">{wo.customerName}</p>
            <p className="text-[13px] text-text-secondary">{wo.service}</p>
            <div className="mt-2 flex items-center justify-between gap-2">
              <Badge variant={meta.badge} dot>
                {meta.label}
              </Badge>
              <span className="tabular-nums text-sm font-medium text-text-primary">
                {wo.total > 0 ? `$${wo.total.toLocaleString()}` : <span className="text-text-muted">—</span>}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between gap-2 border-t border-border pt-2">
              {wo.technicianName ? (
                <div className="flex items-center gap-1.5">
                  <Avatar name={wo.technicianName} size="sm" />
                  <span className="text-[12px] text-text-secondary">{wo.technicianName}</span>
                </div>
              ) : (
                <span className="text-[12px] text-text-muted">Unassigned</span>
              )}
              <span className="flex items-center gap-1 text-[12px] text-text-muted">
                <Calendar className="size-3" />
                {formatDate(wo.scheduledDate)} · {wo.scheduledTime}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
