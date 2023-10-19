import React from 'react'
import ReactDOM from 'react-dom/client'

import { inDevelopment, inE2E, inProduction } from '../config.ts'
import Router from './router.tsx'
import initializeSentry from './util/sentry.ts'
import { initi18n } from './util/i18n.ts'
import { updateMockHeaders } from './util/mockHeaders.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

if (inProduction) {
  initializeSentry()
}

const ensureDevUser = () => {
  if (inProduction && !inE2E) return

  updateMockHeaders()
}

ensureDevUser()

initi18n()

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router />
      {inDevelopment && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  </React.StrictMode>
)
