# Phase 4 — Staff Dashboard: Plan

## Group 1 — Data layer

1. Write `getDashboardStats()` in a new `src/db/dashboard.ts` module:
   - `agentCount`: `SELECT COUNT(*) FROM agents`
   - `openAppointmentCount`: `SELECT COUNT(*) FROM appointments WHERE status IN ('pending','confirmed')`
   - `ailmentsInFlightCount`: distinct ailment IDs on agents that have at least one open appointment
   - `recentActivity`: last 10 appointments joined with agents, ordered by `created_at DESC`
2. Write `getAllAgentsSummary()` — agents with their ailment count (for the agents table).
3. Write `getOpenAppointments()` — appointments with status `pending` or `confirmed`, joined with agent name.

## Group 2 — Route

4. Add `GET /dashboard` handler in `src/routes/dashboard.ts`.
5. Call all three db functions, pass results to the page component.
6. Register the route in `src/index.ts`.

## Group 3 — Page component

7. Create `src/pages/DashboardPage.tsx` (Hono JSX, server-side).
8. Stat cards row: Agent Count, Open Appointments, Ailments In-Flight — three cards side by side on desktop, stacked on mobile.
9. Recent Activity feed: simple list of last 10 appointments (agent name, therapist, datetime, status).
10. Agents table: name, status, ailment count.
11. Open Appointments table: agent, therapist, datetime, status.

## Group 4 — Styles

12. Add `.dashboard` CSS in `src/public/style.css`:
    - `.stat-cards` grid (1 column mobile → 3 columns desktop)
    - `.stat-card` card component (border, padding, count in large type)
    - `.data-table` responsive table (horizontal scroll on small screens)
    - `.activity-feed` list styles

## Group 5 — Tests

13. Write Vitest unit tests for `getDashboardStats()`, `getAllAgentsSummary()`, and `getOpenAppointments()` in `src/db/dashboard.test.ts`.
    - Use an in-memory SQLite database seeded with known fixtures.
    - Assert count values and row shapes.
