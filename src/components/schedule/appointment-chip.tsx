import type { CSSProperties } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ScheduleAppointment } from "@/lib/dummy-data/schedule";

function formatHour(hour: number) {
  const h = Math.floor(hour);
  const m = Math.round((hour - h) * 60);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${h12}${period}` : `${h12}:${m.toString().padStart(2, "0")}${period}`;
}

export interface AppointmentChipProps {
  appointment: ScheduleAppointment;
  color: string;
  dragging?: boolean;
  compact?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function AppointmentChip({ appointment, color, dragging, compact, className, style }: AppointmentChipProps) {
  return (
    <div
      style={{ borderLeftColor: color, ...style }}
      className={cn(
        "group flex h-full cursor-grab flex-col justify-center overflow-hidden rounded-md border border-border border-l-[3px] bg-surface px-2 py-1 text-left shadow-xs transition-shadow active:cursor-grabbing",
        dragging ? "opacity-50 shadow-md" : "hover:shadow-sm",
        compact ? "gap-0" : "gap-0.5",
        className
      )}
    >
      <div className="flex items-center gap-1">
        {appointment.status === "completed" ? (
          <CheckCircle2 className="size-3 shrink-0 text-success" />
        ) : appointment.status === "in_progress" ? (
          <Loader2 className="size-3 shrink-0 animate-spin text-primary-text" />
        ) : null}
        <p className="truncate text-[12px] font-medium leading-tight text-text-primary">
          {appointment.customerName}
        </p>
      </div>
      {!compact ? (
        <p className="truncate text-[11px] leading-tight text-text-muted">
          {formatHour(appointment.startHour)} · {appointment.service}
        </p>
      ) : null}
    </div>
  );
}
