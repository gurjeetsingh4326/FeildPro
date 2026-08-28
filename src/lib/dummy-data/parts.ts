export type PartCategory = "HVAC" | "Electrical" | "Plumbing" | "Fire & Safety";
export type PartStatus = "active" | "inactive";

export const PART_CATEGORIES: PartCategory[] = ["HVAC", "Electrical", "Plumbing", "Fire & Safety"];

export interface Part {
  id: string;
  name: string;
  sku: string;
  category: PartCategory;
  unitPrice: number;
  status: PartStatus;
}

export const PARTS: Part[] = [
  { id: "part-hvac-filter", name: "HVAC Air Filter 20x25x1", sku: "FLT-2025-1", category: "HVAC", unitPrice: 18, status: "active" },
  { id: "part-r410a", name: "R-410A Refrigerant (lb)", sku: "REF-410A", category: "HVAC", unitPrice: 32, status: "active" },
  { id: "part-condenser-motor", name: "Condenser Fan Motor", sku: "MTR-CF200", category: "HVAC", unitPrice: 145, status: "active" },
  { id: "part-thermostat", name: "Thermostat (Programmable)", sku: "THM-PR100", category: "HVAC", unitPrice: 85, status: "active" },
  { id: "part-breaker-20a", name: "Circuit Breaker 20A", sku: "ELE-CB20", category: "Electrical", unitPrice: 22, status: "active" },
  { id: "part-panel-cover", name: "Electrical Panel Cover", sku: "ELE-PC01", category: "Electrical", unitPrice: 40, status: "active" },
  { id: "part-copper-wire", name: "Copper Wire (100ft spool)", sku: "ELE-WR100", category: "Electrical", unitPrice: 65, status: "active" },
  { id: "part-water-heater-element", name: "Water Heater Element", sku: "PLM-WHE1", category: "Plumbing", unitPrice: 28, status: "active" },
  { id: "part-pipe-fitting-kit", name: "Pipe Fitting Kit", sku: "PLM-PFK1", category: "Plumbing", unitPrice: 35, status: "active" },
  { id: "part-backflow-valve", name: "Backflow Preventer Valve", sku: "PLM-BPV1", category: "Plumbing", unitPrice: 110, status: "active" },
  { id: "part-smoke-detector", name: "Smoke Detector", sku: "FS-SD100", category: "Fire & Safety", unitPrice: 45, status: "active" },
  { id: "part-fire-extinguisher", name: "Fire Extinguisher (10lb)", sku: "FS-FE10", category: "Fire & Safety", unitPrice: 60, status: "inactive" },
];

export function getPart(id: string): Part | null {
  return PARTS.find((p) => p.id === id) ?? null;
}

export interface Warehouse {
  id: string;
  name: string;
  address: string;
}

export const WAREHOUSES: Warehouse[] = [
  { id: "wh-main", name: "Main Warehouse", address: "400 Industrial Pkwy" },
  { id: "wh-north", name: "North Satellite Depot", address: "18 Commerce Way" },
];

export interface InventoryLevel {
  partId: string;
  warehouseId: string;
  quantityOnHand: number;
  reorderThreshold: number;
}

export const INVENTORY_LEVELS: InventoryLevel[] = [
  { partId: "part-hvac-filter", warehouseId: "wh-main", quantityOnHand: 42, reorderThreshold: 15 },
  { partId: "part-hvac-filter", warehouseId: "wh-north", quantityOnHand: 8, reorderThreshold: 10 },
  { partId: "part-r410a", warehouseId: "wh-main", quantityOnHand: 24, reorderThreshold: 8 },
  { partId: "part-r410a", warehouseId: "wh-north", quantityOnHand: 3, reorderThreshold: 8 },
  { partId: "part-condenser-motor", warehouseId: "wh-main", quantityOnHand: 6, reorderThreshold: 4 },
  { partId: "part-condenser-motor", warehouseId: "wh-north", quantityOnHand: 0, reorderThreshold: 2 },
  { partId: "part-thermostat", warehouseId: "wh-main", quantityOnHand: 19, reorderThreshold: 6 },
  { partId: "part-thermostat", warehouseId: "wh-north", quantityOnHand: 5, reorderThreshold: 6 },
  { partId: "part-breaker-20a", warehouseId: "wh-main", quantityOnHand: 33, reorderThreshold: 12 },
  { partId: "part-breaker-20a", warehouseId: "wh-north", quantityOnHand: 14, reorderThreshold: 12 },
  { partId: "part-panel-cover", warehouseId: "wh-main", quantityOnHand: 11, reorderThreshold: 5 },
  { partId: "part-panel-cover", warehouseId: "wh-north", quantityOnHand: 2, reorderThreshold: 5 },
  { partId: "part-copper-wire", warehouseId: "wh-main", quantityOnHand: 27, reorderThreshold: 10 },
  { partId: "part-copper-wire", warehouseId: "wh-north", quantityOnHand: 9, reorderThreshold: 10 },
  { partId: "part-water-heater-element", warehouseId: "wh-main", quantityOnHand: 16, reorderThreshold: 6 },
  { partId: "part-water-heater-element", warehouseId: "wh-north", quantityOnHand: 4, reorderThreshold: 6 },
  { partId: "part-pipe-fitting-kit", warehouseId: "wh-main", quantityOnHand: 21, reorderThreshold: 8 },
  { partId: "part-pipe-fitting-kit", warehouseId: "wh-north", quantityOnHand: 8, reorderThreshold: 8 },
  { partId: "part-backflow-valve", warehouseId: "wh-main", quantityOnHand: 7, reorderThreshold: 3 },
  { partId: "part-backflow-valve", warehouseId: "wh-north", quantityOnHand: 1, reorderThreshold: 3 },
  { partId: "part-smoke-detector", warehouseId: "wh-main", quantityOnHand: 38, reorderThreshold: 15 },
  { partId: "part-smoke-detector", warehouseId: "wh-north", quantityOnHand: 12, reorderThreshold: 15 },
  { partId: "part-fire-extinguisher", warehouseId: "wh-main", quantityOnHand: 9, reorderThreshold: 5 },
  { partId: "part-fire-extinguisher", warehouseId: "wh-north", quantityOnHand: 3, reorderThreshold: 5 },
];

