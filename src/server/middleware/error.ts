import { ErrorRequestHandler } from "express"
import { ZodError } from "zod"
import { ApplicationError } from "../errors"

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {

  if (err instanceof ZodError) {
    return res.status(400).json({ errors: err.errors })
  }

  if (err instanceof ApplicationError) {
    return res.status(err.status).json({ errors: [{ message: err.message }] })
  }

  console.error(err.stack)
  res.status(500).send("Something broke!")
}
