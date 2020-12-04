import IMailRepository from './interfaces/IMailRepository';

export default class MailRepository implements IMailRepository {
    public async send(to: string, body: string): Promise<void> {
        console.log({ to, body });
    }
}
