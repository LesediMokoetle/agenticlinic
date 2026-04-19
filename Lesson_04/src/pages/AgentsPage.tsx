import type { FC } from 'hono/jsx'
import type { Agent } from '../types.js'

type Props = { agents: Agent[] }

export const AgentsPage: FC<Props> = ({ agents }) => (
  <>
    <h1>Agents</h1>
    <p class="page-intro">All agents currently registered with AgentClinic.</p>
    {agents.length === 0
      ? <p>No agents registered yet.</p>
      : (
        <ul class="agent-list">
          {agents.map((a) => (
            <li key={a.id}>
              <a href={`/agents/${a.id}`} class="agent-card">
                <span class="agent-name">{a.name}</span>
                <span class={`status-badge status-${a.status}`}>{a.status}</span>
                <span class="agent-model">{a.model_type}</span>
              </a>
            </li>
          ))}
        </ul>
      )
    }
  </>
)
