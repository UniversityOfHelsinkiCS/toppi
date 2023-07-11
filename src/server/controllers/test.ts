import { captureException } from "@sentry/node";
import { Router } from "express";

const testRouter = Router()

testRouter.get('/sentry-capture', (_req, res) => {
  captureException(new Error("Sentry captured this"))

  return res.send("ok")
})

testRouter.get('/sentry-error-handler', () => {
  throw new Error("Sentry error handler should capture this")
})

export default testRouter
