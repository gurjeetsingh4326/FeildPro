import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getPart, WAREHOUSES, TRANSACTION_TYPE_META, type InventoryTransaction } from "@/lib/dummy-data/parts";

function warehouseName(id: string) {
  return WAREHOUSES.find((w) => w.id === id)?.name ?? id;
}

export function TransactionsTable({ transactions }: { transactions: InventoryTransaction[] }) {
  const sorted = [...transactions].sort((a, b) => b.id.localeCompare(a.id));

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Part</TableHead>
          <TableHead>Warehouse</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-right">Quantity</TableHead>
          <TableHead>Timestamp</TableHead>
          <TableHead>Note</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sorted.map((txn) => {
          const part = getPart(txn.partId);
          const meta = TRANSACTION_TYPE_META[txn.type];
          return (
            <TableRow key={txn.id}>
              <TableCell className="font-medium text-text-primary">{part?.name ?? txn.partId}</TableCell>
              <TableCell className="text-text-secondary">{warehouseName(txn.warehouseId)}</TableCell>
              <TableCell>
                <Badge variant={meta.badge} dot>
                  {meta.label}
                </Badge>
              </TableCell>
              <TableCell className={`text-right tabular-nums font-medium ${txn.quantity < 0 ? "text-error" : "text-success"}`}>
                {txn.quantity > 0 ? `+${txn.quantity}` : txn.quantity}
              </TableCell>
              <TableCell className="whitespace-nowrap text-text-secondary">{txn.timestamp}</TableCell>
              <TableCell className="max-w-[280px] truncate text-text-secondary">{txn.note}</TableCell>
            </TableRow>
          );
        })}
        {transactions.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="py-10 text-center text-text-muted">
              No transactions yet.
            </TableCell>
          </TableRow>
        ) : null}
      </TableBody>
    </Table>
  );
}