export type InventoryStockStatus = "in_stock" | "low" | "out";

export function stockStatusFor(level: InventoryLevel): InventoryStockStatus {
  if (level.quantityOnHand === 0) return "out";
  if (level.quantityOnHand <= level.reorderThreshold) return "low";
  return "in_stock";
}

export const STOCK_STATUS_META: Record<InventoryStockStatus, { label: string; badge: "success" | "warning" | "error" }> = {
  in_stock: { label: "In Stock", badge: "success" },
  low: { label: "Low Stock", badge: "warning" },
  out: { label: "Out of Stock", badge: "error" },
};

export type TransactionType = "received" | "used" | "adjusted" | "transferred";

export interface InventoryTransaction {
  id: string;
  partId: string;
  warehouseId: string;
  type: TransactionType;
  quantity: number;
  timestamp: string;
  note: string;
}

export const TRANSACTION_TYPE_META: Record<TransactionType, { label: string; badge: "success" | "info" | "neutral" | "warning" }> = {
  received: { label: "Received", badge: "success" },
  used: { label: "Used", badge: "info" },
  adjusted: { label: "Adjusted", badge: "neutral" },
  transferred: { label: "Transferred", badge: "warning" },
};

export const INVENTORY_TRANSACTIONS: InventoryTransaction[] = [
  { id: "txn-1", partId: "part-hvac-filter", warehouseId: "wh-main", type: "used", quantity: -2, timestamp: "2026-08-26 9:20 AM", note: "WO-2024-00318 — Acme Facilities Inc." },
  { id: "txn-2", partId: "part-r410a", warehouseId: "wh-main", type: "used", quantity: -2, timestamp: "2026-08-26 9:40 AM", note: "WO-2024-00318 — Acme Facilities Inc." },
  { id: "txn-3", partId: "part-condenser-motor", warehouseId: "wh-north", type: "used", quantity: -1, timestamp: "2026-08-25 2:10 PM", note: "WO-2024-00324 — Pinecrest Offices" },
  { id: "txn-4", partId: "part-r410a", warehouseId: "wh-main", type: "received", quantity: 20, timestamp: "2026-08-24 11:00 AM", note: "Restock from supplier order #PO-1187" },
  { id: "txn-5", partId: "part-thermostat", warehouseId: "wh-north", type: "transferred", quantity: 5, timestamp: "2026-08-23 3:30 PM", note: "Transferred from Main Warehouse" },
  { id: "txn-6", partId: "part-backflow-valve", warehouseId: "wh-north", type: "used", quantity: -1, timestamp: "2026-08-22 10:15 AM", note: "WO-2024-00301 — Riverside Clinic" },
  { id: "txn-7", partId: "part-panel-cover", warehouseId: "wh-main", type: "adjusted", quantity: -1, timestamp: "2026-08-21 4:45 PM", note: "Cycle count correction" },
  { id: "txn-8", partId: "part-fire-extinguisher", warehouseId: "wh-main", type: "received", quantity: 9, timestamp: "2026-08-19 9:00 AM", note: "Restock from supplier order #PO-1180" },
];

export function getPartTransactions(partId: string) {
  return INVENTORY_TRANSACTIONS.filter((t) => t.partId === partId);
}
