import React from 'react'
import ReactDOM from 'react-dom/client'

import { inProduction } from '../config.ts';
import Router from './router.tsx';
import initializeSentry from './util/sentry.ts';

if (inProduction) {
  initializeSentry()
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
)
