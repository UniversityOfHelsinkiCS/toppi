
import path from 'path'

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import * as Sentry from "@sentry/node";
import { connectToDatabase } from './db/connection';
import router from './routes';

const PORT = process.env.PORT || 8000
const inTesting = process.env.NODE_ENV === 'test'
const inProduction = process.env.NODE_ENV === 'production'

const app = express()

if (inProduction) {
  Sentry.init({
    dsn: "https://06393e6c223e4dc69d476c94e74dee75@sentry.cs.helsinki.fi/16",
    integrations: [new Sentry.Integrations.Http({ tracing: true }), new Sentry.Integrations.Express({ app })],
    tracesSampleRate: 1.0,
  })
}

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("short"))

app.use('/api', router)

if (inProduction || inTesting) {
  const DIST_PATH = path.resolve(__dirname, '../../dist')
  const INDEX_PATH = path.resolve(DIST_PATH, 'index.html')

  app.use(express.static(DIST_PATH))
  app.get('*', (_, res) => res.sendFile(INDEX_PATH))
}

app.listen(PORT, async () => {
  
  console.log("Server running on port " + PORT)
  // logger.info(`Server running on port ${PORT}`)
})

connectToDatabase()
