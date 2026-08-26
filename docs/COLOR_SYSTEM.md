# FieldPro — Color System

All values below are the extracted-and-refined palette (see [DESIGN_DECISIONS.md](./DESIGN_DECISIONS.md)
for how these were derived from the 7 reference images). **No component or page may
use a raw hex value** — always reference the semantic token (CSS variable / Tailwind
theme key). Estimated values from visual inspection (not pixel-sampled) are marked *(est.)*.

## Brand palette (raw scale)

Indigo is the sole primary brand hue — it was the one constant across all 7 references.

| Token | Hex | RGB |
|---|---|---|
| indigo-50 | #EEF2FF | 238, 242, 255 |
| indigo-100 | #E0E7FF | 224, 231, 255 |
| indigo-300 | #A5B4FC | 165, 180, 252 |
| indigo-400 | #818CF8 | 129, 140, 248 |
| indigo-500 | #6366F1 | 99, 102, 241 |
| indigo-600 | #4F46E5 | 79, 70, 229 |
| indigo-700 | #4338CA | 67, 56, 202 |
| indigo-800 | #3730A3 | 55, 48, 163 |
| indigo-950 | #151233 | 21, 18, 51 |
| cyan-50 | #ECFEFF | 236, 254, 255 |
| cyan-400 | #22D3EE | 34, 211, 238 |
| cyan-600 | #0891B2 | 8, 145, 178 |
| cyan-700 | #0E7490 | 14, 116, 144 |

## Semantic tokens — Light mode (default)

| Semantic token | Hex | RGB | Usage |
|---|---|---|---|
| `--color-primary` | #4F46E5 | 79,70,229 | Primary buttons, active nav item, links, focus rings, key data series |
| `--color-primary-hover` | #4338CA | 67,56,202 | Primary button/link hover |
| `--color-primary-active` | #3730A3 | 55,48,163 | Primary button pressed state |
| `--color-primary-light` | #EEF2FF | 238,242,255 | Selected-row tint, tinted icon backgrounds, subtle highlight |
| `--color-secondary` | #151233 | 21,18,51 | Sidebar surface, dark header-on-light contexts (deep indigo-navy, brand DNA from refs) |
| `--color-accent` | #0891B2 | 8,145,178 | Secondary chart series, informational icons/links, "new"/highlight tags |
| `--color-accent-hover` | #0E7490 | 14,116,144 | Accent element hover |
| `--color-background` | #F8FAFC | 248,250,252 | App page background (slate-50) |
| `--color-surface` | #FFFFFF | 255,255,255 | Cards, panels, table surface |
| `--color-surface-elevated` | #FFFFFF | 255,255,255 | Modals, dropdowns, popovers (paired with `--shadow-md`/`lg`) |
| `--color-surface-sunken` | #F1F5F9 | 241,245,249 | Input backgrounds, code/quote blocks, nested panels |
| `--color-border` | #E2E8F0 | 226,232,240 | Default card/table/input borders |
| `--color-border-strong` | #CBD5E1 | 203,213,225 | Emphasized dividers, input focus-adjacent borders |
| `--color-text-primary` | #0F172A | 15,23,42 | Headings, body text, table cell text |
| `--color-text-secondary` | #475569 | 71,85,105 | Supporting text, labels, table headers (base before uppercase treatment) |
| `--color-text-muted` | #94A3B8 | 148,163,184 | Placeholder text, timestamps, helper text |
| `--color-text-disabled` | #CBD5E1 | 203,213,225 | Disabled control labels |
| `--color-text-on-brand` | #FFFFFF | 255,255,255 | Text/icons on primary/accent fills and on the dark sidebar |

### Status colors — Light mode

