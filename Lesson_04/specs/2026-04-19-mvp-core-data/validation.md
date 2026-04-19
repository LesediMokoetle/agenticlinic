# Validation — MVP: Core Data and Pages

This phase is complete and mergeable when all of the following pass.

## Checks

### 1. Dev server starts cleanly
- Run `npm run dev`
- No errors or warnings in the terminal output
- SQLite database is created and migrations run without errors

### 2. Seeding works
- Run `npm run seed`
- Exits with code `0`
- Running it a second time does not error (idempotent inserts)

### 3. Routes respond correctly

| Route | Expected status | Expected content |
|---|---|---|
| `GET /agents` | 200 | At least one agent name |
| `GET /agents/1` | 200 | Agent name, model type, status, at least one ailment |
| `GET /agents/9999` | 404 | Any response |
| `GET /ailments` | 200 | At least one ailment name and description |
| `GET /` | 200 | AgentClinic heading (unchanged from Phase 1) |

### 4. Navigation works
- Every page's header contains working links to `/`, `/agents`, and `/ailments`
- No broken links on any seeded page

### 5. Responsive layout
- At viewport width ≤ 400px: all list and detail pages are readable with no horizontal scroll
- Nav items stack or wrap cleanly on small screens

### 6. TypeScript is sound
- `tsc --noEmit` exits with code `0` and zero errors

### 7. Tests pass
- `npm test` exits with code `0` and zero failures
- Covers: all routes in the table above, including the 404 case
- Tests use an isolated database; they do not depend on `clinic.db` being present or seeded

## Out of Scope for This Phase

- Auth, login, sessions
- Therapies, appointments, dashboard
- Therapist profiles
- Accessibility audit (Phase 6)
- Error pages and logging middleware (Phase 7)
