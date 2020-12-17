import RequestError from '@shared/exceptions/RequestError';
import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import redis from 'redis';
import StatusCode from '../status';

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST || 'db-redis',
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASS || undefined,
});

const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'rateLimiter',
    points: 5,
    duration: 1,
});

export default async function rateLimiter(
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> {
    try {
        await limiter.consume(request.ip);
        return next();
    } catch (err) {
        throw new RequestError('Too many request', StatusCode.TooManyRequests);
    }
}