| Token | Hex | RGB | Usage |
|---|---|---|---|
| `--color-success` | #16A34A | 22,163,74 | Completed, paid, active-healthy states |
| `--color-success-hover` | #15803D | 21,128,61 | Success button/action hover |
| `--color-success-bg` | #F0FDF4 | 240,253,244 | Success badge/banner background |
| `--color-warning` | #D97706 | 217,119,6 | Pending, due-soon, low-stock states |
| `--color-warning-hover` | #B45309 | 180,83,9 | Warning action hover |
| `--color-warning-bg` | #FFFBEB | 255,251,235 | Warning badge/banner background |
| `--color-error` | #DC2626 | 220,38,38 | Overdue, failed, urgent-priority, destructive actions |
| `--color-error-hover` | #B91C1C | 185,28,28 | Error/destructive action hover |
| `--color-error-bg` | #FEF2F2 | 254,242,242 | Error badge/banner background |
| `--color-info` | #0891B2 | 8,145,178 | In-progress, informational states (shares accent hue) |
| `--color-info-hover` | #0E7490 | 14,116,144 | Info action hover |
| `--color-info-bg` | #ECFEFF | 236,254,255 | Info badge/banner background |

### Work-order priority tokens (field-service specific, distinct from status)

| Token | Hex | Usage |
|---|---|---|
| `--color-priority-low` | #64748B (slate-500) | Low priority badge |
| `--color-priority-medium` | #0891B2 (cyan-600) | Medium priority badge |
| `--color-priority-high` | #D97706 (amber-600) | High priority badge |
| `--color-priority-urgent` | #DC2626 (red-600) | Urgent/emergency priority badge — bold fill, not animated |

## Semantic tokens — Dark mode

Dark mode reuses the same deep indigo-navy family already present in the sidebar,
extended app-wide. *(est. — derived from visual read of theme2/theme5/theme7, not pixel-sampled)*

| Semantic token | Hex | RGB | Usage |
|---|---|---|---|
| `--color-primary` | #818CF8 | 129,140,248 | Primary actions/links (lighter indigo for AA contrast on dark) |
| `--color-primary-hover` | #A5B4FC | 165,180,252 | Primary hover |
| `--color-primary-active` | #6366F1 | 99,102,241 | Primary pressed |
| `--color-primary-light` | rgba(129,140,248,0.16) | — | Selected-row tint, tinted icon backgrounds |
| `--color-background` | #0B0E1A | 11,14,26 | App page background (near-black navy) |
| `--color-surface` | #131725 | 19,23,37 | Cards, panels, sidebar |
| `--color-surface-elevated` | #1A1F35 | 26,31,53 | Modals, dropdowns, popovers |
| `--color-surface-sunken` | #0E1120 | 14,17,32 | Input backgrounds, nested panels |
| `--color-border` | #232838 | 35,40,56 | Default borders |
| `--color-border-strong` | #323950 | 50,57,80 | Emphasized dividers |
| `--color-text-primary` | #F1F5F9 | 241,245,249 | Headings, body text |
| `--color-text-secondary` | #94A3B8 | 148,163,184 | Supporting text, labels |
| `--color-text-muted` | #64748B | 100,116,139 | Placeholder, timestamps |
| `--color-text-disabled` | #475569 | 71,85,105 | Disabled labels |
| `--color-accent` | #22D3EE | 34,211,238 | Secondary chart series, info accents |
| `--color-success` | #4ADE80 | bg rgba(22,163,74,0.16) | Success states |
| `--color-warning` | #FBBF24 | bg rgba(217,119,6,0.16) | Warning states |
| `--color-error` | #F87171 | bg rgba(220,38,38,0.16) | Error states |
| `--color-info` | #38BDF8 | bg rgba(37,99,235,0.16) | Info states |

## Data visualization palette

Chart series draw from a fixed, ordered sequence — never random per-chart colors.
Gradients are subtle (max 25% fill opacity, 2-stop) — not the saturated glow gradients
seen in the reference images.

1. `--color-primary` (indigo) — primary metric
2. `--color-accent` (cyan) — comparison/secondary metric
3. `--color-success` (green) — positive/completed series
4. `--color-warning` (amber) — caution series
5. `--chart-purple` #A855F7 — 5th+ categorical series only
6. `--color-text-muted` (gray) — baseline/reference lines

## Usage rules

- Buttons, links, active nav, checked inputs, focus rings → `primary`.
- Never use `error` red for anything that isn't a genuine failure/destructive/overdue state.
- Badge backgrounds always pair the `-bg` token with the solid token for text/icon (e.g. `success-bg` + `success`), never solid-on-solid except primary buttons.
- The sidebar is the *only* place `secondary` (dark indigo-navy) appears in light mode.
