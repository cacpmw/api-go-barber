import IMailTemplateProvider from '@shared/providers/interfaces/IMailTemplateProvider';
import IMailTemplateObject from '@shared/providers/interfaces/objects/IMailTemplateObject';

export default class FakeMailTemplateProvider implements IMailTemplateProvider {
    public async template({ template }: IMailTemplateObject): Promise<string> {
        return template;
    }
}
