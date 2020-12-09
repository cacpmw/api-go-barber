import { compare, hash } from 'bcryptjs';
import ICryptographProvider from './interfaces/ICryptographProvider';

export default class CryptographProvider implements ICryptographProvider {
    public async hash(plainTextData: string, salt = 8): Promise<string> {
        return hash(plainTextData, salt);
    }

    public async compare(
        plainTextData: string,
        hashedData: string,
    ): Promise<boolean> {
        return compare(plainTextData, hashedData);
    }
}
