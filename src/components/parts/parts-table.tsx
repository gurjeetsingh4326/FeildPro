import { Pencil } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  SortableTableHead,
  type SortDirection,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Part } from "@/lib/dummy-data/parts";
import { formatMoney } from "@/lib/utils";

export type SortColumn = "unitPrice" | null;

export interface PartsTableProps {
  parts: Part[];
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  onSort: (column: SortColumn) => void;
  onEdit: (part: Part) => void;
}

export function PartsTable({ parts, sortColumn, sortDirection, onSort, onEdit }: PartsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Part</TableHead>
          <TableHead>SKU</TableHead>
          <TableHead>Category</TableHead>
          <SortableTableHead
            className="text-right"
            direction={sortColumn === "unitPrice" ? sortDirection : null}
            onSort={() => onSort("unitPrice")}
          >
            Unit Price
          </SortableTableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-10" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {parts.map((part) => (
          <TableRow key={part.id}>
            <TableCell className="font-medium text-text-primary">{part.name}</TableCell>
            <TableCell className="font-mono text-[13px] text-text-muted">{part.sku}</TableCell>
            <TableCell className="text-text-secondary">{part.category}</TableCell>
            <TableCell className="text-right tabular-nums font-medium">${formatMoney(part.unitPrice)}</TableCell>
            <TableCell>
              <Badge variant={part.status === "active" ? "success" : "neutral"} dot>
                {part.status === "active" ? "Active" : "Inactive"}
              </Badge>
            </TableCell>
            <TableCell>
              <button
                type="button"
                aria-label={`Edit ${part.name}`}
                onClick={() => onEdit(part)}
                className="text-text-muted hover:text-text-primary"
              >
                <Pencil className="size-4" />
              </button>
            </TableCell>
          </TableRow>
        ))}
        {parts.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="py-10 text-center text-text-muted">
              No parts match your filters.
            </TableCell>
          </TableRow>
        ) : null}
      </TableBody>
    </Table>
  );
}
