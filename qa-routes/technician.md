# Technician — routes

Assigned jobs, schedule, job execution. This is the one role with two
genuinely different experiences depending on window width — check both.

## Desktop width (≥768px) — normal sidebar

| Screen | Route |
|---|---|
| Dashboard | `/` |
| Work Orders | `/work-orders` |
| Schedule | `/schedule` |

**Should be gone from the sidebar:** Customers, Technicians, Services,
Parts, Inventory, Invoices, Payments, Reports, Users & Roles, Settings.

## Narrow width (<768px) — phone shell replaces the sidebar entirely

No sidebar, no header search/notifications — instead a bottom tab bar with
4 screens (none of these are in the desktop sidebar; they only exist for
this role/width combination):

| Tab | Route | What it is |
|---|---|---|
| Today | `/today` | Agenda of Maria Chen's jobs today, tap a card to open one |
| Jobs | `/jobs` | All of Maria Chen's assigned jobs, grouped by date |
| Schedule | `/schedule` | Same route as desktop, but renders the single-day agenda view |
| Profile | `/profile` | Stats, contact info, sign out |

Opening a job from Today/Jobs at this width lands on
`/work-orders/{id}` too, but renders a completely different
**mobile job-execution view** (Call/Navigate buttons, pinned Start/Complete
button, collapsible Labor/Parts/Notes/Photos) instead of the desktop tabs
layout — same URL, role- and width-aware component swap.

## Sample IDs

All of the dummy technician users are pre-set to **Maria Chen**
(`tech-1`), so at narrow width `/today` and `/jobs` will always show her
jobs regardless of which role-switcher name is showing elsewhere.

**Work Orders assigned to Maria Chen** (`/work-orders/{id}`):
- `WO-2024-00318` — hero record, In Progress, today (richest one to test —
  has real labor/parts/notes/photos already filled in)
- `WO-2024-00336` — Completed, today
- `WO-2024-00337` — Scheduled, today
- `WO-2024-00338` — Scheduled, today
- `WO-2024-00339` — Scheduled, tomorrow
- `WO-2024-00340` — Scheduled, in 2 days

## Quick check

1. At desktop width, switch to Technician — sidebar shrinks to just
   Dashboard/Work Orders/Schedule.
2. Narrow the window below 768px on any page — the whole shell should swap
   to the bottom tab bar, no reload.
3. From `/today`, tap the `WO-2024-00318` card — should open the mobile
   job-execution view, not the desktop tabbed layout.
