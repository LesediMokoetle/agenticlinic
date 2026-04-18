import type { FC } from 'hono/jsx'

export const Header: FC = () => (
  <header>
    <div class="header-inner">
      <a href="/" class="brand">AgentClinic</a>
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>
    </div>
  </header>
)
