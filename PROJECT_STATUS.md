# FieldPro — Project Status

Live snapshot of where things stand. Update this whenever a milestone item
completes or the current focus changes — see [MILESTONES.md](./MILESTONES.md) for
the full phased checklist this rolls up from.

## Current phase

**Phase 0 and Phase 1 are complete; Phase 2 is underway** — the Dashboard hero
screen is built and verified responsive from 320px to desktop, both themes.
4 of 5 hero screens remain: Dispatcher/Schedule, Work Orders, Work Order
Details, Technician Mobile View.

## Last updated

2026-08-26

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

## What's next

1. Phase 2: the remaining 4 hero screens — Dispatcher/Schedule, Work Orders,
   Work Order Details, Technician Mobile View.
2. Housekeeping: back-port three implementation-driven additions into the docs
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
