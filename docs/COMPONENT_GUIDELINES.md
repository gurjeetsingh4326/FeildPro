# FieldPro — Component Guidelines

Radius scale referenced below: `radius-sm` 6px, `radius-md` 8px, `radius-lg` 12px,
`radius-xl` 16px, `radius-full` 9999px. Shadow scale: `shadow-xs`, `shadow-sm`,
`shadow-md`, `shadow-lg` (see [SPACING_AND_LAYOUT.md](./SPACING_AND_LAYOUT.md) for
spacing values referenced here). All colors are tokens from
[COLOR_SYSTEM.md](./COLOR_SYSTEM.md).

## Buttons

| Property | Primary | Secondary | Ghost | Destructive |
|---|---|---|---|---|
| Background | `primary` | `surface` | transparent | `error` |
| Border | none | 1px `border` | none | none |
| Text | `text-on-brand` | `text-primary` | `text-secondary` | `text-on-brand` |
| Hover | `primary-hover` | `background` fill | `background` fill | `error-hover` |
| Active | `primary-active` | `border-strong` border | `border` fill | darken 10% |
| Focus | 2px `primary` ring, 2px offset | same | same | 2px `error` ring |
| Disabled | 40% opacity, no pointer | 40% opacity | 40% opacity | 40% opacity |
| Radius | `radius-md` (8px) | same | same | same |
| Sizes | sm 32px / md 36px / lg 40px height | — | — | — |
| Typography | Button text style (14px/500) | — | — | — |

Icon buttons are square (36×36 default, 32×32 compact), `radius-md`, ghost by default.

## Inputs & Selects

- Height 36px (md, default), 32px (sm, used in filter bars/table toolbars).
- Background `surface`, border 1px `border`, `radius-md`.
- Focus: border becomes `primary`, plus 2px `primary` ring at 20% opacity.
- Error: border `error`, helper text below in `error`, 13px.
- Placeholder text `text-muted`.
- Label above input: Body-medium style, 6px gap.
- Disabled: `surface-sunken` background, `text-disabled` text, no border change on hover.
- Selects use the same shell as text inputs with a chevron-down (Lucide `ChevronDown`, 16px, `text-muted`), right-aligned 12px from edge.

## Search

- Persistent in header (global) and as a toolbar element (per-list). Icon `Search`
  16px `text-muted` leading, 8px from left edge of text.
- Background `surface-sunken` at rest (no border) to visually recede; on focus,
  switches to `surface` + `primary` border + ring, matching standard input focus.
- Width: 320px header search (desktop), full-width list toolbar search.

## Date picker

- Trigger styled as standard input with trailing `Calendar` icon.
- Popover panel: `surface-elevated`, `radius-lg`, `shadow-md`, 12px padding.
- Selected date: `primary` filled circle, `text-on-brand`. Today (if not selected):
  1px `primary` border, no fill. In-range (for range picker): `primary-light` fill,
  square-ish cell connecting the range.

## Dropdown / menu

- `surface-elevated`, `radius-md`, `shadow-md`, 1px `border`, 4px padding around items.
- Items 36px tall, `radius-sm` on hover/focus with `background` fill, 8px horizontal padding.
- Destructive items use `error` text.
- Section dividers: 1px `border`, 4px vertical margin.

## Cards

- Background `surface`, border 1px `border`, `radius-lg` (12px), padding `space-5` (20px).
- Default shadow: none — border does the separating work (per "avoid excessive shadows" brief).
- Interactive/clickable cards: `shadow-sm` + `border-strong` on hover, transition 120ms.
- Card header: Card-title style + optional right-aligned action (icon button or "View all" link), `space-3` (12px) gap to body.

## KPI cards

- Fixed internal structure: Caption-style label (top) → KPI-number value → optional
  small delta badge (▲/▼ + percentage in `success`/`error`) → optional mini sparkline
  anchored bottom.
- Padding `space-5`, `radius-lg`, `surface` background, 1px `border`.
- No glow, no gradient fill on the card itself — the sparkline may use a single
  subtle gradient (see DASHBOARD_DESIGN.md).

## Tables

- Header row: `surface-sunken` or `background` tint, Table-header style text, 1px
  bottom `border-strong`, sticky on scroll for long lists.
- Body rows: `surface` background, 1px `border` bottom only (no vertical rules),
  standard 48px / compact 40px height.
- Row hover: `background` tint.
- Row selected: `primary-light` tint + checkbox checked.
- Zebra striping: **not used** — relies on row borders + hover for scanability, keeps it calm.
- Numeric columns right-aligned with tabular-nums; text columns left-aligned; status/action columns centered or fixed-width right.
- Sortable header: `ArrowUpDown`/`ArrowUp`/`ArrowDown` 14px icon after label, `text-muted` until active (`primary`).

