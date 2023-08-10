import * as Sentry from '@sentry/browser'
import { Integrations } from '@sentry/tracing'
import { GIT_SHA } from '../../config'

const initializeSentry = () => {
  Sentry.init({
    dsn: 'https://06393e6c223e4dc69d476c94e74dee75@sentry.cs.helsinki.fi/16',
    release: GIT_SHA,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  })
}

export default initializeSentry
