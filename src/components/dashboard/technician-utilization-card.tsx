import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar } from "@/components/ui/avatar";
import { TECHNICIAN_UTILIZATION } from "@/lib/dummy-data/dashboard";

export function TechnicianUtilizationCard() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Technician Utilization</CardTitle>
      </CardHeader>
      <ul className="space-y-4">
        {TECHNICIAN_UTILIZATION.map((tech) => (
          <li key={tech.id} className="flex items-center gap-3">
            <Avatar name={tech.name} size="sm" className="shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <p className="truncate text-sm font-medium text-text-primary">{tech.name}</p>
                <span className="shrink-0 text-[13px] tabular-nums text-text-muted">
                  {tech.utilizationPct}% · {tech.jobsToday} jobs
                </span>
              </div>
              <Progress value={tech.utilizationPct} tone="auto" />
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
