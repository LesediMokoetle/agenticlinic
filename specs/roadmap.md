# Roadmap

Phases are intentionally small — each one is a shippable slice, independently reviewable and testable.

**Baseline across all phases:** every page must be responsive. Base styles target mobile; a single `640px` breakpoint covers tablet and desktop. No phase ships UI that breaks on small screens.

---

## Phase 1 — Core Data and Pages — complete
- SQLite database + migrations (`agents`, `ailments`, `agent_ailments` tables)
- Seed data: fictional agents and ailments
- Shared layout (Header, Nav, Main, Footer)
- `/agents` list page and `/agents/:id` detail page
- `/ailments` list page

## Phase 2 — Therapies Catalog
- `therapies` table + seed data
- `/therapies` list page
- Map ailments → recommended therapies

## Phase 3 — Appointment Booking
- `appointments` table (agent, therapist, datetime, status)
- Booking form on agent detail page
- Basic validation and confirmation page

## Phase 4 — Staff Dashboard
- `/dashboard` with summary counts: agents, open appointments, ailments in-flight
- Simple table views for staff to manage records
- Mary's dashboard is now real

## Phase 5 — Therapist Profiles
- `therapists` table + seed data
- `/therapists` list page and `/therapists/:id` detail page
- Link therapists to their specialisms (ailments they treat)
- Appointments reference a real therapist record

## Phase 6 — Auth and Access Control
- Session-based login for staff and therapists
- Gate `/dashboard` and therapist appointment views behind login
- Public pages (`/agents`, `/ailments`, `/therapies`) remain unauthenticated

## Phase 7 — Feedback Form
- Contact / feedback form on the public site
- Server-side validation; submissions stored in the database
- Staff can view submissions from the dashboard

## Phase 8 — Agent Reviews
- Agents (or their assigned staff) can leave a review of their therapy session
- Reviews visible on the therapist detail page

## Phase 9 — About Page
- `/about` with clinic address, mission summary, and a map embed
- Static content; no database required

## Phase 10 — Email Notifications
- Appointment confirmation sent to the agent's registered contact
- Reminder email 24 hours before the appointment

## Phase 11 — Polish and Accessibility
- Semantic HTML audit
- Keyboard navigation and focus styles
- ARIA labels and screen-reader testing

## Phase 12 — Hardening
- Error pages (404, 500)
- Input sanitisation on all forms
- Basic logging middleware
- Define and document the production deployment target

---

Later phases (not yet planned): reporting, therapist availability calendar, multi-clinic support.
