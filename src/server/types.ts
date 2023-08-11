import { Request } from 'express'
import { ShibbolethHeaders, UserAccess, UserParams } from '../shared/types'
import { IncomingHttpHeaders } from 'http'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends RequestUser {}
  }
}

interface AuthenticatedRequestHeaders extends IncomingHttpHeaders, ShibbolethHeaders {}

export type RequestUser = UserParams & {
  access?: UserAccess
}

export interface RequestWithUser extends Request {
  user?: RequestUser
  headers: AuthenticatedRequestHeaders
  loginAs?: boolean
}

export type OpenIDAttributes = {
  uid: string
  hyPersonSisuId: string
  given_name: string
  family_name: string
  schacDateOfBirth: string
  email: string
  hyGroupCn: string[]
}
