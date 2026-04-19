import Database from 'better-sqlite3'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

export type DB = InstanceType<typeof Database>

const __dir = dirname(fileURLToPath(import.meta.url))

export function createDb(filename = join(__dir, '..', 'clinic.db')): DB {
  const db = new Database(filename)
  db.pragma('journal_mode = WAL')
  db.pragma('foreign_keys = ON')
  for (const migration of ['001_agents.sql', '002_ailments.sql', '003_agent_ailments.sql', '004_therapies.sql', '005_ailment_therapies.sql', '006_appointments.sql']) {
    db.exec(readFileSync(join(__dir, 'migrations', migration), 'utf8'))
  }
  return db
}
