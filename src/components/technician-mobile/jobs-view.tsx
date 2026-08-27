import { ClipboardList } from "lucide-react";
import { JobCard } from "@/components/technician-mobile/job-card";
import { TECHNICIAN_TODAY_ISO, type TechnicianJob } from "@/lib/dummy-data/technician";

function formatDateLabel(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function JobsView({ jobs }: { jobs: TechnicianJob[] }) {
  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 px-4 py-16 text-center">
        <ClipboardList className="size-10 text-text-muted" />
        <p className="text-sm font-medium text-text-primary">No upcoming jobs</p>
        <p className="text-[13px] text-text-muted">New assignments will show up here.</p>
      </div>
    );
  }

  const grouped: { date: string; jobs: TechnicianJob[] }[] = [];
  for (const job of jobs) {
    const date = job.workOrder.scheduledDate;
    const group = grouped.find((g) => g.date === date);
    if (group) group.jobs.push(job);
    else grouped.push({ date, jobs: [job] });
  }

  return (
    <div className="flex flex-col gap-5 p-4">
      {grouped.map(({ date, jobs: dateJobs }) => (
        <div key={date} className="flex flex-col gap-3">
          <h3 className="text-[13px] font-semibold uppercase tracking-wide text-text-muted">
            {date === TECHNICIAN_TODAY_ISO ? "Today" : formatDateLabel(date)}
          </h3>
          {dateJobs.map((job) => (
            <JobCard key={job.workOrder.id} job={job} />
          ))}
        </div>
      ))}
    </div>
  );
}
