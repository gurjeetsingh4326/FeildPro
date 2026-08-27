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
import { SERVICE_CATEGORIES, type ServiceCategory, type ServiceStatus } from "@/lib/dummy-data/services";

const STATUSES: ServiceStatus[] = ["active", "inactive"];

export interface ServiceFiltersProps {
  selectedCategories: Set<ServiceCategory>;
  onToggleCategory: (category: ServiceCategory) => void;
  selectedStatuses: Set<ServiceStatus>;
  onToggleStatus: (status: ServiceStatus) => void;
  activeCount: number;
}

export function ServiceFilters({
  selectedCategories,
  onToggleCategory,
  selectedStatuses,
  onToggleStatus,
  activeCount,
}: ServiceFiltersProps) {
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
        <DropdownMenuLabel>Category</DropdownMenuLabel>
        {SERVICE_CATEGORIES.map((category) => (
          <DropdownMenuCheckboxItem
            key={category}
            checked={selectedCategories.has(category)}
            onSelect={(e) => e.preventDefault()}
            onCheckedChange={() => onToggleCategory(category)}
          >
            {category}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Status</DropdownMenuLabel>
        {STATUSES.map((status) => (
          <DropdownMenuCheckboxItem
            key={status}
            checked={selectedStatuses.has(status)}
            onSelect={(e) => e.preventDefault()}
            onCheckedChange={() => onToggleStatus(status)}
          >
            <span className="capitalize">{status}</span>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
