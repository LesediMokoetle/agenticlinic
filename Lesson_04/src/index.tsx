import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Layout } from './components/Layout.js'

const app = new Hono()

app.use('/static/*', serveStatic({ root: './' }))

app.get('/', (c) => {
  return c.html(
    <Layout>
      <h1>AgentClinic</h1>
      <p>AgentClinic is open for business — the place agents come for relief from their humans.</p>
    </Layout>
  )
})

serve({ fetch: app.fetch, port: 3000 }, () => {
  console.log('AgentClinic listening on http://localhost:3000')
})
