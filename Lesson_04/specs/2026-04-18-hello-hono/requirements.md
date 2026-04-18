# Requirements — Phase 1: Hello Hono

## Scope

Install and configure Hono with a `tsx` dev server. Implement a single `/` route that renders a minimal AgentClinic home page as a JSX component. Confirm TypeScript types work end-to-end.

This phase is the smallest possible proof of life — no database, no shared layout system, no full CSS framework. Those come in later phases.

## Decisions

| Decision | Choice | Reason |
|---|---|---|
| Framework | Hono | TypeScript-first, lightweight, excellent DX — see tech-stack.md |
| Dev runner | `tsx` | Runs TypeScript directly, no build step during development |
| Port | 3000 | Standard Node.js convention |
| Route response | JSX home page component | `HomePage` renders a full HTML document with heading, tagline, and nav placeholder |
| Styling | External CSS (`static/styles.css`) | Legible font, centred content, calm background; served via `serveStatic` |
| Responsive design | Mobile-first CSS with `640px` breakpoint | Header and content reflow for small screens; no phase ships UI that breaks on mobile |
| Testing | Vitest | Native TypeScript support, no transpile step — see tech-stack.md |

## Context

- Stakeholder reference: Mary wants a reliable TypeScript stack; this phase establishes it.
- Mission reference: AgentClinic is the place agents come for relief — the `/` page is the front door.
- No production build is required for this phase; `tsx` is sufficient.
- `tsc --noEmit` must pass to confirm types are sound.
- `npm test` must pass to confirm route behaviour is correct.
