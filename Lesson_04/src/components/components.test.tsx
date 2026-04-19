import { describe, it, expect } from 'vitest'
import { Header } from './Header.js'
import { Footer } from './Footer.js'
import { Layout } from './Layout.js'

describe('Header', () => {
  it('renders a header element', () => {
    const html = String(<Header />)
    expect(html).toContain('<header')
    expect(html).toContain('</header>')
  })

  it('contains the brand link pointing to /', () => {
    const html = String(<Header />)
    expect(html).toContain('class="brand"')
    expect(html).toContain('href="/"')
  })

  it('contains the brand name', () => {
    const html = String(<Header />)
    expect(html).toContain('AgentClinic')
  })

  it('contains the Agents nav link', () => {
    const html = String(<Header />)
    expect(html).toContain('href="/agents"')
    expect(html).toContain('Agents')
  })

  it('contains the Ailments nav link', () => {
    const html = String(<Header />)
    expect(html).toContain('href="/ailments"')
    expect(html).toContain('Ailments')
  })

  it('contains the Therapies nav link', () => {
    const html = String(<Header />)
    expect(html).toContain('href="/therapies"')
    expect(html).toContain('Therapies')
  })
})

describe('Footer', () => {
  it('renders a footer element', () => {
    const html = String(<Footer />)
    expect(html).toContain('<footer')
    expect(html).toContain('</footer>')
  })

  it('contains the current year', () => {
    const html = String(<Footer />)
    expect(html).toContain(String(new Date().getFullYear()))
  })

  it('contains AgentClinic', () => {
    const html = String(<Footer />)
    expect(html).toContain('AgentClinic')
  })
})

describe('Layout', () => {
  it('opens with DOCTYPE', () => {
    const html = String(<Layout />)
    expect(html).toContain('<!DOCTYPE html>')
  })

  it('sets html lang to en', () => {
    const html = String(<Layout />)
    expect(html).toContain('<html lang="en">')
  })

  it('uses default title when none provided', () => {
    const html = String(<Layout />)
    expect(html).toContain('<title>AgentClinic</title>')
  })

  it('uses a custom title when provided', () => {
    const html = String(<Layout title="About Us" />)
    expect(html).toContain('<title>About Us</title>')
  })

  it('links the stylesheet', () => {
    const html = String(<Layout />)
    expect(html).toContain('href="/static/styles.css"')
  })

  it('renders children inside main', () => {
    const html = String(<Layout><p>test content</p></Layout>)
    expect(html).toContain('<main>')
    expect(html).toContain('<p>test content</p>')
    expect(html).toContain('</main>')
  })

  it('includes header and footer', () => {
    const html = String(<Layout />)
    expect(html).toContain('<header')
    expect(html).toContain('<footer')
  })
})
