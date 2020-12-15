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
            host: 'db-redis',
            port: 6379,
            password: undefined,
        },
    },
} as IChaceConfig;
