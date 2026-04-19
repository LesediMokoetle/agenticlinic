import { describe, it, expect, beforeAll } from 'vitest'
import { createApp } from '../app.js'
import { createDb } from '../db.js'
import type { DB } from '../db.js'

let app: ReturnType<typeof createApp>

beforeAll(() => {
  const db: DB = createDb(':memory:')

  db.prepare(
    `INSERT INTO ailments (id, name, description)
     VALUES (1, 'Test Ailment', 'A persistent test condition')`
  ).run()

  db.prepare(
    `INSERT INTO therapies (id, name, description)
     VALUES (1, 'Test Therapy', 'A reliable test treatment')`
  ).run()

  db.prepare(
    `INSERT INTO ailment_therapies (ailment_id, therapy_id) VALUES (1, 1)`
  ).run()

  app = createApp(db)
})

describe('GET /therapies', () => {
  it('returns 200', async () => {
    const res = await app.request('/therapies')
    expect(res.status).toBe(200)
  })

  it('contains a therapy name', async () => {
    const res = await app.request('/therapies')
    expect(await res.text()).toContain('Test Therapy')
  })

  it('contains the ailment the therapy treats', async () => {
    const res = await app.request('/therapies')
    expect(await res.text()).toContain('Test Ailment')
  })
})

describe('GET /ailments (with therapies)', () => {
  it('returns 200', async () => {
    const res = await app.request('/ailments')
    expect(res.status).toBe(200)
  })

  it('shows recommended therapy on the ailment', async () => {
    const res = await app.request('/ailments')
    expect(await res.text()).toContain('Test Therapy')
  })
})
