const inProduction = process.env.NODE_ENV === 'production';
const inStaging = process.env.NODE_ENV === 'staging';
const inTesting = process.env.NODE_ENV === 'test';
const GIT_SHA = process.env.GIT_SHA || 'unknown';
const PUBLIC_URL = process.env.PUBLIC_URL || "";
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "";
const PORT = process.env.PORT || 8000

export { inProduction, inStaging, inTesting, GIT_SHA, PUBLIC_URL, DB_CONNECTION_STRING, PORT };