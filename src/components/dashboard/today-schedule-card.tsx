import { Clock } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { TODAY_SCHEDULE } from "@/lib/dummy-data/dashboard";

export function TodayScheduleCard() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Today&apos;s Schedule</CardTitle>
        <span className="text-[13px] text-text-muted">{TODAY_SCHEDULE.length} appointments</span>
      </CardHeader>
      <ul className="scrollbar-thin -mx-1 flex-1 space-y-1 overflow-y-auto px-1 sm:max-h-[280px]">
        {TODAY_SCHEDULE.map((apt) => (
          <li
            key={apt.id}
            className="flex items-start gap-3 rounded-md px-2 py-2 transition-colors hover:bg-background"
          >
            <span className="flex w-16 shrink-0 items-center gap-1 pt-0.5 text-[13px] font-medium text-text-secondary">
              <Clock className="size-3.5 text-text-muted" />
              {apt.time}
            </span>
            <Avatar name={apt.technicianName} size="sm" className="mt-0.5 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-text-primary">{apt.customerName}</p>
              <p className="truncate text-[13px] text-text-muted">{apt.service}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
