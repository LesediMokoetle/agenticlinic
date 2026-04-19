import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
import { Layout } from './components/Layout.js'
import { agentsRouter } from './routes/agents.js'
import { ailmentsRouter } from './routes/ailments.js'
import { therapiesRouter } from './routes/therapies.js'
import { appointmentsRouter } from './routes/appointments.js'
import { dashboardRouter } from './routes/dashboard.js'
import type { DB } from './db.js'

export function createApp(db: DB) {
  const app = new Hono()

  app.use('/static/*', serveStatic({ root: './' }))

  app.get('/', (c) =>
    c.html(
      <Layout>
        <h1>AgentClinic</h1>
        <p>AgentClinic is open for business — the place agents come for relief from their humans.</p>
      </Layout>
    )
  )

  app.route('/agents', agentsRouter(db))
  app.route('/ailments', ailmentsRouter(db))
  app.route('/therapies', therapiesRouter(db))
  app.route('/appointments', appointmentsRouter(db))
  app.route('/dashboard', dashboardRouter(db))

  return app
}
