import { Request } from "express";
import { ShibbolethHeaders, UserOrganisationAccess, UserParams, UserRole } from "../shared/types";
import { IncomingHttpHeaders } from "http";

interface AuthenticatedRequestHeaders extends IncomingHttpHeaders, ShibbolethHeaders {}

export type RequestUser = UserParams & { access?: UserOrganisationAccess } & { roles?: UserRole[] }

export interface RequestWithUser extends Request {
  user?: RequestUser;
  headers: AuthenticatedRequestHeaders;
  loginAs?: boolean;
}
