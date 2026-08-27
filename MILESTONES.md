# FieldPro — Milestones

Tracks the major phases of the build. UI is being built first, entirely against
dummy data, before any backend work begins (see [PROJECT_STATUS.md](./PROJECT_STATUS.md)
for granular day-to-day status).

## Phase 0 — Design Foundation

- [x] Analyze all 7 reference images (`docs/theme_images/`)
- [x] Write design system documentation (`docs/DESIGN_SYSTEM.md` and companions)
- [x] Document design decisions & rationale (`docs/DESIGN_DECISIONS.md`)
- [x] User confirmation to proceed to implementation
- [x] Scaffold Next.js + TypeScript + Tailwind project
- [x] Implement design tokens in global CSS (`src/styles/tokens.css`, Tailwind v4 `@theme`) — light + dark, verified in-browser
- [x] Build base UI primitives (Button, Input, Select, Card, Badge, Table, Modal, Drawer, Toast, Tabs, Avatar, Tooltip, Skeleton) — plus ConfirmDialog. Verified in both themes via `/style-guide` + headless Playwright, zero console errors, production build passes.

## Phase 1 — App Shell & Navigation

- [x] Sidebar (expanded/collapsed/off-canvas states) + role-based nav visibility
- [x] Header (search, notifications, avatar menu)
- [x] Auth screens (Login, Forgot Password) — UI only, no real auth yet
- [x] Role switcher (dev-only tool for previewing Admin/Dispatcher/Technician/Accountant views against dummy data)
- [x] Placeholder pages for every nav destination so the shell is fully clickable ahead of Phase 2/3 content

## Phase 2 — Hero Screens (portfolio priority)

- [x] Dashboard — KPI row, revenue trend chart (7d/30d/90d), today's schedule, unassigned work orders, technician utilization, recent activity, outstanding invoices. Verified responsive from 320px to desktop, both themes.
- [x] Dispatcher / Schedule — Day board (technician-per-row × hourly grid), Week grid, read-only Month overview, real drag-and-drop (reassign technician/time, drag between days, drag to/from an unassigned tray) via dnd-kit. Responsive: Day/Week/Month toggle at xl+, week-only at md–lg, single-day read-only agenda below md. Verified both themes, and the drag interaction itself (not just static rendering) via automated pointer-event tests.
- [x] Work Orders — sortable/paginated table + Kanban board (5-column dispatch workflow) with real drag-and-drop status changes, search, status/priority filters with removable chips, and a working "New Work Order" form (React Hook Form + Zod). Mobile gets a stacked card list instead of the table, per `docs/RESPONSIVE_DESIGN.md`. Verified functionally (search/sort/filter/paginate/create/drag all exercised, not just rendered) across breakpoints and both themes.
- [x] Work Order Details — header with status-driven action buttons, Overview/Labor & Parts/Notes & Attachments/Timeline tabs, customer + technician + quick-facts right rail, and an Assign Technician drawer. One hand-curated "hero" work order for the portfolio screenshot; every other row derives a plausible detail view from its own table data. Verified functionally (tab switching, add/remove labor & parts, post a note, assign/reassign, status-change buttons, 404 for a bad id) across breakpoints and both themes, plus a full production build.
- [x] Technician Mobile View — below `md`, the Technician role gets a dedicated
  shell (top title bar + 56px bottom tab bar: Today/Jobs/Schedule/Profile, no
  sidebar) instead of the desktop admin shell, live-swapping on resize with no
  reload. Today screen: greeting + jobs-today/completed stats + chronological
  agenda cards (time, customer, address + distance, status). Job execution
  screen (same `/work-orders/[id]` URL as the desktop detail view, routed by
  role + breakpoint): Call/Navigate quick actions (`tel:`/Google Maps deep
  links), collapsible Labor/Parts/Notes/Photos sections with a simulated
  autosave "Saving…/Saved" indicator, and a pinned Start/Complete/Resume Job
  button. Jobs (all upcoming, grouped by date) and Profile (stats, contact,
  sign out) round out the tab bar. Verified functionally (tab navigation, add
  labor/part, status transitions, Call/Navigate hrefs, live shell swap on
  resize, no regression to the desktop admin/Work-Order-Details experience)
  in both themes against a full production build.

## Phase 3 — Remaining Core Modules

- [x] Customers — sortable/paginated/searchable list (status filter, "New
  Customer" form) plus a profile page (Overview/Contacts/Addresses/History
  tabs, right rail with quick facts + primary contact/address) at
  `/customers/[id]`. Mobile gets a stacked card list, matching the pattern
  established for Work Orders. Add/remove contacts and addresses is
  functional. Verified functionally (search/filter/sort/paginate/create, tab
  switching, add contact/address, the Work Order Details → Customer Profile
  "View profile" link, bad-id 404) across breakpoints and both themes, plus a
  full production build.
- [x] Technicians — sortable/paginated/searchable list (status filter, "New
  Technician" form) plus a profile page (Overview/Availability/Performance
  tabs, right rail with utilization + contact) at `/technicians/[id]`.
  Availability is a weekly hours grid; Performance shows KPI tiles (jobs
  completed, revenue, on-time rate, avg. job value) plus a recent-jobs list
  linking back to Work Order Details. Mobile gets a stacked card list.
  Verified functionally (search/filter/sort/create, tab switching, the Work
  Order Details → Technician Profile "View profile" link, bad-id 404) across
  breakpoints and both themes, plus a full production build.
- [x] Services — the service catalog work orders are built from. Sortable/
  searchable/filterable (category, status) list with inline edit (row pencil
  icon) and a single reusable create/edit modal, no separate detail page (a
  lighter scope than Customers/Technicians — a catalog entry, not a
  relationship-bearing entity). The New Work Order form's service dropdown
  now sources from this catalog instead of its own separate hardcoded list.
  Verified functionally (search/filter/sort/create/edit, the New Work Order
  integration) across breakpoints and both themes, plus a full production
  build.
- [ ] Parts & Inventory
- [ ] Invoices
- [ ] Payments
- [ ] Reports (revenue, WO stats, technician performance, utilization, resolution time, FTF rate, CSAT, outstanding invoices)

## Phase 4 — Administration

- [ ] Users & Roles
- [ ] Settings
- [ ] Empty/loading/error state pass across every screen
- [ ] Full responsive pass (tablet/mobile) across non-hero screens

## Phase 5 — UI Polish & QA

- [ ] Design system consistency audit against `docs/` (colors, spacing, type, components)
- [ ] Accessibility pass (focus states, contrast, keyboard nav)
- [ ] Dark mode QA across every screen
- [ ] Dummy-data realism pass for portfolio screenshots (Section 14 hero screens especially)

## Phase 6 — Backend (not started until Phase 0–5 UI is approved)

- [ ] Next.js API routes (Route Handlers) scaffold + Prisma ORM schema (SQL Server)
- [ ] Auth (JWT) + role-based authorization
- [ ] Service layer, DTOs/typed schemas (Zod), validation, error handling
- [ ] Pagination/filtering/sorting/search on list endpoints
- [ ] Audit logging
- [ ] Wire frontend off dummy data onto real API, module by module
- [ ] End-to-end workflow test: Customer → Work Order → Assignment → Schedule → Labor/Parts → Completion → Invoice → Payment → Customer history update

## Phase 7 — Launch Readiness

- [ ] Seed/demo data set for portfolio walkthrough
- [ ] Deployment
- [ ] Portfolio screenshot capture (the 5 hero screens)
