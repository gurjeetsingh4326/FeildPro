"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import type { TechnicianMapProps } from "@/components/maps/technician-map";

/* Leaflet reads `window`/`document` at import time, so it must never run
   during SSR — same ssr:false pattern already used for the Schedule and
   Work Orders boards (see work-orders-loader.tsx). */
const TechnicianMap = dynamic(() => import("@/components/maps/technician-map").then((m) => m.TechnicianMap), {
  ssr: false,
  loading: () => <Skeleton className="h-[420px] w-full rounded-lg" />,
});

export function TechnicianMapLoader(props: TechnicianMapProps) {
  return <TechnicianMap {...props} />;
}
