import * as _Sentry from '@sentry/node'
import { ErrorRequestHandler, RequestHandler, Router } from 'express'

import { inStaging } from '../../config'

export const initSentry = (app: Router) => {
  _Sentry.init({
    dsn: 'https://40576de3744c94303a0c2cbfc3ff0a21@toska.cs.helsinki.fi/4',
    integrations: [new _Sentry.Integrations.Http({ tracing: true }), new _Sentry.Integrations.Express({ app })],
    tracesSampleRate: 1.0,
    environment: inStaging ? 'staging' : 'production',
  })
}

export const sentryRequestHandler: RequestHandler = _Sentry.Handlers.requestHandler()

export const sentryTracingHandler: RequestHandler = _Sentry.Handlers.tracingHandler()

export const sentryErrorHandler: ErrorRequestHandler = _Sentry.Handlers.errorHandler()

export const Sentry = _Sentry
