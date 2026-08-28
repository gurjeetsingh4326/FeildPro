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
import { WAREHOUSES, STOCK_STATUS_META, type InventoryStockStatus } from "@/lib/dummy-data/parts";

const STATUSES: InventoryStockStatus[] = ["in_stock", "low", "out"];

export interface InventoryFiltersProps {
  selectedWarehouses: Set<string>;
  onToggleWarehouse: (id: string) => void;
  selectedStatuses: Set<InventoryStockStatus>;
  onToggleStatus: (status: InventoryStockStatus) => void;
  activeCount: number;
}

export function InventoryFilters({
  selectedWarehouses,
  onToggleWarehouse,
  selectedStatuses,
  onToggleStatus,
  activeCount,
}: InventoryFiltersProps) {
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
        <DropdownMenuLabel>Warehouse</DropdownMenuLabel>
        {WAREHOUSES.map((w) => (
          <DropdownMenuCheckboxItem
            key={w.id}
            checked={selectedWarehouses.has(w.id)}
            onSelect={(e) => e.preventDefault()}
            onCheckedChange={() => onToggleWarehouse(w.id)}
          >
            {w.name}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Stock Status</DropdownMenuLabel>
        {STATUSES.map((status) => (
          <DropdownMenuCheckboxItem
            key={status}
            checked={selectedStatuses.has(status)}
            onSelect={(e) => e.preventDefault()}
            onCheckedChange={() => onToggleStatus(status)}
          >
            {STOCK_STATUS_META[status].label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
