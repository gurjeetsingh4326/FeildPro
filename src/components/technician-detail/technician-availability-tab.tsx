import { Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { DAYS_OF_WEEK, DAY_LABELS, type TechnicianProfile } from "@/lib/dummy-data/technicians";

export function TechnicianAvailabilityTab({ technician }: { technician: TechnicianProfile }) {
  return (
    <Card>
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-text-primary">
        <Clock className="size-4 text-text-muted" />
        Weekly Availability
      </h3>
      <div className="divide-y divide-border">
        {DAYS_OF_WEEK.map((day) => {
          const window = technician.availability[day];
          return (
            <div key={day} className="flex items-center justify-between gap-3 py-2.5">
              <span className="text-sm font-medium text-text-primary">{DAY_LABELS[day]}</span>
              {window ? (
                <span className="text-[13px] tabular-nums text-text-secondary">
                  {window.start} – {window.end}
                </span>
              ) : (
                <span className="text-[13px] text-text-muted">Off</span>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
