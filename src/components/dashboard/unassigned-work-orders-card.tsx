import { UserPlus } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { PriorityBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UNASSIGNED_WORK_ORDERS } from "@/lib/dummy-data/dashboard";

export function UnassignedWorkOrdersCard() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex-col items-start gap-0.5">
        <CardTitle>Unassigned Work Orders</CardTitle>
        <span className="text-[13px] text-text-muted">{UNASSIGNED_WORK_ORDERS.length} need a technician</span>
      </CardHeader>
      <ul className="space-y-1">
        {UNASSIGNED_WORK_ORDERS.map((wo) => (
          <li
            key={wo.id}
            className="flex items-center gap-3 rounded-md px-2 py-2 transition-colors hover:bg-background"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-medium text-text-primary">{wo.customerName}</p>
                <PriorityBadge priority={wo.priority}>{wo.priority}</PriorityBadge>
              </div>
              <p className="truncate text-[13px] text-text-muted">
                {wo.service} · {wo.scheduledAt}
              </p>
            </div>
            <Button variant="ghost" size="sm" className="shrink-0 gap-1.5">
              <UserPlus className="size-3.5" />
              <span className="hidden sm:inline">Assign</span>
            </Button>
          </li>
        ))}
      </ul>
    </Card>
  );
}
