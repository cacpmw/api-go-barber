/* eslint-disable no-param-reassign */
import path from 'path';
import RequestError from '@shared/exceptions/RequestError';
import StatusCode from '@shared/infrastructure/http/status';
import IMailProvider from '@shared/providers/interfaces/IMailProvider';
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

    public async execute(email: string): Promise<void> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new RequestError('Email not found', StatusCode.BadRequest);
        }
        const { token } = await this.userTokensRepository.generate(user.id);
        await this.emailProvider.send({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: '[GoBarber] Reset password link',
            templateData: {
                file: path.resolve(
                    __dirname,
                    '../templates/forgotPasswordTemplate.hbs',
                ),
                variables: {
                    name: user.name,
                    token,
                    link: `http://localhost:3000/password/reset?token=${token}`,
                },
            },
        });
    }
}
