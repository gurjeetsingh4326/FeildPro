import { Clock, MapPin } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TECHNICIANS, type ScheduleAppointment } from "@/lib/dummy-data/schedule";

function formatHour(hour: number) {
  const h = Math.floor(hour);
  const m = Math.round((hour - h) * 60);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${h12}${period}` : `${h12}:${m.toString().padStart(2, "0")}${period}`;
}

function techName(id: string | null) {
  return TECHNICIANS.find((t) => t.id === id)?.name ?? null;
}

export interface MobileDayAgendaProps {
  appointments: ScheduleAppointment[];
  visibleTechnicianIds: Set<string>;
}

export function MobileDayAgenda({ appointments, visibleTechnicianIds }: MobileDayAgendaProps) {
  const dayAppointments = appointments
    .filter((a) => a.technicianId === null || visibleTechnicianIds.has(a.technicianId))
    .sort((a, b) => a.startHour - b.startHour);

  if (dayAppointments.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border-strong bg-surface p-6 text-center text-sm text-text-muted">
        No jobs scheduled for this day.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {dayAppointments.map((apt) => {
        const tech = techName(apt.technicianId);
        return (
          <li key={apt.id} className="rounded-lg border border-border bg-surface p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-1.5 text-[13px] font-medium text-text-secondary">
                <Clock className="size-3.5 text-text-muted" />
                {formatHour(apt.startHour)}
              </div>
              {!tech ? <Badge variant="warning">Unassigned</Badge> : null}
            </div>
            <p className="mt-1 text-sm font-medium text-text-primary">{apt.customerName}</p>
            <p className="text-[13px] text-text-muted">{apt.service}</p>
            <div className="mt-2 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-[12px] text-text-muted">
                <MapPin className="size-3.5" />
                <span className="truncate">{apt.address}</span>
              </div>
              {tech ? (
                <div className="flex shrink-0 items-center gap-1.5">
                  <Avatar name={tech} size="sm" />
                  <span className="text-[13px] text-text-secondary">{tech}</span>
                </div>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
