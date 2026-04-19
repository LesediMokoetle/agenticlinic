# Phase 4 — Staff Dashboard: Requirements

## Scope

A single `/dashboard` page giving Mary's team a read-only overview of clinic activity. No editing or deleting in this phase — those operations are deferred until auth exists (Phase 6).

## Surfaces

| Section | What it shows |
|---|---|
| **Agent count** | Total agents card + scrollable agents table (name, status, ailment count) |
| **Open appointments** | Count of appointments with status `pending` or `confirmed` + appointments table (agent, therapist text, datetime, status) |
| **Ailments in-flight** | Count of distinct ailments currently assigned to active agents |
| **Recent activity feed** | Last 10 appointments ordered by `created_at` DESC — a quick pulse for Mary |

## Out of Scope

- Edit / delete controls on any table
- Auth gating (Phase 6)
- Real therapist records (Phase 5) — therapist is a plain text field on `appointments`
- Pagination (tables show all rows; deferred until volume justifies it)

## Decisions

- **Read-only**: enforced by having no POST routes or action buttons in this phase. The dashboard is a safe page to share in a meeting without risk of accidental changes.
- **Therapist column**: displays `appointments.therapist` as-is. When Phase 5 lands, this column will be replaced with a link to the therapist profile.
- **No auth**: `/dashboard` is publicly accessible in this phase. Phase 6 will gate it.
- **Recent activity**: last 10 rows. Arbitrary but visible enough to be useful; revisit if Mary asks for more.

## Context

Mary is the primary user. The dashboard is the thing she opens in a meeting to show clinic health at a glance. It should load fast, look clean, and be immediately readable without explanation.

Tech stack: Hono server-side JSX, plain CSS, SQLite via `better-sqlite3`. Mobile-first; `@media (min-width: 640px)` for tablet/desktop.
