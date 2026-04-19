# Plan — MVP: Core Data and Pages

## Task Group 1 — Database Setup

1. Install `better-sqlite3` and `@types/better-sqlite3`
2. Create `src/db.ts`: open (or create) `clinic.db`; export the `db` instance
3. Write `src/migrations/001_agents.sql`: `agents` table with columns `id`, `name`, `model_type`, `status`, `presenting_complaints`
4. Write `src/migrations/002_ailments.sql`: `ailments` table with columns `id`, `name`, `description`
5. Write `src/migrations/003_agent_ailments.sql`: join table `agent_ailments` (`agent_id`, `ailment_id`)
6. Run migrations on startup in `src/db.ts` using `execFileSync` or inline `readFileSync` + `exec`

## Task Group 2 — Seed Data

1. Write `src/seed.ts` (standalone script): insert 5–6 fictional agents and 4–5 ailments; link them via `agent_ailments`
2. Add a `seed` script to `package.json`: `tsx src/seed.ts`
3. Confirm running `npm run seed` populates the database cleanly; running it twice must not error (use `INSERT OR IGNORE`)

## Task Group 3 — Shared Layout

1. Finalise `src/components/Header.tsx`: brand link (`/`), nav links to `/agents` and `/ailments`
2. Finalise `src/components/Footer.tsx`: copyright line
3. Confirm `src/components/Layout.tsx` wraps `<Header />`, `<main>`, `<Footer />` and links the stylesheet
4. Extend `static/styles.css`: reset, typography, nav styles, responsive nav at `640px`
5. Update `GET /` in `src/app.tsx` to render through `<Layout />`

## Task Group 4 — Agents Routes

1. Create `src/routes/agents.tsx`; import the `db` instance
2. `GET /agents`: query all agents; render `<AgentsPage agents={...} />` inside `<Layout />`
3. `GET /agents/:id`: query agent by id + joined ailments; render `<AgentDetailPage agent={...} ailments={[...]} />` inside `<Layout />`; return 404 text if agent not found
4. Mount the agents router in `src/app.tsx`

## Task Group 5 — Ailments Routes

1. Create `src/routes/ailments.tsx`
2. `GET /ailments`: query all ailments; render `<AilmentsPage ailments={...} />` inside `<Layout />`
3. Mount the ailments router in `src/app.tsx`

## Task Group 6 — Page Components

1. Create `src/pages/AgentsPage.tsx`: table or card list of agents with a link to each detail page
2. Create `src/pages/AgentDetailPage.tsx`: agent name, model type, status badge, presenting complaints, linked ailments list
3. Create `src/pages/AilmentsPage.tsx`: list of ailments with name and description
4. Keep all components typed; no `any`

## Task Group 7 — CSS

1. Add styles for agent list (card or table), agent detail, and ailments list to `static/styles.css`
2. Ensure both list and detail pages are readable at viewport width ≤ 400px

## Task Group 8 — Tests

1. Extend `src/app.test.ts` (or create `src/routes/agents.test.ts`):
   - `GET /agents` returns 200 and contains at least one agent name
   - `GET /agents/1` returns 200 and contains the agent's name and a presenting complaint
   - `GET /agents/9999` returns 404
   - `GET /ailments` returns 200 and contains at least one ailment name
2. Tests must use an in-memory or temp SQLite database; do not rely on `clinic.db` being seeded
3. Confirm `npm test` exits clean

## Task Group 9 — Type Check

1. Run `tsc --noEmit` and fix any errors
2. Confirm zero errors before marking phase complete
