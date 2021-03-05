import { RedisOptions } from 'ioredis';

export default interface ICacheConfig {
  driver: 'redis';

  config: {
    redis: RedisOptions;
  };
}
