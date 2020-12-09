import handlebars from 'handlebars';
import IMailTemplateProvider from '@shared/providers/interfaces/IMailTemplateProvider';
import IMailTemplateObject from '@shared/providers/interfaces/objects/IMailTemplateObject';

export default class HandlebarsMailTemplateProvider
    implements IMailTemplateProvider {
    public async parse({
        template,
        variables,
    }: IMailTemplateObject): Promise<string> {
        const parseTemplate = handlebars.compile(template);
        return parseTemplate(variables);
    }
}
