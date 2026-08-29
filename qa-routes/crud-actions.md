# CRUD actions per module

What Create/Update/Delete actions actually exist right now, and exactly
where to find them. Verified against the current code, not recalled from
memory.

**Important caveat for all of these:** there's no backend yet (that's
Phase 6) — every create/update action only changes local React state in
that browser tab. Refresh the page or navigate away and back, and it
resets to the seeded dummy data. This is expected, not a bug. It also
means there's no per-action permission check — if a role can reach a
screen at all, it can use every action on it.

Also: almost nothing here is a real "Delete." Field-service data is
rarely hard-deleted in practice, so the pattern throughout is **status
change** (Suspend, Cancel, Void-by-status) or **remove-a-line-item**
(a labor line, a contact) rather than removing a parent record entirely.

---

## Work Orders (`/work-orders`)

- **Create**: "New Work Order" button (top right) → modal — customer,
  service, priority, technician, date/time.
- **Update**: drag a card between Kanban columns to change status; or open
  a work order and use the header buttons below.
- **Delete**: none at the list level.

## Work Order Details (`/work-orders/{id}`)

- **Create**: "Add Labor" / "Add Part" (Labor & Parts tab) · post a note
  (Notes & Attachments tab) · "Add Photo" (simulated, adds a placeholder tile).
- **Update**: header buttons, contextual to current status — Assign
  Technician, Start Job, Complete Work Order, Put On Hold, Resume Job,
  Generate Invoice. "Reassign" in the right rail's Technician card.
- **Delete**: trash icon on a labor/part line row (removes that line only)
  · "Cancel" button → confirmation dialog → sets status to Cancelled.

## Customers (`/customers`)

- **Create**: "New Customer" button → modal.
- **Update / Delete**: none at the list level (no edit, no remove).

## Customer Profile (`/customers/{id}`)

- **Create**: "Add Contact" (Contacts tab) · "Add Address" (Addresses tab).
- **Update**: none (no edit-customer form).
- **Delete**: trash icon on a contact or address row.

## Technicians (`/technicians`)

- **Create**: "New Technician" button → modal.
- **Update / Delete**: none at the list level.

## Technician Profile (`/technicians/{id}`)

- Read-only — Overview / Availability / Performance tabs, no edit actions.

## Services (`/services`)

- **Create**: "New Service" button → modal.
- **Update**: pencil icon on a row → same modal, pre-filled (name,
  category, description, hours, price, status).
- **Delete**: none — set status to Inactive via the edit modal instead.

## Parts (`/parts`)

- **Create**: "New Part" button → modal.
- **Update**: pencil icon on a row → same modal, pre-filled.
- **Delete**: none — set status to Inactive via the edit modal instead.

## Inventory (`/inventory`)

- **Create / Delete**: none (parts themselves are managed on `/parts`).
- **Update**: "Adjust" button on a Stock Levels row → modal — Received /
  Used / Adjusted / Transferred, with a quantity and note. Writes a new row
  to the Transactions tab *and* updates that row's On Hand count at the
  same time.

## Invoices (`/invoices`)

- **Create**: "New Invoice" button → modal — customer, description,
  amount (creates a single-line-item Draft invoice).
- **Update / Delete**: none at the list level.

## Invoice Detail (`/invoices/{id}`)

- **Update**: "Mark as Sent" (Draft only) → "Record Payment" (Sent/Overdue
  only) — the only two forward status transitions; there's no going
  backward and no Void action.
- **Create / Delete**: none directly here (payments are recorded from the
  Payments module, see below).

## Payments (`/payments`)

- **Create**: "Record Payment" button → modal — pick an invoice (only
  Sent/Overdue ones are offered), amount auto-fills from that invoice's
  total, method, date.
- **Update / Delete**: none.

## Reports (`/reports`)

- Read-only. No create/update/delete anywhere on this page.

## Users & Roles (`/users`)

- **Create**: "Invite User" button → modal — name, email, role (creates
  status: Invited).
- **Update**: per-row `···` menu → "Change Role" (pick any of the 4 roles).
- **Delete**: per-row `···` menu → "Suspend" (routes through a confirmation
  dialog first) / "Reactivate" (no confirmation, since it's the
  low-stakes direction).

## Settings (`/settings`)

- **Update only**, three independent forms: Company Profile (Save
  Changes), Preferences (Save Changes), Notifications (toggle switches,
  save instantly on click — no separate Save button).
- **Create / Delete**: not applicable (singleton resource).

## Schedule (`/schedule`)

- **Update**: drag an appointment onto a different technician/time slot
  (Day view) or a different day (Week view); drag to/from the Unassigned
  tray to assign/unassign a technician.
- **Create / Delete**: none — appointments come from the seeded dummy
  data, not created here.

## Dashboard (`/`)

- **Create**: "New Work Order" button (top right) — same modal as the
  Work Orders page.
- Everything else on this page is read-only widgets.
