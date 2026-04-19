import { describe, it, expect, beforeAll } from 'vitest'
import { createApp } from './app.js'
import { createDb } from './db.js'

let app: ReturnType<typeof createApp>

beforeAll(() => {
  app = createApp(createDb(':memory:'))
})

describe('GET /', () => {
  it('returns 200', async () => {
    const res = await app.request('/')
    expect(res.status).toBe(200)
  })

  it('includes the AgentClinic heading', async () => {
    const res = await app.request('/')
    expect(await res.text()).toContain('<h1>AgentClinic</h1>')
  })

  it('includes the tagline', async () => {
    const res = await app.request('/')
    expect(await res.text()).toContain('AgentClinic is open for business')
  })

  it('links the stylesheet', async () => {
    const res = await app.request('/')
    expect(await res.text()).toContain('/static/styles.css')
  })
})
