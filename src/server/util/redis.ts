import Redis from 'ioredis'
import RedisStore from 'connect-redis'

import { REDIS_HOST } from './config'

export const redis = new Redis({
  host: REDIS_HOST,
  port: 6379,
})

export const redisStore = new (RedisStore as any)({
  client: redis,
})
