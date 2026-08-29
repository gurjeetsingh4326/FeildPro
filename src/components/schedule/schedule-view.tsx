"use client";

import * as React from "react";
import { DndContext, DragOverlay, type DragEndEvent, type DragStartEvent } from "@dnd-kit/core";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsPillList, TabsPillTrigger } from "@/components/ui/tabs";
import { TechnicianFilter } from "@/components/schedule/technician-filter";
import { DayBoard } from "@/components/schedule/day-board";
import { WeekGrid, techColor } from "@/components/schedule/week-grid";
import { MonthGrid } from "@/components/schedule/month-grid";
import { MobileDayAgenda } from "@/components/schedule/mobile-day-agenda";
import { UnassignedTray, UNASSIGNED_TRAY_ID } from "@/components/schedule/unassigned-tray";
import { AppointmentChip } from "@/components/schedule/appointment-chip";
import { toast } from "@/lib/toast-bus";
import { cn } from "@/lib/utils";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import {
  TECHNICIANS,
  APPOINTMENTS,
  DAY_LABELS,
  TODAY_DAY_OFFSET,
  WEEK_START_LABEL,
  type ScheduleAppointment,
} from "@/lib/dummy-data/schedule";

type ViewMode = "day" | "week" | "month";

export function ScheduleView() {
  const [view, setView] = React.useState<ViewMode>("day");
  const [dayOffset, setDayOffset] = React.useState(TODAY_DAY_OFFSET);
  const [appointments, setAppointments] = React.useState<ScheduleAppointment[]>(APPOINTMENTS);
  const [selectedTechIds, setSelectedTechIds] = React.useState<Set<string>>(
    () => new Set(TECHNICIANS.map((t) => t.id))
  );
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const activeAppointment = activeId ? appointments.find((a) => a.id === activeId) ?? null : null;
  const breakpoint = useBreakpoint();

  const toggleTechnician = (id: string) => {
    setSelectedTechIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const dayAppointments = React.useMemo(
    () => appointments.filter((a) => a.dayOffset === dayOffset),
    [appointments, dayOffset]
  );
  const unassignedForDay = React.useMemo(
    () => dayAppointments.filter((a) => a.technicianId === null),
    [dayAppointments]
  );
  const unassignedForWeek = React.useMemo(
    () => appointments.filter((a) => a.technicianId === null),
    [appointments]
  );

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;
    const aptId = active.id as string;
    const overData = over.data.current as
      | { techId: string; hour: number }
      | { dayOffset: number }
      | undefined;

    if (over.id === UNASSIGNED_TRAY_ID) {
      setAppointments((prev) => prev.map((a) => (a.id === aptId ? { ...a, technicianId: null } : a)));
      toast({ variant: "info", title: "Job unassigned" });
      return;
    }

    if (overData && "techId" in overData) {
      const tech = TECHNICIANS.find((t) => t.id === overData.techId);
      setAppointments((prev) =>
        prev.map((a) => (a.id === aptId ? { ...a, technicianId: overData.techId, startHour: overData.hour } : a))
      );
      toast({ variant: "success", title: `Assigned to ${tech?.name ?? "technician"}`, description: `Moved to ${overData.hour}:00` });
      return;
    }

    if (overData && "dayOffset" in overData) {
      setAppointments((prev) =>
        prev.map((a) => (a.id === aptId ? { ...a, dayOffset: overData.dayOffset } : a))
      );
      toast({ variant: "success", title: "Rescheduled", description: `Moved to ${DAY_LABELS[overData.dayOffset].label}` });
      return;
    }
  }

  const canGoPrevDay = dayOffset > 0;
  const canGoNextDay = dayOffset < DAY_LABELS.length - 1;

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragCancel={() => setActiveId(null)}>
      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
        {/* Toolbar */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2">
            {/* Below md: MobileDayAgenda always shows a single day, so day nav is
                always relevant there regardless of `view`. At xl+ it's only
                relevant when Day view is active — Week/Month don't use dayOffset.
                Nothing renders at md–lg, where the week grid is forced and day
                nav wouldn't visibly do anything (docs/RESPONSIVE_DESIGN.md). */}
            <div className="flex items-center gap-1 md:hidden">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Previous day"
                disabled={!canGoPrevDay}
                onClick={() => setDayOffset((d) => Math.max(0, d - 1))}
              >
                <ChevronLeft className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Next day"
                disabled={!canGoNextDay}
                onClick={() => setDayOffset((d) => Math.min(DAY_LABELS.length - 1, d + 1))}
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
            {view === "day" ? (
              <div className="hidden items-center gap-1 xl:flex">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Previous day"
                  disabled={!canGoPrevDay}
                  onClick={() => setDayOffset((d) => Math.max(0, d - 1))}
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Next day"
                  disabled={!canGoNextDay}
                  onClick={() => setDayOffset((d) => Math.min(DAY_LABELS.length - 1, d + 1))}
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            ) : null}
            {/* Label mirrors whichever view is actually rendered at the current
                breakpoint — below md that's always the day agenda, at md–lg
                it's always the forced week grid, matching the nav buttons above. */}
            <div className="flex items-center gap-1.5 text-sm font-medium text-text-primary md:hidden">
              <CalendarDays className="size-4 text-text-muted" />
              {DAY_LABELS[dayOffset].label}, {DAY_LABELS[dayOffset].date}
            </div>
            <div className="hidden items-center gap-1.5 text-sm font-medium text-text-primary md:flex xl:hidden">
              <CalendarDays className="size-4 text-text-muted" />
              Week of {WEEK_START_LABEL}
            </div>
            <div className="hidden items-center gap-1.5 text-sm font-medium text-text-primary xl:flex">
              <CalendarDays className="size-4 text-text-muted" />
              {view === "day"
                ? `${DAY_LABELS[dayOffset].label}, ${DAY_LABELS[dayOffset].date}`
                : view === "week"
                  ? `Week of ${WEEK_START_LABEL}`
                  : "August 2026"}
            </div>
            {dayOffset !== TODAY_DAY_OFFSET ? (
              <Button
                variant="secondary"
                size="sm"
                className={cn("md:hidden", view === "day" && "xl:inline-flex")}
                onClick={() => setDayOffset(TODAY_DAY_OFFSET)}
              >
                Today
              </Button>
            ) : null}
          </div>

          {/* Day/Week/Month toggle — only Week is meaningful at md–lg; below md the
              agenda list replaces the grid entirely (docs/RESPONSIVE_DESIGN.md). */}
          <Tabs value={view} onValueChange={(v) => setView(v as ViewMode)} className="hidden md:block">
            <TabsPillList className="hidden xl:inline-flex">
              <TabsPillTrigger value="day">Day</TabsPillTrigger>
              <TabsPillTrigger value="week">Week</TabsPillTrigger>
              <TabsPillTrigger value="month">Month</TabsPillTrigger>
            </TabsPillList>
          </Tabs>
        </div>

        {/* Technician filter — inline row on mobile/tablet, would be a left rail
            at xl+ but stays here to keep the toolbar simple at this phase. */}
        <div className="scrollbar-thin -mx-1 flex gap-1 overflow-x-auto px-1 xl:hidden">
          {TECHNICIANS.map((tech) => {
            const checked = selectedTechIds.has(tech.id);
            return (
              <button
                key={tech.id}
                type="button"
                onClick={() => toggleTechnician(tech.id)}
                className="flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                style={{
                  borderColor: checked ? tech.color : "var(--border)",
                  color: checked ? "var(--text-primary)" : "var(--text-muted)",
                  backgroundColor: checked ? "var(--surface)" : "transparent",
                }}
              >
                <span className="size-2 rounded-full" style={{ backgroundColor: tech.color }} />
                {tech.name}
              </button>
            );
          })}
        </div>

        <div className="flex flex-1 flex-col gap-4 xl:flex-row">
          {/* Left rail — xl+ only */}
          <aside className="hidden w-56 shrink-0 xl:block">
            <TechnicianFilter selected={selectedTechIds} onToggle={toggleTechnician} />
          </aside>

          <div className="flex min-w-0 flex-1 flex-col gap-4">
            {/* Exactly one variant mounts at a time — see src/hooks/use-breakpoint.ts
                for why this can't be three parallel `hidden md:block`-style CSS
                blocks: dnd-kit's droppables register into a global id-keyed
                registry, and `display:none` doesn't unmount a component, so a
                CSS-hidden duplicate would still register under the same id and
                corrupt collision detection for the visible one. */}
            {breakpoint === "mobile" ? (
              <MobileDayAgenda appointments={dayAppointments} visibleTechnicianIds={selectedTechIds} />
            ) : breakpoint === "tablet" ? (
              <>
                <WeekGrid appointments={appointments} visibleTechnicianIds={selectedTechIds} />
                <UnassignedTray appointments={unassignedForWeek} />
              </>
            ) : view === "day" ? (
              <>
                <div className="rounded-lg border border-border bg-surface">
                  <DayBoard appointments={dayAppointments} visibleTechnicianIds={selectedTechIds} />
                </div>
                <UnassignedTray appointments={unassignedForDay} />
              </>
            ) : view === "week" ? (
              <>
                <WeekGrid appointments={appointments} visibleTechnicianIds={selectedTechIds} />
                <UnassignedTray appointments={unassignedForWeek} />
              </>
            ) : (
              <MonthGrid
                onSelectDay={() => {
                  setView("day");
                  toast({ variant: "info", title: "Showing this week's data", description: "Demo data covers one week of detail." });
                }}
              />
            )}
          </div>
        </div>
      </div>

      <DragOverlay dropAnimation={{ duration: 150, easing: "ease-out" }}>
        {activeAppointment ? (
          <div className="w-56 cursor-grabbing">
            <AppointmentChip
              appointment={activeAppointment}
              color={techColor(activeAppointment.technicianId)}
              className="border-primary shadow-lg"
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
