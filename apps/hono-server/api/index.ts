import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import cronRoute  from '../routes/cronRoute.js'
import { loadCronJobs } from '../services/cronJobService.js' 
export const config = {
  runtime: 'nodejs'
}

const app = new Hono().basePath('/api')


// Load cron jobs at startup
await loadCronJobs()
app.get('/', (c) => {
  return c.json({ message: 'Hello Hono!' })
})

app.route("/api/v1/cronJob", cronRoute)

export default handle(app)
