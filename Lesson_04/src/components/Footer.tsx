import type { FC } from 'hono/jsx'

type FooterProps = {}

export const Footer: FC<FooterProps> = () => (
  <footer>
    <p>&copy; {new Date().getFullYear()} AgentClinic</p>
  </footer>
)
