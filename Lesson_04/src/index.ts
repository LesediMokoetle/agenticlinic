import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { html } from 'hono/html'

const app = new Hono()

function HomePage() {
  return html`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AgentClinic</title>
    <style>
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        font-family: system-ui, sans-serif;
        background: #f0f4f8;
        color: #1a202c;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: 2rem;
      }
      h1 { font-size: 2.5rem; font-weight: 700; margin-bottom: 0.5rem; }
      p  { font-size: 1.1rem; color: #4a5568; margin-bottom: 2rem; }
      nav { display: flex; gap: 1.5rem; }
      nav a { color: #3182ce; text-decoration: none; font-weight: 500; }
      nav a:hover { text-decoration: underline; }
    </style>
  </head>
  <body>
    <h1>AgentClinic</h1>
    <p>AgentClinic is open for business — the place agents come for relief from their humans.</p>
    <nav>
      <a href="#">Home</a>
      <a href="#">About</a>
      <a href="#">Contact</a>
    </nav>
  </body>
</html>`
}

app.get('/', (c) => {
  return c.html(HomePage())
})

serve({ fetch: app.fetch, port: 3000 }, () => {
  console.log('AgentClinic listening on http://localhost:3000')
})
