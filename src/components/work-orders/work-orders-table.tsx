"use client";

import Link from "next/link";
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
import { Badge, PriorityBadge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { STATUS_META } from "@/lib/work-order-status";
import type { WorkOrder } from "@/lib/dummy-data/work-orders";
import { formatMoney } from "@/lib/utils";

export type SortColumn = "scheduledDate" | "total" | null;

export interface WorkOrdersTableProps {
  workOrders: WorkOrder[];
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  onSort: (column: SortColumn) => void;
}

function formatDate(iso: string) {
  const [, m, d] = iso.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[Number(m) - 1]} ${Number(d)}`;
}

export function WorkOrdersTable({ workOrders, sortColumn, sortDirection, onSort }: WorkOrdersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>WO #</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Service</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Technician</TableHead>
          <SortableTableHead
            direction={sortColumn === "scheduledDate" ? sortDirection : null}
            onSort={() => onSort("scheduledDate")}
          >
            Scheduled
          </SortableTableHead>
          <SortableTableHead
            className="text-right"
            direction={sortColumn === "total" ? sortDirection : null}
            onSort={() => onSort("total")}
          >
            Total
          </SortableTableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {workOrders.map((wo) => {
          const meta = STATUS_META[wo.status];
          return (
            <TableRow key={wo.id}>
              <TableCell>
                <Link href={`/work-orders/${wo.id}`} className="font-mono text-primary-text hover:underline">
                  {wo.id}
                </Link>
              </TableCell>
              <TableCell className="font-medium">{wo.customerName}</TableCell>
              <TableCell className="max-w-[220px] truncate text-text-secondary">{wo.service}</TableCell>
              <TableCell>
                <PriorityBadge priority={wo.priority}>{wo.priority}</PriorityBadge>
              </TableCell>
              <TableCell>
                <Badge variant={meta.badge} dot>
                  {meta.label}
                </Badge>
              </TableCell>
              <TableCell>
                {wo.technicianName ? (
                  <div className="flex items-center gap-2">
                    <Avatar name={wo.technicianName} size="sm" />
                    <span className="text-text-secondary">{wo.technicianName}</span>
                  </div>
                ) : (
                  <span className="text-text-muted">Unassigned</span>
                )}
              </TableCell>
              <TableCell className="whitespace-nowrap text-text-secondary">
                {formatDate(wo.scheduledDate)} · {wo.scheduledTime}
              </TableCell>
              <TableCell className="text-right tabular-nums font-medium">
                {wo.total > 0 ? `$${formatMoney(wo.total)}` : <span className="text-text-muted">—</span>}
              </TableCell>
            </TableRow>
          );
        })}
        {workOrders.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="py-10 text-center text-text-muted">
              No work orders match your filters.
            </TableCell>
          </TableRow>
        ) : null}
      </TableBody>
    </Table>
  );
}
