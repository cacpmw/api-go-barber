import { RedisOptions } from 'ioredis';

interface IChaceConfig {
    driver: string;
    configs: {
        redis: RedisOptions;
    };
}
export default {
    driver: 'redis',
    configs: {
        redis: {
            host: process.env.REDIS_HOST || 'db-redis',
            port: process.env.REDIS_PORT || 6379,
            password: process.env.REDIS_PASS || undefined,
        },
    },
} as IChaceConfig;
