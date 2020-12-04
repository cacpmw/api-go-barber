export default interface IMailRepository {
    send(to: string, body: string): Promise<void>;
}
