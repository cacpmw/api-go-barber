import RequestError from '@shared/exceptions/RequestError';
import IMailRepository from '@shared/repositories/interfaces/IMailRepository';
import { inject, injectable } from 'tsyringe';
import IUserRepository from '../interfaces/classes/IUserRepository';
import IUserTokenRepository from '../interfaces/classes/IUserTokenRepository';

@injectable()
export default class SendPasswordResetEmailService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUserRepository,
        @inject('MailRepository')
        private emailRepository: IMailRepository,
        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokenRepository,
    ) {}

    public async execute(to: string): Promise<void> {
        const user = await this.userRepository.findByEmail(to);
        if (!user) {
            throw new RequestError('Email not found', StatusCode.BAD_REQUEST);
        }
        await this.userTokensRepository.generate(user.id);
        await this.emailRepository.send(to, 'Here is your link');
    }
}
