"use client";

import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import type { CustomerStatus } from "@/lib/dummy-data/customers";

const STATUSES: { value: CustomerStatus; label: string }[] = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export interface CustomerFiltersProps {
  selectedStatuses: Set<CustomerStatus>;
  onToggleStatus: (status: CustomerStatus) => void;
  activeCount: number;
}

export function CustomerFilters({ selectedStatuses, onToggleStatus, activeCount }: CustomerFiltersProps) {
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
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>Status</DropdownMenuLabel>
        {STATUSES.map((status) => (
          <DropdownMenuCheckboxItem
            key={status.value}
            checked={selectedStatuses.has(status.value)}
            onSelect={(e) => e.preventDefault()}
            onCheckedChange={() => onToggleStatus(status.value)}
          >
            {status.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
