import { UserParams } from "../shared/types";

export {}

declare global {
  namespace Express {
    export interface Request {
      user?: UserParams;
    }
  }
}
