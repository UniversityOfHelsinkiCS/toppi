export const inProduction = process.env.NODE_ENV === 'production';
export const inStaging = process.env.NODE_ENV === 'staging';
export const inTesting = process.env.NODE_ENV === 'test';
export const GIT_SHA = process.env.GIT_SHA || 'unknown';
export const PUBLIC_URL = process.env.PUBLIC_URL || "";
export const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "";
export const PORT = process.env.PORT || 8000