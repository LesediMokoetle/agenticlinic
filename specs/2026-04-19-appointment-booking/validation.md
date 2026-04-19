# Validation — Phase 3: Appointment Booking

This phase is complete and mergeable when all of the following pass.

## 1. Dev server starts cleanly

- Run `npm run dev`
- No errors or warnings in the terminal
- Migration `006_appointments.sql` runs without error on startup

## 2. Seeding works

- Run `npm run seed`
- Exits with code `0`; running it a second time does not error

## 3. Routes respond correctly

| Route | Method | Condition | Expected status | Expected content |
|---|---|---|---|---|
| `/agents/:id` | GET | Agent exists | 200 | Booking form present, appointments list present |
| `/appointments` | POST | Valid body | 302 | Redirects to `/appointments/:id` |
| `/appointments` | POST | Missing field(s) | 200 | Form re-rendered with at least one error message |
| `/appointments/:id` | GET | Appointment exists | 200 | Therapist name, datetime, status |
| `/appointments/:id` | GET | ID not found | 404 | Any response |

## 4. Booking flow works end-to-end (manual check)

1. Open `/agents/1` in a browser
2. Fill in therapist name, datetime, and notes; submit
3. Browser lands on `/appointments/:id` showing the booked details
4. Navigate back to `/agents/1` — the new appointment appears in the list
5. Submit the form again with an empty therapist name — the form re-renders with an inline error, no new row in the DB

## 5. Responsive layout

- At viewport width ≤ 400px: booking form inputs stack vertically, labels are readable, submit button is full-width or otherwise tappable
- Appointment list items wrap cleanly on small screens

## 6. TypeScript is sound

- `tsc --noEmit` exits with code `0` and zero errors

## 7. Tests pass

- `npm test` exits with code `0` and zero failures
- Covers: GET detail (200), GET detail (404), POST valid (302 redirect), POST invalid (200 + error text)
- Tests use an isolated in-memory SQLite database; do not depend on `clinic.db`

## Out of Scope for This Phase

- Auth — the booking form is unauthenticated
- Therapist profiles or FK — therapist is a plain text field
- Email confirmation
- Staff ability to edit or cancel appointments
- Appointment status changes (staff dashboard, Phase 4)
