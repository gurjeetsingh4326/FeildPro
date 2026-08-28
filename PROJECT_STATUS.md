# FieldPro — Project Status

Live snapshot of where things stand. Update this whenever a milestone item
completes or the current focus changes — see [MILESTONES.md](./MILESTONES.md) for
the full phased checklist this rolls up from.

## Current phase

**Phase 0 through Phase 3 are complete.** All 5 portfolio hero screens and
all 7 Phase 3 modules (Customers, Technicians, Services, Parts & Inventory,
Invoices, Payments, Reports) are built and verified. Phase 4
(Administration) is next.

## Last updated

2026-08-28

## What's done

- Reviewed all 7 reference images in `docs/theme_images/`.
- Authored the full design system doc set in `docs/`:
  `DESIGN_SYSTEM.md`, `COLOR_SYSTEM.md`, `TYPOGRAPHY.md`, `SPACING_AND_LAYOUT.md`,
  `COMPONENT_GUIDELINES.md`, `UI_PATTERNS.md`, `RESPONSIVE_DESIGN.md`,
  `ICON_GUIDELINES.md`, `DASHBOARD_DESIGN.md`, `DESIGN_DECISIONS.md`.
- Confirmed stack per latest direction: **Next.js + Tailwind CSS + RxJS** on the
  frontend, and **Next.js API routes (Route Handlers) + Prisma ORM + SQL Server**
  on the backend — a single Node/Next.js-based system, replacing the originally
  proposed ASP.NET Core / EF Core backend (see `docs/DESIGN_DECISIONS.md` →
  "Stack note").
- Established UI-first build order: full UI against realistic dummy data before
  any backend work begins.
- Scaffolded the Next.js 16 + TypeScript + Tailwind v4 (App Router, `src/` dir)
  project at the repo root (`package.json` name: `fieldpro`).
- Implemented the full design token set as CSS custom properties + Tailwind v4
  `@theme` mapping in `src/styles/tokens.css` (imported from `src/app/globals.css`),
  covering color (light + dark), radius, shadow, z-index, and sidebar/header
  layout dimensions — matches `docs/COLOR_SYSTEM.md` and `docs/SPACING_AND_LAYOUT.md`.
- Wired Inter + JetBrains Mono via `next/font/google` in `src/app/layout.tsx`,
  plus a user-toggleable dark mode (`.dark` class, `localStorage`-persisted,
  anti-FOUC inline script) via `src/components/theme-toggle.tsx`.
- Built the full base primitive set in `src/components/ui/`: `Button` (4
  variants, 3 sizes, loading/disabled), `Badge`/`PriorityBadge`, `Card` family,
  `Input`/`Label`/`FieldError`/`FieldHelperText`, `KpiCard`, `Select`, `Table`
  (+ `SortableTableHead`), `Modal`, `Drawer`, `ConfirmDialog`, `Tabs` (underline
  + pill variants), `Avatar`/`AvatarStack`, `Tooltip`, `Skeleton`. Select/Modal/
  Drawer/Tabs/Avatar/Tooltip/Toast are built on Radix UI primitives for
  accessible focus-trap/portal/keyboard behavior. Utility: `cn()` in `src/lib/utils.ts`.
- Built `Toast` on an RxJS event bus (`src/lib/toast-bus.ts`) so any component
  can call `toast(...)` without prop-drilling a context — first real use of RxJS
  in the stack. `Toaster` mounted once in the root layout alongside `TooltipProvider`.
- Added `tw-animate-css` (Tailwind v4-compatible enter/exit animation utilities)
  for Modal/Drawer/Select/Toast/Tooltip transitions.
- Added a `/style-guide` page exercising every token and primitive (including
  interactive demos for Select/Tabs/Modal/Drawer/Toast/ConfirmDialog); verified
  headlessly with Playwright in both themes, plus a full production build
  (`npm run build`) — zero console errors, zero type errors.
- Fixed a real dark-mode contrast bug found during verification: Avatar/KPI-icon-tile/
  primary-Badge chips were reusing `--primary-light` (tuned for barely-there
  row/nav-item tinting, ~16% opacity) as their fill, which was nearly invisible
  in dark mode. Added a dedicated `--chip-bg`/`--chip-text` token pair (calibrated
  to read clearly as a small solid chip in both themes) and switched those three
  components to it. `docs/COLOR_SYSTEM.md` doesn't yet document this new token —
  noted below.

- Built the Phase 1 app shell: `src/lib/roles.ts` + `src/lib/nav-config.ts` (role
  → nav-item visibility, mirroring the project brief's Section 12 access lists
  exactly — e.g. Dispatcher gets Customers/Work Orders/Schedule/Technicians/Services
  but not Parts/Inventory/Reports, per the brief) and `src/lib/role-context.tsx`
  (dev-only `RoleProvider`, localStorage-persisted, swappable via the header's
  `RoleSwitcher` — disappears once Phase 6 wires real auth).
- Built `src/components/layout/`: `Sidebar` (desktop, expanded 260px / collapsed
  72px icon-rail, `lg`+ only) and `MobileSidebar` (off-canvas Radix Dialog drawer
  below `lg`, triggered from the header hamburger — both share one `SidebarNav`
  so they can't drift out of sync), `Header` (derived page title, search,
  `RoleSwitcher`, notifications, help, theme toggle, avatar dropdown menu),
  `RoleSwitcher`, `PlaceholderPage`. Added `DropdownMenu` primitive
  (`src/components/ui/dropdown-menu.tsx`, Radix-based) for the avatar/role menus.
