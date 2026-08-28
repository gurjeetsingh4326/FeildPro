import { Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Part } from "@/lib/dummy-data/parts";

export function PartsMobileList({ parts, onEdit }: { parts: Part[]; onEdit: (part: Part) => void }) {
  if (parts.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border-strong bg-surface p-6 text-center text-sm text-text-muted">
        No parts match your filters.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {parts.map((part) => (
        <li key={part.id} className="rounded-lg border border-border bg-surface p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-text-primary">{part.name}</p>
              <p className="font-mono text-[12px] text-text-muted">{part.sku} · {part.category}</p>
            </div>
            <button
              type="button"
              aria-label={`Edit ${part.name}`}
              onClick={() => onEdit(part)}
              className="shrink-0 text-text-muted hover:text-text-primary"
            >
              <Pencil className="size-4" />
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between gap-2 border-t border-border pt-2 text-[12px]">
            <Badge variant={part.status === "active" ? "success" : "neutral"} dot>
              {part.status === "active" ? "Active" : "Inactive"}
            </Badge>
            <span className="tabular-nums font-medium text-text-primary">${part.unitPrice.toLocaleString()}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
