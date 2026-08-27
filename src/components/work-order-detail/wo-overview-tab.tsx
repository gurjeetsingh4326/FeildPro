import { Calendar, ClipboardList, PhoneCall } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { WorkOrderDetail } from "@/lib/dummy-data/work-order-detail";

function InfoRow({ icon: Icon, label, value }: { icon: typeof Calendar; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-chip-bg text-chip-text">
        <Icon className="size-4" />
      </span>
      <div>
        <p className="text-[13px] text-text-muted">{label}</p>
        <p className="text-sm font-medium text-text-primary">{value}</p>
      </div>
    </div>
  );
}

export function WoOverviewTab({ detail }: { detail: WorkOrderDetail }) {
  return (
    <div className="space-y-4">
      <Card>
        <h3 className="mb-2 text-sm font-semibold text-text-primary">Description</h3>
        <p className="text-sm leading-relaxed text-text-secondary">{detail.description}</p>
      </Card>
      <Card className="grid gap-4 sm:grid-cols-2">
        <InfoRow icon={Calendar} label="Appointment" value={detail.appointmentWindow} />
        <InfoRow icon={ClipboardList} label="Created" value={detail.createdDate} />
        <InfoRow icon={PhoneCall} label="Source" value={detail.source} />
      </Card>
    </div>
  );
}
