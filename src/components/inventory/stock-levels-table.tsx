import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPart, stockStatusFor, STOCK_STATUS_META, type InventoryLevel } from "@/lib/dummy-data/parts";
import { WAREHOUSES } from "@/lib/dummy-data/parts";

function warehouseName(id: string) {
  return WAREHOUSES.find((w) => w.id === id)?.name ?? id;
}

export interface StockLevelsTableProps {
  levels: InventoryLevel[];
  onAdjust: (level: InventoryLevel) => void;
}

export function StockLevelsTable({ levels, onAdjust }: StockLevelsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Part</TableHead>
          <TableHead>Warehouse</TableHead>
          <TableHead className="text-right">On Hand</TableHead>
          <TableHead className="text-right">Reorder At</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-28" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {levels.map((level) => {
          const part = getPart(level.partId);
          const status = stockStatusFor(level);
          const meta = STOCK_STATUS_META[status];
          return (
            <TableRow key={`${level.partId}-${level.warehouseId}`}>
              <TableCell>
                <p className="font-medium text-text-primary">{part?.name ?? level.partId}</p>
                <p className="font-mono text-[12px] text-text-muted">{part?.sku}</p>
              </TableCell>
              <TableCell className="text-text-secondary">{warehouseName(level.warehouseId)}</TableCell>
              <TableCell className="text-right tabular-nums font-medium">{level.quantityOnHand}</TableCell>
              <TableCell className="text-right tabular-nums text-text-secondary">{level.reorderThreshold}</TableCell>
              <TableCell>
                <Badge variant={meta.badge} dot>
                  {meta.label}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" onClick={() => onAdjust(level)}>
                  Adjust
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
        {levels.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="py-10 text-center text-text-muted">
              No inventory matches your filters.
            </TableCell>
          </TableRow>
        ) : null}
      </TableBody>
    </Table>
  );
}
