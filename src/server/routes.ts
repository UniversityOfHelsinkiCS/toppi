import express, { Router } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import contractsRouter from './controllers/contracts'
import loginRouter from './controllers/login'
import testRouter from './controllers/test'
import { inProduction, inStaging } from '../config'
import { initSentry, sentryErrorHandler, sentryRequestHandler } from './middleware/sentry'
import { shibbolethHeaders } from './middleware/shibbolethHeaders'
import { getCurrentUser } from './middleware/authentication'
import { errorHandler } from './middleware/error'
import organisationsRouter from './controllers/organisations'
import handlerAddressRouter from './controllers/handlerAddresses'

/**
 * apiRouter handles the business side of requests.
 * The requests it receives may or may not be authenticated,
 * so the controllers/subsequent middleware must check for user themselves.
 */
const apiRouter = Router()

apiRouter.use('/contract-requests', contractsRouter)
apiRouter.use('/handler-addresses', handlerAddressRouter)
apiRouter.use('/organisations', organisationsRouter)
if (inStaging) apiRouter.use('/test', testRouter)
apiRouter.use('/', loginRouter)
apiRouter.use('/', (_req, res) => res.sendStatus(404))

/**
 * mainRouter handles routing between public & private paths and adds common middleware
 */
const mainRouter = Router()

if (inProduction) {
  initSentry(mainRouter)
}

mainRouter.use(sentryRequestHandler)

mainRouter.use(cors())
mainRouter.use(express.json())
mainRouter.use(express.urlencoded({ extended: true }))
mainRouter.use(morgan('short'))

mainRouter.use('/private/api', shibbolethHeaders, getCurrentUser, apiRouter)
mainRouter.use('/api', apiRouter)

mainRouter.use(sentryErrorHandler)
mainRouter.use(errorHandler)

export { mainRouter as router }
