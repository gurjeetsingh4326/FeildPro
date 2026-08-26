"use client";

import { useDraggable, useDroppable } from "@dnd-kit/core";
import { Avatar } from "@/components/ui/avatar";
import { AppointmentChip } from "@/components/schedule/appointment-chip";
import { cn } from "@/lib/utils";
import {
  TECHNICIANS,
  DAY_START_HOUR,
  DAY_END_HOUR,
  type ScheduleAppointment,
  type Technician,
} from "@/lib/dummy-data/schedule";

const HOURS = Array.from({ length: DAY_END_HOUR - DAY_START_HOUR }, (_, i) => DAY_START_HOUR + i);
const ROW_HEIGHT = 68;

function formatHourLabel(hour: number) {
  const period = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${h12} ${period}`;
}

function DraggableChip({ appointment, color }: { appointment: ScheduleAppointment; color: string }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: appointment.id,
  });

  const left = ((appointment.startHour - DAY_START_HOUR) / (DAY_END_HOUR - DAY_START_HOUR)) * 100;
  const width = (appointment.durationHours / (DAY_END_HOUR - DAY_START_HOUR)) * 100;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        position: "absolute",
        left: `${left}%`,
        width: `calc(${width}% - 4px)`,
        top: 4,
        bottom: 4,
        zIndex: isDragging ? 30 : 10,
        touchAction: "none",
      }}
    >
      {/* The moving visual is DragOverlay (portaled outside this scroll/overflow
          container — see schedule-view.tsx). This stays put as a dimmed
          placeholder marking the original slot. */}
      <AppointmentChip appointment={appointment} color={color} dragging={isDragging} compact />
    </div>
  );
}

function DroppableCell({ techId, hour }: { techId: string; hour: number }) {
  const { setNodeRef, isOver } = useDroppable({
    id: `day-cell-${techId}-${hour}`,
    data: { techId, hour },
  });
  return (
    <div
      ref={setNodeRef}
      data-testid={`day-cell-${techId}-${hour}`}
      className={cn(
        "h-full border-r border-border/70 transition-colors last:border-r-0",
        isOver && "bg-primary-light"
      )}
    />
  );
}

export interface DayBoardProps {
  appointments: ScheduleAppointment[];
  visibleTechnicianIds: Set<string>;
}

export function DayBoard({ appointments, visibleTechnicianIds }: DayBoardProps) {
  const technicians: Technician[] = TECHNICIANS.filter((t) => visibleTechnicianIds.has(t.id));

  return (
    <div className="scrollbar-thin overflow-x-auto">
      <div style={{ minWidth: 880 }}>
        {/* Hour header */}
        <div className="flex border-b border-border">
          <div className="w-40 shrink-0 border-r border-border" />
          <div className="grid flex-1" style={{ gridTemplateColumns: `repeat(${HOURS.length}, 1fr)` }}>
            {HOURS.map((hour) => (
              <div key={hour} className="border-r border-border/70 px-2 py-2 text-[11px] font-medium text-text-muted last:border-r-0">
                {formatHourLabel(hour)}
              </div>
            ))}
          </div>
        </div>

        {/* Technician rows */}
        {technicians.map((tech) => {
          const techAppointments = appointments.filter((a) => a.technicianId === tech.id);
          return (
            <div key={tech.id} className="flex border-b border-border last:border-b-0">
              <div className="flex w-40 shrink-0 items-center gap-2 border-r border-border px-3">
                <Avatar name={tech.name} size="sm" />
                <span className="truncate text-[13px] font-medium text-text-primary">{tech.name}</span>
              </div>
              <div
                className="relative flex-1"
                style={{ height: ROW_HEIGHT }}
              >
                <div
                  className="absolute inset-0 grid"
                  style={{ gridTemplateColumns: `repeat(${HOURS.length}, 1fr)` }}
                >
                  {HOURS.map((hour) => (
                    <DroppableCell key={hour} techId={tech.id} hour={hour} />
                  ))}
                </div>
                {techAppointments.map((apt) => (
                  <DraggableChip key={apt.id} appointment={apt} color={tech.color} />
                ))}
              </div>
            </div>
          );
        })}

        {technicians.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-text-muted">
            No technicians selected — check at least one in the filter to see the board.
          </p>
        ) : null}
      </div>
    </div>
  );
}
