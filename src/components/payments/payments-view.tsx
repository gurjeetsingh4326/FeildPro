"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PaymentFilters } from "@/components/payments/payment-filters";
import { RecordPaymentModal } from "@/components/payments/record-payment-modal";
import { PaymentsTable, type SortColumn } from "@/components/payments/payments-table";
import { PaymentsMobileList } from "@/components/payments/payments-mobile-list";
import {
  PAYMENTS,
  PAYMENT_METHOD_META,
  PAYMENT_STATUS_META,
  type Payment,
  type PaymentMethod,
  type PaymentStatus,
} from "@/lib/dummy-data/payments";
import type { SortDirection } from "@/components/ui/table";

const PAGE_SIZE = 10;

export function PaymentsView() {
  const [payments, setPayments] = React.useState<Payment[]>(PAYMENTS);
  const [search, setSearch] = React.useState("");
  const [selectedStatuses, setSelectedStatuses] = React.useState<Set<PaymentStatus>>(new Set());
  const [selectedMethods, setSelectedMethods] = React.useState<Set<PaymentMethod>>(new Set());
  const [sortColumn, setSortColumn] = React.useState<SortColumn>(null);
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(null);
  const [page, setPage] = React.useState(1);

  const nextIdRef = React.useRef(3013);

  const toggleStatus = (status: PaymentStatus) => {
    setPage(1);
    setSelectedStatuses((prev) => {
      const next = new Set(prev);
      if (next.has(status)) next.delete(status);
      else next.add(status);
      return next;
    });
  };

  const toggleMethod = (method: PaymentMethod) => {
    setPage(1);
    setSelectedMethods((prev) => {
      const next = new Set(prev);
      if (next.has(method)) next.delete(method);
      else next.add(method);
      return next;
    });
  };

  const handleSort = (column: SortColumn) => {
    if (sortColumn !== column) {
      setSortColumn(column);
      setSortDirection("asc");
    } else if (sortDirection === "asc") {
      setSortDirection("desc");
    } else if (sortDirection === "desc") {
      setSortColumn(null);
      setSortDirection(null);
    } else {
      setSortDirection("asc");
    }
  };

  const filtered = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    let result = payments.filter((p) => {
      const matchesSearch =
        !q || p.id.toLowerCase().includes(q) || p.customerName.toLowerCase().includes(q) || p.invoiceId.toLowerCase().includes(q);
      const matchesStatus = selectedStatuses.size === 0 || selectedStatuses.has(p.status);
      const matchesMethod = selectedMethods.size === 0 || selectedMethods.has(p.method);
      return matchesSearch && matchesStatus && matchesMethod;
    });

    if (sortColumn) {
      result = [...result].sort((a, b) => {
        const dir = sortDirection === "desc" ? -1 : 1;
        if (sortColumn === "amount") return (a.amount - b.amount) * dir;
        return a.date.localeCompare(b.date) * dir;
      });
    }
    return result;
  }, [payments, search, selectedStatuses, selectedMethods, sortColumn, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const activeCount = selectedStatuses.size + selectedMethods.size;

  function handleCreate(payment: Payment) {
    setPayments((prev) => [payment, ...prev]);
    nextIdRef.current += 1;
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search payments…"
              className="pl-9"
            />
          </div>
          <PaymentFilters
            selectedStatuses={selectedStatuses}
            onToggleStatus={toggleStatus}
            selectedMethods={selectedMethods}
            onToggleMethod={toggleMethod}
            activeCount={activeCount}
          />
        </div>
        <RecordPaymentModal onCreate={handleCreate} nextId={`PMT-${nextIdRef.current}`} />
      </div>

      {activeCount > 0 ? (
        <div className="flex flex-wrap items-center gap-2">
          {Array.from(selectedStatuses).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => toggleStatus(status)}
              className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label={`Remove filter: ${status}`}
            >
              <Badge variant="neutral" className="cursor-pointer hover:bg-border">
                {PAYMENT_STATUS_META[status].label} ×
              </Badge>
            </button>
          ))}
          {Array.from(selectedMethods).map((method) => (
            <button
              key={method}
              type="button"
              onClick={() => toggleMethod(method)}
              className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label={`Remove filter: ${method}`}
            >
              <Badge variant="neutral" className="cursor-pointer hover:bg-border">
                {PAYMENT_METHOD_META[method].label} ×
              </Badge>
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setSelectedStatuses(new Set());
              setSelectedMethods(new Set());
            }}
            className="text-[13px] font-medium text-text-muted hover:text-text-primary"
          >
            Clear all
          </button>
        </div>
      ) : null}

      <div className="hidden md:block">
        <PaymentsTable payments={pageItems} sortColumn={sortColumn} sortDirection={sortDirection} onSort={handleSort} />
      </div>
      <div className="md:hidden">
        <PaymentsMobileList payments={pageItems} />
      </div>

      <div className="flex items-center justify-between text-[13px] text-text-secondary">
        <span>
          {filtered.length === 0
            ? "0 results"
            : `${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, filtered.length)} of ${filtered.length}`}
        </span>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
            Previous
          </Button>
          <span>
            Page {page} of {totalPages}
          </span>
          <Button variant="secondary" size="sm" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
