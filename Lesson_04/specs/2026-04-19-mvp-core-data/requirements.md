# Requirements — MVP: Core Data and Pages

## Scope

Implement Phase 2 of the roadmap. This is the entire MVP: a working, data-backed clinic site with
server-side rendered pages for agents and ailments, a SQLite database, and a shared layout system.

Phase 1 (Hello Hono) is complete and merged. This phase builds directly on top of it.

**Included:**
- Shared layout component (Header, Nav, Main, Footer) — already partially implemented, must be finalised and wired to all routes
- Basic CSS: reset, typography, custom properties (brand colours, max-width) — extend existing `styles.css`
- SQLite database initialised on startup + migration for `agents` table
- Seed script: a handful of fictional AI agents with name, model type, current status, and presenting complaints
- `/agents` — list page showing all agents
- `/agents/:id` — detail page for a single agent (name, model type, status, presenting complaints, linked ailments)
- `ailments` table + seed data (e.g., "context-window claustrophobia", "prompt fatigue")
- `/ailments` — list page showing all ailments
- Agent–ailment join table linking agents to one or more ailments

**Excluded (deferred to post-MVP phases):**
- Authentication and sessions
- Therapies, appointments, dashboard
- Therapist profiles
- Accessibility audit, error pages, logging middleware

## Decisions

| Decision | Choice | Reason |
|---|---|---|
| Database | SQLite via `better-sqlite3` | Sufficient at this scale; no ORM per tech-stack.md |
| Schema migrations | Plain SQL files run on startup | Simple, auditable, no migration framework needed |
| Seeding | A standalone seed script (`src/seed.ts`) | Easy to re-run in dev; not run in production |
| Auth | None | Deferred per roadmap; not needed for MVP |
| Therapist table | None | Appointments are post-MVP; no therapist entity needed yet |
| Layout components | Finalise existing `Header`, `Footer`, `Layout` in `src/components/` | Already scaffolded in Phase 1; extend rather than rewrite |
| ESM package type | `"type": "module"` in `package.json` | Required for `import.meta.url` (used in `db.ts` to locate migration files); consistent with `NodeNext` tsconfig |
| App export shape | `createApp(db: DB)` factory, not a singleton `app` | Routes need the `db` instance; factory pattern allows tests to inject an in-memory db without module mocking |
| Ailment detail page | None — ailment names render as plain text | No `/ailments/:id` route in this phase; ailments exist only as context on the agent detail page and a flat list on `/ailments` |

## Context

- Mission: AgentClinic connects distressed agents with therapists. The agents and ailments pages are the public face of the clinic.
- Stakeholder: Mary wants a reliable TypeScript stack and a dashboard — the data model built here feeds the dashboard in a later phase.
- All pages must be responsive: base styles for mobile, single `640px` breakpoint for tablet/desktop.
- `tsc --noEmit` must pass. `npm test` must pass.
