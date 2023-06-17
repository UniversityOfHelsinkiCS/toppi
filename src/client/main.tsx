import React from 'react'
import ReactDOM from 'react-dom/client'

import { inProduction } from '../config.ts';
import Router from './router.tsx';
import initializeSentry from './util/sentry.ts';
import { initi18n } from './util/i18n.ts';

if (inProduction) {
  initializeSentry()
}

initi18n()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
)
