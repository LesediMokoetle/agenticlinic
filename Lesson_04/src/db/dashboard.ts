import type { DB } from '../db.js'

export type AgentSummary = {
  id: number
  name: string
  model_type: string
  status: string
  ailment_count: number
}

export type AppointmentRow = {
  id: number
  agent_id: number
  agent_name: string
  therapist_name: string
  datetime: string
  status: string
  notes: string
}

export type DashboardStats = {
  agentCount: number
  openAppointmentCount: number
  ailmentsInFlightCount: number
  recentActivity: AppointmentRow[]
}

export function getDashboardStats(db: DB): DashboardStats {
  const agentCount = (
    db.prepare('SELECT COUNT(*) as count FROM agents').get() as { count: number }
  ).count

  const openAppointmentCount = (
    db.prepare(
      "SELECT COUNT(*) as count FROM appointments WHERE status IN ('pending','confirmed')"
    ).get() as { count: number }
  ).count

  const ailmentsInFlightCount = (
    db.prepare(`
      SELECT COUNT(DISTINCT aa.ailment_id) as count
      FROM agent_ailments aa
      JOIN appointments ap ON ap.agent_id = aa.agent_id
      WHERE ap.status IN ('pending','confirmed')
    `).get() as { count: number }
  ).count

  const recentActivity = db.prepare(`
    SELECT ap.id, ap.agent_id, a.name as agent_name,
           ap.therapist_name, ap.datetime, ap.status, ap.notes
    FROM appointments ap
    JOIN agents a ON a.id = ap.agent_id
    ORDER BY ap.id DESC
    LIMIT 10
  `).all() as AppointmentRow[]

  return { agentCount, openAppointmentCount, ailmentsInFlightCount, recentActivity }
}

export function getAllAgentsSummary(db: DB): AgentSummary[] {
  return db.prepare(`
    SELECT a.id, a.name, a.model_type, a.status,
           COUNT(aa.ailment_id) as ailment_count
    FROM agents a
    LEFT JOIN agent_ailments aa ON aa.agent_id = a.id
    GROUP BY a.id
    ORDER BY a.name
  `).all() as AgentSummary[]
}

export function getOpenAppointments(db: DB): AppointmentRow[] {
  return db.prepare(`
    SELECT ap.id, ap.agent_id, a.name as agent_name,
           ap.therapist_name, ap.datetime, ap.status, ap.notes
    FROM appointments ap
    JOIN agents a ON a.id = ap.agent_id
    WHERE ap.status IN ('pending','confirmed')
    ORDER BY ap.datetime
  `).all() as AppointmentRow[]
}
