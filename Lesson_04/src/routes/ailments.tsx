import { Hono } from 'hono'
import type { DB } from '../db.js'
import type { Ailment } from '../types.js'
import { Layout } from '../components/Layout.js'
import { AilmentsPage } from '../pages/AilmentsPage.js'

export function ailmentsRouter(db: DB) {
  const router = new Hono()

  router.get('/', (c) => {
    const ailments = db.prepare('SELECT * FROM ailments ORDER BY name').all() as Ailment[]
    return c.html(
      <Layout title="Ailments | AgentClinic">
        <AilmentsPage ailments={ailments} />
      </Layout>
    )
  })

  return router
}
