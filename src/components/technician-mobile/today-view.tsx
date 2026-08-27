import { CheckCircle2 } from "lucide-react";
import { JobCard } from "@/components/technician-mobile/job-card";
import type { TechnicianJob } from "@/lib/dummy-data/technician";

const FORMATTED_DATE = new Date("2026-08-26T09:00:00").toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

export function TodayView({ jobs, firstName }: { jobs: TechnicianJob[]; firstName: string }) {
  const completedCount = jobs.filter((j) =>
    ["completed", "invoiced", "paid"].includes(j.workOrder.status)
  ).length;

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-text-primary">Good morning, {firstName}</h2>
        <p className="mt-0.5 text-sm text-text-secondary">{FORMATTED_DATE}</p>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 rounded-lg border border-border bg-surface p-3 text-center">
          <p className="text-xl font-bold text-text-primary">{jobs.length}</p>
          <p className="text-[12px] text-text-muted">Jobs today</p>
        </div>
        <div className="flex-1 rounded-lg border border-border bg-surface p-3 text-center">
          <p className="text-xl font-bold text-success">{completedCount}</p>
          <p className="text-[12px] text-text-muted">Completed</p>
        </div>
      </div>

      {jobs.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-16 text-center">
          <CheckCircle2 className="size-10 text-text-muted" />
          <p className="text-sm font-medium text-text-primary">No jobs scheduled today</p>
          <p className="text-[13px] text-text-muted">Check the Jobs tab for what&apos;s ahead.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {jobs.map((job) => (
            <JobCard key={job.workOrder.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
