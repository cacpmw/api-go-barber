import IStorageRepository from '../interfaces/IStorageRepository';

export default class FakeStorageRepository implements IStorageRepository {
    private storage: string[] = [];

    public async save(file: string): Promise<string> {
        this.storage.push(file);
        return file;
    }

    public async delete(file: string): Promise<void> {
        const index = this.storage.findIndex(
            currentFile => currentFile === file,
        );
        this.storage.splice(index, 1);
    }
}
