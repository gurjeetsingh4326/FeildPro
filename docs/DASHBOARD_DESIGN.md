# FieldPro — Dashboard & Hero Screen Design

This doc governs the 5 portfolio hero screens called out in the brief — these get
disproportionate visual polish; everything else (Settings, Users & Roles, etc.)
follows the base component/pattern docs without extra elaboration.

1. Dashboard
2. Dispatcher / Schedule
3. Work Orders (list/board)
4. Work Order Details
5. Technician Mobile View

## 1. Dashboard

Composition, top to bottom:

```
Page header: "Good morning, {name}" + today's date, primary "New Work Order" CTA (right)
KPI row: 4 cards — Open Work Orders · Scheduled Today · Revenue (MTD) · Avg. Resolution Time
  each with a trend delta and a small sparkline (echoes theme6/theme7's KPI-card language)
Main row (2/3 + 1/3 split):
  Left: "Work Orders by Status" or "Revenue Trend" area/line chart (7/30/90-day range toggle)
  Right: "Today's Schedule" agenda list (next 5 appointments, technician avatar + time)
Second row (3 columns):
  "Unassigned Work Orders" quick-action list · "Technician Utilization" horizontal bar list · "Recent Activity" timeline feed
Third row:
  "Outstanding Invoices" compact table (customer, amount, days overdue, status badge) with "View all" link
```

KPI cards, chart cards, and list cards all share the base Card spec
(COMPONENT_GUIDELINES.md). This is the one screen allowed to use the **Display**
type scale, and only for the greeting line — KPI values still use **KPI number**, not Display.

## 2. Dispatcher / Schedule

- Default view: Week, with Day/Month toggle (segmented control, top-right) —
  reflects the calendar density seen across references while staying legible.
- Left rail (or top drawer on smaller screens): technician list as filter
  checkboxes, each with a color swatch used consistently for that technician's
  appointment blocks across the whole calendar.
- Calendar grid: technician-per-row (dispatcher board) OR time-per-row
  (single-technician day view) — dispatcher board is the default since dispatchers
  manage many technicians at once.
- Drag-and-drop appointment blocks (see UI_PATTERNS.md → Assignment & scheduling).
- Unassigned jobs tray docked at the bottom or right, draggable onto the grid.

## 3. Work Orders

- Default view: Table. Secondary view: Kanban board grouped by status (toggle in
  toolbar, `LayoutGrid`/`List` icons). Both share filter/search toolbar (UI_PATTERNS.md).
- Table columns: WO # (mono) · Customer · Service · Priority badge · Status badge ·
  Technician (avatar+name) · Scheduled date · Total — sortable where meaningful.
- Kanban columns = status vocabulary from COMPONENT_GUIDELINES.md status badges table.

## 4. Work Order Details

Follows the Detail page pattern (UI_PATTERNS.md):

- Header: WO # + customer name, status badge, priority badge, primary actions
  (Assign Technician / Complete / Generate Invoice — contextual to current status).
- Left column (tabs): Overview (customer, service, description, appointment) ·
  Labor & Parts (line-item tables with running total) · Notes & Attachments (photo
  grid, per UI_PATTERNS.md) · Timeline (audit trail).
- Right rail: Customer card (contact, address, "View profile" link, open WO/invoice
  counts), Technician card (assigned tech, reassign action), Quick facts
  (created date, source, appointment window).

## 5. Technician Mobile View

- "Today" screen: agenda list of assigned jobs, each a compact card (time,
  customer, address distance, status), tap to open.
- Job detail: customer/address/service at top (with "Call" and "Navigate" quick
  actions using `Phone`/`MapPin` icons — `tel:`/maps deep links), large Start/Complete
  action pinned bottom, then Labor / Parts / Notes / Photos as collapsible sections.
- Everything sized for one-handed thumb use per RESPONSIVE_DESIGN.md.

## Chart styling (applies to all charts, Recharts-based)

- Line/area charts: 2px stroke, `primary` (or the fixed data-viz sequence for
  multi-series). Area fill is a linear gradient from the stroke color at **18%**
  opacity at the top to **0%** at the bottom — a deliberately subtle nod to the
  gradient-area charts in every reference image, without their saturated glow.
- Bar charts: flat fill (no gradient), `radius-sm` on top corners only, 1 bar
  color per series from the fixed sequence.
- Donut/pie charts: used sparingly (status/category breakdowns only), flat fills
  from the fixed sequence, center label shows the primary total (echoes theme1/theme3's
  center-label donut, minus the glow), legend to the side as a color-dot list.
- Grid lines: horizontal only, `border` color at low opacity, no vertical grid.
- Axis labels: Small type style, `text-muted`.
- Tooltip: `surface-elevated` card, `shadow-md`, `radius-md`, shows exact value +
  label, appears on hover with no animation delay.
- No 3D, no glossy/beveled chart surfaces, no drop-shadow-under-the-line glow
  effects seen in the reference images — flat, precise, print-legible.

## What makes these 5 screens "hero" quality

Consistent alignment to the 4px grid, tabular numerals everywhere numeric, no
orphaned/empty card states in the portfolio screenshots (populate dummy data
generously and realistically), and restraint — the polish comes from precision
and consistency, not from extra ornamentation.
