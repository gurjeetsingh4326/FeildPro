"use client";

import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { STATUS_META, STATUS_ORDER } from "@/lib/work-order-status";
import type { WorkOrderPriority, WorkOrderStatus } from "@/lib/types";

const PRIORITIES: WorkOrderPriority[] = ["urgent", "high", "medium", "low"];

export interface WorkOrderFiltersProps {
  selectedStatuses: Set<WorkOrderStatus>;
  onToggleStatus: (status: WorkOrderStatus) => void;
  selectedPriorities: Set<WorkOrderPriority>;
  onTogglePriority: (priority: WorkOrderPriority) => void;
  activeCount: number;
}

export function WorkOrderFilters({
  selectedStatuses,
  onToggleStatus,
  selectedPriorities,
  onTogglePriority,
  activeCount,
}: WorkOrderFiltersProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="md" className="gap-1.5">
          <SlidersHorizontal className="size-4" />
          Filters
          {activeCount > 0 ? (
            <span className="flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-white">
              {activeCount}
            </span>
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuLabel>Status</DropdownMenuLabel>
        {STATUS_ORDER.map((status) => (
          <DropdownMenuCheckboxItem
            key={status}
            checked={selectedStatuses.has(status)}
            onSelect={(e) => e.preventDefault()}
            onCheckedChange={() => onToggleStatus(status)}
          >
            {STATUS_META[status].label}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Priority</DropdownMenuLabel>
        {PRIORITIES.map((priority) => (
          <DropdownMenuCheckboxItem
            key={priority}
            checked={selectedPriorities.has(priority)}
            onSelect={(e) => e.preventDefault()}
            onCheckedChange={() => onTogglePriority(priority)}
          >
            <span className="capitalize">{priority}</span>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
