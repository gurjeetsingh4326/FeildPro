import { Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Service } from "@/lib/dummy-data/services";

export function ServicesMobileList({ services, onEdit }: { services: Service[]; onEdit: (service: Service) => void }) {
  if (services.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border-strong bg-surface p-6 text-center text-sm text-text-muted">
        No services match your filters.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {services.map((service) => (
        <li key={service.id} className="rounded-lg border border-border bg-surface p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-text-primary">{service.name}</p>
              <p className="text-[12px] text-text-muted">{service.category}</p>
            </div>
            <button
              type="button"
              aria-label={`Edit ${service.name}`}
              onClick={() => onEdit(service)}
              className="shrink-0 text-text-muted hover:text-text-primary"
            >
              <Pencil className="size-4" />
            </button>
          </div>
          <p className="mt-1.5 text-[13px] text-text-secondary">{service.description}</p>
          <div className="mt-2 flex items-center justify-between gap-2 border-t border-border pt-2 text-[12px]">
            <Badge variant={service.status === "active" ? "success" : "neutral"} dot>
              {service.status === "active" ? "Active" : "Inactive"}
            </Badge>
            <span className="tabular-nums font-medium text-text-primary">
              {service.estimatedHours}h · ${service.basePrice.toLocaleString()}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
