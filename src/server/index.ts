
import path from 'path'

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

const app = express()

const PORT = process.env.PORT || 8000
const inProduction = process.env.NODE_ENV === 'production'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("short"))

app.get('/api/ping', (_, res) => { res.send('pong')  })

app.post('/api/contract', (req, res) => {
  console.log(req.body)
  res.send('ok')
})

app.use('/api', (_, res) => res.sendStatus(404))

if (inProduction) {
  const DIST_PATH = path.resolve(__dirname, '../../dist')
  const INDEX_PATH = path.resolve(DIST_PATH, 'index.html')

  app.use(express.static(DIST_PATH))
  app.get('*', (_, res) => res.sendFile(INDEX_PATH))
}

app.listen(PORT, async () => {
  
  console.log("Server running on port " + PORT)
  // logger.info(`Server running on port ${PORT}`)
})
