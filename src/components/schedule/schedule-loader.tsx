"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

/* dnd-kit's DndContext assigns internal ids via a module-level counter, not
   React's SSR-safe useId(), so server- and client-rendered attribute values
   (aria-describedby) can genuinely differ across a fresh Next.js process —
   a known class of issue with drag-and-drop libraries and SSR. The schedule
   board is inherently a client-only interaction (no SEO/content value in
   server-rendering it), so it's opted out of SSR entirely rather than
   shipping a hydration-mismatch warning on every load. `ssr: false` requires
   this to live in a Client Component, hence this thin wrapper around the
   Server Component page. */
const ScheduleView = dynamic(
  () => import("@/components/schedule/schedule-view").then((m) => m.ScheduleView),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-8 w-48" />
        </div>
        <Skeleton className="h-[520px] w-full" />
      </div>
    ),
  }
);

export function ScheduleLoader() {
  return <ScheduleView />;
}
