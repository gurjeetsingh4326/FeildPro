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
import { PAYMENT_METHOD_META, PAYMENT_STATUS_META, type PaymentMethod, type PaymentStatus } from "@/lib/dummy-data/payments";

const STATUSES: PaymentStatus[] = ["completed", "pending", "refunded", "failed"];
const METHODS: PaymentMethod[] = ["credit_card", "ach", "check", "cash"];

export interface PaymentFiltersProps {
  selectedStatuses: Set<PaymentStatus>;
  onToggleStatus: (status: PaymentStatus) => void;
  selectedMethods: Set<PaymentMethod>;
  onToggleMethod: (method: PaymentMethod) => void;
  activeCount: number;
}

export function PaymentFilters({
  selectedStatuses,
  onToggleStatus,
  selectedMethods,
  onToggleMethod,
  activeCount,
}: PaymentFiltersProps) {
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
            {PAYMENT_STATUS_META[status].label}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Method</DropdownMenuLabel>
        {METHODS.map((method) => (
          <DropdownMenuCheckboxItem
            key={method}
            checked={selectedMethods.has(method)}
            onSelect={(e) => e.preventDefault()}
            onCheckedChange={() => onToggleMethod(method)}
          >
            {PAYMENT_METHOD_META[method].label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
