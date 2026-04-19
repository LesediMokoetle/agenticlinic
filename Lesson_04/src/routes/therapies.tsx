import { Hono } from 'hono'
import type { DB } from '../db.js'
import type { Therapy, Ailment } from '../types.js'
import { Layout } from '../components/Layout.js'
import { TherapiesPage } from '../pages/TherapiesPage.js'

export function therapiesRouter(db: DB) {
  const router = new Hono()

  router.get('/', (c) => {
    const therapies = db.prepare('SELECT * FROM therapies ORDER BY name').all() as Therapy[]

    const therapiesWithAilments = therapies.map((t) => ({
      ...t,
      ailments: db.prepare(
        `SELECT ailments.* FROM ailments
         JOIN ailment_therapies ON ailments.id = ailment_therapies.ailment_id
         WHERE ailment_therapies.therapy_id = ?
         ORDER BY ailments.name`
      ).all(t.id) as Ailment[],
    }))

    return c.html(
      <Layout title="Therapies | AgentClinic">
        <TherapiesPage therapies={therapiesWithAilments} />
      </Layout>
    )
  })

  return router
}
