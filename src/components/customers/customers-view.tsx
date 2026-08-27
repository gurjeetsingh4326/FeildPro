"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CustomerFilters } from "@/components/customers/customer-filters";
import { NewCustomerModal } from "@/components/customers/new-customer-modal";
import { CustomersTable, type SortColumn } from "@/components/customers/customers-table";
import { CustomersMobileList } from "@/components/customers/customers-mobile-list";
import { CUSTOMERS, getCustomerStats, type Customer, type CustomerStatus } from "@/lib/dummy-data/customers";
import type { SortDirection } from "@/components/ui/table";

const PAGE_SIZE = 10;

export function CustomersView() {
  const [customers, setCustomers] = React.useState<Customer[]>(CUSTOMERS);
  const [search, setSearch] = React.useState("");
  const [selectedStatuses, setSelectedStatuses] = React.useState<Set<CustomerStatus>>(new Set());
  const [sortColumn, setSortColumn] = React.useState<SortColumn>(null);
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(null);
  const [page, setPage] = React.useState(1);

  const toggleStatus = (status: CustomerStatus) => {
    setPage(1);
    setSelectedStatuses((prev) => {
      const next = new Set(prev);
      if (next.has(status)) next.delete(status);
      else next.add(status);
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
    let result = customers.filter((c) => {
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.addresses.some((a) => a.address.toLowerCase().includes(q)) ||
        c.contacts.some((contact) => contact.name.toLowerCase().includes(q));
      const matchesStatus = selectedStatuses.size === 0 || selectedStatuses.has(c.status);
      return matchesSearch && matchesStatus;
    });

    if (sortColumn) {
      result = [...result].sort((a, b) => {
        const dir = sortDirection === "desc" ? -1 : 1;
        if (sortColumn === "totalSpend") {
          return (getCustomerStats(a.name).totalSpend - getCustomerStats(b.name).totalSpend) * dir;
        }
        return a.customerSince.localeCompare(b.customerSince) * dir;
      });
    }
    return result;
  }, [customers, search, selectedStatuses, sortColumn, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleCreate(customer: Customer) {
    setCustomers((prev) => [customer, ...prev]);
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
              placeholder="Search customers…"
              className="pl-9"
            />
          </div>
          <CustomerFilters selectedStatuses={selectedStatuses} onToggleStatus={toggleStatus} activeCount={selectedStatuses.size} />
        </div>
        <NewCustomerModal onCreate={handleCreate} />
      </div>

      {selectedStatuses.size > 0 ? (
        <div className="flex flex-wrap items-center gap-2">
          {Array.from(selectedStatuses).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => toggleStatus(status)}
              className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label={`Remove filter: ${status}`}
            >
              <Badge variant="neutral" className="cursor-pointer capitalize hover:bg-border">
                {status} ×
              </Badge>
            </button>
          ))}
          <button
            type="button"
            onClick={() => setSelectedStatuses(new Set())}
            className="text-[13px] font-medium text-text-muted hover:text-text-primary"
          >
            Clear all
          </button>
        </div>
      ) : null}

      <div className="hidden md:block">
        <CustomersTable customers={pageItems} sortColumn={sortColumn} sortDirection={sortDirection} onSort={handleSort} />
      </div>
      <div className="md:hidden">
        <CustomersMobileList customers={pageItems} />
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
