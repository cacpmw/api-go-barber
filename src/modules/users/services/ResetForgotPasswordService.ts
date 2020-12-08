import RequestError from '@shared/exceptions/RequestError';
import ICryptographRepository from '@shared/repositories/interfaces/ICryptographRepository';
import { inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';
import IUserRepository from '../interfaces/classes/IUserRepository';
import IUserTokenRepository from '../interfaces/classes/IUserTokenRepository';

export default class ResetForgotPasswordService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUserRepository,
        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokenRepository,
        @inject('CryptographRepository')
        private cryptographRepository: ICryptographRepository,
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
                StatusCode.BAD_REQUEST,
            );
        }
        const user = await this.userRepository.findById(userToken.user_id);
        if (!user) {
            throw new RequestError('User not found', StatusCode.NOT_FOUND);
        }
        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);
        if (isAfter(Date.now(), compareDate)) {
            throw new RequestError('Token expired', StatusCode.FORBIDDEN);
        }
        const hashedPassword = await this.cryptographRepository.hash(
            password,
            8,
        );
        user.password = hashedPassword;
        this.userRepository.save(user);
    }
}
