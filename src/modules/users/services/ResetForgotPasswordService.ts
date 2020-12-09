import RequestError from '@shared/exceptions/RequestError';
import { inject, injectable } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';
import StatusCode from '@shared/infrastructure/http/status';
import ICryptographProvider from '@shared/providers/interfaces/ICryptographProvider';
import IUserRepository from '../interfaces/classes/IUserRepository';
import IUserTokenRepository from '../interfaces/classes/IUserTokenRepository';

@injectable()
export default class ResetForgotPasswordService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUserRepository,
        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokenRepository,
        @inject('CryptographProvider')
        private cryptographProvider: ICryptographProvider,
    ) {}

    public async execute({
        token,
        password,
    }: {
        token: string;
        password: string;
    }): Promise<void> {
        const userToken = await this.userTokensRepository.findByToken(token);
        if (!userToken) {
            throw new RequestError(
                'Invalid reset token',
                StatusCode.BadRequest,
            );
        }
        const user = await this.userRepository.findById(userToken.user_id);
        if (!user) {
            throw new RequestError('User not found', StatusCode.NotFound);
        }
        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);
        if (isAfter(Date.now(), compareDate)) {
            throw new RequestError('Token expired', StatusCode.Forbidden);
        }
        const hashedPassword = await this.cryptographProvider.hash(password, 8);
        user.password = hashedPassword;
        this.userRepository.save(user);
    }
}
