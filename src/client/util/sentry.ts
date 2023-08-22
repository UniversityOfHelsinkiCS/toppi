import * as Sentry from '@sentry/browser'
import { Integrations } from '@sentry/tracing'
import { GIT_SHA } from '../../config'

const initializeSentry = () => {
  Sentry.init({
    dsn: 'https://40576de3744c94303a0c2cbfc3ff0a21@toska.cs.helsinki.fi/4',
    release: GIT_SHA,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  })
}

export default initializeSentry
