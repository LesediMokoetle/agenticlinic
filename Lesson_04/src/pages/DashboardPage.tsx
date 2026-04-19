import type { FC } from 'hono/jsx'
import type { DashboardStats, AgentSummary, AppointmentRow } from '../db/dashboard.js'

type Props = {
  stats: DashboardStats
  agents: AgentSummary[]
  openAppointments: AppointmentRow[]
}

export const DashboardPage: FC<Props> = ({ stats, agents, openAppointments }) => (
  <>
    <h1>Staff Dashboard</h1>
    <p class="page-intro">Clinic overview — read-only snapshot for Mary's team.</p>

    <div class="stat-cards">
      <div class="stat-card">
        <span class="stat-count">{stats.agentCount}</span>
        <span class="stat-label">Agents</span>
      </div>
      <div class="stat-card">
        <span class="stat-count">{stats.openAppointmentCount}</span>
        <span class="stat-label">Open Appointments</span>
      </div>
      <div class="stat-card">
        <span class="stat-count">{stats.ailmentsInFlightCount}</span>
        <span class="stat-label">Ailments In-Flight</span>
      </div>
    </div>

    <section class="dashboard-section">
      <h2>Recent Activity</h2>
      {stats.recentActivity.length === 0
        ? <p class="empty-state">No appointments booked yet.</p>
        : (
          <ul class="activity-feed">
            {stats.recentActivity.map((a) => (
              <li key={a.id} class="activity-item">
                <a href={`/appointments/${a.id}`} class="activity-link">
                  <span class="activity-agent">{a.agent_name}</span>
                  <span class="activity-therapist">with {a.therapist_name}</span>
                  <span class="activity-datetime">{a.datetime}</span>
                  <span class={`status-badge status-${a.status}`}>{a.status}</span>
                </a>
              </li>
            ))}
          </ul>
        )
      }
    </section>

    <section class="dashboard-section">
      <h2>Agents</h2>
      {agents.length === 0
        ? <p class="empty-state">No agents registered yet.</p>
        : (
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Model</th>
                  <th>Status</th>
                  <th>Ailments</th>
                </tr>
              </thead>
              <tbody>
                {agents.map((a) => (
                  <tr key={a.id}>
                    <td><a href={`/agents/${a.id}`}>{a.name}</a></td>
                    <td>{a.model_type}</td>
                    <td><span class={`status-badge status-${a.status}`}>{a.status}</span></td>
                    <td>{a.ailment_count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      }
    </section>

    <section class="dashboard-section">
      <h2>Open Appointments</h2>
      {openAppointments.length === 0
        ? <p class="empty-state">No open appointments.</p>
        : (
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Agent</th>
                  <th>Therapist</th>
                  <th>Date / Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {openAppointments.map((a) => (
                  <tr key={a.id}>
                    <td><a href={`/agents/${a.agent_id}`}>{a.agent_name}</a></td>
                    <td>{a.therapist_name}</td>
                    <td>{a.datetime}</td>
                    <td><span class={`status-badge status-${a.status}`}>{a.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      }
    </section>
  </>
)
