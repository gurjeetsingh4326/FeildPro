"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { InventoryFilters } from "@/components/inventory/inventory-filters";
import { StockLevelsTable } from "@/components/inventory/stock-levels-table";
import { StockLevelsMobileList } from "@/components/inventory/stock-levels-mobile-list";
import { AdjustStockModal } from "@/components/inventory/adjust-stock-modal";
import { TransactionsTable } from "@/components/inventory/transactions-table";
import { TransactionsMobileList } from "@/components/inventory/transactions-mobile-list";
import {
  INVENTORY_LEVELS,
  INVENTORY_TRANSACTIONS,
  getPart,
  stockStatusFor,
  WAREHOUSES,
  type InventoryLevel,
  type InventoryTransaction,
  type InventoryStockStatus,
} from "@/lib/dummy-data/parts";

export function InventoryView() {
  const [levels, setLevels] = React.useState<InventoryLevel[]>(INVENTORY_LEVELS);
  const [transactions, setTransactions] = React.useState<InventoryTransaction[]>(INVENTORY_TRANSACTIONS);
  const [search, setSearch] = React.useState("");
  const [selectedWarehouses, setSelectedWarehouses] = React.useState<Set<string>>(new Set());
  const [selectedStatuses, setSelectedStatuses] = React.useState<Set<InventoryStockStatus>>(new Set());
  const [adjustingLevel, setAdjustingLevel] = React.useState<InventoryLevel | null>(null);

  const toggleWarehouse = (id: string) => {
    setSelectedWarehouses((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleStatus = (status: InventoryStockStatus) => {
    setSelectedStatuses((prev) => {
      const next = new Set(prev);
      if (next.has(status)) next.delete(status);
      else next.add(status);
      return next;
    });
  };

  const filteredLevels = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    return levels.filter((level) => {
      const part = getPart(level.partId);
      const matchesSearch = !q || part?.name.toLowerCase().includes(q) || part?.sku.toLowerCase().includes(q);
      const matchesWarehouse = selectedWarehouses.size === 0 || selectedWarehouses.has(level.warehouseId);
      const matchesStatus = selectedStatuses.size === 0 || selectedStatuses.has(stockStatusFor(level));
      return matchesSearch && matchesWarehouse && matchesStatus;
    });
  }, [levels, search, selectedWarehouses, selectedStatuses]);

  const filteredTransactions = React.useMemo(() => {
    if (selectedWarehouses.size === 0) return transactions;
    return transactions.filter((t) => selectedWarehouses.has(t.warehouseId));
  }, [transactions, selectedWarehouses]);

  const activeCount = selectedWarehouses.size + selectedStatuses.size;

  function handleAdjust(transaction: InventoryTransaction) {
    setTransactions((prev) => [transaction, ...prev]);
    setLevels((prev) =>
      prev.map((level) =>
        level.partId === transaction.partId && level.warehouseId === transaction.warehouseId
          ? { ...level, quantityOnHand: Math.max(0, level.quantityOnHand + transaction.quantity) }
          : level
      )
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search parts…"
            className="pl-9"
          />
        </div>
        <InventoryFilters
          selectedWarehouses={selectedWarehouses}
          onToggleWarehouse={toggleWarehouse}
          selectedStatuses={selectedStatuses}
          onToggleStatus={toggleStatus}
          activeCount={activeCount}
        />
      </div>

      {activeCount > 0 ? (
        <div className="flex flex-wrap items-center gap-2">
          {Array.from(selectedWarehouses).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => toggleWarehouse(id)}
              className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <Badge variant="neutral" className="cursor-pointer hover:bg-border">
                {WAREHOUSES.find((w) => w.id === id)?.name} ×
              </Badge>
            </button>
          ))}
          {Array.from(selectedStatuses).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => toggleStatus(status)}
              className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <Badge variant="neutral" className="cursor-pointer hover:bg-border">
                {status.replace("_", " ")} ×
              </Badge>
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setSelectedWarehouses(new Set());
              setSelectedStatuses(new Set());
            }}
            className="text-[13px] font-medium text-text-muted hover:text-text-primary"
          >
            Clear all
          </button>
        </div>
      ) : null}

      <Tabs defaultValue="stock">
        <TabsList>
          <TabsTrigger value="stock">Stock Levels</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        <TabsContent value="stock">
          <div className="hidden md:block">
            <StockLevelsTable levels={filteredLevels} onAdjust={setAdjustingLevel} />
          </div>
          <div className="md:hidden">
            <StockLevelsMobileList levels={filteredLevels} onAdjust={setAdjustingLevel} />
          </div>
        </TabsContent>
        <TabsContent value="transactions">
          <div className="hidden md:block">
            <TransactionsTable transactions={filteredTransactions} />
          </div>
          <div className="md:hidden">
            <TransactionsMobileList transactions={filteredTransactions} />
          </div>
        </TabsContent>
      </Tabs>

      {adjustingLevel ? (
        <AdjustStockModal
          level={adjustingLevel}
          onOpenChange={(open) => {
            if (!open) setAdjustingLevel(null);
          }}
          onAdjust={handleAdjust}
        />
      ) : null}
    </div>
  );
}
