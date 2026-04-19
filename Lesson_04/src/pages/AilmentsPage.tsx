import type { FC } from 'hono/jsx'
import type { AilmentWithTherapies } from '../types.js'

type Props = { ailments: AilmentWithTherapies[] }

export const AilmentsPage: FC<Props> = ({ ailments }) => (
  <>
    <h1>Ailments</h1>
    <p class="page-intro">Conditions treated at AgentClinic.</p>
    {ailments.length === 0
      ? <p>No ailments on record yet.</p>
      : (
        <ul class="ailment-cards">
          {ailments.map((a) => (
            <li key={a.id} class="ailment-card">
              <h2>{a.name}</h2>
              <p>{a.description}</p>
              {a.therapies.length > 0 && (
                <div class="ailment-therapies">
                  <span class="ailment-therapies-label">Recommended therapies:</span>
                  <ul>
                    {a.therapies.map((t) => (
                      <li key={t.id}>{t.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      )
    }
  </>
)
