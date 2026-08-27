# FieldPro — Project Status

Live snapshot of where things stand. Update this whenever a milestone item
completes or the current focus changes — see [MILESTONES.md](./MILESTONES.md) for
the full phased checklist this rolls up from.

## Current phase

**Phase 0, Phase 1, and Phase 2 are complete** — all 5 portfolio hero screens
(Dashboard, Dispatcher/Schedule, Work Orders, Work Order Details, Technician
Mobile View) are built and verified. Phase 3 (remaining core modules:
Customers, Technicians, Services, Parts & Inventory, Invoices, Payments,
Reports) is next.

## Last updated

2026-08-27

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

## What's next

1. Phase 3: the remaining core modules — Customers, Technicians, Services,
   Parts & Inventory, Invoices, Payments, Reports.
2. Housekeeping: run `npm run lint` and clean up the 6 pre-existing errors it
   surfaces (see note above) — not blocking, but worth doing before Phase 3
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
