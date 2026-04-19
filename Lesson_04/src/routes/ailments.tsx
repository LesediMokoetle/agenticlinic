import { Hono } from 'hono'
import type { DB } from '../db.js'
import type { Ailment, Therapy } from '../types.js'
import { Layout } from '../components/Layout.js'
import { AilmentsPage } from '../pages/AilmentsPage.js'
import type { AilmentWithTherapies } from '../types.js'

export function ailmentsRouter(db: DB) {
  const router = new Hono()

  router.get('/', (c) => {
    const ailments = db.prepare('SELECT * FROM ailments ORDER BY name').all() as Ailment[]

    const ailmentsWithTherapies: AilmentWithTherapies[] = ailments.map((a) => ({
      ...a,
      therapies: db.prepare(
        `SELECT therapies.* FROM therapies
         JOIN ailment_therapies ON therapies.id = ailment_therapies.therapy_id
         WHERE ailment_therapies.ailment_id = ?
         ORDER BY therapies.name`
      ).all(a.id) as Therapy[],
    }))

    return c.html(
      <Layout title="Ailments | AgentClinic">
        <AilmentsPage ailments={ailmentsWithTherapies} />
      </Layout>
    )
  })

  return router
}
