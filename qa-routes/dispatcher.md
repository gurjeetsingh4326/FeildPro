# Dispatcher — routes

Customers, work orders, schedule, technicians, services. No Parts/
Inventory/Invoices/Payments/Reports/Users/Settings.

## Routes visible in the sidebar

| Screen | Route |
|---|---|
| Dashboard | `/` |
| Work Orders | `/work-orders` |
| Schedule | `/schedule` |
| Customers | `/customers` |
| Technicians | `/technicians` |
| Services | `/services` |

**Should be gone from the sidebar:** Parts, Inventory, Invoices, Payments,
Reports, Users & Roles, Settings.

## Sample detail-page IDs

**Work Orders** (`/work-orders/{id}`):
- `WO-2024-00318` — hero record, In Progress
- `WO-2024-00317` — Scheduled
- `WO-2024-00320` — On Hold
- `WO-2024-00319` — Draft (unassigned)

**Customers** (`/customers/{id}`):
- `cust-acme-facilities` — hero record, 2 contacts + 2 addresses
- `cust-union-coffee-co`
- `cust-northgate-mall`

**Technicians** (`/technicians/{id}`):
- `tech-1` — Maria Chen
- `tech-4` — Jordan Park

## Quick check

Open the assign-technician flow on `/work-orders/WO-2024-00319` (Draft, no
technician yet) — the Assign Technician drawer should list all 6
technicians.
