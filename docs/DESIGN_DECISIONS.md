# FieldPro — Design Decisions

Record of what was extracted from the 7 reference images vs. deliberately left
behind, and why. Read this alongside [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md).

## What the references actually are

All 7 images (`docs/theme_images/theme1.jpg` – `theme7.jpg`) are dark-theme
"AI/SaaS command-center" dashboard concepts. Three of them (theme1, theme3, theme4)
contain garbled, non-real placeholder text — a strong signal they're AI-generated
or stock marketing renders rather than a designed product's actual screens. theme6
and theme7 are the most coherent and closest to a real, shippable SaaS UI (legible
copy, consistent card grid, real interaction affordances like a "Join" button and
a search bar). Treated as a set, they represent a **visual mood** (dark, indigo/violet,
glowing, data-viz-forward), not a literal spec to reproduce pixel-for-pixel — which
is explicitly how the brief itself frames the task ("extract the underlying design
system," not "reproduce screenshots").

## Consistent signal across all 7 images

- **Indigo/violet is the one color present in every single image**, usually as the
  dominant hue and often paired with a cyan/teal secondary and occasional pink/magenta.
  This is the strongest, most trustworthy signal in the set → became FieldPro's
  primary brand color.
- **Card-based grid composition** — every image organizes information into
  bordered/surfaced rectangular cards, regardless of overall darkness. → Core layout unit.
- **Sidebar + header shell** — present in theme1, theme2, theme3, theme6, theme7. → Adopted as the app shell.
- **Chart vocabulary**: line/area charts with gradient fill, donut charts with a
  center label, bar charts, all recur across at least 4 of the 7 images. → Adopted
  as FieldPro's standard chart types (see DASHBOARD_DESIGN.md).
- **Rounded-rectangle cards with visible (if sometimes glowing) borders**, not
  hard-edged rectangles. → Kept, at reduced radius.
- **KPI numbers rendered large and bold, with a short label beneath** (clearest in
  theme2, theme6, theme7). → Became the KPI-card and KPI-number type-scale pattern.
- **Status/tag pill badges with color coding** (clearest in theme6: "LIVE EXP",
  "RELEASED"). → Became the status badge system.

## Why indigo/violet as primary

It's the only hue with unanimous presence across all 7 sources, so it's the
highest-confidence "brand DNA" signal available. It's also a well-established,
trustworthy choice for B2B operational software (used by Linear, Stripe elements,
many field-service and ops tools) — professional rather than playful, and it
reads clearly against both light and dark surfaces, which matters since FieldPro
ships both themes.

## Why Inter for typography

None of the 7 images are high enough resolution or clean enough (several have
garbled/fake glyphs) to reliably identify a specific typeface. Where text *is*
legible (theme6, theme7), the letterforms read as a clean, geometric, low-contrast
grotesque — consistent with Inter, Manrope, or Sora. Inter was chosen because: it's
purpose-built for UI (tabular figures, tall x-height, excellent small-size
legibility for dense tables), it's free/self-hostable via `next/font`, and it's the
de facto standard for exactly this category of product, minimizing risk. Documented
here per Section 7's "if the font cannot be reliably identified, choose the closest
professional UI font and document the decision."

## Why the spacing system was chosen

A strict 4px base unit was chosen over guessing arbitrary reference pixel values
because none of the source images are UI files (no Figma/pixel access) — the brief
itself anticipates this ("document the closest estimated values and clearly mark
them as estimated," Section 3) and separately asks for a token system over
arbitrary values (Section 8). 4px is standard, maps 1:1 onto Tailwind's default
scale (zero custom config drift), and produces the same card padding / row height
rhythm visible qualitatively across all reference images (generous but not sparse).

## Why the sidebar + dark-navy accent (not a fully dark app)

Every reference image is dark-mode-first. But Section 15 of the brief explicitly
warns against a "generic admin-template" feel and against choices that hurt
operational density — and a fully dark UI is a worse default for: dense data
tables scanned all day by dispatchers/accountants, forms filled out repeatedly,
and outdoor tablet/phone use by technicians in bright sunlight (dark UIs wash out
badly in direct light). The resolution: keep **light mode as the default** for
maximum legibility and data density, but concentrate the references' dark
indigo-navy DNA into the **sidebar**, which stays dark in both themes — a pattern
common in serious operational SaaS (Vercel, Linear, Stripe dashboard variants) that
lets the brand mood show without sacrificing table/form readability. A **full dark
mode** is still built as a first-class alternate theme from the same tokens, for
users who prefer it — so nothing from the references' dark aesthetic is lost, it's
just not forced as the only option.

## What was intentionally NOT copied

- **Glow/neon shadow effects** on cards, charts, and text (present in theme1,
  theme2, theme4, theme5). Section 15 explicitly lists "neon colors" and
  "decorative animations" as things to avoid — glow effects read as exactly that
  in a data-dense operational tool and would actively hurt legibility.
- **Saturated, high-opacity chart gradients** (the near-opaque purple/cyan fills in
  theme1, theme3, theme5). Replaced with subtle 18%-opacity area fills — the
  *idea* of a gradient area chart is kept, the intensity is not.
- **Heavy card/element rounding** (20–28px radii visible in theme2, theme4).
  FieldPro caps at 16px (modals only); cards use 12px, controls 8px — enough to
  feel modern without reading as a consumer/marketing template.
- **3D/glossy/beveled chart surfaces** (the glossy donut in theme3, the wavy 3D
  ribbons in theme1). FieldPro's charts are flat and precise.
- **Garbled/decorative-only text treatment** — obviously not applicable to a real
  product; noted only because it's a reminder these are concept renders, not specs.
- **Gradient text headings** (theme2's multi-color gradient "Welcome back, Nova
  Operator"). Reads as consumer-app/marketing, not enterprise-operational; FieldPro
  headings are solid `text-primary`.
- **Full-bleed dark app background for the main content area.** Kept only for the
  sidebar and the optional dark theme, as explained above.
- **Browser-chrome / device-mockup framing** (theme4's laptop frame, theme5's
  monitor bezel). Presentation artifact of the source images, not a UI element.

## Open estimation notes

No reference file allowed pixel-level color sampling (they are photographic/render
JPEGs, several with compression artifacts and glow bloom around text, which would
make sampled values unreliable anyway). All hex values in
[COLOR_SYSTEM.md](./COLOR_SYSTEM.md) are therefore **derived/estimated** — a
disciplined, standard Tailwind-adjacent palette chosen to match the *hue family and
relative saturation/lightness* observed, not a claimed exact match. This is called
out inline in COLOR_SYSTEM.md and TYPOGRAPHY.md wherever it applies, per Section 3's
instruction to mark estimates clearly.

## Stack note

Section 20 of the brief supersedes Section 2 for the stack. Frontend: **Next.js +
Tailwind CSS**, with RxJS available for any client-side reactive-stream needs
(e.g. real-time-feeling dashboard polling once wired to a backend). Backend:
confirmed 2026-08-26 to be a **Node/Next.js-based system** — Next.js API routes
(Route Handlers) + a JS ORM (Prisma) — replacing the originally-specified ASP.NET
Core Web API + EF Core, so the whole product runs on one language/runtime end to
end. Database stays **SQL Server** per Section 2 (not contradicted by the change);
Prisma supports it directly. Auth remains JWT-based with role-based authorization,
service-layer separation, typed request/response schemas (Zod) in place of DTOs,
and the same validation/error-handling/pagination/filtering/sorting/search/audit-log
requirements from Section 2 — implementation detail changes, the architectural
qualities the brief asked for do not.

The UI is being built first end-to-end against realistic dummy data, with no
backend work until the full UI is approved — tracked in
[MILESTONES.md](../MILESTONES.md) and [PROJECT_STATUS.md](../PROJECT_STATUS.md).
