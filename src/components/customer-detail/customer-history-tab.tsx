import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { STATUS_META } from "@/lib/work-order-status";
import type { WorkOrder } from "@/lib/dummy-data/work-orders";
import { formatMoney } from "@/lib/utils";

function formatDate(iso: string) {
  const [, m, d] = iso.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[Number(m) - 1]} ${Number(d)}`;
}

export function CustomerHistoryTab({ workOrders }: { workOrders: WorkOrder[] }) {
  if (workOrders.length === 0) {
    return (
      <Card>
        <p className="py-6 text-center text-sm text-text-muted">No work order history yet.</p>
      </Card>
    );
  }

  const sorted = [...workOrders].sort((a, b) => b.scheduledDate.localeCompare(a.scheduledDate));

  return (
    <Card className="divide-y divide-border p-0">
      {sorted.map((wo) => {
        const meta = STATUS_META[wo.status];
        return (
          <Link
            key={wo.id}
            href={`/work-orders/${wo.id}`}
            className="flex items-center justify-between gap-3 px-5 py-3 transition-colors hover:bg-background"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[13px] text-primary-text">{wo.id}</span>
                <Badge variant={meta.badge} dot>
                  {meta.label}
                </Badge>
              </div>
              <p className="mt-0.5 truncate text-sm text-text-secondary">{wo.service}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-[13px] text-text-muted">{formatDate(wo.scheduledDate)}</p>
              <p className="tabular-nums text-sm font-medium text-text-primary">
                {wo.total > 0 ? `$${formatMoney(wo.total)}` : "—"}
              </p>
            </div>
          </Link>
        );
      })}
    </Card>
  );
}