- Route structure: `(app)` route group (shell layout + `RoleProvider`) holds
  Dashboard (`/`, real KPI cards + a "more in Phase 2" note) and placeholder
  pages for all 12 other nav destinations; `(auth)` route group (no shell) holds
  `/login` and `/forgot-password`, both real React Hook Form + Zod forms that
  redirect/succeed against dummy data (no backend yet). Deleted the old default
  Next.js starter `src/app/page.tsx`, superseded by `(app)/page.tsx`.
- Verified via full production build (17 routes, zero type errors) and headless
  Playwright across desktop (1440px), mobile (390px), light, and dark — including
  clicking through role switching, the avatar menu, and the mobile drawer.
- Two real bugs found and fixed during verification:
  1. Sidebar nav (13 items) overflowed its scrollable area by ~40px on common
     900px-tall viewports, clipping "Reports" against the Administration section
     with no visible scroll affordance. Fixed by tightening nav item height
     40px→36px and section gaps 20px→16px — content now fits with zero overflow.
  2. The role-switcher's two-line dropdown items (label + description) overflowed
     the shared `DropdownMenuRadioItem`'s fixed 36px height and overlapped the
     next item. Fixed the shared component's indicator to center via
     `top-1/2 -translate-y-1/2` instead of flex-centering (so it no longer
     assumes single-line content) and gave the role items `h-auto py-2.5`.
- Fixed a doc/code mismatch: `RESPONSIVE_DESIGN.md`'s documented KPI-card grid
  breakpoints (1 col below `md`, 2 at `md`–`lg`, 4 at `xl`+) didn't match the
  implemented `grid-cols-2 sm:grid-cols-4` — aligned the Dashboard and style-guide
  KPI grids to the documented breakpoints.

- Fixed a real polish bug the user flagged directly: the sidebar/mobile-drawer
  nav's default OS scrollbar looked jarring against the dark `--sidebar-bg` on
  shorter viewports where the nav overflows. Added `.scrollbar-thin` (theme-
  adaptive, for light-background scroll areas: main content, drawer bodies,
  table horizontal scroll) and `.scrollbar-thin-dark` (fixed light tint, for
  the always-dark sidebar/drawer nav) utilities in `globals.css`, applied
  wherever content can genuinely overflow.
- Built the Dashboard hero screen (`(app)/page.tsx`): greeting header + "New
  Work Order" CTA, 4 KPI cards, a Recharts revenue-trend area chart with a
  7d/30d/90d pill-tab range switch (`src/components/dashboard/revenue-trend-card.tsx`),
  today's schedule agenda, unassigned work orders quick-assign list, technician
  utilization (color-coded by load), a recent-activity timeline, and an
  outstanding-invoices widget. Added two new reusable primitives it needed:
  `Progress` and `Timeline`/`TimelineItem` (the latter will be reused for Work
  Order Details' Timeline tab next). Added `src/lib/types.ts` (shared domain
  types — WorkOrder/Appointment/Invoice/etc. — that dummy data and eventual API
  DTOs both conform to) and `src/lib/dummy-data/dashboard.ts`.
- Chart color values reference `src/styles/tokens.css`'s hand-written raw custom
  properties (`var(--primary)`, `var(--border)`, `var(--text-muted)`) rather than
  the `--color-*` names generated by the `@theme inline` block — Tailwind v4's
  `inline` option may inline literal values into utility classes instead of
  keeping `--color-*` as real usable custom properties, which would have broken
  the chart's inline SVG styling silently. Worth remembering for any future
  inline-styled (non-Tailwind-class) color usage.
- Responsiveness was explicitly called out by the user as a priority for this
  round, so verified every new screen at 320/390/768/1024/1440px in both themes
  (headless Playwright, zero horizontal overflow, zero console errors) — not
  just the two standard breakpoints checked previously. Found and fixed two real
  issues this surfaced: the "Unassigned Work Orders" card header wrapped
  title/subtitle awkwardly at 3-column card width (now stacks vertically), and
  the header's right-side icon cluster (dev-only RoleSwitcher + Help icon) left
  no room for the page title below ~400px (both now hidden below `sm`, keeping
  notifications/theme/avatar as the essential mobile trio). Outstanding
  Invoices renders as a proper stacked card-list below `sm` rather than a
  horizontally-scrolling table, per `docs/RESPONSIVE_DESIGN.md`'s documented
  table pattern — first real use of that pattern, to be reused for the full
  Work Orders table next.

- Built the Dispatcher/Schedule hero screen: a Day board (technician rows ×
  hourly columns, `src/components/schedule/day-board.tsx`), a Week grid (day
  columns, `week-grid.tsx`), a read-only Month overview (`month-grid.tsx`), and
  a mobile day agenda (`mobile-day-agenda.tsx`), all driven by
  `src/lib/dummy-data/schedule.ts` (6 technicians with fixed per-technician
  colors, one week of appointments). Real drag-and-drop via `@dnd-kit/core`:
  reassign an appointment's technician/time by dropping it on a Day-board cell,
  reschedule to a different day by dropping it on a Week-grid column, and
  assign/unassign via a draggable unassigned-jobs tray — each drop fires a
  confirming toast and updates state immediately.
