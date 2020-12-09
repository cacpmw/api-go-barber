import IMailTemplateObject from './objects/IMailTemplateObject';

export default interface IMailTemplateProvider {
    parse(data: IMailTemplateObject): Promise<string>;
}
