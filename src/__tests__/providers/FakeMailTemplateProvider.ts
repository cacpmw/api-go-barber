import IMailTemplateProvider from '@shared/providers/interfaces/IMailTemplateProvider';

export default class FakeMailTemplateProvider implements IMailTemplateProvider {
    public async parse(): Promise<string> {
        return 'FakeMailProvider';
    }
}
