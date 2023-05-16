import { Sequelize } from 'sequelize'
import { Umzug, SequelizeStorage } from 'umzug'

import { DB_CONNECTION_STRING } from '../../config'

const DB_CONNECTION_RETRY_LIMIT = 10

export const sequelize = new Sequelize(DB_CONNECTION_STRING, { logging: false })

const umzug = new Umzug({
  migrations: { glob: 'src/server/db/migrations/*.ts' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
})

export type Migration = typeof umzug._types.migration

const runMigrations = async () => {
  const migrations = await umzug.up()

  console.log('Migrations up to date', {
    migrations,
  })
}

const testConnection = async () => {
  await sequelize.authenticate()
  await runMigrations()
}

// eslint-disable-next-line no-promise-executor-return
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const connectToDatabase = async (attempt = 0): Promise<void | null> => {
  try {
    await testConnection()
    console.log("Connected to db")
  } catch (err) {
    if (attempt === DB_CONNECTION_RETRY_LIMIT) {
      console.error(`Connection to database failed after ${attempt} attempts`, {
        error: (err as Error).stack,
      })

      return process.exit(1)
    }
    console.log(
      `Connection to database failed! Attempt ${attempt} of ${DB_CONNECTION_RETRY_LIMIT}`
    )
    console.error('Database error: ', err)
    await sleep(5000)

    return connectToDatabase(attempt + 1)
  }

  return null
}