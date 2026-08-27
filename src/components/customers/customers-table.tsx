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
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { getCustomerStats, getPrimaryContact, type Customer } from "@/lib/dummy-data/customers";

export type SortColumn = "customerSince" | "totalSpend" | null;

export interface CustomersTableProps {
  customers: Customer[];
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  onSort: (column: SortColumn) => void;
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[Number(m) - 1]} ${Number(d)}, ${y}`;
}

export function CustomersTable({ customers, sortColumn, sortDirection, onSort }: CustomersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Open WOs</TableHead>
          <SortableTableHead
            className="text-right"
            direction={sortColumn === "totalSpend" ? sortDirection : null}
            onSort={() => onSort("totalSpend")}
          >
            Total Spend
          </SortableTableHead>
          <SortableTableHead
            direction={sortColumn === "customerSince" ? sortDirection : null}
            onSort={() => onSort("customerSince")}
          >
            Customer Since
          </SortableTableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer) => {
          const contact = getPrimaryContact(customer);
          const stats = getCustomerStats(customer.name);
          return (
            <TableRow key={customer.id}>
              <TableCell>
                <Link href={`/customers/${customer.id}`} className="flex items-center gap-2.5 font-medium text-text-primary hover:text-primary-text">
                  <Avatar name={customer.name} size="sm" />
                  {customer.name}
                </Link>
              </TableCell>
              <TableCell className="text-text-secondary">{contact?.name ?? "—"}</TableCell>
              <TableCell className="whitespace-nowrap text-text-secondary">{contact?.phone ?? "—"}</TableCell>
              <TableCell>
                <Badge variant={customer.status === "active" ? "success" : "neutral"} dot>
                  {customer.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell className="tabular-nums text-text-secondary">{stats.openWorkOrders}</TableCell>
              <TableCell className="text-right tabular-nums font-medium">
                ${stats.totalSpend.toLocaleString()}
              </TableCell>
              <TableCell className="whitespace-nowrap text-text-secondary">{formatDate(customer.customerSince)}</TableCell>
            </TableRow>
          );
        })}
        {customers.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="py-10 text-center text-text-muted">
              No customers match your filters.
            </TableCell>
          </TableRow>
        ) : null}
      </TableBody>
    </Table>
  );
}
