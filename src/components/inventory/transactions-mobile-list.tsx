import { Badge } from "@/components/ui/badge";
import { getPart, WAREHOUSES, TRANSACTION_TYPE_META, type InventoryTransaction } from "@/lib/dummy-data/parts";

function warehouseName(id: string) {
  return WAREHOUSES.find((w) => w.id === id)?.name ?? id;
}

export function TransactionsMobileList({ transactions }: { transactions: InventoryTransaction[] }) {
  if (transactions.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border-strong bg-surface p-6 text-center text-sm text-text-muted">
        No transactions yet.
      </p>
    );
  }

  const sorted = [...transactions].sort((a, b) => b.id.localeCompare(a.id));

  return (
    <ul className="space-y-2">
      {sorted.map((txn) => {
        const part = getPart(txn.partId);
        const meta = TRANSACTION_TYPE_META[txn.type];
        return (
          <li key={txn.id} className="rounded-lg border border-border bg-surface p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-text-primary">{part?.name ?? txn.partId}</p>
                <p className="text-[12px] text-text-muted">{warehouseName(txn.warehouseId)} · {txn.timestamp}</p>
              </div>
              <Badge variant={meta.badge} dot className="shrink-0">
                {meta.label}
              </Badge>
            </div>
            <p className="mt-1.5 text-[13px] text-text-secondary">{txn.note}</p>
            <p className={`mt-1 text-right text-sm font-medium tabular-nums ${txn.quantity < 0 ? "text-error" : "text-success"}`}>
              {txn.quantity > 0 ? `+${txn.quantity}` : txn.quantity}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
