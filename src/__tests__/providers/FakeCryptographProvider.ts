import ICryptographProvider from '@shared/providers/interfaces/ICryptographProvider';

export default class FakeCryptographProvider implements ICryptographProvider {
    public async hash(plainTextData: string): Promise<string> {
        return plainTextData;
    }

    public async compare(
        plainTextData: string,
        hashedData: string,
    ): Promise<boolean> {
        return plainTextData === hashedData;
    }
}
