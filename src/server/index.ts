import path from 'path'

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { connectToDatabase } from './db/connection';
import { apiRouter } from './routes';
import { PORT, inProduction, inTesting } from '../config';
import { initSentry } from './util/sentry';
import { shibbolethHeaders } from './middleware/shibbolethHeaders';
import { getCurrentUser } from './middleware/authentication';

const app = express()

if (inProduction) {
  initSentry(app)
}

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("short"))

app.use('/private/api', shibbolethHeaders, getCurrentUser, apiRouter)
app.use('/api', apiRouter)

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
