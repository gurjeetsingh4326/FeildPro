import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { OUTSTANDING_INVOICES } from "@/lib/dummy-data/dashboard";
import type { InvoiceStatus } from "@/lib/types";

const STATUS_BADGE: Record<InvoiceStatus, { variant: "success" | "warning" | "error" | "neutral"; label: string }> = {
  paid: { variant: "success", label: "Paid" },
  sent: { variant: "neutral", label: "Sent" },
  overdue: { variant: "error", label: "Overdue" },
  draft: { variant: "neutral", label: "Draft" },
};

export function OutstandingInvoicesCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Outstanding Invoices</CardTitle>
        <Link href="/invoices" className="text-[13px] font-medium text-primary-text hover:underline">
          View all
        </Link>
      </CardHeader>

      {/* Below sm: stacked cards, not a cramped/scrolling table (docs/RESPONSIVE_DESIGN.md). */}
      <ul className="space-y-1 sm:hidden">
        {OUTSTANDING_INVOICES.map((inv) => {
          const badge = STATUS_BADGE[inv.status];
          return (
            <li key={inv.id} className="rounded-md border border-border p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-medium text-text-primary">{inv.customerName}</p>
                <Badge variant={badge.variant}>{badge.label}</Badge>
              </div>
              <div className="mt-1 flex items-center justify-between gap-2 text-[13px] text-text-muted">
                <span className="font-mono">{inv.id}</span>
                <span className="tabular-nums font-medium text-text-primary">
                  ${inv.amount.toLocaleString()}
                </span>
              </div>
              {inv.daysOverdue > 0 ? (
                <p className="mt-1 text-[13px] text-error">{inv.daysOverdue} days overdue</p>
              ) : null}
            </li>
          );
        })}
      </ul>

      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Days overdue</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {OUTSTANDING_INVOICES.map((inv) => {
              const badge = STATUS_BADGE[inv.status];
              return (
                <TableRow key={inv.id}>
                  <TableCell className="font-mono text-text-secondary">{inv.id}</TableCell>
                  <TableCell className="font-medium">{inv.customerName}</TableCell>
                  <TableCell>
                    <Badge variant={badge.variant}>{badge.label}</Badge>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {inv.daysOverdue > 0 ? (
                      <span className="text-error">{inv.daysOverdue}</span>
                    ) : (
                      <span className="text-text-muted">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right tabular-nums font-medium">
                    ${inv.amount.toLocaleString()}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
