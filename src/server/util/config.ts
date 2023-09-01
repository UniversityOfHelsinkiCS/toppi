import * as dotenv from 'dotenv'

dotenv.config()

import { inProduction, inStaging } from '../../config'

export const API_TOKEN = process.env.API_TOKEN

export const JAMI_URL = process.env.JAMI_URL

export const REDIS_HOST = process.env.REDIS_HOST || 'redis'

export const SESSION_SECRET = process.env.SESSION_SECRET || 'secret'

export const OIDC_ISSUER = inProduction && !inStaging ? 'https://login.helsinki.fi/.well-known/openid-configuration' : 'https://login-test.it.helsinki.fi/.well-known/openid-configuration'

export const OIDC_CLIENT_ID = process.env.OIDC_CLIENT_ID || ''

export const OIDC_CLIENT_SECRET = process.env.OIDC_CLIENT_SECRET || ''

export const OIDC_REDIRECT_URI = process.env.OIDC_REDIRECT_URI || ''
