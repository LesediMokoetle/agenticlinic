import { Hono } from 'hono'
import type { DB } from '../db.js'
import { Layout } from '../components/Layout.js'
import { DashboardPage } from '../pages/DashboardPage.js'
import { getDashboardStats, getAllAgentsSummary, getOpenAppointments } from '../db/dashboard.js'

export function dashboardRouter(db: DB) {
  const router = new Hono()

  router.get('/', (c) => {
    const stats = getDashboardStats(db)
    const agents = getAllAgentsSummary(db)
    const openAppointments = getOpenAppointments(db)
    return c.html(
      <Layout title="Dashboard | AgentClinic">
        <DashboardPage stats={stats} agents={agents} openAppointments={openAppointments} />
      </Layout>
    )
  })

  return router
}
