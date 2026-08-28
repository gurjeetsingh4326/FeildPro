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
import { INVOICE_STATUS_META, invoiceTotal, type Invoice } from "@/lib/dummy-data/invoices";
import { formatMoney } from "@/lib/utils";

export type SortColumn = "dueDate" | "amount" | null;

export interface InvoicesTableProps {
  invoices: Invoice[];
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  onSort: (column: SortColumn) => void;
}

function formatDate(iso: string) {
  const [, m, d] = iso.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[Number(m) - 1]} ${Number(d)}`;
}

export function InvoicesTable({ invoices, sortColumn, sortDirection, onSort }: InvoicesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Issued</TableHead>
          <SortableTableHead direction={sortColumn === "dueDate" ? sortDirection : null} onSort={() => onSort("dueDate")}>
            Due
          </SortableTableHead>
          <SortableTableHead
            className="text-right"
            direction={sortColumn === "amount" ? sortDirection : null}
            onSort={() => onSort("amount")}
          >
            Amount
          </SortableTableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => {
          const meta = INVOICE_STATUS_META[invoice.status];
          return (
            <TableRow key={invoice.id}>
              <TableCell>
                <Link href={`/invoices/${invoice.id}`} className="font-mono text-primary-text hover:underline">
                  {invoice.id}
                </Link>
              </TableCell>
              <TableCell className="font-medium">{invoice.customerName}</TableCell>
              <TableCell>
                <Badge variant={meta.badge} dot>
                  {meta.label}
                </Badge>
              </TableCell>
              <TableCell className="text-text-secondary">{formatDate(invoice.issueDate)}</TableCell>
              <TableCell className="text-text-secondary">{formatDate(invoice.dueDate)}</TableCell>
              <TableCell className="text-right tabular-nums font-medium">
                ${formatMoney(invoiceTotal(invoice))}
              </TableCell>
            </TableRow>
          );
        })}
        {invoices.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="py-10 text-center text-text-muted">
              No invoices match your filters.
            </TableCell>
          </TableRow>
        ) : null}
      </TableBody>
    </Table>
  );
}
