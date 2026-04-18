# Validation — Phase 1: Hello Hono

Phase 1 is complete and mergeable when all of the following pass.

## Checks

1. **Dev server starts cleanly**
   - Run `npm run dev`
   - No errors or warnings in the terminal output

2. **Route responds correctly**
   - `curl http://localhost:3000/` returns an HTML document
   - HTTP status is `200`

3. **Home page renders correctly**
   - Opening `http://localhost:3000/` in a browser shows the AgentClinic heading and tagline
   - A nav placeholder is present in the markup
   - The page is legible with minimal styling (font, centred layout, background colour)

4. **TypeScript is sound**
   - `tsc --noEmit` exits with code `0` and zero errors

5. **Responsive layout**
   - At viewport width ≤ 400px the page is readable with no horizontal scroll
   - Header brand and nav stack vertically on small screens
   - Content padding and heading size scale down on mobile

6. **Tests pass**
   - `npm test` exits with code `0` and zero failures
   - Covers: `GET /` status 200, heading present, tagline present, stylesheet linked

## Out of Scope for This Phase

- Database connectivity
- Any route other than `/`
