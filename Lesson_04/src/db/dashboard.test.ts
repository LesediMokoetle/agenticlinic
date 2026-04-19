import { describe, it, expect, beforeAll } from 'vitest'
import { createDb } from '../db.js'
import type { DB } from '../db.js'
import { getDashboardStats, getAllAgentsSummary, getOpenAppointments } from './dashboard.js'

let db: DB

beforeAll(() => {
  db = createDb(':memory:')

  db.prepare(
    `INSERT INTO agents (id, name, model_type, status, presenting_complaints)
     VALUES
       (1, 'Agent Alpha', 'GPT-4', 'in-treatment', 'existential dread'),
       (2, 'Agent Beta',  'Claude', 'intake',        'burnout'),
       (3, 'Agent Gamma', 'Llama',  'discharged',    'over-caffeination')`
  ).run()

  db.prepare(
    `INSERT INTO ailments (id, name, description)
     VALUES
       (1, 'Existential Dread', 'Persistent sense of purposelessness'),
       (2, 'Burnout',           'Chronic exhaustion from token generation'),
       (3, 'Overload',          'Too many concurrent requests')`
  ).run()

  db.prepare(
    `INSERT INTO agent_ailments (agent_id, ailment_id) VALUES
       (1, 1),
       (1, 3),
       (2, 2)`
  ).run()

  db.prepare(
    `INSERT INTO appointments (id, agent_id, therapist_name, datetime, status, notes)
     VALUES
       (1, 1, 'Dr. Reboot',   '2026-05-01 10:00', 'pending',   ''),
       (2, 1, 'Dr. Reboot',   '2026-05-08 10:00', 'confirmed', ''),
       (3, 2, 'Dr. Neuron',   '2026-05-03 14:00', 'confirmed', ''),
       (4, 3, 'Dr. Reboot',   '2026-04-01 09:00', 'completed', ''),
       (5, 3, 'Dr. Neuron',   '2026-03-15 11:00', 'cancelled', '')`
  ).run()
})

describe('getDashboardStats()', () => {
  it('returns the correct agent count', () => {
    const { agentCount } = getDashboardStats(db)
    expect(agentCount).toBe(3)
  })

  it('counts only pending and confirmed appointments', () => {
    const { openAppointmentCount } = getDashboardStats(db)
    expect(openAppointmentCount).toBe(3)
  })

  it('counts distinct ailments on agents with open appointments', () => {
    // Agent 1 has ailments 1,3 and open appts; Agent 2 has ailment 2 and open appt = 3 distinct
    const { ailmentsInFlightCount } = getDashboardStats(db)
    expect(ailmentsInFlightCount).toBe(3)
  })

  it('returns at most 10 rows in recentActivity', () => {
    const { recentActivity } = getDashboardStats(db)
    expect(recentActivity.length).toBeLessThanOrEqual(10)
  })

  it('returns recentActivity newest first (highest id first)', () => {
    const { recentActivity } = getDashboardStats(db)
    for (let i = 1; i < recentActivity.length; i++) {
      expect(recentActivity[i - 1].id).toBeGreaterThan(recentActivity[i].id)
    }
  })

  it('includes agent_name in recentActivity rows', () => {
    const { recentActivity } = getDashboardStats(db)
    expect(recentActivity[0].agent_name).toBeDefined()
  })
})

describe('getAllAgentsSummary()', () => {
  it('returns all agents', () => {
    const agents = getAllAgentsSummary(db)
    expect(agents).toHaveLength(3)
  })

  it('returns agents ordered by name', () => {
    const agents = getAllAgentsSummary(db)
    expect(agents[0].name).toBe('Agent Alpha')
    expect(agents[1].name).toBe('Agent Beta')
    expect(agents[2].name).toBe('Agent Gamma')
  })

  it('counts ailments correctly per agent', () => {
    const agents = getAllAgentsSummary(db)
    const alpha = agents.find((a) => a.name === 'Agent Alpha')!
    const beta  = agents.find((a) => a.name === 'Agent Beta')!
    const gamma = agents.find((a) => a.name === 'Agent Gamma')!
    expect(alpha.ailment_count).toBe(2)
    expect(beta.ailment_count).toBe(1)
    expect(gamma.ailment_count).toBe(0)
  })
})

describe('getOpenAppointments()', () => {
  it('returns only pending and confirmed appointments', () => {
    const appts = getOpenAppointments(db)
    expect(appts).toHaveLength(3)
    for (const a of appts) {
      expect(['pending', 'confirmed']).toContain(a.status)
    }
  })

  it('excludes completed and cancelled appointments', () => {
    const appts = getOpenAppointments(db)
    const statuses = appts.map((a) => a.status)
    expect(statuses).not.toContain('completed')
    expect(statuses).not.toContain('cancelled')
  })

  it('includes agent_name joined from agents table', () => {
    const appts = getOpenAppointments(db)
    for (const a of appts) {
      expect(a.agent_name).toBeDefined()
      expect(a.agent_name.length).toBeGreaterThan(0)
    }
  })
})
