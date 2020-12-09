export default interface ICryptographProvider {
    hash(plainTextData: string, salt: number): Promise<string>;
    compare(plainTextData: string, hashedData: string): Promise<boolean>;
}
