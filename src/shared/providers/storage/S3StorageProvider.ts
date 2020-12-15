import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
import multerConfig from '@config/multerconfig';
import mime from 'mime';
import RequestError from '@shared/exceptions/RequestError';
import StatusCode from '@shared/infrastructure/http/status';
import IStorageProvider from '../interfaces/IStorageProvider';

export default class S3StorageProvider implements IStorageProvider {
    private s3: S3;

    constructor() {
        this.s3 = new aws.S3({
            region: 'sa-east-1',
        });
    }

    public async save(file: string): Promise<string> {
        const originalPath = path.resolve(multerConfig.tempFolder, file);
        const fileContent = await fs.promises.readFile(originalPath);
        const ContentType = mime.getType(originalPath);
        if (!ContentType) {
            throw new RequestError('File not found', StatusCode.NotFound);
        }
        await this.s3
            .putObject({
                Bucket: multerConfig.configs.aws.bucket,
                Key: file,
                ACL: 'public-read',
                Body: fileContent,
                ContentType,
            })
            .promise();

        await fs.promises.unlink(originalPath);
        return file;
    }

    public async delete(file: string): Promise<void> {
        await this.s3
            .deleteObject({
                Bucket: 'carlos-gobarber',
                Key: file,
            })
            .promise();
    }
}
