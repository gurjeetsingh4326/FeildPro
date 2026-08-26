# FieldPro — UI Patterns

Cross-cutting patterns that combine multiple components. See
[COMPONENT_GUIDELINES.md](./COMPONENT_GUIDELINES.md) for the individual component
specs referenced here.

## List/table page pattern

Every entity list (Work Orders, Customers, Technicians, Invoices, Payments, Parts)
follows the same skeleton:

```
Page title + primary "New X" button (top right)
Toolbar: search (left) — filters, sort, density toggle, view switch (right)
[Active filter chips row, if any filters applied — each removable]
Table (or Kanban/Calendar for Work Orders/Schedule)
Pagination footer
```

Filters open in a popover from a "Filters" button (`SlidersHorizontal` icon) rather
than permanently occupying page width — keeps the list dense by default.

## Detail page pattern (e.g. Work Order Details, Customer Profile)

Two-column layout at `xl`+: primary content column (~66%) + right rail (~34%) for
metadata/related-records/quick actions. Header block above both columns holds
entity name, status badge, and primary actions. Right rail is what collapses first
on smaller screens (moves below primary content, not hidden).

## Form patterns

- Multi-step entity creation (e.g. new Work Order) uses a single scrollable form
  with clear section headers rather than a wizard, **unless** the flow has a hard
  sequential dependency (e.g. must pick Customer before Service list can filter) —
  in that case use a lightweight stepper (numbered, not a modal-per-step).
- Validation: inline, on blur, via Zod schema → React Hook Form. Error text appears
  below the field, field border turns `error`. Never block submission silently —
  scroll to and focus the first invalid field on submit attempt.
- Destructive changes (cancel work order, void invoice, delete customer) always
  route through a confirmation dialog.
- Autosave is used for the Technician mobile job-execution flow (notes, labor,
  parts) since field connectivity is unreliable — show a small "Saved" / "Saving…"
  / "Offline — will sync" indicator near the top of the form.

## Filtering, sorting, search

- Search is always debounced (300ms) and searches the entity's key human-readable
  fields (name, number, address) — never requires exact match.
- Column sort: single-column only for v1 (click header, cycles
  asc → desc → none), indicated with the sortable header icon treatment.
- Filters combine with AND logic; each active filter renders as a removable chip
  under the toolbar so state is always visible, never hidden inside an open popover.

## Empty states (by context)

| Context | Message pattern |
|---|---|
| No records yet (first use) | Icon + "No [entities] yet" + one-line value prop + primary "Create" CTA |
| No results (filtered/searched) | Icon + "No results for '[query]'" + "Clear filters" secondary action, no primary CTA |
| Error loading | Icon (`AlertTriangle`, `warning` tint) + "Couldn't load [entity]" + "Retry" button |

## Loading states

- Initial page load: skeleton matching the real layout (skeleton table rows,
  skeleton KPI cards) — never a full-page spinner once the shell is known.
- In-place refresh (e.g. re-filtering a table): subtle top-of-table thin `primary`
  progress bar, existing rows stay visible (not replaced by skeleton) to avoid
  layout jank.
- Button submit: label replaced by inline spinner + label stays but dims, button
  disabled, no layout shift (fixed min-width).

## Notifications & feedback

- Toast for async action results (created/updated/deleted, errors) — see
  COMPONENT_GUIDELINES.md for styling.
- Inline banner (not toast) for persistent/contextual state, e.g. "This invoice is
  overdue by 12 days" at the top of an Invoice Detail page — `warning`/`error`
  tinted banner, `radius-md`, dismissible only if not safety-critical.

## Assignment & scheduling pattern

Technician assignment uses a right-side drawer from the Work Order (avatar list of
technicians, filtered by skill/availability, showing today's job count as a light
load indicator) rather than a full-page navigation — keeps dispatcher in flow.
Drag-and-drop on the Schedule calendar reassigns technician/time directly; a toast
confirms with an "Undo" action (5s window).

## Attachments & photos

Grid of thumbnails (`radius-md`, 96×96 on desktop / 72×72 mobile), upload tile as
the first grid cell (dashed `border`, `Plus` icon). Click opens lightbox
(full-bleed dark backdrop, single image, prev/next arrows, caption/uploader/timestamp).

## Audit / activity trail

Every mutable entity (Work Order, Invoice, Customer) has a Timeline tab/section
(see COMPONENT_GUIDELINES.md → Timelines) showing who changed what, when — pulled
from the backend audit log once it exists; UI-only phase uses static dummy history.

## Role-based UI adaptation

Navigation and page actions render conditionally by role (Admin/Dispatcher/
Technician/Accountant per the brief) — a nav item or action a role can't use is
**hidden**, not disabled-and-visible, to keep each role's view uncluttered. This is
a frontend convenience only; real authorization is enforced server-side once the
API exists.
