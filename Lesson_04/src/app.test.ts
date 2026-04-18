import { describe, it, expect } from 'vitest'
import { app } from './app.js'

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
