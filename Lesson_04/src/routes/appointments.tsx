import { Hono } from 'hono'
import type { DB } from '../db.js'
import type { Agent, Ailment, Appointment } from '../types.js'
import { Layout } from '../components/Layout.js'
import { AgentDetailPage } from '../pages/AgentDetailPage.js'
import { AppointmentDetailPage } from '../pages/AppointmentDetailPage.js'

export function appointmentsRouter(db: DB) {
  const router = new Hono()

  router.get('/:id', (c) => {
    const id = Number(c.req.param('id'))
    if (isNaN(id)) return c.text('Not found', 404)

    const row = db.prepare(
      `SELECT appointments.*, agents.name AS agent_name
       FROM appointments
       JOIN agents ON appointments.agent_id = agents.id
       WHERE appointments.id = ?`
    ).get(id) as (Appointment & { agent_name: string }) | undefined

    if (!row) return c.text('Not found', 404)

    return c.html(
      <Layout title="Appointment | AgentClinic">
        <AppointmentDetailPage appointment={row} agentName={row.agent_name} />
      </Layout>
    )
  })

  router.post('/', async (c) => {
    const body = await c.req.parseBody()
    const agent_id = Number(body['agent_id'])
    const therapist_name = String(body['therapist_name'] ?? '').trim()
    const datetime = String(body['datetime'] ?? '').trim()
    const notes = String(body['notes'] ?? '').trim()

    if (isNaN(agent_id) || !agent_id) return c.text('Bad request', 400)

    const agent = db.prepare('SELECT * FROM agents WHERE id = ?').get(agent_id) as Agent | undefined
    if (!agent) return c.text('Agent not found', 404)

    const errors: Record<string, string> = {}
    if (!therapist_name) errors.therapist_name = 'Therapist name is required.'
    if (!datetime) {
      errors.datetime = 'Date and time are required.'
    } else if (isNaN(new Date(datetime).getTime())) {
      errors.datetime = 'Please enter a valid date and time.'
    }

    if (Object.keys(errors).length > 0) {
      const ailments = db.prepare(
        `SELECT ailments.* FROM ailments
         JOIN agent_ailments ON ailments.id = agent_ailments.ailment_id
         WHERE agent_ailments.agent_id = ?
         ORDER BY ailments.name`
      ).all(agent_id) as Ailment[]

      const appointments = db.prepare(
        'SELECT * FROM appointments WHERE agent_id = ? ORDER BY datetime'
      ).all(agent_id) as Appointment[]

      return c.html(
        <Layout title={`${agent.name} | AgentClinic`}>
          <AgentDetailPage
            agent={agent}
            ailments={ailments}
            appointments={appointments}
            formErrors={errors}
            formValues={{ therapist_name, datetime, notes }}
          />
        </Layout>,
        422
      )
    }

    const result = db.prepare(
      'INSERT INTO appointments (agent_id, therapist_name, datetime, notes) VALUES (?, ?, ?, ?)'
    ).run(agent_id, therapist_name, datetime, notes)

    return c.redirect(`/appointments/${result.lastInsertRowid}`, 302)
  })

  return router
}