- **Three real bugs found while getting drag-and-drop actually working** (not
  just visually plausible — verified by dispatching real pointer events and
  checking dnd-kit's internal `isOver`/`isDragging` state, not just screenshots):
  1. dnd-kit's `DndContext` assigns internal ids (`aria-describedby`) via a
     module-level counter, not React's SSR-safe `useId()`, so the server- and
     client-rendered value can genuinely differ across a fresh Next.js process
     — a hydration-mismatch warning on every load. Fixed by opting the whole
     schedule view out of SSR (`next/dynamic` with `ssr: false`, via a small
     Client Component wrapper since `ssr: false` isn't allowed directly in a
     Server Component page file) — it's an inherently client-only interaction
     with no SEO value lost.
  2. Dragging a chip out of the unassigned tray or the day board made it
     **vanish** — both containers use `overflow-x-auto`/`overflow-y-auto`, and
     a CSS-transformed child moving outside an overflow-clipped ancestor's
     bounds gets clipped from view, even though dnd-kit still tracks it
     correctly. Fixed with dnd-kit's `DragOverlay` (portaled outside all
     scroll containers) — the original item now just dims in place as a
     placeholder while the overlay shows the actual moving chip.
  3. The real root cause of drops not registering at all: the responsive
     layout had three CSS `hidden md:block`-style blocks for Day/Week/Month at
     different breakpoints, but **CSS `display:none` doesn't unmount a
     component** — so multiple copies of `WeekGrid`/`UnassignedTray` were
     simultaneously mounted and registered under the *same* droppable id with
     dnd-kit's global registry, corrupting collision detection for all of
     them. Fixed by adding `src/hooks/use-breakpoint.ts` (a `matchMedia`-based
     hook) and rendering exactly one variant at a time based on actual
     breakpoint, instead of three parallel CSS-hidden ones. This is a real
     trap worth remembering for any future component that registers into a
     global keyed system (drag-and-drop, portals, singleton observers) — CSS
     responsive variants are safe for plain markup, not for those.
- Also fixed, from the same responsiveness push: the day-navigation buttons/
  label/"Today" button were gated on `view === "day"`, which is a `view`-state
  check that doesn't track which layout is *actually* rendered at the current
  breakpoint (e.g. at md–lg the week grid is force-shown regardless of `view`)
  — could show day-nav controls that silently did nothing, or hide them on
  mobile where the single-day agenda always needs them. Split into
  breakpoint-scoped controls that mirror the same one-variant-at-a-time logic.
- Fixed a real layout gap the user flagged directly: no page used a max-width
  container, so grid-based pages (Dashboard, Schedule) stretched full-bleed on
  wide monitors — KPI cards ballooning to ~600px each at 2560px, etc. This was
  actually already anticipated in `docs/RESPONSIVE_DESIGN.md`'s 2xl breakpoint
  row ("content does not stretch full-bleed") but never implemented. Fixed
  once at the `(app)` layout level (`max-w-[1600px] mx-auto` wrapping
  `{children}` inside `<main>`) so every current and future page gets it for
  free rather than each needing its own cap; the header stays full-width
  (standard pattern — chrome spans edge-to-edge, content sits in a bounded
  reading column). Updated `docs/SPACING_AND_LAYOUT.md`'s "Page content
  max-width" row to match (was documented as "none (fluid)"). Verified at
  2560px (Dashboard, Schedule) and confirmed zero visual change at 1440px/
  1024px, where content was already under the cap.
- Built the Work Orders hero screen: sortable/paginated table
  (`src/components/work-orders/work-orders-table.tsx`) and a 5-column Kanban
  board (`kanban-board.tsx`, Draft/Scheduled/In Progress/On Hold/Completed —
  Invoiced/Paid/Cancelled are terminal/financial states left to the table and
  the future Invoices module) with real drag-and-drop status changes, search,
  removable status/priority filter chips, and a working "New Work Order" form
  (`new-work-order-modal.tsx`, React Hook Form + Zod). Reused the Schedule
  page's SSR-safe dnd-kit pattern (`work-orders-loader.tsx` dynamically
  imports the view with `ssr: false`) from the start this time instead of
  discovering the hydration-mismatch issue again. Backed by
  `src/lib/dummy-data/work-orders.ts` (24 work orders) and
  `src/lib/work-order-status.ts` (shared status→badge-variant mapping, will
  be reused by Work Order Details next).
- **Found and fixed a real z-index bug** while testing the "New Work Order"
  modal's Customer/Service `Select` dropdowns: any dropdown opened from
  *inside* a Modal rendered visually behind the modal's own backdrop and was
  unclickable. The scale had `--z-dropdown: 1000` below `--z-modal-backdrop:
  1300` — correct for a dropdown triggered from the plain page, wrong for one
  nested inside a modal, since transient popover content needs to render
  above whatever context opened it. Reordered `src/styles/tokens.css`'s scale
  so `--z-dropdown` (1300) sits above `--z-modal` (1260), with Toast/Tooltip
  still highest. This is exactly the kind of bug that's invisible in a static
  screenshot and only shows up when a flow is actually driven end-to-end —
  caught here because the New Work Order form was exercised for real
  (selecting a customer, submitting, checking the confirmation toast) rather
  than just screenshotted while closed.
