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

- [ ] Dashboard
- [ ] Dispatcher / Schedule (week/day/month, drag-and-drop)
- [ ] Work Orders (table + Kanban views)
- [ ] Work Order Details (tabs, timeline, labor/parts, attachments)
- [ ] Technician Mobile View (today's jobs, job execution flow)

## Phase 3 — Remaining Core Modules

- [ ] Customers (list, profile, contacts, addresses, history)
- [ ] Technicians (list, profile, skills, availability, performance)
- [ ] Services
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
