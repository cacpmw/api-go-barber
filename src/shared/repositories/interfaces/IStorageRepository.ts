export default interface IStorageRepository {
    save(file: string): Promise<string>;
    delete(file: string): Promise<void>;
}
