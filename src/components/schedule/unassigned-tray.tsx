"use client";

import { useDraggable, useDroppable } from "@dnd-kit/core";
import { AlertCircle } from "lucide-react";
import { AppointmentChip } from "@/components/schedule/appointment-chip";
import { cn } from "@/lib/utils";
import type { ScheduleAppointment } from "@/lib/dummy-data/schedule";

export const UNASSIGNED_TRAY_ID = "unassigned-tray";

function DraggableUnassignedChip({ appointment }: { appointment: ScheduleAppointment }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: appointment.id,
  });
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ touchAction: "none" }}
      className="w-56 shrink-0"
    >
      {/* Moving visual is DragOverlay — portaled outside this tray's
          overflow-x-auto, which would otherwise clip a transformed original. */}
      <AppointmentChip appointment={appointment} color="var(--text-muted)" dragging={isDragging} />
    </div>
  );
}

export interface UnassignedTrayProps {
  appointments: ScheduleAppointment[];
}

export function UnassignedTray({ appointments }: UnassignedTrayProps) {
  const { setNodeRef, isOver } = useDroppable({ id: UNASSIGNED_TRAY_ID });

  return (
    <div
      ref={setNodeRef}
      data-testid={UNASSIGNED_TRAY_ID}
      className={cn(
        "rounded-lg border border-dashed border-border-strong bg-surface p-3 transition-colors",
        isOver && "border-primary bg-primary-light"
      )}
    >
      <div className="mb-2 flex items-center gap-1.5 px-1">
        <AlertCircle className="size-3.5 text-warning" />
        <p className="text-[13px] font-medium text-text-primary">
          Unassigned ({appointments.length})
        </p>
        <p className="ml-auto hidden text-[12px] text-text-muted sm:block">
          Drag onto a technician&apos;s row to assign
        </p>
      </div>
      {appointments.length === 0 ? (
        <p className="px-1 py-2 text-[13px] text-text-muted">Nothing unassigned right now.</p>
      ) : (
        <div className="scrollbar-thin flex gap-2 overflow-x-auto pb-1">
          {appointments.map((apt) => (
            <DraggableUnassignedChip key={apt.id} appointment={apt} />
          ))}
        </div>
      )}
    </div>
  );
}
