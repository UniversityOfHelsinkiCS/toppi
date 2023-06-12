import * as Sentry from "@sentry/node";
import { Router } from "express";

export const initSentry = (app: Router) => Sentry.init({
  dsn: "https://06393e6c223e4dc69d476c94e74dee75@sentry.cs.helsinki.fi/16",
  integrations: [new Sentry.Integrations.Http({ tracing: true }), new Sentry.Integrations.Express({ app })],
  tracesSampleRate: 1.0,
})