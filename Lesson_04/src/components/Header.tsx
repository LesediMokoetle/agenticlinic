import type { FC } from 'hono/jsx'

export const Header: FC = () => (
  <header>
    <div class="header-inner">
      <a href="/" class="brand">AgentClinic</a>
      <nav>
        <a href="/agents">Agents</a>
        <a href="/ailments">Ailments</a>
      </nav>
    </div>
  </header>
)
