import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { TECHNICIAN_STATUS_META, getTechnicianStats, type TechnicianProfile } from "@/lib/dummy-data/technicians";

/** Below `md`, a stacked card list instead of the full table — same pattern
    already established for Work Orders and Customers. */
export function TechniciansMobileList({ technicians }: { technicians: TechnicianProfile[] }) {
  if (technicians.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border-strong bg-surface p-6 text-center text-sm text-text-muted">
        No technicians match your filters.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {technicians.map((tech) => {
        const meta = TECHNICIAN_STATUS_META[tech.status];
        const stats = getTechnicianStats(tech.id, tech.name);
        return (
          <li key={tech.id}>
            <Link href={`/technicians/${tech.id}`} className="block rounded-lg border border-border bg-surface p-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2.5">
                  <Avatar name={tech.name} size="sm" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-text-primary">{tech.name}</p>
                    <p className="truncate text-[12px] text-text-muted">{tech.role}</p>
                  </div>
                </div>
                <Badge variant={meta.badge} dot className="shrink-0">
                  {meta.label}
                </Badge>
              </div>
              <div className="mt-2.5 flex items-center gap-2">
                <Progress value={stats.utilizationPct} tone="auto" className="flex-1" />
                <span className="shrink-0 tabular-nums text-[12px] text-text-muted">{stats.utilizationPct}%</span>
              </div>
              <div className="mt-2 flex items-center justify-between gap-2 border-t border-border pt-2 text-[12px] text-text-muted">
                <span>{stats.jobsToday} {stats.jobsToday === 1 ? "job" : "jobs"} today</span>
                <span className="tabular-nums font-medium text-text-primary">{stats.rating.toFixed(1)} ★</span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
