# Plan — Phase 3: Appointment Booking

## Task Group 1 — Database

1. Write `src/migrations/006_appointments.sql`: `appointments` table with columns `id`, `agent_id` (FK → agents), `therapist_name` (TEXT), `datetime` (TEXT, ISO format), `status` (TEXT DEFAULT 'pending'), `notes` (TEXT DEFAULT '')
2. Add `'006_appointments.sql'` to the migration list in `src/db.ts`
3. Add `Appointment` type to `src/types.ts`: `{ id, agent_id, therapist_name, datetime, status, notes }`

## Task Group 2 — Seed

1. Add appointment seed rows to `src/seed.ts` using `INSERT OR IGNORE`; link to existing agent IDs; use realistic future datetimes and therapist name strings

## Task Group 3 — Appointments Route

1. Create `src/routes/appointments.tsx`
2. `GET /appointments/:id`: query appointment + agent name; render `<AppointmentDetailPage />`; return 404 text if not found
3. `POST /appointments`: parse form body (`agent_id`, `therapist_name`, `datetime`, `notes`); validate (all required fields present, datetime is a valid ISO string, agent exists); on failure re-render the agent detail page with the form errors and submitted values pre-filled; on success insert row and redirect to `GET /appointments/:id`
4. Mount the appointments router in `src/app.tsx`

## Task Group 4 — Update Agents Route

1. In `src/routes/agents.tsx`, update `GET /agents/:id` to also query upcoming appointments for that agent (`SELECT * FROM appointments WHERE agent_id = ? ORDER BY datetime`)
2. Pass appointments to `<AgentDetailPage />`

## Task Group 5 — Page Components

1. Create `src/pages/AppointmentDetailPage.tsx`: show agent name, therapist name, datetime (formatted), status badge, notes
2. Update `src/pages/AgentDetailPage.tsx`:
   - Add a booking form section with fields: therapist name (text input), datetime (datetime-local input), notes (textarea); render inline field errors if present
   - Add an appointments list section below the profile showing the agent's upcoming appointments (therapist name, datetime, status badge); show "No appointments yet." if empty
3. Update `AgentDetailPage` props type to accept `appointments` and optional `formErrors` / `formValues`

## Task Group 6 — CSS

1. Add form styles to `static/styles.css`: `.booking-form`, `.form-field`, `.form-label`, `.form-input`, `.form-textarea`, `.form-error`, `.form-submit`
2. Add appointment list styles: `.appointment-list`, `.appointment-item`
3. Add appointment detail styles: `.appointment-detail`, `.appointment-detail-header`
4. Ensure all new elements are readable at ≤ 400px

## Task Group 7 — Tests

1. Create `src/routes/appointments.test.ts`:
   - `GET /appointments/:id` returns 200 and contains therapist name
   - `GET /appointments/9999` returns 404
   - `POST /appointments` with valid body returns 302 redirect to `/appointments/:id`
   - `POST /appointments` with missing fields returns 200 (re-rendered form) and contains error text
2. Seed test database in `beforeAll` with one agent and one appointment
3. Confirm `npm test` exits clean

## Task Group 8 — Type Check

1. Run `tsc --noEmit` and fix any errors
2. Confirm zero errors before marking phase complete
