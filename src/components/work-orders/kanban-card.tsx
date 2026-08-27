import { useDraggable } from "@dnd-kit/core";
import { MapPin } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { PriorityBadge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { WorkOrderStatus } from "@/lib/types";
import type { WorkOrder } from "@/lib/dummy-data/work-orders";

const STATUS_ACCENT: Record<WorkOrderStatus, string> = {
  draft: "var(--text-muted)",
  scheduled: "var(--info)",
  in_progress: "var(--primary)",
  on_hold: "var(--warning)",
  completed: "var(--success)",
  invoiced: "var(--info)",
  paid: "var(--success)",
  cancelled: "var(--error)",
};

export function KanbanCardContent({ wo }: { wo: WorkOrder }) {
  return (
    <div
      className="space-y-2 rounded-md border border-border border-l-[3px] bg-surface p-4 shadow-xs"
      style={{ borderLeftColor: STATUS_ACCENT[wo.status] }}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[12px] text-text-muted">{wo.id}</span>
        <PriorityBadge priority={wo.priority}>{wo.priority}</PriorityBadge>
      </div>
      <p className="text-sm font-semibold leading-snug text-text-primary">{wo.customerName}</p>
      <p className="truncate text-[13px] text-text-secondary">{wo.service}</p>
      <div className="flex items-center justify-between gap-2 pt-1">
        {wo.technicianName ? (
          <div className="flex items-center gap-1.5">
            <Avatar name={wo.technicianName} size="sm" />
            <span className="text-[12px] text-text-secondary">{wo.technicianName}</span>
          </div>
        ) : (
          <span className="text-[12px] text-text-muted">Unassigned</span>
        )}
        <span className="flex items-center gap-1 text-[12px] text-text-muted">
          <MapPin className="size-3" />
          {wo.scheduledDate.slice(5)}
        </span>
      </div>
    </div>
  );
}

export function DraggableKanbanCard({ wo }: { wo: WorkOrder }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: wo.id });
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ touchAction: "none" }}
      className={cn("cursor-grab active:cursor-grabbing", isDragging && "opacity-40")}
    >
      <KanbanCardContent wo={wo} />
    </div>
  );
}
