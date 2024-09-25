export interface IRedisClient {
    Set(key: string, value: string): Promise<void>
    Get(key: string): Promise<string | null>
}