import { Card } from "@/components/ui/card";
import { invoiceSubtotal, invoiceTax, invoiceTotal, type Invoice } from "@/lib/dummy-data/invoices";

function money(value: number) {
  return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function InvoiceLineItems({ invoice }: { invoice: Invoice }) {
  const subtotal = invoiceSubtotal(invoice);
  const tax = invoiceTax(invoice);
  const total = invoiceTotal(invoice);

  return (
    <Card>
      <div className="scrollbar-thin overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">
              <th className="py-2 pr-3">Description</th>
              <th className="py-2 pr-3 text-right">Qty</th>
              <th className="py-2 pr-3 text-right">Unit Price</th>
              <th className="py-2 text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {invoice.lineItems.map((li) => (
              <tr key={li.id} className="border-b border-border last:border-0">
                <td className="py-2 pr-3 text-text-primary">{li.description}</td>
                <td className="py-2 pr-3 text-right tabular-nums text-text-secondary">{li.quantity}</td>
                <td className="py-2 pr-3 text-right tabular-nums text-text-secondary">${money(li.unitPrice)}</td>
                <td className="py-2 text-right tabular-nums font-medium text-text-primary">
                  ${money(li.quantity * li.unitPrice)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 space-y-1.5 border-t border-border pt-3 text-sm">
        <div className="flex justify-end gap-6">
          <span className="text-text-secondary">Subtotal</span>
          <span className="w-24 text-right tabular-nums text-text-primary">${money(subtotal)}</span>
        </div>
        {invoice.taxRate > 0 ? (
          <div className="flex justify-end gap-6">
            <span className="text-text-secondary">Tax ({(invoice.taxRate * 100).toFixed(0)}%)</span>
            <span className="w-24 text-right tabular-nums text-text-primary">${money(tax)}</span>
          </div>
        ) : null}
        {invoice.discount > 0 ? (
          <div className="flex justify-end gap-6">
            <span className="text-text-secondary">Discount</span>
            <span className="w-24 text-right tabular-nums text-text-primary">-${money(invoice.discount)}</span>
          </div>
        ) : null}
        <div className="flex justify-end gap-6 border-t border-border pt-1.5 text-base font-semibold">
          <span className="text-text-primary">Total</span>
          <span className="w-24 text-right tabular-nums text-text-primary">${money(total)}</span>
        </div>
      </div>
    </Card>
  );
}
