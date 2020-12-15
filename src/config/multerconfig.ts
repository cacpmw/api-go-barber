import multer, { StorageEngine } from 'multer';
import path from 'path';

const tempFolder = path.resolve(__dirname, '../../temp');
const uploadsFolder = path.resolve(tempFolder, 'uploads');
interface IStorageConfig {
    driver: 's3' | 'disk';
    tempFolder: string;
    uploadsFolder: string;
    multer: {
        storage: StorageEngine;
    };
    configs: {
        aws: {
            bucket: string;
        };
    };
}
export default {
    driver: process.env.STORAGE_DRIVER || 'disk',
    tempFolder,
    uploadsFolder,
    directory: tempFolder,
    multer: {
        storage: multer.diskStorage({
            destination: tempFolder,
            filename(request, file, callback) {
                const filename = `${Date.now()}-${file.originalname.replace(
                    / /gi,
                    '_',
                )}`;
                return callback(null, filename);
            },
        }),
    },
    configs: {
        disk: {},
        aws: {
            bucket: process.env.AWS_BUCKET,
        },
    },
} as IStorageConfig;
