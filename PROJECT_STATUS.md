# FieldPro — Project Status

Live snapshot of where things stand. Update this whenever a milestone item
completes or the current focus changes — see [MILESTONES.md](./MILESTONES.md) for
the full phased checklist this rolls up from.

## Current phase

**Phase 0 — Design Foundation is complete.** Next.js project scaffolded, design
tokens implemented and verified (light + dark), and all base UI primitives built.
Next up is Phase 1 — app shell (sidebar, header, role-based nav) and auth screens.

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

## What's next

1. Phase 1: app shell (sidebar, header, role-based nav) and auth screens.
2. Phase 2: the 5 portfolio hero screens, starting with Dashboard.
3. Housekeeping: back-port two implementation-driven token additions into
   `docs/COLOR_SYSTEM.md` so the docs match code — the `--primary`/`--primary-text`
   split and the new `--chip-bg`/`--chip-text` pair (both explained inline in
   `src/styles/tokens.css` comments in the meantime).

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
