const inProduction = process.env.NODE_ENV === 'production';
const inStaging = process.env.NODE_ENV === 'staging';
const inTesting = process.env.NODE_ENV === 'test';
const GIT_SHA = process.env.GIT_SHA || 'unknown';
const PUBLIC_URL = process.env.PUBLIC_URL || "";

export { inProduction, inStaging, inTesting, GIT_SHA, PUBLIC_URL };