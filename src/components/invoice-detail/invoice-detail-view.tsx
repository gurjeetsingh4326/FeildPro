"use client";

import * as React from "react";
import { InvoiceDetailHeader } from "@/components/invoice-detail/invoice-detail-header";
import { InvoiceOverdueBanner } from "@/components/invoice-detail/invoice-overdue-banner";
import { InvoiceLineItems } from "@/components/invoice-detail/invoice-line-items";
import { InvoiceTimeline } from "@/components/invoice-detail/invoice-timeline";
import { InvoiceRightRail } from "@/components/invoice-detail/invoice-right-rail";
import { toast } from "@/lib/toast-bus";
import { daysOverdue, INVOICE_STATUS_META, type Invoice } from "@/lib/dummy-data/invoices";
import type { InvoiceStatus } from "@/lib/types";

export function InvoiceDetailView({ initial }: { initial: Invoice }) {
  const [invoice, setInvoice] = React.useState<Invoice>(initial);
  const overdue = daysOverdue(invoice);

  function handleStatusChange(status: InvoiceStatus) {
    setInvoice((prev) => ({
      ...prev,
      status,
      paidDate: status === "paid" ? new Date().toISOString().slice(0, 10) : prev.paidDate,
    }));
    toast({
      variant: "success",
      title: "Invoice updated",
      description: `${invoice.id} is now ${INVOICE_STATUS_META[status].label}`,
    });
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
      <InvoiceDetailHeader invoice={invoice} onStatusChange={handleStatusChange} />

      {overdue > 0 ? <InvoiceOverdueBanner days={overdue} /> : null}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-4 xl:col-span-2">
          <InvoiceLineItems invoice={invoice} />
          <InvoiceTimeline invoice={invoice} />
        </div>
        <div className="xl:col-span-1">
          <InvoiceRightRail invoice={invoice} />
        </div>
      </div>
    </div>
  );
}
