import IStorageProvider from '@shared/providers/interfaces/IStorageProvider';

export default class FakeStorageProvider implements IStorageProvider {
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
