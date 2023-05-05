const inProduction = process.env.NODE_ENV === 'production';
const inStaging = process.env.NODE_ENV === 'staging';
const inTesting = process.env.NODE_ENV === 'test';
const GIT_SHA = process.env.GIT_SHA || 'unknown';

export { inProduction, inStaging, inTesting, GIT_SHA };