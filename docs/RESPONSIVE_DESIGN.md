# FieldPro — Responsive Design

## Breakpoints (Tailwind defaults — no custom scale needed)

| Name | Min-width | FieldPro usage |
|---|---|---|
| `sm` | 640px | Large phones landscape / small tablets |
| `md` | 768px | Tablets — dispatcher-on-the-go, technician tablets |
| `lg` | 1024px | Small laptops — sidebar collapses to icon-rail below this |
| `xl` | 1280px | Standard desktop — full app experience target |
| `2xl` | 1536px | Wide monitors — dashboard gains extra column headroom, content does not stretch full-bleed |

Additional named range used in specs: **technician mobile**, 375–428px (iPhone
SE → Pro Max width), since the Technician role is primarily used on a phone in
the field.

## Two distinct experiences

FieldPro ships two responsive experiences off one codebase, not a single fluid
layout stretched thin:

1. **Admin/Dispatcher/Accountant workspace** — desktop-first (`lg`+ is the primary
   target), data-dense, full sidebar. Usable down to tablet but not optimized below `md`.
2. **Technician mobile view** — mobile-first, one of the 5 hero screens (see
   [DASHBOARD_DESIGN.md](./DASHBOARD_DESIGN.md)). Bottom tab bar replaces the
   sidebar entirely below `md`; large tap targets (min 44px); single-column,
   task-focused (today's jobs → job detail → labor/parts/notes/photos → complete).

## Sidebar/navigation behavior

| Breakpoint | Behavior |
|---|---|
| `xl`+ | Sidebar expanded (260px) by default, user-collapsible to icon-rail (72px) |
| `lg` | Sidebar defaults to collapsed icon-rail, expandable on hover/click |
| `md` and below | Sidebar becomes an off-canvas drawer (hamburger trigger in header); Technician role instead gets a bottom tab bar and no sidebar at all |

## Grid collapse rules

| Pattern | `xl`+ | `md`–`lg` | below `md` |
|---|---|---|---|
| KPI card row | 4 columns | 2 columns | 1 column |
| Detail page (content + right rail) | 2 columns (66/34) | stacked, right rail below | stacked |
| Table | full table | full table, horizontal scroll if needed, sticky first column | switches to stacked "card list" — one card per row with label:value pairs |
| Kanban board | full multi-column, all statuses visible | horizontal scroll, snap-per-column | single column with status switcher tabs |
| Calendar (Schedule) | week/month grid | week grid only | day agenda list |

## Touch & density

- Minimum touch target 44×44px on any surface reachable at `md` and below,
  regardless of the 36px desktop default — components scale their hit area (not
  necessarily visual size) up via padding at smaller breakpoints.
- Table density defaults to "compact" on desktop for dispatchers, but the mobile
  card-list equivalent always uses comfortable spacing (`space-4`+) since it's
  tap-driven, not scan-driven.

## Technician mobile view specifics

- Bottom tab bar (4–5 items max: Today, Jobs, Schedule, Profile), 56px tall, icons
  + micro-labels, active tab in `primary`.
- Job execution screen uses large primary action buttons (Start Job / Complete Job)
  pinned to the bottom above the tab bar, thumb-reachable.
- Offline-tolerant: forms autosave locally and show a sync-status indicator (see
  UI_PATTERNS.md → Form patterns) since technicians lose signal in basements/rural sites.
- Photo capture opens the device camera directly, not a file picker, where the
  platform allows it.

## What does NOT reflow

The header height (64px) and its right-side icon cluster stay fixed across all
breakpoints down to `md`; only the left region (logo/hamburger vs. breadcrumb)
changes. This keeps global search/notifications/account always reachable.
