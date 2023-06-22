import React from 'react'
import ReactDOM from 'react-dom/client'

import { inDevelopment, inProduction } from '../config.ts';
import Router from './router.tsx';
import initializeSentry from './util/sentry.ts';
import { initi18n } from './util/i18n.ts';
import { getHeaders, setHeaders } from './util/mockHeaders.ts';

if (inProduction) {
  initializeSentry()
}

const ensureDevUser = () => {
  if (!inDevelopment) return
  const headers = getHeaders()
  if (headers.uid) return

  localStorage.clear()
  setHeaders('mluukkai')
}

ensureDevUser()

initi18n()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
)
