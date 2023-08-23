import * as Sentry from '@sentry/node'
import { ErrorRequestHandler, RequestHandler, Router } from 'express'

import { inStaging } from '../../config'

export const initSentry = (app: Router) =>
  Sentry.init({
    dsn: 'https://40576de3744c94303a0c2cbfc3ff0a21@toska.cs.helsinki.fi/4',
    integrations: [new Sentry.Integrations.Http({ tracing: true }), new Sentry.Integrations.Express({ app })],
    tracesSampleRate: 1.0,
    environment: inStaging ? 'staging' : 'production',
  })

export const sentryRequestHandler: RequestHandler = Sentry.Handlers.requestHandler()

export const sentryErrorHandler: ErrorRequestHandler = Sentry.Handlers.errorHandler()
