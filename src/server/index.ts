import path from 'path'

import express from 'express'
import 'express-async-errors'
import { connectToDatabase } from './db/connection'
import { router } from './routes'
import { PORT, inProduction, inTesting } from '../config'

const app = express()

app.use('/', router)

if (inProduction || inTesting) {
  const DIST_PATH = path.resolve(__dirname, '../../dist')
  const INDEX_PATH = path.resolve(DIST_PATH, 'index.html')

  app.use(express.static(DIST_PATH))
  app.get('*', (_, res) => res.sendFile(INDEX_PATH))
}

app.listen(PORT, async () => {
  console.log('Server running on port ' + PORT)
  // logger.info(`Server running on port ${PORT}`)
})

connectToDatabase()
