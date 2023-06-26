export class ApplicationError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }

  static Forbidden(msg = "Forbidden") {
    throw new ApplicationError(403, msg)
  }

  static Unauthorized(msg = "Unauthorized") {
    throw new ApplicationError(401, msg)
  }
}
