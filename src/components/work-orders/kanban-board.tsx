"use client";

import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { STATUS_META } from "@/lib/work-order-status";
import { KANBAN_STATUSES, type WorkOrder } from "@/lib/dummy-data/work-orders";
import type { WorkOrderStatus } from "@/lib/types";
import { DraggableKanbanCard } from "@/components/work-orders/kanban-card";

function KanbanColumn({ status, items }: { status: WorkOrderStatus; items: WorkOrder[] }) {
  const { setNodeRef, isOver } = useDroppable({ id: `kanban-col-${status}`, data: { status } });
  const meta = STATUS_META[status];

  return (
    <div className="flex w-72 shrink-0 flex-col">
      <div className="mb-2 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-text-primary">{meta.label}</h3>
          <span className="rounded-full bg-surface-sunken px-1.5 py-0.5 text-[11px] font-medium text-text-muted">
            {items.length}
          </span>
        </div>
      </div>
      <div
        ref={setNodeRef}
        data-testid={`kanban-col-${status}`}
        className={cn(
          "scrollbar-thin flex-1 space-y-2 overflow-y-auto rounded-lg border border-dashed border-transparent p-2 transition-colors",
          isOver && "border-primary bg-primary-light"
        )}
        style={{ minHeight: 200 }}
      >
        {items.map((wo) => (
          <DraggableKanbanCard key={wo.id} wo={wo} />
        ))}
        {items.length === 0 ? (
          <p className="px-2 py-6 text-center text-[13px] text-text-muted">No work orders</p>
        ) : null}
      </div>
    </div>
  );
}

export function KanbanBoard({ workOrders }: { workOrders: WorkOrder[] }) {
  return (
    <div className="scrollbar-thin flex flex-1 gap-4 overflow-x-auto pb-2">
      {KANBAN_STATUSES.map((status) => (
        <KanbanColumn key={status} status={status} items={workOrders.filter((wo) => wo.status === status)} />
      ))}
    </div>
  );
}
