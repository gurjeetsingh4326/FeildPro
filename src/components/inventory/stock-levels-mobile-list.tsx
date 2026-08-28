import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPart, stockStatusFor, STOCK_STATUS_META, WAREHOUSES, type InventoryLevel } from "@/lib/dummy-data/parts";

function warehouseName(id: string) {
  return WAREHOUSES.find((w) => w.id === id)?.name ?? id;
}

export function StockLevelsMobileList({
  levels,
  onAdjust,
}: {
  levels: InventoryLevel[];
  onAdjust: (level: InventoryLevel) => void;
}) {
  if (levels.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border-strong bg-surface p-6 text-center text-sm text-text-muted">
        No inventory matches your filters.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {levels.map((level) => {
        const part = getPart(level.partId);
        const status = stockStatusFor(level);
        const meta = STOCK_STATUS_META[status];
        return (
          <li key={`${level.partId}-${level.warehouseId}`} className="rounded-lg border border-border bg-surface p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-text-primary">{part?.name ?? level.partId}</p>
                <p className="text-[12px] text-text-muted">{warehouseName(level.warehouseId)}</p>
              </div>
              <Badge variant={meta.badge} dot className="shrink-0">
                {meta.label}
              </Badge>
            </div>
            <div className="mt-2 flex items-center justify-between gap-2 border-t border-border pt-2">
              <span className="text-[13px] text-text-secondary">
                <span className="font-medium tabular-nums text-text-primary">{level.quantityOnHand}</span> on hand · reorder at {level.reorderThreshold}
              </span>
              <Button variant="ghost" size="sm" onClick={() => onAdjust(level)}>
                Adjust
              </Button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
