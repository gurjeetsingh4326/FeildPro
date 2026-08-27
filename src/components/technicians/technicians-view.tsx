"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TechnicianFilters } from "@/components/technicians/technician-filters";
import { NewTechnicianModal } from "@/components/technicians/new-technician-modal";
import { TechniciansTable, type SortColumn } from "@/components/technicians/technicians-table";
import { TechniciansMobileList } from "@/components/technicians/technicians-mobile-list";
import {
  TECHNICIANS,
  TECHNICIAN_STATUS_META,
  getTechnicianStats,
  type TechnicianProfile,
  type TechnicianStatus,
} from "@/lib/dummy-data/technicians";
import type { SortDirection } from "@/components/ui/table";

const PAGE_SIZE = 10;

export function TechniciansView() {
  const [technicians, setTechnicians] = React.useState<TechnicianProfile[]>(TECHNICIANS);
  const [search, setSearch] = React.useState("");
  const [selectedStatuses, setSelectedStatuses] = React.useState<Set<TechnicianStatus>>(new Set());
  const [sortColumn, setSortColumn] = React.useState<SortColumn>(null);
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(null);
  const [page, setPage] = React.useState(1);

  const toggleStatus = (status: TechnicianStatus) => {
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
    let result = technicians.filter((t) => {
      const matchesSearch =
        !q || t.name.toLowerCase().includes(q) || t.role.toLowerCase().includes(q) || t.skills.some((s) => s.toLowerCase().includes(q));
      const matchesStatus = selectedStatuses.size === 0 || selectedStatuses.has(t.status);
      return matchesSearch && matchesStatus;
    });

    if (sortColumn) {
      result = [...result].sort((a, b) => {
        const dir = sortDirection === "desc" ? -1 : 1;
        const statsA = getTechnicianStats(a.id, a.name);
        const statsB = getTechnicianStats(b.id, b.name);
        if (sortColumn === "utilization") return (statsA.utilizationPct - statsB.utilizationPct) * dir;
        return (statsA.rating - statsB.rating) * dir;
      });
    }
    return result;
  }, [technicians, search, selectedStatuses, sortColumn, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleCreate(technician: TechnicianProfile) {
    setTechnicians((prev) => [technician, ...prev]);
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
              placeholder="Search technicians…"
              className="pl-9"
            />
          </div>
          <TechnicianFilters selectedStatuses={selectedStatuses} onToggleStatus={toggleStatus} activeCount={selectedStatuses.size} />
        </div>
        <NewTechnicianModal onCreate={handleCreate} />
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
              <Badge variant="neutral" className="cursor-pointer hover:bg-border">
                {TECHNICIAN_STATUS_META[status].label} ×
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
        <TechniciansTable technicians={pageItems} sortColumn={sortColumn} sortDirection={sortDirection} onSort={handleSort} />
      </div>
      <div className="md:hidden">
        <TechniciansMobileList technicians={pageItems} />
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
