# FieldPro — Typography

## Font family

**Inter** — chosen as the closest professional, widely-available match to the clean
geometric sans seen consistently across the legible reference images (theme6, theme7),
which show tight numerals, moderate letter-spacing, and a neutral grotesque letterform.
See [DESIGN_DECISIONS.md](./DESIGN_DECISIONS.md) for the full rationale.

```css
--font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
  'Helvetica Neue', Arial, sans-serif;
--font-family-mono: 'JetBrains Mono', ui-monospace, 'SFMono-Regular', Menlo, monospace;
```

Mono is used only for identifiers that benefit from fixed width: SKUs, invoice
numbers, work-order IDs, API keys.

Load via `next/font/google` (self-hosted, no external CDN request at runtime) with
weights 400/500/600/700.

## Numeric tables

Any numeric column (money, quantities, dashboard KPIs) sets
`font-variant-numeric: tabular-nums` so digits align vertically — critical for
scanning invoice/inventory tables quickly.

## Type scale

| Style | Size | Line height | Weight | Letter spacing | Usage |
|---|---|---|---|---|---|
| Display | 36px / 2.25rem | 40px | 700 | -0.02em | Rare — large hero KPI on Dashboard only |
| Page title | 24px / 1.5rem | 32px | 700 | -0.01em | Top of each page ("Work Orders", "Customers") |
| Section title | 18px / 1.125rem | 28px | 600 | -0.005em | Card group headers, panel headers |
| Card title | 16px / 1rem | 24px | 600 | 0 | Individual card/widget headers |
| Body | 14px / 0.875rem | 20px | 400 | 0 | Default UI text, table cells, descriptions |
| Body medium | 14px / 0.875rem | 20px | 500 | 0 | Form labels, emphasized inline text |
| Small | 13px / 0.8125rem | 18px | 400 | 0 | Secondary/meta text, timestamps, helper text |
| Caption | 12px / 0.75rem | 16px | 500 | 0.02em | Eyebrow labels, overline tags |
| Table header | 12px / 0.75rem | 16px | 600 | 0.04em, uppercase | Table column headers |
| Button text | 14px / 0.875rem | 20px | 500 | 0 | All button labels |
| Navigation text | 14px / 0.875rem | 20px | 500 (600 active) | 0 | Sidebar nav items |
| KPI number | 28–32px / 1.75–2rem | 36px | 700 | -0.01em | Dashboard/card stat values (tabular-nums) |

## Weights used

Only four weights are used anywhere in the product: **400** (regular), **500**
(medium), **600** (semibold), **700** (bold). Never use 300 or 800/900 — the
references' oversized/bold display type is intentionally toned down per the
"avoid oversized typography" brief.

## Rules

- One page title per screen, always Page-title style.
- Never skip more than one step down the scale between a heading and its immediate body text.
- Links inherit body size/weight and are distinguished by `primary` color + underline on hover only (no color-only-plus-nothing-else links, for accessibility).
- Truncate, don't wrap, in table cells and KPI card labels beyond 2 lines; use `title` tooltip for full value.
