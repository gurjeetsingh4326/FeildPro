import Link from "next/link";
import { ArrowLeft, Send, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { INVOICE_STATUS_META, invoiceTotal, type Invoice } from "@/lib/dummy-data/invoices";
import type { InvoiceStatus } from "@/lib/types";

export interface InvoiceDetailHeaderProps {
  invoice: Invoice;
  onStatusChange: (status: InvoiceStatus) => void;
}

export function InvoiceDetailHeader({ invoice, onStatusChange }: InvoiceDetailHeaderProps) {
  const meta = INVOICE_STATUS_META[invoice.status];

  return (
    <div className="flex flex-col gap-4 border-b border-border pb-4">
      <Link
        href="/invoices"
        className="inline-flex w-fit items-center gap-1.5 text-[13px] font-medium text-text-secondary hover:text-text-primary"
      >
        <ArrowLeft className="size-3.5" />
        Invoices
      </Link>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-mono text-lg font-semibold text-text-primary">{invoice.id}</h1>
            <Badge variant={meta.badge} dot>
              {meta.label}
            </Badge>
          </div>
          <p className="mt-1 text-2xl font-bold tracking-tight text-text-primary">{invoice.customerName}</p>
          <p className="tabular-nums text-sm text-text-secondary">${invoiceTotal(invoice).toLocaleString()}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {invoice.status === "draft" ? (
            <Button onClick={() => onStatusChange("sent")} className="gap-1.5">
              <Send className="size-4" />
              Mark as Sent
            </Button>
          ) : null}
          {invoice.status === "sent" || invoice.status === "overdue" ? (
            <Button onClick={() => onStatusChange("paid")} className="gap-1.5">
              <CheckCircle2 className="size-4" />
              Record Payment
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
