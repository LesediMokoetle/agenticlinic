# Phase 4 — Staff Dashboard: Validation

Phase is ready to merge when both gates pass.

---

## Gate 1 — Vitest tests

Run `npm test` and confirm:

- [ ] `getDashboardStats()` returns correct `agentCount`, `openAppointmentCount`, `ailmentsInFlightCount` against a known seed
- [ ] `recentActivity` returns ≤ 10 rows, ordered newest first
- [ ] `getAllAgentsSummary()` returns each agent with the correct ailment count
- [ ] `getOpenAppointments()` excludes appointments with status `completed` or `cancelled`
- [ ] No existing tests are broken

---

## Gate 2 — Manual smoke test

Start the server (`npm run dev`) and run through this checklist in a browser.

### Desktop (≥ 640px)

- [ ] `GET /dashboard` returns 200 with no errors in terminal
- [ ] Three stat cards visible in a row: Agent Count, Open Appointments, Ailments In-Flight
- [ ] Card counts match what you'd expect from seed data (verify by hand against the SQLite file)
- [ ] Recent Activity feed shows ≤ 10 rows, newest appointment first
- [ ] Agents table renders with correct columns: Name, Status, Ailment Count
- [ ] Open Appointments table renders with correct columns: Agent, Therapist, Date/Time, Status
- [ ] Nav link to `/dashboard` is present in the shared header

### Mobile (375px — use DevTools device emulation)

- [ ] Stat cards stack vertically (1 column)
- [ ] Tables scroll horizontally without breaking the page layout
- [ ] No text is clipped or overflows the viewport
- [ ] Activity feed is readable without horizontal scroll

### Edge cases

- [ ] If there are zero open appointments, the count card shows `0` (not blank or an error)
- [ ] Page loads without JavaScript enabled (server-side only)
