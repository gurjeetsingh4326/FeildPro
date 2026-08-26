# FieldPro — Spacing & Layout

## Base unit

**4px.** Every margin, padding, and gap in the product is a multiple of 4. This maps
directly onto Tailwind's default spacing scale (`1 = 4px`), so no custom spacing
config is needed beyond documenting intent.

| Token | Px | Tailwind | Typical use |
|---|---|---|---|
| `space-1` | 4px | `1` | Icon-to-label gap, tight inline gaps |
| `space-2` | 8px | `2` | Badge padding, compact control gaps |
| `space-3` | 12px | `3` | Input vertical padding, compact card padding |
| `space-4` | 16px | `4` | Standard form field gap, mobile page padding |
| `space-5` | 20px | `5` | Standard card padding |
| `space-6` | 24px | `6` | Desktop page padding, section spacing, grid gaps |
| `space-8` | 32px | `8` | Spacing between major page sections |
| `space-10` | 40px | `10` | Large empty-state vertical rhythm |
| `space-12` | 48px | `12` | Table row height (standard density) |
| `space-16` | 64px | `16` | Header height |

## Page layout

| Region | Value |
|---|---|
| Sidebar width (expanded) | 260px |
| Sidebar width (collapsed / icon rail) | 72px |
| Header height | 64px |
| Page content max-width | none (fluid) — content area uses full remaining width with `space-6` (24px) outer padding |
| Page padding (desktop) | 24px |
| Page padding (mobile) | 16px |
| Section spacing (between card groups) | 24px |
| Dashboard grid gap | 16–24px (16px between KPI cards, 24px between larger widget rows) |

## Component-level spacing

| Element | Value |
|---|---|
| Card padding (standard) | 20px |
| Card padding (compact / list-style card) | 16px |
| Card header-to-body gap | 12px |
| Form field vertical gap | 16px |
| Form label-to-input gap | 6px |
| Table cell padding | 12px horizontal, 12px vertical (standard) / 8px vertical (compact density) |
| Table row height | 48px standard, 40px compact |
| Modal padding | 24px |
| Drawer padding | 24px |
| Toast padding | 12px 16px |
| Button padding | 8px 14px (md), 6px 12px (sm), 10px 18px (lg) |
| Input padding | 8px 12px |

## Sidebar structure

```
┌────────────────────┐
│ Logo / org switcher │ 64px tall, matches header height for visual alignment
├────────────────────┤
│ Primary nav group    │ Dashboard
│                       │ Operations (Work Orders, Schedule, Customers, Technicians)
│                       │ Resources (Services, Parts, Inventory)
│                       │ Finance (Invoices, Payments)
│                       │ Analytics (Reports)
├────────────────────┤
│ Admin nav group       │ Users & Roles, Settings — visually separated, bottom-anchored
├────────────────────┤
│ User/account footer   │ Avatar, name, role, sign-out
└────────────────────┘
```

Nav items: 40px tall, 8px vertical rhythm between items, 12px horizontal inset,
active item gets `primary-light`-tinted pill background (light mode) or
`primary` at 16% opacity (dark mode) with a 3px left accent bar in `primary`.

## Header structure

64px tall, sticky, `surface` background with bottom `border`. Left: page
breadcrumb/title. Right, in order: global search, notifications bell, help,
user avatar menu. All right-side icon buttons are 36×36px targets.

## Grid system

Dashboard and list pages use a 12-column CSS grid at `xl`+ breakpoints, collapsing
to fewer columns at smaller sizes (see [RESPONSIVE_DESIGN.md](./RESPONSIVE_DESIGN.md)).
KPI cards default to 4-up on desktop, 2-up on tablet, 1-up on mobile.

## Modal / drawer spacing

Modals: max-width 480px (sm), 640px (md/default), 800px (lg). Header 20px padding
with bottom border, body 24px padding, footer 16px 24px with top border, actions
right-aligned.

Drawers (used for work-order quick view, technician assignment): fixed 480px width
on desktop, full-width on mobile, same internal padding as modals.
