import Redis from 'ioredis';
import { configuration } from '../../config/configuration';
import { logger } from '../../logger/logger';

export class RedisProvider {
  private readonly client: Redis;

  constructor() {
    this.client = new Redis({
      host: configuration.REDIS_HOST,
      port: configuration.REDIS_PORT,
      password: configuration.REDIS_PASSWORD || undefined,
      lazyConnect: true,
      maxRetriesPerRequest: 3,
    });

    this.client.on('connect', () => {
      logger.info('Redis connection established');
    });

    this.client.on('error', (error: Error) => {
      logger.error('Redis connection error', {
        error: error.message,
      });
    });
  }

  public async connect(): Promise<void> {
    if (this.client.status === 'ready') {
      return;
    }

    await this.client.connect();
    logger.info('Redis connected successfully');
  }

  public async disconnect(): Promise<void> {
    if (this.client.status === 'ready') {
      await this.client.quit();
      logger.info('Redis disconnected successfully');
      return;
    }

    this.client.disconnect();
  }

  public getClient(): Redis {
    return this.client;
  }

  public isConnected(): boolean {
    return this.client.status === 'ready';
  }
}

export const redisProvider = new RedisProvider();