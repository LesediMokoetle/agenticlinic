import type { FC } from 'hono/jsx'
import type { Agent, Ailment } from '../types.js'

type Props = { agent: Agent; ailments: Ailment[] }

export const AgentDetailPage: FC<Props> = ({ agent, ailments }) => (
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
    </div>
  </>
)
