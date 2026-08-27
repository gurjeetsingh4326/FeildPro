"use client";

import * as React from "react";
import { DndContext, DragOverlay, type DragEndEvent, type DragStartEvent } from "@dnd-kit/core";
import { Search, LayoutGrid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsPillList, TabsPillTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WorkOrderFilters } from "@/components/work-orders/work-order-filters";
import { NewWorkOrderModal } from "@/components/work-orders/new-work-order-modal";
import { WorkOrdersTable, type SortColumn } from "@/components/work-orders/work-orders-table";
import { WorkOrdersMobileList } from "@/components/work-orders/work-orders-mobile-list";
import { KanbanBoard } from "@/components/work-orders/kanban-board";
import { KanbanCardContent } from "@/components/work-orders/kanban-card";
import { STATUS_META } from "@/lib/work-order-status";
import { toast } from "@/lib/toast-bus";
import { WORK_ORDERS, type WorkOrder } from "@/lib/dummy-data/work-orders";
import type { WorkOrderPriority, WorkOrderStatus } from "@/lib/types";
import type { SortDirection } from "@/components/ui/table";

const PAGE_SIZE = 10;

export function WorkOrdersView() {
  const [workOrders, setWorkOrders] = React.useState<WorkOrder[]>(WORK_ORDERS);
  const [view, setView] = React.useState<"table" | "kanban">("table");
  const [search, setSearch] = React.useState("");
  const [selectedStatuses, setSelectedStatuses] = React.useState<Set<WorkOrderStatus>>(new Set());
  const [selectedPriorities, setSelectedPriorities] = React.useState<Set<WorkOrderPriority>>(new Set());
  const [sortColumn, setSortColumn] = React.useState<SortColumn>(null);
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(null);
  const [page, setPage] = React.useState(1);
  const [activeId, setActiveId] = React.useState<string | null>(null);

  const nextIdRef = React.useRef(336);

  const toggleStatus = (status: WorkOrderStatus) => {
    setPage(1);
    setSelectedStatuses((prev) => {
      const next = new Set(prev);
      if (next.has(status)) next.delete(status);
      else next.add(status);
      return next;
    });
  };

  const togglePriority = (priority: WorkOrderPriority) => {
    setPage(1);
    setSelectedPriorities((prev) => {
      const next = new Set(prev);
      if (next.has(priority)) next.delete(priority);
      else next.add(priority);
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
    let result = workOrders.filter((wo) => {
      const matchesSearch =
        !q ||
        wo.customerName.toLowerCase().includes(q) ||
        wo.id.toLowerCase().includes(q) ||
        wo.service.toLowerCase().includes(q);
      const matchesStatus = selectedStatuses.size === 0 || selectedStatuses.has(wo.status);
      const matchesPriority = selectedPriorities.size === 0 || selectedPriorities.has(wo.priority);
      return matchesSearch && matchesStatus && matchesPriority;
    });

    if (sortColumn) {
      result = [...result].sort((a, b) => {
        const dir = sortDirection === "desc" ? -1 : 1;
        if (sortColumn === "total") return (a.total - b.total) * dir;
        return a.scheduledDate.localeCompare(b.scheduledDate) * dir;
      });
    }
    return result;
  }, [workOrders, search, selectedStatuses, selectedPriorities, sortColumn, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const activeFilterChips = [
    ...Array.from(selectedStatuses).map((s) => ({ kind: "status" as const, value: s, label: STATUS_META[s].label })),
    ...Array.from(selectedPriorities).map((p) => ({ kind: "priority" as const, value: p, label: p })),
  ];

  function handleCreate(wo: WorkOrder) {
    setWorkOrders((prev) => [wo, ...prev]);
    nextIdRef.current += 1;
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;
    const data = over.data.current as { status: WorkOrderStatus } | undefined;
    if (!data) return;
    const wo = workOrders.find((w) => w.id === active.id);
    if (!wo || wo.status === data.status) return;
    setWorkOrders((prev) => prev.map((w) => (w.id === active.id ? { ...w, status: data.status } : w)));
    toast({
      variant: "success",
      title: "Status updated",
      description: `${wo.id} moved to ${STATUS_META[data.status].label}`,
    });
  }

  const activeWorkOrder = activeId ? workOrders.find((w) => w.id === activeId) ?? null : null;

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragCancel={() => setActiveId(null)}>
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
                placeholder="Search work orders…"
                className="pl-9"
              />
            </div>
            <WorkOrderFilters
              selectedStatuses={selectedStatuses}
              onToggleStatus={toggleStatus}
              selectedPriorities={selectedPriorities}
              onTogglePriority={togglePriority}
              activeCount={selectedStatuses.size + selectedPriorities.size}
            />
            <Tabs value={view} onValueChange={(v) => setView(v as "table" | "kanban")}>
              <TabsPillList>
                <TabsPillTrigger value="table" className="gap-1.5">
                  <List className="size-3.5" /> Table
                </TabsPillTrigger>
                <TabsPillTrigger value="kanban" className="gap-1.5">
                  <LayoutGrid className="size-3.5" /> Board
                </TabsPillTrigger>
              </TabsPillList>
            </Tabs>
          </div>
          <NewWorkOrderModal onCreate={handleCreate} nextId={`WO-2024-00${nextIdRef.current}`} />
        </div>

        {activeFilterChips.length > 0 ? (
          <div className="flex flex-wrap items-center gap-2">
            {activeFilterChips.map((chip) => (
              <button
                key={`${chip.kind}-${chip.value}`}
                type="button"
                onClick={() =>
                  chip.kind === "status" ? toggleStatus(chip.value as WorkOrderStatus) : togglePriority(chip.value as WorkOrderPriority)
                }
                className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label={`Remove filter: ${chip.label}`}
              >
                <Badge variant="neutral" className="cursor-pointer capitalize hover:bg-border">
                  {chip.label} ×
                </Badge>
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setSelectedStatuses(new Set());
                setSelectedPriorities(new Set());
              }}
              className="text-[13px] font-medium text-text-muted hover:text-text-primary"
            >
              Clear all
            </button>
          </div>
        ) : null}

        {view === "table" ? (
          <>
            {/* Below md: stacked cards instead of a cramped/scrolling 8-column
                table (docs/RESPONSIVE_DESIGN.md). Safe to CSS-toggle here — unlike
                the Schedule page's droppables, neither of these registers into a
                global keyed system, so a display:none duplicate can't corrupt
                anything (see src/hooks/use-breakpoint.ts for why that distinction
                matters). */}
            <div className="hidden md:block">
              <WorkOrdersTable
                workOrders={pageItems}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSort={handleSort}
              />
            </div>
            <div className="md:hidden">
              <WorkOrdersMobileList workOrders={pageItems} />
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
          </>
        ) : (
          <KanbanBoard workOrders={filtered} />
        )}
      </div>

      <DragOverlay dropAnimation={{ duration: 150, easing: "ease-out" }}>
        {activeWorkOrder ? (
          <div className="w-72 cursor-grabbing">
            <KanbanCardContent wo={activeWorkOrder} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
