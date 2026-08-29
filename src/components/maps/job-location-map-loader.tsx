"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import type { JobLocationMapProps } from "@/components/maps/job-location-map";

const JobLocationMap = dynamic(() => import("@/components/maps/job-location-map").then((m) => m.JobLocationMap), {
  ssr: false,
  loading: () => <Skeleton className="h-[200px] w-full rounded-lg" />,
});

export function JobLocationMapLoader(props: JobLocationMapProps) {
  return <JobLocationMap {...props} />;
}
