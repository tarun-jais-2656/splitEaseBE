import { redisProvider } from "./redis.provider";

export class RedisService {
  private readonly redis = redisProvider.getClient();

  public async get(key: string): Promise<string | null> {
    return this.redis.get(key);
  }

  public async set(
    key: string,
    value: string,
    ttlSeconds?: number,
  ): Promise<void> {
    if (ttlSeconds !== undefined) {
      await this.redis.set(key, value, "EX", ttlSeconds);
      return;
    }

    await this.redis.set(key, value);
  }

  public async delete(key: string): Promise<number> {
    return this.redis.del(key);
  }

  public async exists(key: string): Promise<boolean> {
    const result = await this.redis.exists(key);
    return result === 1;
  }

  public async expire(key: string, ttlSeconds: number): Promise<boolean> {
    const result = await this.redis.expire(key, ttlSeconds);
    return result === 1;
  }

  public async increment(key: string): Promise<number> {
    return this.redis.incr(key);
  }
}

export const redisService = new RedisService();
