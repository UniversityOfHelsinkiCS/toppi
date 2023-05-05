import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "https://06393e6c223e4dc69d476c94e74dee75@sentry.cs.helsinki.fi/16",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
