import IMailObject from './objects/IMailObject';

export default interface IMailProvider {
    send(data: IMailObject): Promise<void>;
}
