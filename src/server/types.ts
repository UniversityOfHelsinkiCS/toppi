import { Request } from "express";
import { ShibbolethHeaders, UserParams } from "../shared/types";
import { IncomingHttpHeaders } from "http";

interface AuthenticatedRequestHeaders extends IncomingHttpHeaders, ShibbolethHeaders {}

export interface RequestWithUser extends Request {
  user?: UserParams;
  headers: AuthenticatedRequestHeaders;
  loginAs?: boolean;
}
