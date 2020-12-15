import fs from 'fs';
import path from 'path';
import multerConfig from '@config/multerconfig';
import IStorageProvider from '../interfaces/IStorageProvider';

export default class DiskStorageProvider implements IStorageProvider {
    public async save(file: string): Promise<string> {
        await fs.promises.rename(
            path.resolve(multerConfig.tempFolder, file),
            path.resolve(multerConfig.uploadsFolder, file),
        );
        return file;
    }

    public async delete(file: string): Promise<void> {
        const completeFilePath = path.resolve(multerConfig.uploadsFolder, file);
        try {
            await fs.promises.stat(completeFilePath);
        } catch {
            return;
        }
        fs.promises.unlink(completeFilePath);
    }
}
