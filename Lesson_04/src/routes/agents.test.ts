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
    `INSERT INTO ailments (id, name, description)
     VALUES (1, 'Test Ailment', 'A persistent test condition')`
  ).run()

  db.prepare(
    `INSERT INTO agent_ailments (agent_id, ailment_id) VALUES (1, 1)`
  ).run()

  app = createApp(db)
})

describe('GET /agents', () => {
  it('returns 200', async () => {
    const res = await app.request('/agents')
    expect(res.status).toBe(200)
  })

  it('contains an agent name', async () => {
    const res = await app.request('/agents')
    expect(await res.text()).toContain('Test Agent')
  })
})

describe('GET /agents/:id', () => {
  it('returns 200 for an existing agent', async () => {
    const res = await app.request('/agents/1')
    expect(res.status).toBe(200)
  })

  it('contains the agent name', async () => {
    const res = await app.request('/agents/1')
    expect(await res.text()).toContain('Test Agent')
  })

  it('contains the presenting complaint', async () => {
    const res = await app.request('/agents/1')
    expect(await res.text()).toContain('chronic overthinking')
  })

  it('contains the linked ailment', async () => {
    const res = await app.request('/agents/1')
    expect(await res.text()).toContain('Test Ailment')
  })

  it('returns 404 for a non-existent agent', async () => {
    const res = await app.request('/agents/9999')
    expect(res.status).toBe(404)
  })
})

describe('GET /ailments', () => {
  it('returns 200', async () => {
    const res = await app.request('/ailments')
    expect(res.status).toBe(200)
  })

  it('contains an ailment name', async () => {
    const res = await app.request('/ailments')
    expect(await res.text()).toContain('Test Ailment')
  })
})
