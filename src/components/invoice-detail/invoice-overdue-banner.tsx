import { AlertTriangle } from "lucide-react";

/** Persistent contextual state (not a toast) per docs/UI_PATTERNS.md →
    Notifications & feedback: "This invoice is overdue by 12 days". */
export function InvoiceOverdueBanner({ days }: { days: number }) {
  return (
    <div className="flex items-center gap-2.5 rounded-md border border-error/30 bg-error-bg px-4 py-3 text-sm text-error">
      <AlertTriangle className="size-4 shrink-0" />
      <span>
        This invoice is overdue by {days} {days === 1 ? "day" : "days"}.
      </span>
    </div>
  );
}
