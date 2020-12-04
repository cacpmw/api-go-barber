import { compare, hash } from 'bcryptjs';
import ICryptographRepository from './interfaces/ICryptographRepository';

export default class CryptographRepository implements ICryptographRepository {
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
