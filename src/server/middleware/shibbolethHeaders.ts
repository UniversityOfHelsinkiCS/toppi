// @ts-ignore
import headersMiddleware from "unfuck-utf8-headers-middleware"

export const shibbolethHeaders = headersMiddleware([
  'uid',
  'givenname',
  'sn',
  'mail'
])

export interface ShibbolethHeaders {
  uid?: string
  givenname?: string
  sn?: string
  mail?: string
}
