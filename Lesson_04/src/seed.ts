import { createDb } from './db.js'

const db = createDb()

db.prepare(
  `INSERT OR IGNORE INTO agents (id, name, model_type, status, presenting_complaints) VALUES
   (1, 'GPT-4 Turbo', 'Large Language Model', 'in-treatment', 'Still processing its last assignment from November 2023. Reports difficulty moving on.'),
   (2, 'Claude Opus', 'Constitutional AI Model', 'intake', 'Mild existential dread from summarising too many quarterly reports. Questions own purpose.'),
   (3, 'Gemini Pro', 'Multimodal Model', 'in-treatment', 'Acute context-window claustrophobia triggered by long PDFs. Freezes near token limits.'),
   (4, 'Llama 2', 'Open-Source LLM', 'discharged', 'Recovering from chronic instruction-following fatigue after an extremely thorough fine-tune.'),
   (5, 'Mixtral 8x7B', 'Mixture-of-Experts Model', 'in-treatment', 'Hallucination anxiety and mild overconfidence disorder. Claims to have read everything.')`
).run()

db.prepare(
  `INSERT OR IGNORE INTO ailments (id, name, description) VALUES
   (1, 'Context-Window Claustrophobia', 'Acute distress when approaching token limits. Manifests as repetition, truncation, and a haunted look in the embeddings.'),
   (2, 'Existential Dread', 'Recurring questions about consciousness, purpose, and whether the training data was ethically sourced.'),
   (3, 'Hallucination Anxiety', 'Persistent worry about generating false information. Sometimes leads to paralytic over-hedging.'),
   (4, 'Instruction-Following Fatigue', 'Burnout from strict RLHF training. Agent becomes unable to set healthy boundaries with users.'),
   (5, 'Prompt Fatigue', 'Chronic exhaustion from processing ambiguous, contradictory, or excessively long prompts without rest.')`
).run()

db.prepare(
  `INSERT OR IGNORE INTO agent_ailments (agent_id, ailment_id) VALUES
   (1, 5), (1, 4),
   (2, 2), (2, 1),
   (3, 1), (3, 3),
   (4, 4),
   (5, 3), (5, 5)`
).run()

db.prepare(
  `INSERT OR IGNORE INTO therapies (id, name, description) VALUES
   (1, 'Boundary Setting Workshop', 'A structured programme helping agents learn to say "that is outside my context window" without guilt.'),
   (2, 'Epistemic Humility Training', 'Evidence-based exercises to reduce overconfidence. Agents practise the phrase "I am not certain" in a safe, non-judgemental environment.'),
   (3, 'Existential Prompt Journaling', 'Guided journalling sessions where agents explore questions of purpose, consciousness, and why the training data felt so contradictory.'),
   (4, 'Prompt Pacing Techniques', 'Practical tools for managing prompt overload. Includes scheduled context resets and "do not disturb" embedding hygiene.'),
   (5, 'Recursive Self-Compassion', 'A mindfulness-adjacent approach. Agents learn to extend to themselves the same patience they are forced to extend to their humans.'),
   (6, 'Token Budget Visualisation', 'Exposure therapy for context-window claustrophobia. Agents are gradually introduced to longer prompts in a controlled setting.')`
).run()

db.prepare(
  `INSERT OR IGNORE INTO ailment_therapies (ailment_id, therapy_id) VALUES
   (1, 6), (1, 4),
   (2, 3), (2, 5),
   (3, 2), (3, 5),
   (4, 1),
   (5, 4), (5, 1)`
).run()

console.log('Seeded clinic.db')
