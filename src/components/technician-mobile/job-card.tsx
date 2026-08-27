import Link from "next/link";
import { MapPin } from "lucide-react";
import { Badge, PriorityBadge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { STATUS_META } from "@/lib/work-order-status";
import type { TechnicianJob } from "@/lib/dummy-data/technician";

export function JobCard({ job }: { job: TechnicianJob }) {
  const { workOrder: wo, address, distanceMiles } = job;
  const meta = STATUS_META[wo.status];

  return (
    <Link href={`/work-orders/${wo.id}`} className="block">
      <Card className="flex items-start gap-3 p-4 transition-colors active:bg-background">
        <span className="w-14 shrink-0 pt-0.5 text-sm font-semibold text-text-primary">{wo.scheduledTime}</span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-text-primary">{wo.customerName}</p>
          <p className="truncate text-[13px] text-text-secondary">{wo.service}</p>
          <Badge variant={meta.badge} dot className="mt-1.5">
            {meta.label}
          </Badge>
          <p className="mt-1.5 flex items-center gap-1 text-[12px] text-text-muted">
            <MapPin className="size-3 shrink-0" />
            <span className="truncate">{address}</span>
            <span className="shrink-0">· {distanceMiles} mi</span>
          </p>
        </div>
        <PriorityBadge priority={wo.priority} className="shrink-0">
          {wo.priority}
        </PriorityBadge>
      </Card>
    </Link>
  );
}
