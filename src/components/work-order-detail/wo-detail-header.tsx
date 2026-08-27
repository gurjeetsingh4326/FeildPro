"use client";

import Link from "next/link";
import * as React from "react";
import { ArrowLeft, UserPlus, Play, CheckCircle2, FileText, PauseCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge, PriorityBadge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { STATUS_META } from "@/lib/work-order-status";
import type { WorkOrder } from "@/lib/dummy-data/work-orders";
import type { WorkOrderStatus } from "@/lib/types";

export interface WoDetailHeaderProps {
  workOrder: WorkOrder;
  onStatusChange: (status: WorkOrderStatus) => void;
  onOpenAssign: () => void;
}

export function WoDetailHeader({ workOrder, onStatusChange, onOpenAssign }: WoDetailHeaderProps) {
  const [confirmCancel, setConfirmCancel] = React.useState(false);
  const meta = STATUS_META[workOrder.status];

  const canCancel = !["completed", "invoiced", "paid", "cancelled"].includes(workOrder.status);

  return (
    <div className="flex flex-col gap-4 border-b border-border pb-4">
      <Link
        href="/work-orders"
        className="inline-flex w-fit items-center gap-1.5 text-[13px] font-medium text-text-secondary hover:text-text-primary"
      >
        <ArrowLeft className="size-3.5" />
        Work Orders
      </Link>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-mono text-lg font-semibold text-text-primary">{workOrder.id}</h1>
            <Badge variant={meta.badge} dot>
              {meta.label}
            </Badge>
            <PriorityBadge priority={workOrder.priority}>{workOrder.priority}</PriorityBadge>
          </div>
          <p className="mt-1 text-2xl font-bold tracking-tight text-text-primary">{workOrder.customerName}</p>
          <p className="text-sm text-text-secondary">{workOrder.service}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {workOrder.status === "draft" || (workOrder.status === "scheduled" && !workOrder.technicianName) ? (
            <Button onClick={onOpenAssign} className="gap-1.5">
              <UserPlus className="size-4" />
              Assign Technician
            </Button>
          ) : null}
          {workOrder.status === "scheduled" && workOrder.technicianName ? (
            <Button onClick={() => onStatusChange("in_progress")} className="gap-1.5">
              <Play className="size-4" />
              Start Job
            </Button>
          ) : null}
          {workOrder.status === "in_progress" ? (
            <Button onClick={() => onStatusChange("completed")} className="gap-1.5">
              <CheckCircle2 className="size-4" />
              Complete Work Order
            </Button>
          ) : null}
          {workOrder.status === "on_hold" ? (
            <Button onClick={() => onStatusChange("in_progress")} className="gap-1.5">
              <Play className="size-4" />
              Resume Job
            </Button>
          ) : null}
          {workOrder.status === "completed" ? (
            <Button onClick={() => onStatusChange("invoiced")} className="gap-1.5">
              <FileText className="size-4" />
              Generate Invoice
            </Button>
          ) : null}
          {workOrder.status === "in_progress" || workOrder.status === "scheduled" ? (
            <Button variant="secondary" onClick={() => onStatusChange("on_hold")} className="gap-1.5">
              <PauseCircle className="size-4" />
              Put On Hold
            </Button>
          ) : null}
          {canCancel ? (
            <Button variant="ghost" onClick={() => setConfirmCancel(true)} className="gap-1.5 text-error hover:text-error">
              <XCircle className="size-4" />
              Cancel
            </Button>
          ) : null}
        </div>
      </div>

      <ConfirmDialog
        open={confirmCancel}
        onOpenChange={setConfirmCancel}
        title="Cancel this work order?"
        description="The customer and assigned technician will need to be notified separately. This cannot be undone."
        confirmLabel="Cancel work order"
        destructive
        onConfirm={() => {
          onStatusChange("cancelled");
          setConfirmCancel(false);
        }}
      />
    </div>
  );
}
