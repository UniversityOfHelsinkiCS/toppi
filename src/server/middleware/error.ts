import { ErrorRequestHandler, Response } from "express"
import { ZodError } from "zod"
import Sentry from "@sentry/node"
import { ApplicationError } from "../errors"

const handle = (res: Response, error: ApplicationError) => {
  Sentry.captureException(error)
  return res.status(error.status).json({ message: error.message, errors: error.errors })
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {

  if (err instanceof ZodError) {
    return handle(res, ApplicationError.FromZod(err))
  }

  if (err instanceof ApplicationError) {
    return handle(res, err)
  }

  next(err)
}
