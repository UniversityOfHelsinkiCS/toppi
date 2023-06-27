// @ts-ignore
import headersMiddleware from "unfuck-utf8-headers-middleware"

export const shibbolethHeaders = headersMiddleware([
  'hypersonsisuid',
  'firstname',
  'lastname',
  'mail',
])
