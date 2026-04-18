# Plan — Phase 1: Hello Hono

## Task Group 1 — Project Setup

1. Install runtime dependencies: `hono`
2. Install dev dependencies: `tsx`, `@types/node`, `vitest`
3. Update `tsconfig.json`: set `target` to `ES2020`, `module` to `NodeNext`, `moduleResolution` to `NodeNext`
4. Add `dev` and `test` scripts to `package.json`; add `vitest.config.ts`

## Task Group 2 — Implement the Route

1. Replace `src/index.ts` with a Hono app
2. Add a single `GET /` handler that returns a minimal HTML page containing "AgentClinic is open for business"
3. Start the server on port 3000 using `@hono/node-server`

## Task Group 3 — Minimal Home Page

1. Write a `HomePage` JSX component that returns a bare HTML document
2. Include a heading ("AgentClinic"), a short tagline, and a nav placeholder
3. Update the `GET /` handler to render and return `HomePage`
4. Apply minimal inline or embedded CSS: legible font, centered content, a calm background colour

## Task Group 4 — Verify Types End-to-End

1. Run `tsc --noEmit` and confirm zero errors
2. Confirm the Hono `Context` and response types are inferred correctly in the handler

## Task Group 5 — Layout Component and External CSS

1. Create `src/components/Header.tsx` — brand link and nav placeholder; one file per component
2. Create `src/components/Footer.tsx` — copyright line; one file per component
3. Create `src/components/Main.tsx` — `<main>` wrapper accepting a `children` slot; one file per component
4. Create `src/components/Layout.tsx` — composes `<Header />`, `<Main />`, and `<Footer />`; links `<head>` to the stylesheet
4. Extract all inline styles into `static/styles.css`; write mobile-first with a `640px` breakpoint — header stacks on mobile, padding and heading size scale up at wider viewports
5. Serve `static/` via `serveStatic` from `@hono/node-server/serve-static`
6. Rename `src/index.ts` → `src/index.tsx`; update dev script; update home page to render through `Layout`
7. Confirm `tsc --noEmit` still exits clean

## Task Group 6 — Route Tests

1. Split `src/index.tsx` into `src/app.tsx` (Hono app + routes) and `src/index.tsx` (server entry point only) so the app can be imported in tests without starting a listener
2. Write `src/app.test.ts` covering: `GET /` returns `200`, heading present, tagline present, stylesheet linked
3. Confirm `npm test` exits clean
