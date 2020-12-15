import multerconfig from '@config/multerconfig';
import { container } from 'tsyringe';
import IStorageProvider from '../interfaces/IStorageProvider';
import DiskStorageProvider from './DiskStorageProvider';
import S3StorageProvider from './S3StorageProvider';

const providers = {
    disk: DiskStorageProvider,
    s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    providers[multerconfig.driver],
);
