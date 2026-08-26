# FieldPro — Design System

Master reference for FieldPro's visual language. This file is the index; detailed
specs live in the companion docs listed below. If a rule here ever conflicts with
a companion doc, the companion doc wins for its domain — file an update rather
than letting the two drift.

## Companion documents

| Doc | Covers |
|---|---|
| [COLOR_SYSTEM.md](./COLOR_SYSTEM.md) | Full color token tables (light + dark), usage rules |
| [TYPOGRAPHY.md](./TYPOGRAPHY.md) | Font family, type scale, weights |
| [SPACING_AND_LAYOUT.md](./SPACING_AND_LAYOUT.md) | Spacing scale, page/sidebar/header dimensions |
| [COMPONENT_GUIDELINES.md](./COMPONENT_GUIDELINES.md) | Per-component specs (buttons, tables, badges, modals...) |
| [UI_PATTERNS.md](./UI_PATTERNS.md) | Reusable cross-component patterns (empty states, loading, forms) |
| [RESPONSIVE_DESIGN.md](./RESPONSIVE_DESIGN.md) | Breakpoints, mobile technician view rules |
| [ICON_GUIDELINES.md](./ICON_GUIDELINES.md) | Lucide icon sizing, stroke, usage |
| [DASHBOARD_DESIGN.md](./DASHBOARD_DESIGN.md) | Composition rules for the 5 hero screens |
| [DESIGN_DECISIONS.md](./DESIGN_DECISIONS.md) | Rationale — what was extracted vs. rejected from references |

Reference source images live in [docs/theme_images/](./theme_images/) (theme1–theme7.jpg).

## Product identity

FieldPro is an **operational** SaaS: dispatchers and admins stare at it for a full
shift, technicians glance at it outdoors between jobs, accountants reconcile money
in it. The UI must read as **professional field-service software** — closer to
ServiceTitan, Jobber, or Linear than to a marketing-dashboard concept render. It
should feel:

Professional · Premium · Clear · Fast · Operational · Reliable · Modern · Data-driven

And explicitly avoid: generic admin-template looks, excessive gradients/shadows/rounding,
neon colors, decorative animation, unnecessary visual noise, oversized type, and
whitespace that hurts density (per the project brief, Section 15).

## The one-paragraph system

**Light mode is the default, primary theme** for the operational app (tables, forms,
schedules need maximum legibility for all-day use and outdoor tablets). A **deep
indigo-navy sidebar** carries the brand DNA extracted from the reference images
without darkening the whole app. **Indigo (`#4F46E5`)** is the single primary action
color; **cyan (`#0891B2`)** is the only secondary accent, used sparingly for a second
data series or informational emphasis. Status color (success/warning/error/info) is
semantic and consistent everywhere — never decorative. Typography is **Inter**, a
restrained 8-step scale, tabular numerals for anything numeric. Spacing is a strict
4px-based scale. Radius tops out at 16px (modals only) — cards use 12px, controls use
8px. Shadows are nearly flat; borders do the separating work, not glow. A **full dark
mode** is supported as a first-class alternate theme (not an afterthought), built from
the same tokens, for users who prefer it.

## Non-negotiables

1. No raw hex values in application code — every color is a token (see COLOR_SYSTEM.md).
2. No component invents its own spacing — use the 4px scale (see SPACING_AND_LAYOUT.md).
3. Status meaning is fixed: green=success/completed, amber=warning/pending, red=error/overdue,
   cyan/blue=info/in-progress. Never repurpose a status color for decoration.
4. Every interactive element has a visible focus state (accessibility — dispatchers
   and technicians use keyboards and gloved/imprecise touch alike).
5. Tables and dense data views default to **compact density**; marketing-style
   generous whitespace is reserved for empty states and onboarding only.
