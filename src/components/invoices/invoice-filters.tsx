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
import { INVOICE_STATUS_META } from "@/lib/dummy-data/invoices";
import type { InvoiceStatus } from "@/lib/types";

const STATUSES: InvoiceStatus[] = ["draft", "sent", "overdue", "paid"];

export interface InvoiceFiltersProps {
  selectedStatuses: Set<InvoiceStatus>;
  onToggleStatus: (status: InvoiceStatus) => void;
  activeCount: number;
}

export function InvoiceFilters({ selectedStatuses, onToggleStatus, activeCount }: InvoiceFiltersProps) {
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
            key={status}
            checked={selectedStatuses.has(status)}
            onSelect={(e) => e.preventDefault()}
            onCheckedChange={() => onToggleStatus(status)}
          >
            {INVOICE_STATUS_META[status].label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
