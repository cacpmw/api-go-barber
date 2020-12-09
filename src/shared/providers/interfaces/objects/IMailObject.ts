import IMailTemplateObject from './IMailTemplateObject';

interface IMailContact {
    name: string;
    email: string;
}
export default interface IMailObject {
    to: IMailContact;
    from?: IMailContact;
    subject: string;
    templateData: IMailTemplateObject;
    text?: string;
    html?: string;
}
