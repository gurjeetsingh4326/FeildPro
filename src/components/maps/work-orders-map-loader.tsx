"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import type { WorkOrdersMapProps } from "@/components/maps/work-orders-map";

const WorkOrdersMap = dynamic(() => import("@/components/maps/work-orders-map").then((m) => m.WorkOrdersMap), {
  ssr: false,
  loading: () => <Skeleton className="h-[480px] w-full rounded-lg" />,
});

export function WorkOrdersMapLoader(props: WorkOrdersMapProps) {
  return <WorkOrdersMap {...props} />;
}
