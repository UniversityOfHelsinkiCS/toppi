import { ZodError } from "zod";

export class ApplicationError extends Error {
  status: number;
  errors: any[];

  constructor(status: number, message: string, errors: any[] = []) {
    super(message)
    this.status = status
    this.errors = errors
  }

  static Forbidden(msg = "Forbidden") {
    throw new ApplicationError(403, msg)
  }

  static Unauthorized(msg = "Unauthorized") {
    throw new ApplicationError(401, msg)
  }

  static BadRequest(msg = "Bad request", errors = []) {
    throw new ApplicationError(400, msg, errors)
  }

  static FromZod(err: ZodError) {
    return new ApplicationError(400, "Validation failed", err.errors)
  }
}
