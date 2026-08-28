import { Skeleton } from "@/components/ui/skeleton";

/** Generic list-page skeleton for the (app) route group — matches the most
    common page shape (title + toolbar + table) per docs/UI_PATTERNS.md:
    "skeleton matching the real layout... never a full-page spinner once the
    shell is known." The shell (sidebar/header) stays mounted around this,
    since Next.js only swaps the layout's {children} slot. Rarely visible
    today since all dummy-data reads are synchronous — ready for Phase 6's
    real data fetching, where route segments will actually suspend. */
export default function Loading() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-9 w-32" />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Skeleton className="h-9 w-72" />
        <Skeleton className="h-9 w-24" />
      </div>
      <div className="overflow-hidden rounded-lg border border-border">
        <div className="flex items-center gap-4 border-b border-border bg-surface-sunken px-4 py-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-3.5 flex-1" />
          ))}
        </div>
        {Array.from({ length: 6 }).map((_, row) => (
          <div key={row} className="flex items-center gap-4 border-b border-border px-4 py-4 last:border-0">
            {Array.from({ length: 5 }).map((_, col) => (
              <Skeleton key={col} className="h-4 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
