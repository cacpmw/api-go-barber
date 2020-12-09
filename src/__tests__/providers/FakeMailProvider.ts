import IMailProvider from '@shared/providers/interfaces/IMailProvider';
import IMailObject from '@shared/providers/interfaces/objects/IMailObject';

export default class FakeMailProvider implements IMailProvider {
    private messages: IMailObject[] = [];

    public async send(emailData: IMailObject): Promise<void> {
        this.messages.push(emailData);
    }
}
