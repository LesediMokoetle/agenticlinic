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

## Out of Scope for This Phase

- Shared layout components (header/nav/footer extracted into reusable components — Phase 2)
- External stylesheet
- Database connectivity
- Any route other than `/`
