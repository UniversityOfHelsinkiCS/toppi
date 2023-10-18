export const inProduction = process.env.NODE_ENV === 'production'
export const inStaging = process.env.STAGING === 'true'
export const inTesting = process.env.NODE_ENV === 'test'
export const inDevelopment = process.env.NODE_ENV === 'development'
export const inE2E = process.env.E2E === 'true'
export const GIT_SHA = process.env.GIT_SHA || 'unknown'
export const PUBLIC_URL = inStaging ? 'https://toppi.ext.ocp-test-0.k8s.it.helsinki.fi' : 'https://toska-staging.cs.helsinki.fi/toppi'

export const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || ''
export const PORT = process.env.PORT || 8000

export const BASE_PATH = process.env.BASE_PATH || '/'
