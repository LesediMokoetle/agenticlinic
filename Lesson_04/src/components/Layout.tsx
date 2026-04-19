import type { FC, Child } from 'hono/jsx'
import { raw } from 'hono/html'
import { Header } from './Header.js'
import { Footer } from './Footer.js'

type LayoutProps = {
  title?: string
  children?: Child
}

export const Layout: FC<LayoutProps> = ({ title = 'AgentClinic', children }) => (
  <>
    {raw('<!DOCTYPE html>')}
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <link rel="stylesheet" href="/static/styles.css" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  </>
)
