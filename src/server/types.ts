import { Request } from "express";
import { UserParams } from "../shared/types";

export interface RequestWithUser extends Request {
  user?: UserParams;
  loginAs?: boolean;
}
