import type { FC } from 'hono/jsx'
import type { Agent, Ailment, Appointment } from '../types.js'

type FormErrors = Partial<Record<'therapist_name' | 'datetime', string>>
type FormValues = Partial<Record<'therapist_name' | 'datetime' | 'notes', string>>

type Props = {
  agent: Agent
  ailments: Ailment[]
  appointments: Appointment[]
  formErrors?: FormErrors
  formValues?: FormValues
}

function formatDatetime(dt: string): string {
  const [date, time] = dt.split('T')
  if (!date || !time) return dt
  return `${date} at ${time}`
}

export const AgentDetailPage: FC<Props> = ({ agent, ailments, appointments, formErrors, formValues }) => (
  <>
    <a href="/agents" class="back-link">← All agents</a>
    <div class="agent-detail">
      <div class="agent-detail-header">
        <h1>{agent.name}</h1>
        <span class={`status-badge status-${agent.status}`}>{agent.status}</span>
      </div>
      <dl class="agent-meta">
        <dt>Model type</dt><dd>{agent.model_type}</dd>
        <dt>Status</dt><dd>{agent.status}</dd>
      </dl>
      <section class="agent-section">
        <h2>Presenting complaints</h2>
        <p>{agent.presenting_complaints}</p>
      </section>
      <section class="agent-section">
        <h2>Ailments</h2>
        {ailments.length > 0
          ? (
            <ul class="ailment-list">
              {ailments.map((a) => (
                <li key={a.id}>{a.name}</li>
              ))}
            </ul>
          )
          : <p>No ailments linked.</p>
        }
      </section>
      <section class="agent-section">
        <h2>Upcoming appointments</h2>
        {appointments.length > 0
          ? (
            <ul class="appointment-list">
              {appointments.map((a) => (
                <li key={a.id} class="appointment-item">
                  <a href={`/appointments/${a.id}`}>
                    <span class="appointment-therapist">{a.therapist_name}</span>
                    <span class="appointment-datetime">{formatDatetime(a.datetime)}</span>
                    <span class={`status-badge status-${a.status}`}>{a.status}</span>
                  </a>
                </li>
              ))}
            </ul>
          )
          : <p>No appointments yet.</p>
        }
      </section>
      <section class="agent-section">
        <h2>Book an appointment</h2>
        <form method="post" action="/appointments" class="booking-form">
          <input type="hidden" name="agent_id" value={String(agent.id)} />
          <div class="form-field">
            <label for="therapist_name" class="form-label">Therapist name</label>
            {formErrors?.therapist_name && (
              <span class="form-error">{formErrors.therapist_name}</span>
            )}
            <input
              type="text"
              id="therapist_name"
              name="therapist_name"
              class="form-input"
              value={formValues?.therapist_name ?? ''}
            />
          </div>
          <div class="form-field">
            <label for="datetime" class="form-label">Date and time</label>
            {formErrors?.datetime && (
              <span class="form-error">{formErrors.datetime}</span>
            )}
            <input
              type="datetime-local"
              id="datetime"
              name="datetime"
              class="form-input"
              value={formValues?.datetime ?? ''}
            />
          </div>
          <div class="form-field">
            <label for="notes" class="form-label">Notes</label>
            <textarea
              id="notes"
              name="notes"
              class="form-textarea"
              rows={3}
            >{formValues?.notes ?? ''}</textarea>
          </div>
          <button type="submit" class="form-submit">Book appointment</button>
        </form>
      </section>
    </div>
  </>
)
