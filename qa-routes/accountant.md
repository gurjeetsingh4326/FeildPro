# Accountant — routes

Invoices, payments, financial reports. No Work Orders/Customers/
Technicians/Services/Parts/Inventory/Users/Settings.

## Routes visible in the sidebar

| Screen | Route |
|---|---|
| Dashboard | `/` |
| Invoices | `/invoices` |
| Payments | `/payments` |
| Reports | `/reports` |

**Should be gone from the sidebar:** Work Orders, Schedule, Customers,
Technicians, Services, Parts, Inventory, Users & Roles, Settings.

## Sample detail-page IDs

**Invoices** (`/invoices/{id}`) — spanning every status:
- `INV-5005` — Draft (linked to a Work Order — check the "Source" card in
  the right rail)
- `INV-4471` — Sent
- `INV-5007` — Sent, with tax + a discount line (multi-line-item example)
- `INV-4460` — Overdue (should show the red "overdue by N days" banner)
- `INV-4452` — Overdue
- `INV-4448` — Overdue
- `INV-4468` — Paid (has a linked payment — check the "Payments" card in
  the right rail)
- `INV-5002` — Paid

## Quick check

1. On `/invoices/INV-4460`, confirm the overdue banner reads "overdue by
   3 days" and the list's own "Days overdue" column agrees.
2. On `/payments`, click "Record Payment" — the invoice dropdown should
   only offer Sent/Overdue invoices (an already-Paid or still-Draft one
   shouldn't be pickable).
3. `/reports` should load with a populated Revenue Trend chart, Work Order
   Status donut, and Technician Performance table even though this role
   can't see the Technicians screen itself.
