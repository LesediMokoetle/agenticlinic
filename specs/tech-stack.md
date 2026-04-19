# Tech Stack

AgentClinic is a server-side TypeScript application. All rendering happens on the server; the browser receives plain HTML that works on every screen.

## Core

| Layer | Choice | Rationale |
|---|---|---|
| Language | TypeScript | Type safety end-to-end |
| Runtime | Node.js | Stable, well-supported |
| Server framework | **Hono** | Lightweight, TypeScript-first, excellent DX |
| Templating | Hono JSX (server-side) | JSX without React overhead; components are plain functions |
| CSS | Plain CSS + CSS custom properties | No build step; mobile-first; brand colours in custom properties |
| Database | SQLite via `better-sqlite3` | Sufficient at this scale; no ORM needed |
| Package format | ESM (`"type": "module"`) | Required for `import.meta.url`; consistent with `NodeNext` tsconfig |

## Testing

| Tool | Choice | Rationale |
|---|---|---|
| Test runner | **Vitest** | Native TypeScript support, no transpile step, fast watch mode |

Tests live alongside source files (`*.test.ts` / `*.test.tsx`) and are run with `npm test`.

## CSS Approach

- **Brand colours**: orange (`#f97316`) and black (`#111111`), held in `--brand-orange` and `--brand-black`
- **Mobile-first**: base styles target small screens; `@media (min-width: 640px)` for tablet/desktop
- No CSS framework — plain CSS with custom properties and media queries is sufficient

## Known Gaps (to be resolved in later phases)

| Gap | Impact | Plan |
|---|---|---|
| **Auth / sessions** | Staff dashboard and therapist views can't be gated without it | Add in a dedicated auth phase before those views ship |
| **Frontend interactivity** | All rendering is server-side; no client-side JS or in-browser form validation | Acceptable for MVP; revisit if forms grow complex |
| **Email / notifications** | No appointment confirmations or reminders | Deferred; add after booking flow is stable |
| **Deployment target** | No production host defined | Decide before hardening phase (VPS, Railway, Fly.io, etc.) |

## What We Are Not Using

- No React, Vue, or Svelte — server-side rendering keeps the stack simple
- No ORM — plain SQL is sufficient at this scale
- No CSS framework — custom properties and media queries cover our needs