- Also fixed a responsiveness gap this surfaced: the 8-column table has no
  reasonable phone-width layout even with horizontal scroll, so added
  `work-orders-mobile-list.tsx` — a stacked card list below `md`, matching the
  pattern already established for the Dashboard's Outstanding Invoices widget
  and exactly what `docs/RESPONSIVE_DESIGN.md`'s table row already specified.
  Confirmed tablet (768–1023px) correctly keeps the horizontal-scrolling full
  table per that same doc row ("full table, horizontal scroll if needed").
- Added a placeholder at `/work-orders/[id]` so the table/Kanban/mobile-list's
  work-order links go somewhere real instead of a 404 ahead of building the
  actual Work Order Details page next.

- Built the Work Order Details hero screen (`(app)/work-orders/[id]/page.tsx`
  + `src/components/work-order-detail/`): a header with status-driven action
  buttons (Assign/Start/Complete/Resume/Generate Invoice/Put On Hold/Cancel,
  each gated on the current status) over Overview / Labor & Parts / Notes &
  Attachments / Timeline tabs, plus a right rail (customer contact + open-WO/
  spend stats, assigned technician, quick facts). Labor/parts lines and notes
  use real React Hook Form + Zod add-flows with live-recalculated subtotals;
  Assign/Reassign opens a technician-picker `Drawer` reusing the Schedule
  module's `TECHNICIANS` list. `src/lib/dummy-data/work-order-detail.ts` hand-
  curates one fully-detailed "hero" work order (WO-2024-00318) for the
  portfolio screenshot and derives a plausible-but-simpler detail view for
  every other row from its own table fields, so every link in the table/
  Kanban/mobile-list leads somewhere real. Added `not-found.tsx` for the
  `(app)` route group so an invalid work-order id 404s inside the app shell
  instead of falling through to the bare framework default.
- **Two real bugs found and fixed during verification, both pre-existing in
  the last commit (not introduced by this screen) and invisible in a static
  screenshot:**
  1. `next build` failed on *every* `(app)` page with "Slot failed to slot
     onto its children" — `Button`'s `asChild` mode rendered two children
     into Radix's `Slot` (`{loading ? <Loader2/> : null}` followed by
     `{children}`), and Slot requires exactly one. Only surfaced once
     something in the codebase actually used `<Button asChild>` (the new
     `not-found.tsx`, wrapping a `Link`) — every earlier hero screen happened
     to avoid that combination. Fixed by only rendering the loading-spinner
     branch when `!asChild`, so Slot always receives exactly `children`.
  2. Labor/parts subtotals used bare `.toLocaleString()` on `hours × rate`
     figures, which renders `$142.5` instead of `$142.50` whenever the result
     isn't a whole dollar amount (e.g. 1.5 hours × $95/hr) — never noticed on
     other screens because their dummy `total` fields all happen to be
     pre-rounded integers. Fixed with a shared `formatMoney()` helper
     (`minimumFractionDigits`/`maximumFractionDigits: 2`) used across all five
     money figures in `wo-labor-parts-tab.tsx`.
- Also reverted an unrelated in-progress, uncommitted experiment in
  `src/app/layout.tsx` that had swapped the anti-FOUC theme-init script from
  a raw `<script dangerouslySetInnerHTML>` in `<head>` to a `next/script`
  `beforeInteractive` component in `<body>` — the swap produced a real (if
  dev-only) console warning on the not-found path. Confirmed via
  `node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md`
  that the original raw-`<script>`-in-`<head>` pattern is this Next.js
  version's documented, correct approach for anti-FOUC scripts; applied that
  doc's `type="text/javascript"` (server) / `type="text/plain"` (client) +
  `suppressHydrationWarning` refinement on top, which is the documented fix
  for React's dev-mode "rendering produces `<script>` tags" warning.
- Verified via full production build (19 routes, zero type errors — 18
  static, `/work-orders/[id]` correctly dynamic) and headless Playwright
  across desktop (1440px)/tablet (768px)/mobile (390px) and both themes: tab
  switching, add/remove labor and parts with live subtotal recalculation,
  posting a note, assigning and reassigning a technician, every status-change
  button, and the invalid-id 404 path — against both the hand-curated hero
  record and a plain derived one, not just the hero screenshot.

