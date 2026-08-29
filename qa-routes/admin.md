# Admin — routes

Full access. Every sidebar item should be visible.

## Routes

| Screen | Route |
|---|---|
| Dashboard | `/` |
| Work Orders | `/work-orders` |
| Schedule | `/schedule` |
| Customers | `/customers` |
| Technicians | `/technicians` |
| Services | `/services` |
| Parts | `/parts` |
| Inventory | `/inventory` |
| Invoices | `/invoices` |
| Payments | `/payments` |
| Reports | `/reports` |
| Users & Roles | `/users` |
| Settings | `/settings` |

## Sample detail-page IDs

**Work Orders** (`/work-orders/{id}`) — spanning statuses:
- `WO-2024-00318` — hero record, In Progress, full labor/parts/notes/photos
- `WO-2024-00319` — Draft
- `WO-2024-00317` — Scheduled
- `WO-2024-00320` — On Hold
- `WO-2024-00316` — Completed
- `WO-2024-00315` — Invoiced
- `WO-2024-00312` — Paid
- `WO-2024-00301` — Cancelled

**Customers** (`/customers/{id}`) — all 13:
`cust-acme-facilities`, `cust-union-coffee-co`, `cust-northgate-mall`,
`cust-downtown-office-tower`, `cust-riverside-clinic`,
`cust-bright-start-daycare`, `cust-lakeside-apartments`,
`cust-green-valley-school`, `cust-harbor-view-hotel`,
`cust-pinecrest-offices`, `cust-cedar-ridge-apartments`,
`cust-metro-bank-branch`, `cust-sunrise-senior-living`

**Technicians** (`/technicians/{id}`) — all 6:
- `tech-1` — Maria Chen, Senior HVAC Technician
- `tech-2` — Sam Torres, Electrical Technician
- `tech-3` — Dana Lee, Plumbing Technician
- `tech-4` — Jordan Park, Fire & Safety Technician
- `tech-5` — Alex Kim, HVAC Technician
- `tech-6` — Chris Nguyen, Electrical Technician (status: On Leave)

**Invoices** (`/invoices/{id}`) — spanning statuses:
- `INV-5005` — Draft
- `INV-4471` — Sent
- `INV-5007` — Sent, with tax + discount line items
- `INV-4460` — Overdue
- `INV-4468` — Paid
