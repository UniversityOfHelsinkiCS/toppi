import { Request } from "express";
import { ShibbolethHeaders, UserOrganisationAccess, UserParams } from "../shared/types";
import { IncomingHttpHeaders } from "http";

interface AuthenticatedRequestHeaders extends IncomingHttpHeaders, ShibbolethHeaders {}

export interface RequestWithUser extends Request {
  user?: UserParams & { access?: UserOrganisationAccess };
  headers: AuthenticatedRequestHeaders;
  loginAs?: boolean;
}
