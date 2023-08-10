import { Request } from 'express'
import { ShibbolethHeaders, UserAccess, UserParams } from '../shared/types'
import { IncomingHttpHeaders } from 'http'

interface AuthenticatedRequestHeaders extends IncomingHttpHeaders, ShibbolethHeaders {}

export type RequestUser = UserParams & {
  access?: UserAccess
}

export interface RequestWithUser extends Request {
  user?: RequestUser
  headers: AuthenticatedRequestHeaders
  loginAs?: boolean
}
