# FieldPro — Icon Guidelines

## Library

**Lucide React** exclusively — matches the clean, consistent line-icon style seen
in the most legible reference dashboards (theme6, theme7 sidebars/headers) and is
already specified in the project's tech stack. No mixing in other icon sets
(no emoji-as-icon, no Font Awesome, no custom SVGs unless Lucide genuinely lacks
the concept, in which case add it under `src/components/icons/` following Lucide's
own stroke conventions).

## Sizing

| Context | Size | Stroke width |
|---|---|---|
| Sidebar nav icons | 20px | 1.75 |
| Header icon buttons (search/bell/help) | 20px | 1.75 |
| Inline with body text / badge leading icon | 16px | 2 |
| Table row action icons | 16px | 1.75 |
| Button leading/trailing icon | 16px | 2 |
| Empty state / feature icon | 24px (in 48px tinted circle) | 1.5 |
| KPI card trend arrow | 14px | 2.5 |

Default stroke width across the app is **1.75** unless a context above specifies
otherwise — smaller icons get a slightly heavier stroke (2) so they stay legible
at small sizes; larger decorative icons get a lighter stroke (1.5) so they don't
look heavy-handed.

## Color

Icons inherit `text-secondary` at rest, `text-primary` on hover/active for
interactive icons, or the relevant status/priority token when the icon itself
communicates state (e.g. `CheckCircle2` in `success` on a completed row).
Never a raw hex — same token rule as everything else (COLOR_SYSTEM.md).

## Fill vs. stroke

Icons are **outline/stroke style only** — Lucide's default. The one exception is
small status dots (8px filled circles) used in badges and timelines, which are
plain CSS circles, not an icon component.

## Consistency by concept

Lock these mappings project-wide so the same icon always means the same thing:

| Concept | Icon |
|---|---|
| Dashboard | `LayoutDashboard` |
| Work Orders | `ClipboardList` |
| Schedule | `Calendar` |
| Customers | `Users` |
| Technicians | `HardHat` |
| Services | `Wrench` |
| Parts / Inventory | `Package` |
| Invoices | `FileText` |
| Payments | `CreditCard` |
| Reports | `BarChart3` |
| Users & Roles | `ShieldCheck` |
| Settings | `Settings` |
| Search | `Search` |
| Notifications | `Bell` |
| Filter | `SlidersHorizontal` |
| Sort | `ArrowUpDown` |
| Add/Create | `Plus` |
| Edit | `Pencil` |
| Delete | `Trash2` |
| More actions | `MoreHorizontal` |
| Attachment/Photo | `Paperclip` / `Camera` |
| Priority: urgent | `AlertTriangle` |
| Status: success/complete | `CheckCircle2` |
| Status: error/overdue | `XCircle` |
| Status: warning/pending | `Clock` |
| Location/address | `MapPin` |
| Phone | `Phone` |
| Email | `Mail` |

## What to avoid

No decorative icon animation (spin/bounce/pulse) outside genuine loading spinners.
No duplicate icons for different concepts within the same screen. No icon-only
buttons without an accessible label (`aria-label` or tooltip) — several reference
images use icon-only toolbars, which we replicate visually but always with proper
labeling underneath.
