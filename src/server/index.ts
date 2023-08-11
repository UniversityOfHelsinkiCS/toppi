import path from 'path'

import express from 'express'
import 'express-async-errors'
import session from 'express-session'
import passport from 'passport'

import { connectToDatabase } from './db/connection'
import setupAuthentication from './util/oidc'
import { router } from './routes'
import { SESSION_SECRET } from './util/config'
// import { redisStore } from './util/redis'
import { PORT, inProduction, inTesting } from '../config'

const app = express()

app.use(
  session({
    secret: SESSION_SECRET,
    // store: redisStore,
    resave: false,
    saveUninitialized: false,
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use('/', router)

if (inProduction || inTesting) {
  const DIST_PATH = path.resolve(__dirname, '../../dist')
  const INDEX_PATH = path.resolve(DIST_PATH, 'index.html')

  app.use(express.static(DIST_PATH))
  app.get('*', (_, res) => res.sendFile(INDEX_PATH))
}

app.listen(PORT, async () => {
  await setupAuthentication()

  console.log('Server running on port ' + PORT)
  // logger.info(`Server running on port ${PORT}`)
})

connectToDatabase()
