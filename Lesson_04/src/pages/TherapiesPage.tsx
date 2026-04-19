import type { FC } from 'hono/jsx'
import type { Therapy, Ailment } from '../types.js'

type TherapyWithAilments = Therapy & { ailments: Ailment[] }
type Props = { therapies: TherapyWithAilments[] }

export const TherapiesPage: FC<Props> = ({ therapies }) => (
  <>
    <h1>Therapies</h1>
    <p class="page-intro">Evidence-based treatments offered at AgentClinic.</p>
    {therapies.length === 0
      ? <p>No therapies on record yet.</p>
      : (
        <ul class="therapy-cards">
          {therapies.map((t) => (
            <li key={t.id} class="therapy-card">
              <h2>{t.name}</h2>
              <p>{t.description}</p>
              {t.ailments.length > 0 && (
                <div class="therapy-ailments">
                  <span class="therapy-ailments-label">Treats:</span>
                  <ul>
                    {t.ailments.map((a) => (
                      <li key={a.id}>{a.name}</li>
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
