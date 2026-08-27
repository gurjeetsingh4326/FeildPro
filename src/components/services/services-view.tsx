"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ServiceFilters } from "@/components/services/service-filters";
import { ServiceFormModal } from "@/components/services/service-form-modal";
import { ServicesTable, type SortColumn } from "@/components/services/services-table";
import { ServicesMobileList } from "@/components/services/services-mobile-list";
import { SERVICES, type Service, type ServiceCategory, type ServiceStatus } from "@/lib/dummy-data/services";
import type { SortDirection } from "@/components/ui/table";

const PAGE_SIZE = 10;

export function ServicesView() {
  const [services, setServices] = React.useState<Service[]>(SERVICES);
  const [search, setSearch] = React.useState("");
  const [selectedCategories, setSelectedCategories] = React.useState<Set<ServiceCategory>>(new Set());
  const [selectedStatuses, setSelectedStatuses] = React.useState<Set<ServiceStatus>>(new Set());
  const [sortColumn, setSortColumn] = React.useState<SortColumn>(null);
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(null);
  const [page, setPage] = React.useState(1);
  const [editingService, setEditingService] = React.useState<Service | null>(null);

  const toggleCategory = (category: ServiceCategory) => {
    setPage(1);
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  };

  const toggleStatus = (status: ServiceStatus) => {
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
    let result = services.filter((s) => {
      const matchesSearch = !q || s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q);
      const matchesCategory = selectedCategories.size === 0 || selectedCategories.has(s.category);
      const matchesStatus = selectedStatuses.size === 0 || selectedStatuses.has(s.status);
      return matchesSearch && matchesCategory && matchesStatus;
    });

    if (sortColumn) {
      result = [...result].sort((a, b) => {
        const dir = sortDirection === "desc" ? -1 : 1;
        return (a[sortColumn] - b[sortColumn]) * dir;
      });
    }
    return result;
  }, [services, search, selectedCategories, selectedStatuses, sortColumn, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const activeCount = selectedCategories.size + selectedStatuses.size;

  function handleSave(service: Service) {
    setServices((prev) => {
      const exists = prev.some((s) => s.id === service.id);
      return exists ? prev.map((s) => (s.id === service.id ? service : s)) : [service, ...prev];
    });
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
              placeholder="Search services…"
              className="pl-9"
            />
          </div>
          <ServiceFilters
            selectedCategories={selectedCategories}
            onToggleCategory={toggleCategory}
            selectedStatuses={selectedStatuses}
            onToggleStatus={toggleStatus}
            activeCount={activeCount}
          />
        </div>
        <ServiceFormModal trigger onSave={handleSave} />
      </div>

      {activeCount > 0 ? (
        <div className="flex flex-wrap items-center gap-2">
          {Array.from(selectedCategories).map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => toggleCategory(category)}
              className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label={`Remove filter: ${category}`}
            >
              <Badge variant="neutral" className="cursor-pointer hover:bg-border">
                {category} ×
              </Badge>
            </button>
          ))}
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
            onClick={() => {
              setSelectedCategories(new Set());
              setSelectedStatuses(new Set());
            }}
            className="text-[13px] font-medium text-text-muted hover:text-text-primary"
          >
            Clear all
          </button>
        </div>
      ) : null}

      <div className="hidden md:block">
        <ServicesTable
          services={pageItems}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSort={handleSort}
          onEdit={setEditingService}
        />
      </div>
      <div className="md:hidden">
        <ServicesMobileList services={pageItems} onEdit={setEditingService} />
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

      <ServiceFormModal
        service={editingService ?? undefined}
        open={editingService !== null}
        onOpenChange={(open) => {
          if (!open) setEditingService(null);
        }}
        onSave={handleSave}
      />
    </div>
  );
}
