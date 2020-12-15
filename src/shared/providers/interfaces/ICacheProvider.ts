export default interface ICacheProvider {
    set(key: string, value: any): Promise<void>;
    get<T>(key: string): Promise<T | null>;
    invalidate(key: string): Promise<void>;
    invalidateWithPrefix(prefix: string): Promise<void>;
}