## Pagination

- Bottom-right of table card (or bottom-center for full-page lists). "Rows per page"
  select + "1–20 of 248" text (`text-secondary`, 13px) + prev/next icon buttons +
  numbered page buttons (current page: `primary` filled, `radius-md`, 32×32).

## Tabs

- Underline style for page-level tabs: `text-secondary` inactive, `text-primary` +
  `primary` 2px bottom border active, 24px gap between tabs, 12px vertical padding.
- Segmented/pill style for compact in-card toggles (e.g. chart range switch):
  `surface-sunken` track, `radius-md`, active segment `surface` + `shadow-xs`.

## Badges (generic)

- `radius-full` (pill), 4px 10px padding, 12px/500 text, paired bg+solid token
  (e.g. `success-bg` background + `success` text/dot).
- Optional leading 6px status dot instead of text color alone (color-blind safety).

## Status badges (work order / invoice / job status)

Fixed vocabulary, never freeform colors:

| Status | Token pairing |
|---|---|
| Draft / Unscheduled | `text-muted` on `surface-sunken` |
| Scheduled | `info` on `info-bg` |
| In Progress | `primary` on `primary-light` |
| On Hold | `warning` on `warning-bg` |
| Completed | `success` on `success-bg` |
| Invoiced | `accent` on `info-bg` |
| Paid | `success` on `success-bg` (with `CheckCircle2` icon) |
| Overdue / Cancelled | `error` on `error-bg` |

## Priority badges

Square-ish `radius-sm` (not pill, to visually distinguish from status), using
`--color-priority-*` tokens from COLOR_SYSTEM.md — Low/Medium/High/Urgent.

## Modals

- Backdrop: `rgba(15,23,42,0.5)` (light) / `rgba(0,0,0,0.65)` (dark), no blur.
- Panel: `surface-elevated`, `radius-xl` (16px), `shadow-lg`, centered.
- Header: Section-title style + close (`X`, 18px) button top-right, bottom `border`.
- Footer: right-aligned actions, secondary action left of primary, top `border`.

## Drawers

Same visual shell as modals but slide from the right, full-height, `radius-lg` on
the leading edge only.

## Toasts

- `surface-elevated`, `radius-md`, `shadow-md`, 1px `border`, left 3px status-colored
  accent bar (success/error/warning/info), leading icon matching status, top-right stack.
- Auto-dismiss 5s (success/info), persist until dismissed for error.

## Tooltips

- `text-primary`-inverse: dark-navy `secondary` bg + white text even in light mode
  (tooltips are always "dark chip" style for consistency across themes), `radius-sm`,
  6px 10px padding, 12px text, small arrow, 4px offset from trigger.

## Avatars

- `radius-full`, sizes 24/32/40px. Fallback: initials on a deterministic
  `primary`-family tint background. Stacked avatars overlap -8px with 2px `surface` ring.

## Empty states

Icon (24px, `text-muted`, in a 48px `primary-light` circle) → Card-title message →
Body helper text → primary CTA if actionable. Centered, generous but not excessive
vertical padding (`space-10`).

## Loading states / skeletons

- Skeleton blocks: `surface-sunken` background with a subtle shimmer sweep
  (opacity pulse, not a moving gradient glow), `radius-md` matching the real
  content's shape.
- Never use a spinner for content that has a known shape (tables, cards) — skeleton
  instead. Spinners reserved for button in-progress state and full-page transitions.

## Confirmation dialogs

Compact modal (max-width 400px), warning/destructive icon top, single-sentence
question as title, one-line consequence text, Cancel (secondary) + confirming
action (destructive style if irreversible) right-aligned.

## Timelines

Used on Work Order Details for status/activity history. Vertical line `border`
color, 8px dot per event (status-colored), event card to the right: actor + action
(Body-medium) + relative timestamp (`text-muted`, Small).

## Charts

See [DASHBOARD_DESIGN.md](./DASHBOARD_DESIGN.md) for full chart styling rules
(Recharts, restrained gradients, fixed color sequence, no glow).

## Calendar items (Schedule module)

Appointment block: `radius-sm`, left 3px accent bar in technician's assigned color
or status color, `primary-light`/status-bg fill, Body-medium title (customer +
service), Small subtext (time + technician). Drag handle on hover; drop target
highlights with `primary` dashed outline.

## Kanban cards (Work Order board view)

`surface` card, `radius-md`, `border`, `space-4` padding. Top: work order # (mono,
`text-muted`) + priority badge. Middle: customer name (Card-title). Bottom row:
technician avatar + due date (`text-muted`) + status-colored left accent bar.
Dragging state: `shadow-md` + slight rotate is **not** used (avoid decorative
motion) — instead a `primary` border highlight indicates active drag.
