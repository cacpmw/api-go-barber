import multerconfig from '@config/multerconfig';
import { container } from 'tsyringe';
import ICacheProvider from '../interfaces/ICacheProvider';
import RedisProvider from './RedisCacheProvider';

const providers = {
    redis: RedisProvider,
};

container.registerSingleton<ICacheProvider>('CacheProvider', providers.redis);
