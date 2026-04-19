import { describe, it, expect, beforeAll } from 'vitest'
import { createApp } from '../app.js'
import { createDb } from '../db.js'
import type { DB } from '../db.js'

let app: ReturnType<typeof createApp>

beforeAll(() => {
  const db: DB = createDb(':memory:')

  db.prepare(
    `INSERT INTO agents (id, name, model_type, status, presenting_complaints)
     VALUES (1, 'Test Agent', 'Test Model', 'in-treatment', 'chronic overthinking')`
  ).run()

  db.prepare(
    `INSERT INTO appointments (id, agent_id, therapist_name, datetime, status, notes)
     VALUES (1, 1, 'Dr. Testmann', '2026-06-01T11:00', 'pending', 'Bring snacks.')`
  ).run()

  app = createApp(db)
})

describe('GET /appointments/:id', () => {
  it('returns 200 for an existing appointment', async () => {
    const res = await app.request('/appointments/1')
    expect(res.status).toBe(200)
  })

  it('contains the therapist name', async () => {
    const res = await app.request('/appointments/1')
    expect(await res.text()).toContain('Dr. Testmann')
  })

  it('contains the agent name', async () => {
    const res = await app.request('/appointments/1')
    expect(await res.text()).toContain('Test Agent')
  })

  it('returns 404 for a non-existent appointment', async () => {
    const res = await app.request('/appointments/9999')
    expect(res.status).toBe(404)
  })
})

describe('POST /appointments', () => {
  it('redirects to the new appointment on valid submission', async () => {
    const res = await app.request('/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        agent_id: '1',
        therapist_name: 'Dr. Valid',
        datetime: '2026-07-01T09:00',
        notes: 'test notes',
      }).toString(),
    })
    expect(res.status).toBe(302)
    expect(res.headers.get('location')).toMatch(/^\/appointments\/\d+$/)
  })

  it('returns 422 and shows an error when therapist name is missing', async () => {
    const res = await app.request('/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        agent_id: '1',
        therapist_name: '',
        datetime: '2026-07-01T09:00',
        notes: '',
      }).toString(),
    })
    expect(res.status).toBe(422)
    expect(await res.text()).toContain('required')
  })

  it('returns 422 and shows an error when datetime is missing', async () => {
    const res = await app.request('/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        agent_id: '1',
        therapist_name: 'Dr. Valid',
        datetime: '',
        notes: '',
      }).toString(),
    })
    expect(res.status).toBe(422)
    expect(await res.text()).toContain('required')
  })
})
