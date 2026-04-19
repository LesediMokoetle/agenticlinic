# Requirements — Phase 3: Appointment Booking

## Scope

Add appointment booking to AgentClinic. Staff and visitors can book a therapy session for an agent directly from the agent's detail page. A confirmation page shows the booked appointment. The agent detail page also lists that agent's upcoming appointments.

**Included:**
- `appointments` table + migration
- `POST /appointments` — creates a new appointment, redirects to confirmation (PRG pattern)
- `GET /appointments/:id` — confirmation / detail page
- `GET /appointments/9999` — returns 404 for unknown IDs
- Booking form embedded on `GET /agents/:id`
- Agent's appointment list shown on `GET /agents/:id` below the existing profile content
- Server-side validation on POST; re-renders form with inline errors on failure

**Excluded:**
- Therapist profiles table (Phase 5) — therapist stored as plain text for now
- Auth / login (Phase 6) — booking is unauthenticated in this phase
- Email confirmation (Phase 10)
- Staff ability to edit or cancel appointments (Phase 4 dashboard)

## Decisions

| Decision | Choice | Reason |
|---|---|---|
| Therapist field | Free-text `therapist_name` on the `appointments` table | Phase 5 introduces a real `therapists` table and FK; using text now avoids a wasted migration and keeps this phase self-contained |
| Form validation | Server-side only | Tech-stack.md: no client-side JS; validate on POST, re-render form with errors if invalid |
| Initial status | Defaults to `'pending'` | Staff will manage status transitions from the Phase 4 dashboard; only one value is needed now |
| Datetime input | HTML `datetime-local` | Works in all modern browsers without JS; produces an ISO-compatible string the server can store directly |
| Form placement | Embedded on `/agents/:id` | Keeps the booking action co-located with the agent record; no separate `/book` page needed |
| Post-submit redirect | PRG (Post/Redirect/Get) to `GET /appointments/:id` | Prevents duplicate submissions on browser refresh |
| Appointment list | On `/agents/:id`, below profile content | Surfaces upcoming appointments in context without a separate page |

## Context

- Mission: Staff manage the full agent lifecycle. Appointment booking is the first write action in the system — it must be reliable and obvious.
- Stakeholder: Mary's dashboard (Phase 4) will surface appointment counts and statuses; the data model built here feeds that view directly.
- Tech-stack constraint: no client-side JS — all validation happens on the server.
- Responsive baseline: the booking form and confirmation page must be usable at ≤ 400px viewport width.
- `tsc --noEmit` must pass. `npm test` must pass.
