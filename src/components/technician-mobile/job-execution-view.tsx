"use client";

import * as React from "react";
import { Phone, Navigation, Plus, Trash2, Camera, Send, Play, CheckCircle2, PauseCircle, Loader2, CloudOff } from "lucide-react";
import { Badge, PriorityBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import {
  AddLaborModal,
  AddPartModal,
  formatMoney,
} from "@/components/work-order-detail/wo-labor-parts-tab";
import { JobLocationMapLoader } from "@/components/maps/job-location-map-loader";
import { toast } from "@/lib/toast-bus";
import { STATUS_META } from "@/lib/work-order-status";
import { getTechnicianByName } from "@/lib/dummy-data/technicians";
import { getTechnicianLocation, getCustomerLocation } from "@/lib/dummy-data/locations";
import type { WorkOrderDetail, LaborLine, PartLine, NoteEntry, AttachmentEntry } from "@/lib/dummy-data/work-order-detail";
import type { WorkOrder } from "@/lib/dummy-data/work-orders";
import type { WorkOrderStatus } from "@/lib/types";

type SyncStatus = "idle" | "saving" | "saved" | "offline";

function SyncIndicator({ status }: { status: SyncStatus }) {
  if (status === "idle") return null;
  const config = {
    saving: { icon: Loader2, label: "Saving…", className: "text-text-muted [&_svg]:animate-spin" },
    saved: { icon: CheckCircle2, label: "Saved", className: "text-success" },
    offline: { icon: CloudOff, label: "Offline — will sync", className: "text-warning" },
  }[status];
  const Icon = config.icon;
  return (
    <p className={`flex items-center gap-1.5 text-[12px] font-medium ${config.className}`}>
      <Icon className="size-3.5" />
      {config.label}
    </p>
  );
}

function useAutosave() {
  const [status, setStatus] = React.useState<SyncStatus>("idle");
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const trigger = React.useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setStatus("saving");
    timeoutRef.current = setTimeout(() => setStatus("saved"), 600);
  }, []);

  return [status, trigger] as const;
}

