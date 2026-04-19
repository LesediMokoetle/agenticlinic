import { serve } from '@hono/node-server'
import { createApp } from './app.js'
import { createDb } from './db.js'

const db = createDb()
const app = createApp(db)

serve({ fetch: app.fetch, port: 3000 }, () => {
  console.log('AgentClinic listening on http://localhost:3000')
})
