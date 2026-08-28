import Link from "next/link";
import { CheckCircle2, DollarSign, Target, Timer } from "lucide-react";
import { KpiCard } from "@/components/ui/kpi-card";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { STATUS_META } from "@/lib/work-order-status";
import type { TechnicianStats } from "@/lib/dummy-data/technicians";
import type { WorkOrder } from "@/lib/dummy-data/work-orders";
import { formatMoney } from "@/lib/utils";

function formatDate(iso: string) {
  const [, m, d] = iso.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[Number(m) - 1]} ${Number(d)}`;
}

export function TechnicianPerformanceTab({ stats, recentJobs }: { stats: TechnicianStats; recentJobs: WorkOrder[] }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <KpiCard label="Jobs Completed" value={String(stats.jobsCompleted)} icon={CheckCircle2} />
        <KpiCard label="Total Revenue" value={`$${formatMoney(stats.totalRevenue)}`} icon={DollarSign} />
        <KpiCard label="On-Time Rate" value={`${stats.onTimeRatePct}%`} icon={Target} />
        <KpiCard label="Avg. Job Value" value={`$${formatMoney(stats.avgJobValue)}`} icon={Timer} />
      </div>

      <Card className="divide-y divide-border p-0">
        <h3 className="px-5 py-3 text-sm font-semibold text-text-primary">Recent Jobs</h3>
        {recentJobs.length === 0 ? (
          <p className="px-5 py-6 text-center text-sm text-text-muted">No job history yet.</p>
        ) : (
          recentJobs.slice(0, 8).map((wo) => {
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
                  <p className="mt-0.5 truncate text-sm text-text-secondary">
                    {wo.customerName} · {wo.service}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-[13px] text-text-muted">{formatDate(wo.scheduledDate)}</p>
                  <p className="tabular-nums text-sm font-medium text-text-primary">
                    {wo.total > 0 ? `$${formatMoney(wo.total)}` : "—"}
                  </p>
                </div>
              </Link>
            );
          })
        )}
      </Card>
    </div>
  );
}