function Section({
  title,
  count,
  defaultOpen = false,
  children,
}: {
  title: string;
  count?: number;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Collapsible defaultOpen={defaultOpen}>
      <Card className="p-4">
        <CollapsibleTrigger>
          <span className="flex items-center gap-2 text-sm font-semibold text-text-primary">
            {title}
            {count ? <Badge variant="neutral">{count}</Badge> : null}
          </span>
        </CollapsibleTrigger>
        <CollapsibleContent>{children}</CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

export function JobExecutionView({ initial }: { initial: WorkOrderDetail }) {
  const [workOrder, setWorkOrder] = React.useState<WorkOrder>(initial.workOrder);
  const [labor, setLabor] = React.useState<LaborLine[]>(initial.labor);
  const [parts, setParts] = React.useState<PartLine[]>(initial.parts);
  const [notes, setNotes] = React.useState<NoteEntry[]>(initial.notes);
  const [attachments, setAttachments] = React.useState<AttachmentEntry[]>(initial.attachments);
  const [noteDraft, setNoteDraft] = React.useState("");
  const [laborModalOpen, setLaborModalOpen] = React.useState(false);
  const [partModalOpen, setPartModalOpen] = React.useState(false);
  const [syncStatus, triggerAutosave] = useAutosave();

  const meta = STATUS_META[workOrder.status];
  const laborTotal = labor.reduce((sum, l) => sum + l.hours * l.rate, 0);
  const partsTotal = parts.reduce((sum, p) => sum + p.quantity * p.unitPrice, 0);

  function handleStatusChange(status: WorkOrderStatus) {
    setWorkOrder((prev) => ({ ...prev, status }));
    toast({ variant: "success", title: "Status updated", description: STATUS_META[status].label });
  }

  const phoneHref = `tel:${initial.customer.phone.replace(/[^\d+]/g, "")}`;
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(initial.customer.address)}`;

  const technicianProfile = workOrder.technicianName ? getTechnicianByName(workOrder.technicianName) : null;
  const technicianLocation = getTechnicianLocation(technicianProfile?.id ?? "");
  const customerLocation = getCustomerLocation(initial.customer.name);

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-3 p-4 pb-2">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={meta.badge} dot>
              {meta.label}
            </Badge>
            <PriorityBadge priority={workOrder.priority}>{workOrder.priority}</PriorityBadge>
          </div>
          <h2 className="mt-1.5 text-xl font-bold tracking-tight text-text-primary">{workOrder.customerName}</h2>
          <p className="text-sm text-text-secondary">{workOrder.service}</p>
          <p className="mt-1 text-[13px] text-text-muted">{initial.customer.address}</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button asChild variant="secondary" className="gap-1.5">
            <a href={phoneHref}>
              <Phone className="size-4" />
              Call
            </a>
          </Button>
          <Button asChild variant="secondary" className="gap-1.5">
            <a href={mapsHref} target="_blank" rel="noopener noreferrer">
              <Navigation className="size-4" />
              Navigate
            </a>
          </Button>
        </div>

        <JobLocationMapLoader
          technicianLocation={technicianLocation}
          customerLocation={customerLocation}
          technicianName={workOrder.technicianName ?? "You"}
          customerName={initial.customer.name}
          technicianColor={technicianProfile?.color ?? "var(--primary)"}
        />

        <SyncIndicator status={syncStatus} />

        <Card className="flex items-center gap-3">
          <Avatar name={initial.customer.name} size="sm" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-medium text-text-primary">{initial.customer.name}</p>
            <p className="text-[12px] text-text-muted">{workOrder.scheduledDate}, {workOrder.scheduledTime}</p>
          </div>
        </Card>

        <Section title="Labor" count={labor.length} defaultOpen>
          <div className="space-y-2">
            {labor.length === 0 ? (
              <p className="py-1 text-[13px] text-text-muted">No labor logged yet.</p>
            ) : (
              labor.map((line) => (
                <div key={line.id} className="flex items-center justify-between gap-2 border-b border-border pb-2 last:border-0 last:pb-0">
                  <div className="min-w-0">
                    <p className="truncate text-[13px] text-text-primary">{line.description}</p>
                    <p className="text-[12px] text-text-muted">{line.hours}h · ${line.rate}/hr</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[13px] font-medium tabular-nums text-text-primary">${formatMoney(line.hours * line.rate)}</span>
                    <button
                      type="button"
                      aria-label="Remove labor line"
                      onClick={() => {
                        setLabor((prev) => prev.filter((l) => l.id !== line.id));
                        triggerAutosave();
                      }}
                      className="rounded-sm text-text-muted hover:text-error focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
            {labor.length > 0 ? (
              <div className="flex justify-end text-[13px]">
                <span className="text-text-secondary">Subtotal:&nbsp;</span>
                <span className="font-semibold tabular-nums text-text-primary">${formatMoney(laborTotal)}</span>
              </div>
            ) : null}
            <Button variant="secondary" size="sm" className="w-full gap-1.5" onClick={() => setLaborModalOpen(true)}>
              <Plus className="size-3.5" /> Add Labor
            </Button>
          </div>
        </Section>

        <Section title="Parts" count={parts.length}>
          <div className="space-y-2">
            {parts.length === 0 ? (
              <p className="py-1 text-[13px] text-text-muted">No parts used yet.</p>
            ) : (
              parts.map((line) => (
                <div key={line.id} className="flex items-center justify-between gap-2 border-b border-border pb-2 last:border-0 last:pb-0">
                  <div className="min-w-0">
                    <p className="truncate text-[13px] text-text-primary">{line.partName}</p>
                    <p className="text-[12px] text-text-muted">{line.quantity} × ${line.unitPrice}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[13px] font-medium tabular-nums text-text-primary">${formatMoney(line.quantity * line.unitPrice)}</span>
                    <button
                      type="button"
                      aria-label="Remove part line"
                      onClick={() => {
                        setParts((prev) => prev.filter((p) => p.id !== line.id));
                        triggerAutosave();
                      }}
                      className="rounded-sm text-text-muted hover:text-error focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
            {parts.length > 0 ? (
              <div className="flex justify-end text-[13px]">
                <span className="text-text-secondary">Subtotal:&nbsp;</span>
                <span className="font-semibold tabular-nums text-text-primary">${formatMoney(partsTotal)}</span>
              </div>
            ) : null}
            <Button variant="secondary" size="sm" className="w-full gap-1.5" onClick={() => setPartModalOpen(true)}>
              <Plus className="size-3.5" /> Add Part
            </Button>
          </div>
        </Section>

        <Section title="Notes" count={notes.length}>
          <div className="space-y-3">
            {notes.map((note) => (
              <div key={note.id} className="rounded-md bg-surface-sunken p-2.5">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-[12px] font-medium text-text-primary">{note.authorName}</p>
                  <p className="text-[11px] text-text-muted">{note.timestamp}</p>
                </div>
                <p className="mt-0.5 text-[13px] text-text-secondary">{note.text}</p>
              </div>
            ))}
            <form
              className="flex items-start gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (!noteDraft.trim()) return;
                setNotes((prev) => [
                  ...prev,
                  { id: `note-${Date.now()}`, authorName: initial.workOrder.technicianName ?? "You", timestamp: "Just now", text: noteDraft.trim() },
                ]);
                setNoteDraft("");
                triggerAutosave();
              }}
            >
              <textarea
                value={noteDraft}
                onChange={(e) => setNoteDraft(e.target.value)}
                placeholder="Add a note…"
                rows={2}
                className="flex-1 rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <Button type="submit" size="icon" aria-label="Post note" disabled={!noteDraft.trim()}>
                <Send className="size-4" />
              </Button>
            </form>
          </div>
        </Section>

        <Section title="Photos" count={attachments.length}>
          <div className="grid grid-cols-3 gap-2">
            {attachments.map((att) => (
              <div key={att.id} className="flex aspect-square items-center justify-center rounded-md border border-border bg-surface-sunken">
                <Camera className="size-5 text-text-muted" />
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                setAttachments((prev) => [
                  ...prev,
                  { id: `att-${Date.now()}`, label: `Photo ${prev.length + 1}`, uploadedBy: initial.workOrder.technicianName ?? "You", timestamp: "Just now" },
                ]);
                triggerAutosave();
              }}
              className="flex aspect-square flex-col items-center justify-center gap-1 rounded-md border border-dashed border-border-strong text-text-muted transition-colors hover:border-primary hover:text-primary-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <Camera className="size-5" />
              <span className="text-[10px]">Add photo</span>
            </button>
          </div>
        </Section>
      </div>

      <div className="sticky bottom-0 border-t border-border bg-surface p-3">
        {workOrder.status === "scheduled" ? (
          <Button size="lg" className="w-full gap-2 text-base" onClick={() => handleStatusChange("in_progress")}>
            <Play className="size-5" />
            Start Job
          </Button>
        ) : workOrder.status === "in_progress" ? (
          <div className="flex gap-2">
            <Button variant="secondary" size="lg" className="gap-2" onClick={() => handleStatusChange("on_hold")}>
              <PauseCircle className="size-5" />
            </Button>
            <Button size="lg" className="flex-1 gap-2 text-base" onClick={() => handleStatusChange("completed")}>
              <CheckCircle2 className="size-5" />
              Complete Job
            </Button>
          </div>
        ) : workOrder.status === "on_hold" ? (
          <Button size="lg" className="w-full gap-2 text-base" onClick={() => handleStatusChange("in_progress")}>
            <Play className="size-5" />
            Resume Job
          </Button>
        ) : (
          <div className="flex items-center justify-center gap-2 py-2 text-success">
            <CheckCircle2 className="size-5" />
            <span className="text-sm font-semibold">Job complete</span>
          </div>
        )}
      </div>

      <AddLaborModal
        open={laborModalOpen}
        onOpenChange={setLaborModalOpen}
        onAdd={(line) => {
          setLabor((prev) => [...prev, line]);
          triggerAutosave();
        }}
      />
      <AddPartModal
        open={partModalOpen}
        onOpenChange={setPartModalOpen}
        onAdd={(line) => {
          setParts((prev) => [...prev, line]);
          triggerAutosave();
        }}
      />
    </div>
  );
}
