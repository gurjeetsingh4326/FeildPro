"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

/* Same reasoning as src/components/schedule/schedule-loader.tsx: this view
   uses dnd-kit for the Kanban board, whose internal ids are assigned via a
   module-level counter rather than React's SSR-safe useId(), causing a
   hydration-mismatch warning on every load. Opted out of SSR entirely since
   it's an inherently client-only interaction. */
const WorkOrdersView = dynamic(
  () => import("@/components/work-orders/work-orders-view").then((m) => m.WorkOrdersView),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-9 w-72" />
          <Skeleton className="h-9 w-40" />
        </div>
        <Skeleton className="h-[520px] w-full" />
      </div>
    ),
  }
);

export function WorkOrdersLoader() {
  return <WorkOrdersView />;
}
