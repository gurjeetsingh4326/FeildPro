"use client";

import { WorkOrderDetailView } from "@/components/work-order-detail/work-order-detail-view";
import { JobExecutionView } from "@/components/technician-mobile/job-execution-view";
import { useRole } from "@/lib/role-context";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import type { WorkOrderDetail } from "@/lib/dummy-data/work-order-detail";

/** Same URL, two experiences: below `md` a Technician gets the mobile job-
    execution view (docs/DASHBOARD_DESIGN.md §5); everyone else — and the
    Technician role at `md`+ — gets the desktop tabbed detail view. */
export function WorkOrderDetailRouter({ initial }: { initial: WorkOrderDetail }) {
  const { role } = useRole();
  const breakpoint = useBreakpoint();

  if (role === "technician" && breakpoint === "mobile") {
    return <JobExecutionView initial={initial} />;
  }
  return <WorkOrderDetailView initial={initial} />;
}
