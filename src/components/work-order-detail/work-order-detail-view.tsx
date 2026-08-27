"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { WoDetailHeader } from "@/components/work-order-detail/wo-detail-header";
import { WoOverviewTab } from "@/components/work-order-detail/wo-overview-tab";
import { WoLaborPartsTab } from "@/components/work-order-detail/wo-labor-parts-tab";
import { WoNotesAttachmentsTab } from "@/components/work-order-detail/wo-notes-attachments-tab";
import { WoTimelineTab } from "@/components/work-order-detail/wo-timeline-tab";
import { WoRightRail } from "@/components/work-order-detail/wo-right-rail";
import { AssignTechnicianDrawer } from "@/components/work-order-detail/assign-technician-drawer";
import { toast } from "@/lib/toast-bus";
import { STATUS_META } from "@/lib/work-order-status";
import type { WorkOrderDetail, LaborLine, PartLine, NoteEntry, AttachmentEntry } from "@/lib/dummy-data/work-order-detail";
import type { WorkOrder } from "@/lib/dummy-data/work-orders";
import type { WorkOrderStatus } from "@/lib/types";

export function WorkOrderDetailView({ initial }: { initial: WorkOrderDetail }) {
  const [workOrder, setWorkOrder] = React.useState<WorkOrder>(initial.workOrder);
  const [labor, setLabor] = React.useState<LaborLine[]>(initial.labor);
  const [parts, setParts] = React.useState<PartLine[]>(initial.parts);
  const [notes, setNotes] = React.useState<NoteEntry[]>(initial.notes);
  const [attachments, setAttachments] = React.useState<AttachmentEntry[]>(initial.attachments);
  const [assignOpen, setAssignOpen] = React.useState(false);

  function handleStatusChange(status: WorkOrderStatus) {
    setWorkOrder((prev) => ({ ...prev, status }));
    toast({ variant: "success", title: `Status updated`, description: `${workOrder.id} is now ${STATUS_META[status].label}` });
  }

  function handleAssign(technicianName: string) {
    setWorkOrder((prev) => ({
      ...prev,
      technicianName,
      status: prev.status === "draft" ? "scheduled" : prev.status,
    }));
    setAssignOpen(false);
    toast({ variant: "success", title: "Technician assigned", description: `${technicianName} assigned to ${workOrder.id}` });
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
      <WoDetailHeader workOrder={workOrder} onStatusChange={handleStatusChange} onOpenAssign={() => setAssignOpen(true)} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="labor-parts">Labor &amp; Parts</TabsTrigger>
              <TabsTrigger value="notes">Notes &amp; Attachments</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <WoOverviewTab detail={{ ...initial, workOrder }} />
            </TabsContent>
            <TabsContent value="labor-parts">
              <WoLaborPartsTab
                labor={labor}
                parts={parts}
                onAddLabor={(line) => setLabor((prev) => [...prev, line])}
                onRemoveLabor={(id) => setLabor((prev) => prev.filter((l) => l.id !== id))}
                onAddPart={(line) => setParts((prev) => [...prev, line])}
                onRemovePart={(id) => setParts((prev) => prev.filter((p) => p.id !== id))}
              />
            </TabsContent>
            <TabsContent value="notes">
              <WoNotesAttachmentsTab
                notes={notes}
                attachments={attachments}
                onAddNote={(text) =>
                  setNotes((prev) => [
                    ...prev,
                    { id: `note-${Date.now()}`, authorName: "Priya Patel (Admin)", timestamp: "Just now", text },
                  ])
                }
                onAddAttachment={() => {
                  setAttachments((prev) => [
                    ...prev,
                    { id: `att-${Date.now()}`, label: `Photo ${prev.length + 1}`, uploadedBy: "Priya Patel (Admin)", timestamp: "Just now" },
                  ]);
                  toast({ variant: "info", title: "Photo added", description: "Real upload wires up once the backend exists (Phase 6)." });
                }}
              />
            </TabsContent>
            <TabsContent value="timeline">
              <WoTimelineTab timeline={initial.timeline} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="xl:col-span-1">
          <WoRightRail
            workOrder={workOrder}
            customer={initial.customer}
            createdDate={initial.createdDate}
            source={initial.source}
            onOpenAssign={() => setAssignOpen(true)}
          />
        </div>
      </div>

      <AssignTechnicianDrawer
        open={assignOpen}
        onOpenChange={setAssignOpen}
        currentTechnicianName={workOrder.technicianName}
        onAssign={handleAssign}
      />
    </div>
  );
}
