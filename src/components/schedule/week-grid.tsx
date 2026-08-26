"use client";

import { useDraggable, useDroppable } from "@dnd-kit/core";
import { AppointmentChip } from "@/components/schedule/appointment-chip";
import { cn } from "@/lib/utils";
import {
  TECHNICIANS,
  DAY_LABELS,
  TODAY_DAY_OFFSET,
  type ScheduleAppointment,
} from "@/lib/dummy-data/schedule";

export function techColor(techId: string | null) {
  return TECHNICIANS.find((t) => t.id === techId)?.color ?? "var(--text-muted)";
}

function DraggableWeekChip({ appointment }: { appointment: ScheduleAppointment }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: appointment.id,
  });
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ touchAction: "none" }}
      className="h-14"
    >
      {/* Moving visual is DragOverlay — portaled outside this column's
          overflow-y-auto, which would otherwise clip a transformed original. */}
      <AppointmentChip appointment={appointment} color={techColor(appointment.technicianId)} dragging={isDragging} />
    </div>
  );
}

function DayColumn({
  dayOffset,
  appointments,
}: {
  dayOffset: number;
  appointments: ScheduleAppointment[];
}) {
  const { setNodeRef, isOver } = useDroppable({ id: `week-day-${dayOffset}`, data: { dayOffset } });
  const isToday = dayOffset === TODAY_DAY_OFFSET;
  const day = DAY_LABELS[dayOffset];

  return (
    <div className="flex min-w-[150px] flex-1 flex-col border-r border-border last:border-r-0">
      <div
        className={cn(
          "flex shrink-0 flex-col items-center gap-0.5 border-b border-border py-2",
          isToday && "bg-primary-light"
        )}
      >
        <span className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">
          {day.label}
        </span>
        <span className={cn("text-sm font-semibold", isToday ? "text-primary-text" : "text-text-primary")}>
          {day.date}
        </span>
      </div>
      <div
        ref={setNodeRef}
        data-testid={`week-day-${dayOffset}`}
        className={cn(
          "scrollbar-thin flex-1 space-y-1.5 overflow-y-auto p-1.5 transition-colors",
          isOver && "bg-primary-light"
        )}
        style={{ minHeight: 420 }}
      >
        {appointments.map((apt) => (
          <DraggableWeekChip key={apt.id} appointment={apt} />
        ))}
        {appointments.length === 0 ? (
          <p className="px-1 pt-2 text-center text-[12px] text-text-muted">No jobs</p>
        ) : null}
      </div>
    </div>
  );
}

export interface WeekGridProps {
  appointments: ScheduleAppointment[];
  visibleTechnicianIds: Set<string>;
}

export function WeekGrid({ appointments, visibleTechnicianIds }: WeekGridProps) {
  return (
    <div className="scrollbar-thin overflow-x-auto rounded-lg border border-border">
      <div className="flex" style={{ minWidth: 900 }}>
        {DAY_LABELS.map((_, dayOffset) => {
          const dayAppointments = appointments
            .filter(
              (a) =>
                a.dayOffset === dayOffset &&
                a.technicianId !== null &&
                visibleTechnicianIds.has(a.technicianId)
            )
            .sort((a, b) => a.startHour - b.startHour);
          return <DayColumn key={dayOffset} dayOffset={dayOffset} appointments={dayAppointments} />;
        })}
      </div>
    </div>
  );
}
