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
import type { Service } from "@/lib/dummy-data/services";
import { formatMoney } from "@/lib/utils";

export type SortColumn = "basePrice" | "estimatedHours" | null;

export interface ServicesTableProps {
  services: Service[];
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  onSort: (column: SortColumn) => void;
  onEdit: (service: Service) => void;
}

export function ServicesTable({ services, sortColumn, sortDirection, onSort, onEdit }: ServicesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Service</TableHead>
          <TableHead>Category</TableHead>
          <SortableTableHead
            direction={sortColumn === "estimatedHours" ? sortDirection : null}
            onSort={() => onSort("estimatedHours")}
          >
            Est. Duration
          </SortableTableHead>
          <SortableTableHead
            className="text-right"
            direction={sortColumn === "basePrice" ? sortDirection : null}
            onSort={() => onSort("basePrice")}
          >
            Base Price
          </SortableTableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-10" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {services.map((service) => (
          <TableRow key={service.id}>
            <TableCell>
              <p className="font-medium text-text-primary">{service.name}</p>
              <p className="max-w-[280px] truncate text-[13px] text-text-muted">{service.description}</p>
            </TableCell>
            <TableCell className="text-text-secondary">{service.category}</TableCell>
            <TableCell className="tabular-nums text-text-secondary">{service.estimatedHours}h</TableCell>
            <TableCell className="text-right tabular-nums font-medium">${formatMoney(service.basePrice)}</TableCell>
            <TableCell>
              <Badge variant={service.status === "active" ? "success" : "neutral"} dot>
                {service.status === "active" ? "Active" : "Inactive"}
              </Badge>
            </TableCell>
            <TableCell>
              <button
                type="button"
                aria-label={`Edit ${service.name}`}
                onClick={() => onEdit(service)}
                className="rounded-sm text-text-muted hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <Pencil className="size-4" />
              </button>
            </TableCell>
          </TableRow>
        ))}
        {services.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="py-10 text-center text-text-muted">
              No services match your filters.
            </TableCell>
          </TableRow>
        ) : null}
      </TableBody>
    </Table>
  );
}
