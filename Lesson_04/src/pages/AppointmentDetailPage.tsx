import type { FC } from 'hono/jsx'
import type { Appointment } from '../types.js'

type Props = { appointment: Appointment; agentName: string }

function formatDatetime(dt: string): string {
  const [date, time] = dt.split('T')
  if (!date || !time) return dt
  return `${date} at ${time}`
}

export const AppointmentDetailPage: FC<Props> = ({ appointment, agentName }) => (
  <>
    <a href={`/agents/${appointment.agent_id}`} class="back-link">← Back to {agentName}</a>
    <div class="appointment-detail">
      <div class="appointment-detail-header">
        <h1>Appointment</h1>
        <span class={`status-badge status-${appointment.status}`}>{appointment.status}</span>
      </div>
      <dl class="agent-meta">
        <dt>Agent</dt><dd>{agentName}</dd>
        <dt>Therapist</dt><dd>{appointment.therapist_name}</dd>
        <dt>Date &amp; time</dt><dd>{formatDatetime(appointment.datetime)}</dd>
        <dt>Status</dt><dd>{appointment.status}</dd>
      </dl>
      {appointment.notes && (
        <section class="agent-section">
          <h2>Notes</h2>
          <p>{appointment.notes}</p>
        </section>
      )}
    </div>
  </>
)
