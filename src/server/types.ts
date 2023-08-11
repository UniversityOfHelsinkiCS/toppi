import { Request } from 'express'
import { CustomHeaders, UserAccess, UserParams } from '../shared/types'
import { IncomingHttpHeaders } from 'http'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends RequestUser {}
  }
}

interface RequestHeaders extends IncomingHttpHeaders, CustomHeaders {}

export type RequestUser = UserParams & {
  access?: UserAccess
}

export interface RequestWithUser extends Request {
  user?: RequestUser
  headers: RequestHeaders
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
