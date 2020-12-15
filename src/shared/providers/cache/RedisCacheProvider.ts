import cache from '@config/cache';
import Redis, { Redis as RedisClient } from 'ioredis';
import ICacheProvider from '../interfaces/ICacheProvider';

export default class RedisCacheProvider implements ICacheProvider {
    private redis: RedisClient;

    constructor() {
        this.redis = new Redis(cache.configs.redis);
    }

    public async invalidateWithPrefix(prefix: string): Promise<void> {
        const keys = await this.redis.keys(`${prefix}:*`);
        const pipeline = this.redis.pipeline();

        keys.forEach(key => {
            pipeline.del(key);
        });
        await pipeline.exec();
    }

    public async set(key: string, value: any): Promise<void> {
        await this.redis.set(key, JSON.stringify(value));
    }

    public async get<T>(key: string): Promise<T | null> {
        const data = await this.redis.get(key);
        if (!data) {
            return null;
        }
        return JSON.parse(data) as T;
    }

    public async invalidate(key: string): Promise<void> {
        await this.redis.del(key);
    }
}