- Built the Technician Mobile View hero screen — the last of the 5. Per
  `docs/RESPONSIVE_DESIGN.md`, FieldPro ships two responsive experiences off
  one codebase: below `md`, the Technician role now gets a dedicated shell
  (`src/components/technician-mobile/technician-shell.tsx`: minimal title bar
  + 56px bottom tab bar — Today/Jobs/Schedule/Profile) instead of the admin
  sidebar+header shell. The swap lives in a new
  `src/components/layout/app-shell.tsx` (role from `useRole()`, breakpoint
  from the existing `useBreakpoint()` hook), which `(app)/layout.tsx` now
  renders instead of its old inline Sidebar/Header JSX — every other role/
  breakpoint combination is pixel-identical to before.
  - **Today** (`/today`): greeting header, jobs-today/completed stat tiles,
    and a chronological agenda of compact job cards (time, customer, address
    + a fabricated distance, status) — reuses the existing `Card`/`Badge`
    primitives via a new shared `JobCard`.
  - **Job execution** reuses the *same* `/work-orders/[id]` URL as the
    desktop Work Order Details page — a new `WorkOrderDetailRouter` client
    component picks between the existing `WorkOrderDetailView` and a new
    `JobExecutionView` based on role + breakpoint, so resizing the window
    swaps experiences live with no reload and no route duplication.
    `JobExecutionView` has customer/service header with Call (`tel:`) and
    Navigate (Google Maps deep link) quick actions, a simulated
    Saving…/Saved autosave indicator (per `docs/UI_PATTERNS.md`'s autosave
    spec for this flow) that fires on every labor/part/note/photo edit, and
    Labor/Parts/Notes/Photos as collapsible sections — a new
    `src/components/ui/collapsible.tsx` primitive (`@radix-ui/react-collapsible`,
    the first new Radix dependency since Phase 0) built to match the existing
    primitive-wrapper conventions. The Add Labor/Add Part modals are reused
    directly from the desktop `wo-labor-parts-tab.tsx` (now exported) rather
    than duplicated. A large pinned Start/Complete/Resume Job button sticks
    to the bottom of the scrollable content, above the tab bar.
  - **Jobs** (`/jobs`) and **Profile** (`/profile`) round out the tab bar —
    all upcoming jobs grouped by date, and a stats/contact/sign-out screen,
    respectively. **Schedule** reuses the existing `/schedule` route as-is
    (already collapses to a single-day agenda below `md`).
  - New dummy-data layer: `src/lib/dummy-data/technician.ts` derives today's
    and upcoming jobs for a technician from the existing `WORK_ORDERS` array
    (added 5 new entries for Maria Chen — one already-completed, one
    in-progress reusing the existing WO-2024-00318 hero record, two later
    today, two on following days — so Today reads as a realistic full day
    rather than a single sparse card, per `docs/DASHBOARD_DESIGN.md`'s "no
    orphaned/empty states" rule).
  - **One real bug found and fixed during verification**: `JobCard` stacked
    the time and status badge in a fixed `w-16` column, and "In Progress"
    (the longest status label) wrapped onto two lines inside it, badly
    misaligned — invisible for every other status (all shorter) and so not
    caught until the specific in-progress card was screenshotted. Fixed by
    moving the badge out of the fixed-width time column onto its own
    full-width row under the service line.
  - Verified via full production build (22 routes) and headless Playwright:
    role switched to Technician at 390px in both themes — Today's agenda,
    opening a job, Call/Navigate `href`s, expanding a collapsible and adding
    a part (autosave indicator fires), the in-progress → completed status
    transition, and tab-bar navigation to Jobs/Schedule/Profile; confirmed
    the shell swaps live on resize (390→1024→390, no reload) with zero
    console errors; confirmed zero regression to the desktop admin shell and
    the existing Work Order Details tabs UI at 1440px for every role.
  - **Note**: `npm run lint` (ESLint's React Compiler rules) surfaces 6
    pre-existing errors in code untouched by this session (`theme-toggle.tsx`,
    `role-context.tsx`, `work-orders-view.tsx`, and two `Date.now()` calls in
    `wo-labor-parts-tab.tsx` predating this session's export-only edits there)
    — `setState`-in-effect and impure-function-during-render warnings from a
    stricter ruleset than `next build`'s own linting enforces. Left as-is
    since fixing them wasn't in scope for this screen; worth a dedicated pass
    since `npm run lint` has apparently never been part of this project's
    verification loop so far.

- Built the Customers module — the first Phase 3 module, and the first screen
  built outside the 5 hero screens, so to the lighter "follows the base
  component/pattern docs without extra elaboration" bar `docs/DASHBOARD_DESIGN.md`
  sets for everything past the hero set (still fully functional and verified,
  just without the hero screens' extra polish investment).
  - **List** (`/customers`): the same search/filter/sort/paginate/table-vs-
    mobile-card-list skeleton as Work Orders (`docs/UI_PATTERNS.md`'s generic
    list/table pattern), a status filter (Active/Inactive), and a "New
    Customer" form. No Kanban/drag-and-drop needed here, so — unlike Work
    Orders — no SSR-opt-out workaround was required.
  - **Profile** (`/customers/[id]`): the standard detail-page skeleton
    (`docs/UI_PATTERNS.md`) — two-column at `xl`+, right rail collapses below
    primary content first. Overview / Contacts / Addresses / History tabs;
    Contacts and Addresses support add/remove (Zod + React Hook Form modals,
    reusing the same primitives as Work Order Details' Add Labor/Add Part);
    History lists the customer's work orders linking back to
    `/work-orders/[id]`.
  - New `src/lib/dummy-data/customers.ts` is now the single source of truth
    for customer contact/address data — one hand-curated hero customer (Acme
    Facilities Inc., matching the existing Work Order Details hero record)
    plus 12 derived ones, with helpers (`getCustomerStats`, etc.) computed
    from the existing `WORK_ORDERS` array. Refactored
    `work-order-detail.ts` (Work Order Details) and `new-work-order-modal.tsx`
    (Work Orders) to source customer address/contact/name data from here
    instead of their own separate hardcoded copies — the kind of duplication
    that's easy to let drift once a second consumer shows up.
  - **One real data-consistency bug found and fixed during verification**:
    the Work Order Details hero record (`HERO_DETAIL` in
    `work-order-detail.ts`) had customer stats (`openWorkOrders: 2,
    totalSpend: 8420`) hand-typed as static literals back when that screen
    was built — never wrong on its own, but once the new Customer Profile
    page computed the *same* customer's stats from the live `WORK_ORDERS`
    array, the two pages showed different numbers ($8,420 vs. the correct
    $1,520) for the same customer, one click apart via the new "View profile"
    link. Fixed by computing `HERO_DETAIL`'s customer stats from
    `getCustomerStats()` too, so both pages now always agree — a good
    illustration of why hand-typed derived numbers are risky once a second
    screen starts computing the same thing from the source data.
  - Also wired the Work Order Details right rail's "View profile" link (a
    placeholder pointing at bare `/customers` since before Customer Profile
    pages existed) to the actual `/customers/[id]` URL.
  - Verified via full production build (23 routes) and headless Playwright in
    both themes: search, sort, the status filter, creating a customer, all
    four profile tabs, adding a contact, the View-profile deep link and its
    now-consistent numbers, and the bad-id 404 — at desktop and mobile widths,
    with zero regression to Work Orders, Work Order Details, or the
    Technician Mobile View.

- Built the Technicians module — the second Phase 3 module, same "list +
  profile" skeleton and lighter (non-hero) verification bar as Customers.
  - **List** (`/technicians`): search/filter (status: Active/On Leave/
    Inactive)/sort/paginate/table-vs-mobile-card-list, plus a "New
    Technician" form. Utilization reuses the exact `Progress` component +
    `tone="auto"` color-threshold convention already established on the
    Dashboard's Technician Utilization widget.
  - **Profile** (`/technicians/[id]`): the same detail-page skeleton as
    Customer Profile. Overview (role, hire date, skill badges) / Availability
    (a simple weekly hours grid) / Performance (four `KpiCard`s — jobs
    completed, total revenue, on-time rate, avg. job value — reusing the same
    primitive as the Dashboard, plus a recent-jobs list linking back to
    `/work-orders/[id]`) tabs; right rail has utilization + contact.
  - New `src/lib/dummy-data/technicians.ts` builds on the 6 technicians
    already established in `schedule.ts` (id/name/color) rather than
    introducing a parallel roster, adding role/contact/hire-date/skills/
    availability per technician plus `getTechnicianStats()` computed from
    the existing `WORK_ORDERS` and `APPOINTMENTS` arrays (jobs-today and
    utilization from today's actual schedule, not a hardcoded number) — same
    "compute from source data" discipline the Customers module established,
    applied from the start this time instead of needing a fix afterward.
    On-time rate and customer rating have no underlying tracked data model
    yet, so those two are hand-picked per technician rather than formula-
    generated — an early draft used a seeded formula and produced an
    obviously artificial linear sequence (4.3, 4.4, 4.5…) for only 6 people,
    caught before it shipped.
  - Also wired the Work Order Details right rail's Technician card with the
    same "View profile" link pattern just added for Customer.
  - Verified via full production build (24 routes) and headless Playwright in
    both themes: search, sort, the status filter, creating a technician, all
    three profile tabs, the View-profile deep link, and the bad-id 404 — at
    desktop and mobile widths, with zero regression to Work Orders, Work
    Order Details, Customers, or the Technician Mobile View. (One apparent
    bug during review — two tab underlines visible at once in a screenshot —
    turned out to be the opacity-transition mid-fade at the instant the
    screenshot was taken, not a real rendering bug; confirmed by re-screenshotting
    after the transition settled.)

- Built the Services module — the third Phase 3 module, and deliberately
  lighter-scoped than Customers/Technicians: a service catalog entry doesn't
  carry contacts/history/availability, so it's list-only with inline edit
  rather than a separate profile route.
  - **List** (`/services`): search/category filter/status filter/sort
    (duration, price)/paginate, a "New Service" button, and a per-row pencil
    icon opening the same create/edit modal component in edit mode
    (pre-filled, `PATCH`-style upsert) — one form, two entry points, instead
    of a separate edit component.
  - New `src/lib/dummy-data/services.ts`: 14 catalog entries across HVAC/
    Electrical/Plumbing/Refrigeration/Fire & Safety/General, each with a
    category, description, estimated duration, and base price.
  - Refactored the New Work Order form's service dropdown
    (`new-work-order-modal.tsx`) to source its options from this catalog
    (filtered to `status: "active"`) instead of its own separately hardcoded
    10-item list — the same duplication pattern already fixed twice for
    customer and technician names, caught proactively this time before it
    could drift.
  - Verified via full production build (22 routes — no new dynamic route,
    since there's no detail page) and headless Playwright in both themes:
    search, sort, the category filter, creating a service, editing an
    existing one (confirmed the modal prefilled correctly and the change
    persisted in the table), and confirmed the New Work Order modal's service
    list now reflects the catalog — with zero regression to Work Orders,
    Customers, Technicians, or the Technician Mobile View.

- Built the Parts & Inventory module — the fourth Phase 3 module, split into
  two related but distinct pages sharing one dummy-data module.
  - **Parts** (`/parts`): a catalog (SKU, category, unit price) — same list +
    inline-edit-modal shape as Services, since a part is a similar kind of
    catalog entity (no relationships/history of its own).
  - **Inventory** (`/inventory`): stock per part per warehouse (2 warehouses)
    across two tabs. **Stock Levels** shows on-hand/reorder-threshold with an
    In Stock/Low Stock/Out of Stock status computed from those two numbers
    (`stockStatusFor()`), not hand-typed — applying the "compute from source
    data" discipline from Customers/Technicians a third time. **Transactions**
    is a running log (received/used/adjusted/transferred) filterable by the
    same warehouse chips as Stock Levels. An **Adjust Stock** modal writes to
    both: it appends a transaction and updates the corresponding level's
    `quantityOnHand` in the same state update, so the two tabs can never
    drift apart from each other in the UI.
  - Also refactored Work Order Details' "Add Part" flow
    (`wo-labor-parts-tab.tsx`) from free-text part name/SKU entry to a Select
    sourced from the new Parts catalog, auto-filling SKU and unit price on
    selection (quantity and price both stay editable after) — the same
    "wire the new module back into Work Order Details" pattern already
    applied for Customer and Technician "View profile" links and the
    Services-sourced New Work Order dropdown.
  - Verified via full production build (22 routes) and headless Playwright
    in both themes: search/filter/sort/create/edit on Parts, both Inventory
    tabs, an end-to-end stock adjustment (confirmed the transaction appeared
    in the log AND the on-hand count updated in Stock Levels from the same
    action), and the Add Part catalog dropdown including its price auto-fill
    — with zero regression to Work Orders, Work Order Details, Customers,
    Technicians, Services, or the Technician Mobile View.

- Built the Invoices module — the fifth Phase 3 module, and the first one
  that pre-dates its own module: the Dashboard hero screen already shipped
  an "Outstanding Invoices" widget with 4 invoice IDs/amounts/statuses
  months ago (in dummy-data time), and `RECENT_ACTIVITY` mentions two more
  by name. Rather than invent a parallel set of invoice numbers, the new
  `src/lib/dummy-data/invoices.ts` treats those exact 4 as real `Invoice`
  records (same id/customer/amount/status) and adds 8 more, 4 of them linked
  via `workOrderId` to existing invoiced/paid work orders.
  - **List** (`/invoices`): search/status filter/sort (due date, amount)/
    paginate/New Invoice, matching the established list skeleton.
  - **Detail** (`/invoices/[id]`): status-driven header (Mark as Sent for
    draft → Record Payment for sent/overdue), an overdue banner (the
    `warning`/`error`-tinted persistent-banner pattern from
    `docs/UI_PATTERNS.md`, first real use of it), a line-items table with
    subtotal/tax/discount/total, a Timeline (reusing the `Timeline`/
    `TimelineItem` primitive from Work Order Details), and a right rail
    (customer "View profile" link, source Work Order link when
    `workOrderId` is set, quick facts).
  - `daysOverdue()` is computed from the due date against a shared
    fictional "today" (`2026-08-26`, matching Schedule's), not hand-typed —
    so the banner and the list's "N days overdue" column can never disagree
    with the date actually shown on the invoice.
  - Cross-linked in both directions: refactored the Dashboard's
    `outstanding-invoices-card.tsx` to import the same `INVOICE_STATUS_META`
    this module uses (deleting its own separate copy of the exact same
    badge mapping) and made its rows real links to `/invoices/[id]` instead
    of inert text; the new Invoice Detail right rail links back to Customer
    Profile and Work Order Details the same way Work Order Details and
    Technician Profile already link to each other.
  - Deliberately did *not* wire Work Order Details' "Generate Invoice"
    button to fabricate a new `Invoice` record — every "create" flow in this
    UI-only phase (Work Orders, Customers, Technicians, Services, Parts,
    and now Invoices) only mutates that page's local component state and
    resets on navigation, since there's no shared store or backend yet
    (`docs/DESIGN_DECISIONS.md`'s known-risks note). Making one button
    pretend to persist across pages when none of the others do would be a
    worse inconsistency than the one it might appear to fix.
  - Verified via full production build (24 routes) and headless Playwright
    in both themes: search/filter/sort/create, both status transitions
    (draft → sent → paid), the overdue banner and its day count, tax/
    discount math on a multi-line invoice, every cross-module link (Dashboard
    → Invoice, Invoice → Customer, Invoice → Work Order), and the bad-id 404
    — with zero regression to Work Orders, Work Order Details, Customers,
    Technicians, Services, Parts & Inventory, or the Technician Mobile View.

- Built the Payments module — the sixth Phase 3 module, list-only like
  Services/Parts since a payment record doesn't need its own detail page
  (amount, method, date, status — nothing that needs tabs).
  - New `src/lib/dummy-data/payments.ts` generates one `completed` payment
    per invoice in `invoices.ts` that already has `status: "paid"`, from the
    same source array rather than a separately hand-typed list, so the two
    modules can't disagree about which invoices are actually settled. Added
    three more (`pending`, `refunded`, `failed`) against existing invoices
    for status variety in the list/filters.
  - **List** (`/payments`): search/status filter/method filter/sort (date,
    amount)/paginate/Record Payment, matching the established list
    skeleton; each row's invoice number links to `/invoices/[id]`.
  - The Record Payment form only offers invoices with `status: "sent"` or
    `"overdue"` (paying an already-paid or still-draft invoice isn't a
    real action) and auto-fills the amount from that invoice's total on
    selection, the same auto-fill pattern used for Add Part's unit price.
  - Wired back into Invoice Detail: the right rail now shows a Payments
    card (method/amount/status per payment) for any invoice with at least
    one recorded payment, with a "View all" link to `/payments` — the same
    "new module links back into what already exists" pattern followed for
    every module this phase.
  - Verified via full production build (24 routes — no new dynamic route)
    and headless Playwright in both themes: search/filter/sort/create, the
    amount auto-fill, the payment → invoice link, and the new Invoice
    Detail → Payments card — with zero regression to Work Orders, Work
    Order Details, Customers, Technicians, Services, Parts & Inventory,
    Invoices, or the Technician Mobile View.

- Built the Reports module — the seventh and last Phase 3 module, completing
  Phase 3. A single analytics page rather than a CRUD list/detail, so it
  reuses two Dashboard widgets outright (`RevenueTrendCard`,
  `OutstandingInvoicesCard` — no props, drop-in) alongside three new pieces:
  a Work Order Status donut chart (flat fills from the fixed `--chart-1`…
  `--chart-5` data-viz sequence, center label = total, per
  `docs/DASHBOARD_DESIGN.md`'s chart rules), an Avg. Resolution Time bar
  chart, and a Technician Performance table (all 6 technicians, reusing
  `getTechnicianStats()`). A 6-tile KPI row covers the rest: Revenue (90d),
  Work Orders Completed, Avg. Resolution, First-Time Fix Rate, CSAT Score,
  Outstanding Invoices.
  - Every number that has real underlying data is computed fresh in the new
    `src/lib/dummy-data/reports.ts` from `WORK_ORDERS`/`INVOICES`/
    `TECHNICIANS` (revenue, WO counts, status breakdown, outstanding total,
    per-technician stats) rather than hand-typed — the "compute from source"
    discipline applied consistently since Customers. First-Time Fix Rate and
    CSAT have no underlying tracked model yet, so those two are hand-picked,
    same as Technician on-time-rate/rating; the resolution-time trend's last
    data point was deliberately set to match the Dashboard KPI card's
    existing "Avg. Resolution: 3.4h" so the two pages agree.
  - **Found and fixed a real, systemic, pre-existing bug while building
    this page**: `REVENUE (90D)` rendered as `$9,51,700` instead of
    `$951,700` — Indian-style digit grouping. The cause: every currency
    figure in the app called bare `.toLocaleString()`, which uses the
    *runtime's* default locale rather than a fixed one — fine on a browser
    set to en-US, but this component is server-rendered, and the server's
    reported locale produced Indian-style grouping for any value ≥ 100,000.
    Every other currency figure in the app had stayed under that threshold
    by coincidence, so this was invisible until Reports' first 6-figure
    total. Fixed with a shared `formatMoney()` helper in `src/lib/utils.ts`
    (always passes `"en-US"` explicitly) and applied it across all 26
    call sites in the codebase, not just the one that surfaced it — a
    grep-driven sweep, each replacement verified individually rather than
    trusted blindly (a first-pass scripted replacement introduced its own
    bug, silently dropping the literal `$` in 9 of those call sites because
    `String.replace()` treats a literal `$$` in the *replacement* string as
    an escape for a single `$`; caught by grepping for the resulting
    `` `${formatMoney`` `` pattern with no leading `$`, and fixed by hand).
  - Also fixed a second, smaller real bug spotted in the same review pass:
    the Avg. Resolution Time bar chart's Y-axis labels were clipped (showing
    `.85h` instead of `2.85h`) because the axis's reserved width (32px) was
    too narrow for a 5-character tick label — widened to 40px and the
    tick formatter rounded to 1 decimal.
  - Verified via full production build (22 routes) and headless Playwright
    in both themes and at mobile width: every KPI figure, both reused
    Dashboard widgets still functioning (range toggle, row links), the new
    donut/bar charts, the Technician Performance table's links back to
    `/technicians/[id]`, and a full 26-file regression sweep confirming the
    dollar-sign fix didn't drop a `$` or break formatting anywhere else in
    the app — zero regression to any of the other 11 modules/hero screens.

## What's next

1. Phase 4 (Administration): Users & Roles, Settings, an empty/loading/error
   state pass across every screen, and a full responsive pass on the
   non-hero screens.
2. Housekeeping: run `npm run lint` and clean up the 6 pre-existing errors it
   surfaces (see note above) — not blocking, but worth doing before Phase 4
   adds more surface area.
3. Housekeeping: back-port three implementation-driven additions into the docs
   so they match code — `docs/COLOR_SYSTEM.md` needs the `--primary`/`--primary-text`
   split and the `--chip-bg`/`--chip-text` pair (both explained inline in
   `src/styles/tokens.css` comments in the meantime); `docs/SPACING_AND_LAYOUT.md`'s
   sidebar structure note still describes a "user/account footer" in the sidebar —
   the account menu ended up in the header instead (standard SaaS pattern, avoids
   a duplicate sign-out location), so that doc section needs updating to match.

## Open questions / decisions needed from the user

- None blocking right now — proceeding under Auto Mode defaults documented in
  `docs/DESIGN_DECISIONS.md`. Flag here if that changes.

## Known risks / watch items

- Reference images are dark-theme concept renders with some garbled/fake text —
  treated as mood references, not literal specs (rationale in `docs/DESIGN_DECISIONS.md`).
  If the user actually wants a fully dark-mode-first app instead of light-first
  with a dark sidebar, that's a one-doc change (`COLOR_SYSTEM.md` + `DESIGN_DECISIONS.md`)
  before implementation, not a rebuild.
- No backend exists yet — every screen through Phase 5 runs on structured dummy
  data modules that must mirror the eventual API/DTO shapes closely enough that
  swapping in real API calls later is mechanical, not a rewrite.
- Backend framework changed from the original brief's ASP.NET Core/EF Core to a
  Next.js API routes + Prisma stack (2026-08-26). Database stays SQL Server unless
  told otherwise; ORM/auth specifics (Prisma, JWT approach) are placeholders to
  firm up when Phase 6 actually starts.
