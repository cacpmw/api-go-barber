/* eslint-disable no-param-reassign */
import RequestError from '@shared/exceptions/RequestError';
import StatusCode from '@shared/infrastructure/http/status';
import IMailProvider from '@shared/providers/interfaces/IMailProvider';
import IMailObject from '@shared/providers/interfaces/objects/IMailObject';
import { inject, injectable } from 'tsyringe';
import IUserRepository from '../interfaces/classes/IUserRepository';
import IUserTokenRepository from '../interfaces/classes/IUserTokenRepository';

@injectable()
export default class SendPasswordResetEmailService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUserRepository,
        @inject('MailProvider')
        private emailProvider: IMailProvider,
        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokenRepository,
    ) {}

    public async execute(emailData: IMailObject): Promise<void> {
        const user = await this.userRepository.findByEmail(emailData.to);
        if (!user) {
            throw new RequestError('Email not found', StatusCode.BadRequest);
        }
        const { token } = await this.userTokensRepository.generate(user.id);
        emailData.text = `${emailData.text}: ${token}`;
        await this.emailProvider.send(emailData);
    }
}
