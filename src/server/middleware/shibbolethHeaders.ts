// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import headersMiddleware from 'unfuck-utf8-headers-middleware'

export const shibbolethHeaders = headersMiddleware(['hypersonsisuid', 'givenname', 'sn', 'mail', 'hyGroupCn'])
