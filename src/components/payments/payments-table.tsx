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
import { PAYMENT_METHOD_META, PAYMENT_STATUS_META, type Payment } from "@/lib/dummy-data/payments";

export type SortColumn = "date" | "amount" | null;

export interface PaymentsTableProps {
  payments: Payment[];
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  onSort: (column: SortColumn) => void;
}

function formatDate(iso: string) {
  const [, m, d] = iso.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[Number(m) - 1]} ${Number(d)}`;
}

export function PaymentsTable({ payments, sortColumn, sortDirection, onSort }: PaymentsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Payment</TableHead>
          <TableHead>Invoice</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Method</TableHead>
          <TableHead>Status</TableHead>
          <SortableTableHead direction={sortColumn === "date" ? sortDirection : null} onSort={() => onSort("date")}>
            Date
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
        {payments.map((payment) => {
          const statusMeta = PAYMENT_STATUS_META[payment.status];
          return (
            <TableRow key={payment.id}>
              <TableCell className="font-mono text-text-secondary">{payment.id}</TableCell>
              <TableCell>
                <Link href={`/invoices/${payment.invoiceId}`} className="font-mono text-primary-text hover:underline">
                  {payment.invoiceId}
                </Link>
              </TableCell>
              <TableCell className="font-medium">{payment.customerName}</TableCell>
              <TableCell className="text-text-secondary">{PAYMENT_METHOD_META[payment.method].label}</TableCell>
              <TableCell>
                <Badge variant={statusMeta.badge} dot>
                  {statusMeta.label}
                </Badge>
              </TableCell>
              <TableCell className="text-text-secondary">{formatDate(payment.date)}</TableCell>
              <TableCell className="text-right tabular-nums font-medium">${payment.amount.toLocaleString()}</TableCell>
            </TableRow>
          );
        })}
        {payments.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="py-10 text-center text-text-muted">
              No payments match your filters.
            </TableCell>
          </TableRow>
        ) : null}
      </TableBody>
    </Table>
  );
}
