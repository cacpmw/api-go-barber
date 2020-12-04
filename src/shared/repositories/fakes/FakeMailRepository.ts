import IMailRepository from '../interfaces/IMailRepository';

export default class FakeMailRepository implements IMailRepository {
    private messages: { to: string; body: string }[] = [];

    public async send(to: string, body: string): Promise<void> {
        this.messages.push({ to, body });
    }
}
