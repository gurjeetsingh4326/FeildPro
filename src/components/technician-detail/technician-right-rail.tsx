import { Phone, Mail } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { TechnicianProfile, TechnicianStats } from "@/lib/dummy-data/technicians";

export function TechnicianRightRail({ technician, stats }: { technician: TechnicianProfile; stats: TechnicianStats }) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Quick Facts</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-2 gap-3 text-center">
          <div>
            <p className="text-lg font-bold text-text-primary">{stats.jobsToday}</p>
            <p className="text-[12px] text-text-muted">Jobs today</p>
          </div>
          <div>
            <p className="text-lg font-bold text-text-primary">{stats.rating.toFixed(1)} ★</p>
            <p className="text-[12px] text-text-muted">Customer rating</p>
          </div>
        </div>
        <div className="mt-4 border-t border-border pt-3">
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <span className="text-[13px] text-text-muted">Utilization</span>
            <span className="text-[13px] font-medium tabular-nums text-text-primary">{stats.utilizationPct}%</span>
          </div>
          <Progress value={stats.utilizationPct} tone="auto" />
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact</CardTitle>
        </CardHeader>
        <div className="space-y-2 text-[13px] text-text-secondary">
          <p className="flex items-center gap-2">
            <Phone className="size-3.5 shrink-0 text-text-muted" />
            {technician.phone}
          </p>
          <p className="flex items-center gap-2">
            <Mail className="size-3.5 shrink-0 text-text-muted" />
            {technician.email}
          </p>
        </div>
      </Card>
    </div>
  );
}
