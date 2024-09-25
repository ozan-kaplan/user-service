import { createClient } from 'redis';
import {IRedisClient} from "../../application/ports/redis/IRedisClient"

// TODO: Change this class implement with interface and do it more generic

export class RedisClient implements IRedisClient {
    private client = createClient();

    public async Set(key: string, value: string): Promise<void> {
        await this.client.set(value, key);
    }

    public async Get(key: string): Promise<string | null> {
        return await this.client.get(key);
    }
}