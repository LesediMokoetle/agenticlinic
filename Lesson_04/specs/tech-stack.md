# Tech Stack

AgentClinic is a server-side TypeScript application. All rendering happens on the server; the browser receives plain HTML that works well and looks good.

## Core

| Layer | Choice | Rationale |
|---|---|---|
| Language | TypeScript | Type safety end-to-end; satisfies Mary's requirement |
| Runtime | Node.js | Stable, well-supported, vast ecosystem |
| Server framework | **Hono** | Lightweight, TypeScript-first, fast, excellent DX |
| Templating | Hono JSX (server-side) | JSX without React overhead; components are just functions |
| CSS | Plain CSS + CSS custom properties | No build step required; mobile-first responsive layout; Steve gets a modern, attractive result |

## Testing

| Tool | Choice | Rationale |
|---|---|---|
| Test runner | **Vitest** | Native TypeScript support, no transpile step, fast watch mode, compatible with the NodeNext module setup |

Tests live alongside source files (`*.test.ts` / `*.test.tsx`) and are run with `npm test`.

## CSS Approach

- **Mobile-first**: base styles target small screens; `@media (min-width: 640px)` adds enhancements for tablet and desktop viewports.
- CSS custom properties for shared values (e.g. `--content-max: 960px`).
- No CSS framework — plain CSS with custom properties and media queries is sufficient at this scale.

## What We Are Not Using

- No React, Vue, or Svelte — server-side rendering keeps the stack simple
- No ORM — SQL is sufficient at this scale
