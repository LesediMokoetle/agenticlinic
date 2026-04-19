import { Hono } from 'hono'
import type { DB } from '../db.js'
import type { Agent, Ailment, Appointment } from '../types.js'
import { Layout } from '../components/Layout.js'
import { AgentsPage } from '../pages/AgentsPage.js'
import { AgentDetailPage } from '../pages/AgentDetailPage.js'

export function agentsRouter(db: DB) {
  const router = new Hono()

  router.get('/', (c) => {
    const agents = db.prepare('SELECT * FROM agents ORDER BY name').all() as Agent[]
    return c.html(
      <Layout title="Agents | AgentClinic">
        <AgentsPage agents={agents} />
      </Layout>
    )
  })

  router.get('/:id', (c) => {
    const id = Number(c.req.param('id'))
    if (isNaN(id)) return c.text('Not found', 404)

    const agent = db.prepare('SELECT * FROM agents WHERE id = ?').get(id) as Agent | undefined
    if (!agent) return c.text('Not found', 404)

    const ailments = db.prepare(
      `SELECT ailments.* FROM ailments
       JOIN agent_ailments ON ailments.id = agent_ailments.ailment_id
       WHERE agent_ailments.agent_id = ?
       ORDER BY ailments.name`
    ).all(id) as Ailment[]

    const appointments = db.prepare(
      'SELECT * FROM appointments WHERE agent_id = ? ORDER BY datetime'
    ).all(id) as Appointment[]

    return c.html(
      <Layout title={`${agent.name} | AgentClinic`}>
        <AgentDetailPage agent={agent} ailments={ailments} appointments={appointments} />
      </Layout>
    )
  })

  return router
}
